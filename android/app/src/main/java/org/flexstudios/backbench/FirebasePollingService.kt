package org.flexstudios.backbench

import android.Manifest
import android.app.AlarmManager
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import android.os.Process
import android.os.SystemClock
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

class FirebasePollingService : Service() {

    private val serviceJob = Job()
    private val serviceScope = CoroutineScope(Dispatchers.IO + serviceJob)
    private var tickCount = 0

    companion object {
        private const val TAG = "FBPollSvc"
        private const val PREFS_NAME = "BackbenchPrefs"
        private const val KEY_UID = "firebase_uid"
        private const val CHANNEL_ID = "backbench_notifications"
        private const val FOREGROUND_CHANNEL_ID = "backbench_foreground"
        private const val FOREGROUND_NOTIFICATION_ID = 1001

        private const val BASE_FIREBASE_URL = "https://backbench-ef95e-default-rtdb.asia-southeast1.firebasedatabase.app"
        private const val FIREBASE_API_KEY = "AIzaSyAYnd63Dwmhq0F-AWlWo1nTmoYX9TPO9DM"

        private var cachedIdToken: String = ""
        private var tokenExpirationTime: Long = 0

        private val ENDPOINTS = mapOf(
            "post" to "$BASE_FIREBASE_URL/posts.json?orderBy=\"timestamp\"&limitToLast=1",
            "reply" to "$BASE_FIREBASE_URL/replies.json?orderBy=\"timestamp\"&limitToLast=1",
            "poll" to "$BASE_FIREBASE_URL/polls.json?orderBy=\"timestamp\"&limitToLast=1",
            "petition" to "$BASE_FIREBASE_URL/petitions.json?orderBy=\"timestamp\"&limitToLast=1",
            "announcement" to "$BASE_FIREBASE_URL/announcements.json?orderBy=\"timestamp\"&limitToLast=1"
        )

        private fun watermarkKey(type: String) = "watermark_$type"
    }

    override fun onCreate() {
        super.onCreate()
        Log.i(TAG, "STEP 01: onCreate() ENTER - pid=${Process.myPid()} process=${getProcessNameCompat()}")
        createNotificationChannels()
        Log.i(TAG, "STEP 02: notification channels created")
        if (Build.VERSION.SDK_INT >= 34) {
            Log.i(TAG, "STEP 03: SDK ${Build.VERSION.SDK_INT} >= 34, calling startForeground with FOREGROUND_SERVICE_TYPE_DATA_SYNC")
            startForeground(FOREGROUND_NOTIFICATION_ID, createForegroundNotification(getRandomGossipText()), ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC)
        } else {
            Log.i(TAG, "STEP 03: SDK ${Build.VERSION.SDK_INT} < 34, calling plain startForeground")
            startForeground(FOREGROUND_NOTIFICATION_ID, createForegroundNotification(getRandomGossipText()))
        }
        Log.i(TAG, "STEP 04: startForeground call returned (service should now be foreground) - onCreate() EXIT")
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.i(TAG, "STEP 05: onStartCommand() ENTER startId=$startId flags=$flags intent=$intent")
        startPollingLoop()
        Log.i(TAG, "STEP 06: startPollingLoop() called, returning START_STICKY")
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        Log.i(TAG, "STEP: onBind() called (unexpected - service is not designed to be bound)")
        return null
    }

    override fun onDestroy() {
        Log.w(TAG, "STEP 99: onDestroy() ENTER - service is being destroyed, cancelling serviceJob")
        super.onDestroy()
        serviceJob.cancel()
        Log.w(TAG, "STEP 99: onDestroy() EXIT - serviceJob cancelled")
    }

    override fun onTaskRemoved(rootIntent: Intent?) {
        Log.w(TAG, "STEP 90: onTaskRemoved() ENTER - app swiped away from recents, scheduling restart alarm")
        super.onTaskRemoved(rootIntent)

        val restartServiceIntent = Intent(applicationContext, this::class.java).also {
            it.setPackage(packageName)
        }
        val restartServicePendingIntent = PendingIntent.getService(
            applicationContext, 1, restartServiceIntent,
            PendingIntent.FLAG_ONE_SHOT or PendingIntent.FLAG_IMMUTABLE
        )
        val alarmService = getSystemService(Context.ALARM_SERVICE) as AlarmManager
        alarmService.set(
            AlarmManager.ELAPSED_REALTIME,
            SystemClock.elapsedRealtime() + 1000,
            restartServicePendingIntent
        )
        Log.w(TAG, "STEP 91: onTaskRemoved() EXIT - restart alarm scheduled for +1000ms")
    }

    private fun startPollingLoop() {
        Log.i(TAG, "STEP 07: startPollingLoop() ENTER - launching coroutine on ${Dispatchers.IO}")
        serviceScope.launch {
            Log.i(TAG, "STEP 08: polling coroutine STARTED, entering while(isActive) loop")
            while (isActive) {
                tickCount++
                Log.i(TAG, "==================== TICK #$tickCount START ====================")
                
                try {
                    val notification = createForegroundNotification(getRandomGossipText())
                    val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
                    notificationManager.notify(FOREGROUND_NOTIFICATION_ID, notification)
                } catch (e: Exception) {
                    Log.e(TAG, "Failed to update foreground notification", e)
                }
                try {
                    pollFirebase()
                } catch (e: Exception) {
                    Log.e(TAG, "STEP: uncaught exception escaped pollFirebase() on tick #$tickCount", e)
                }
                Log.i(TAG, "==================== TICK #$tickCount END - sleeping 45000ms ====================")
                delay(45000)
            }
            Log.w(TAG, "STEP: polling coroutine loop EXITED (isActive became false) - no more polling will happen")
        }
        Log.i(TAG, "STEP 09: startPollingLoop() EXIT - coroutine launched (runs async, this returns immediately)")
    }

    private fun pollFirebase() {
        Log.i(TAG, "STEP 10: pollFirebase() ENTER (tick #$tickCount)")

        val prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

        var refreshToken = ""
        var uid = ""
        try {
            val file = java.io.File(filesDir, "auth_state.json")
            if (file.exists()) {
                val json = org.json.JSONObject(file.readText())
                refreshToken = json.optString("firebase_refresh_token", "")
                uid = json.optString("firebase_uid", "")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Failed to read auth_state.json", e)
        }
        
        Log.i(TAG, "STEP 12: read firebase_refresh_token, isEmpty=${refreshToken.isEmpty()} length=${refreshToken.length}")

        if (refreshToken.isEmpty()) {
            Log.w(TAG, "STEP 12-FAIL: refresh token is EMPTY. The web app never called AndroidInterface.saveAuthToken(), or prefs were cleared. ABORTING this tick.")
            return
        }

        val tokenAgeMs = tokenExpirationTime - System.currentTimeMillis()
        Log.i(TAG, "STEP 13: cachedIdToken isEmpty=${cachedIdToken.isEmpty()} msUntilExpiry=$tokenAgeMs")

        if (cachedIdToken.isEmpty() || System.currentTimeMillis() > tokenExpirationTime - 300000) {
            Log.i(TAG, "STEP 14: ID token missing or expiring soon -> calling refreshIdToken()")
            refreshIdToken(refreshToken)
        } else {
            Log.i(TAG, "STEP 14: cached ID token still valid, skipping refresh")
        }

        if (cachedIdToken.isEmpty()) {
            Log.w(TAG, "STEP 14-FAIL: cachedIdToken is STILL EMPTY after refresh attempt. ABORTING this tick - all Firebase reads would 401.")
            return
        }
        Log.i(TAG, "STEP 15: have valid cachedIdToken (length=${cachedIdToken.length}), proceeding to poll endpoints")

        val authQuery = "&auth=$cachedIdToken"

        for ((type, baseUrlString) in ENDPOINTS) {
            Log.i(TAG, "STEP 16: --- checking endpoint type='$type' ---")
            checkEndpointForUpdate(prefs, type, baseUrlString + authQuery, authQuery)
        }

        Log.i(TAG, "STEP 17: read firebase_uid from JSON, isEmpty=${uid.isEmpty()} value='$uid'")
        if (uid.isNotEmpty()) {
            val notifUrl = "$BASE_FIREBASE_URL/notifications/$uid.json?orderBy=\"timestamp\"&limitToLast=1$authQuery"
            Log.i(TAG, "STEP 18: --- checking endpoint type='notification' for uid=$uid ---")
            checkEndpointForUpdate(prefs, "notification", notifUrl, authQuery, titleFallback = "Backbench")
        } else {
            Log.w(TAG, "STEP 18-FAIL: firebase_uid is EMPTY. The web app never called AndroidInterface.saveUserId(). Skipping own-notifications poll.")
        }

        Log.i(TAG, "STEP 19: pollFirebase() EXIT (tick #$tickCount complete)")
    }

    private fun refreshIdToken(refreshToken: String) {
        Log.i(TAG, "STEP 20: refreshIdToken() ENTER")
        try {
            val tokenUrl = URL("https://securetoken.googleapis.com/v1/token?key=$FIREBASE_API_KEY")
            Log.i(TAG, "STEP 21: opening connection to securetoken.googleapis.com")
            val tokenConn = tokenUrl.openConnection() as HttpURLConnection
            tokenConn.requestMethod = "POST"
            tokenConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
            tokenConn.doOutput = true
            tokenConn.outputStream.write("grant_type=refresh_token&refresh_token=$refreshToken".toByteArray())
            Log.i(TAG, "STEP 22: request body written, awaiting response")

            val responseCode = tokenConn.responseCode
            Log.i(TAG, "STEP 23: token endpoint HTTP responseCode=$responseCode")

            if (responseCode == HttpURLConnection.HTTP_OK) {
                val tokenResponse = tokenConn.inputStream.bufferedReader().use { it.readText() }
                Log.i(TAG, "STEP 24: token response body read (length=${tokenResponse.length})")
                val tokenJson = JSONObject(tokenResponse)
                if (tokenJson.has("id_token")) {
                    cachedIdToken = tokenJson.getString("id_token")
                    val expiresIn = tokenJson.optLong("expires_in", 3600)
                    tokenExpirationTime = System.currentTimeMillis() + (expiresIn * 1000)
                    Log.i(TAG, "STEP 25-OK: id_token acquired, length=${cachedIdToken.length}, expiresIn=${expiresIn}s")
                } else {
                    Log.e(TAG, "STEP 25-FAIL: token response HTTP 200 but JSON has NO 'id_token' field. Body=$tokenResponse")
                }
            } else {
                val errBody = try {
                    tokenConn.errorStream?.bufferedReader()?.use { it.readText() } ?: "<no error body>"
                } catch (e: Exception) {
                    "<failed to read error body: ${e.message}>"
                }
                Log.e(TAG, "STEP 23-FAIL: token refresh HTTP $responseCode. This usually means the refresh token is invalid/expired/revoked. Body=$errBody")
            }
            tokenConn.disconnect()
        } catch (e: Exception) {
            Log.e(TAG, "STEP 20-EXCEPTION: refreshIdToken() threw", e)
        }
        Log.i(TAG, "STEP 26: refreshIdToken() EXIT")
    }

    /**
     * Fetches the single most-recent item for [type] and compares it against that type's own
     * stored watermark. Each content type (post/reply/poll/petition/announcement/notification)
     * is tracked independently since their timestamps aren't comparable across collections.
     */
    private fun checkEndpointForUpdate(
        prefs: android.content.SharedPreferences,
        type: String,
        urlString: String,
        authQuery: String = "",
        titleFallback: String = "Backbench Updates"
    ) {
        Log.i(TAG, "STEP 30[$type]: checkEndpointForUpdate() ENTER url=$urlString")
        try {
            val url = URL(urlString)
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "GET"
            Log.i(TAG, "STEP 31[$type]: connection opened, awaiting response")

            val responseCode = connection.responseCode
            Log.i(TAG, "STEP 32[$type]: HTTP responseCode=$responseCode")

            if (responseCode != HttpURLConnection.HTTP_OK) {
                val errBody = try {
                    connection.errorStream?.bufferedReader()?.use { it.readText() } ?: "<no error body>"
                } catch (e: Exception) {
                    "<failed to read error body: ${e.message}>"
                }
                Log.e(TAG, "STEP 32-FAIL[$type]: non-200 response. This usually means Firebase RTDB rules rejected the auth token, or the path doesn't exist. Body=$errBody")
                connection.disconnect()
                return
            }

            val response = connection.inputStream.bufferedReader().use { it.readText() }
            connection.disconnect()
            Log.i(TAG, "STEP 33[$type]: response body read, length=${response.length}, raw='${response.take(300)}'")

            if (response == "null" || response.isEmpty()) {
                Log.i(TAG, "STEP 33-EMPTY[$type]: endpoint returned null/empty - no data exists at this path yet. EXIT")
                return
            }

            val json = JSONObject(response)
            val keys = json.keys()
            if (!keys.hasNext()) {
                Log.w(TAG, "STEP 34-FAIL[$type]: JSON object has ZERO keys despite non-null body. EXIT")
                return
            }

            val firstKey = keys.next()
            Log.i(TAG, "STEP 34[$type]: first (and expected only, limitToLast=1) key='$firstKey'")
            val itemObj = json.getJSONObject(firstKey)
            val timestampString = itemObj.optString("timestamp")
            Log.i(TAG, "STEP 35[$type]: item timestamp field='$timestampString' fullItem=$itemObj")

            if (timestampString.isEmpty()) {
                Log.w(TAG, "STEP 35-FAIL[$type]: latest item has NO 'timestamp' field. Cannot compare. EXIT")
                return
            }

            val key = watermarkKey(type)
            val storedWatermark = prefs.getString(key, null)
            Log.i(TAG, "STEP 36[$type]: stored watermark for key='$key' -> '$storedWatermark'")

            if (storedWatermark == null) {
                prefs.edit().putString(key, timestampString).apply()
                Log.i(TAG, "STEP 37-SEED[$type]: no prior watermark existed - SEEDING baseline=$timestampString, NOT notifying (first-ever check for this type). EXIT")
                return
            }

            Log.i(TAG, "STEP 38[$type]: comparing new='$timestampString' > stored='$storedWatermark' -> ${timestampString > storedWatermark}")

            if (timestampString > storedWatermark) {
                Log.i(TAG, "STEP 39-NEW[$type]: NEW CONTENT DETECTED, updating watermark and firing notification")
                prefs.edit().putString(key, timestampString).apply()
                
                var title = titleFallback
                var message = "A new $type was just shared on campus!"
                var bitmap: android.graphics.Bitmap? = null
                
                try {
                    val isAnonymous = itemObj.optBoolean("isAnonymous", false)
                    val authorId = itemObj.optString("authorId").takeIf { it.isNotEmpty() }
                        ?: itemObj.optString("creatorId").takeIf { it.isNotEmpty() }
                        ?: itemObj.optString("senderId").takeIf { it.isNotEmpty() }
                        
                    var authorName = "Someone"
                    if (isAnonymous) {
                        authorName = "Anonymous"
                    } else if (authorId != null) {
                        val (name, photoUrl) = fetchUserProfile(authorId, authQuery)
                        authorName = name
                        bitmap = downloadBitmap(photoUrl)
                    }
                    
                    when (type) {
                        "post" -> {
                            title = "$authorName posted in SJC"
                            message = itemObj.optString("content", "New post on campus.")
                        }
                        "reply" -> {
                            title = "$authorName replied to a post"
                            message = itemObj.optString("content", "New reply on campus.")
                        }
                        "poll" -> {
                            title = "$authorName created a Campus Poll"
                            message = itemObj.optString("question", "Vote on the new poll!")
                        }
                        "petition" -> {
                            title = "$authorName started a Petition"
                            message = itemObj.optString("title", "Check out the new petition.")
                        }
                        "announcement" -> {
                            title = "New Announcement"
                            message = itemObj.optString("content", "Check out the latest announcement.")
                            if (!isAnonymous && authorId != null) {
                                title = "Announcement from $authorName"
                            }
                        }
                        "notification" -> {
                            val notifType = itemObj.optString("type", "")
                            if (notifType == "FRIEND_REQUEST") {
                                title = "New Friend Request"
                                message = "$authorName sent you a friend request."
                            } else {
                                title = "New Notification"
                                message = "You have a new update from $authorName."
                            }
                        }
                    }
                } catch(e: Exception) {
                     Log.e(TAG, "Failed to parse rich notification info", e)
                }
                
                Log.i(TAG, "STEP 40[$type]: calling showNotification(title='$title', text='$message')")
                showNotification(title, message, bitmap)
                Log.i(TAG, "STEP 41[$type]: showNotification() returned")
            } else {
                Log.i(TAG, "STEP 39-NOCHANGE[$type]: no change since last check")
            }
        } catch (e: Exception) {
            Log.e(TAG, "STEP 30-EXCEPTION[$type]: checkEndpointForUpdate() threw", e)
        }
        Log.i(TAG, "STEP 42[$type]: checkEndpointForUpdate() EXIT")
    }

    private fun fetchUserProfile(uid: String, authQuery: String): Pair<String, String?> {
        try {
            val cleanAuthQuery = if (authQuery.startsWith("&")) "?${authQuery.substring(1)}" else authQuery
            val url = URL("$BASE_FIREBASE_URL/users/$uid.json$cleanAuthQuery")
            val conn = url.openConnection() as HttpURLConnection
            conn.requestMethod = "GET"
            if (conn.responseCode == HttpURLConnection.HTTP_OK) {
                val response = conn.inputStream.bufferedReader().use { it.readText() }
                if (response != "null" && response.isNotEmpty()) {
                    val json = JSONObject(response)
                    val name = json.optString("name", "A student")
                    val photoUrl = json.optString("profilePicture", null).takeIf { it.isNotEmpty() }
                    return Pair(name, photoUrl)
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Failed to fetch user profile for uid=$uid", e)
        }
        return Pair("A student", null)
    }

    private fun downloadBitmap(urlString: String?): android.graphics.Bitmap? {
        if (urlString.isNullOrEmpty()) return null
        return try {
            val url = URL(urlString)
            val connection = url.openConnection() as HttpURLConnection
            connection.doInput = true
            connection.connect()
            android.graphics.BitmapFactory.decodeStream(connection.inputStream)
        } catch (e: Exception) {
            Log.e(TAG, "Failed to download bitmap from $urlString", e)
            null
        }
    }

    private fun showNotification(title: String, message: String, largeIcon: android.graphics.Bitmap? = null) {
        Log.i(TAG, "STEP 50: showNotification() ENTER title='$title' message='$message'")
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(message)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)

        if (largeIcon != null) {
            builder.setLargeIcon(largeIcon)
        }
        builder.setStyle(NotificationCompat.BigTextStyle().bigText(message))

        Log.i(TAG, "STEP 51: notification builder constructed")

        val hasPermission = ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED
        Log.i(TAG, "STEP 52: POST_NOTIFICATIONS permission granted=$hasPermission")

        if (hasPermission) {
            val notifId = System.currentTimeMillis().toInt()
            NotificationManagerCompat.from(this).notify(notifId, builder.build())
            Log.i(TAG, "STEP 53-SENT: notify() called with id=$notifId - notification should now be visible")
        } else {
            Log.e(TAG, "STEP 53-BLOCKED: POST_NOTIFICATIONS permission NOT granted - notification was suppressed by the OS, this is why nothing shows up!")
        }
        Log.i(TAG, "STEP 54: showNotification() EXIT")
    }

    private fun getRandomGossipText(): String {
        val texts = listOf(
            "Gangsta talk going on, wanna join?",
            "JEE talks to OG Talks, all going on",
            "Yep, I built it",
            "kya be, har baar english mein nhi lijhunga",
            "ghoor kya rhe ho yr, me shy\uD83E\uDD7A",
            "aapka kuchu puchu kar dunga",
            "Oye kab tak insta chalayega",
            "Oye kab tak reddit chalayega, leftist!",
            "Hey bro!",
            "hiiii, thanks for watching!",
            "Hi.",
            "....",
            "Minecraft?",
            "Minecraft with me?",
            "Hate To Dsilva",
            "Woah!",
            "U good bbg?",
            "hehe, nthg",
            "I am just messing with ya",
            "Yoooooooooooo",
            "Jubin Sir posted something",
            "My Foot!",
            "Built in 6 hours btw",
            "A weekend project of a fellow classmate",
            "Freedom of expression on top",
            "SJ hates me\uD83E\uDD40",
            "AP is my best-friend",
            "Unpopular Opinion: CJP ain't my type",
            "Creeper SMP on top!",
            "Midhush:::::::::::::::::::::::::::::::::",
            "hehe, its me! the admin!",
            "Hehe, try finding me, finding dev",
            "Canteen se aur kitna khayega mote",
            "Meri Marzi Mera Ghoda, Jo Na Nacha..............",
            "Iska Uska Sabka Badla Lega Ye Haider..!",
            "Baghban.....",
            "PKMKB",
            "PKMKB once more",
            "Hate To pak",
            "I know about you bro, I know what u did",
            "Come on bro, its me, text me in app",
            "psp... broo! its me, come online",
            "pspps..... broo!!! pleaseee come online!",
            "Bro i know about your gf",
            "Bro hehe!",
            "Dhappa",
            "Inne Ratri Payam Tinno"
        )
        return texts.random()
    }

    private fun createForegroundNotification(message: String): Notification {
        val intent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE)

        return NotificationCompat.Builder(this, FOREGROUND_CHANNEL_ID)
            .setContentTitle("SJC's Top Gossip")
            .setContentText(message)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentIntent(pendingIntent)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
    }

    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationManager: NotificationManager =
                getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

            val channel = NotificationChannel(
                CHANNEL_ID,
                "Updates",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Notifications for new posts and campus updates"
            }
            notificationManager.createNotificationChannel(channel)

            val fgChannel = NotificationChannel(
                FOREGROUND_CHANNEL_ID,
                "Background Service",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Keeps the app polling in the background"
            }
            notificationManager.createNotificationChannel(fgChannel)
        }
    }

    private fun getProcessNameCompat(): String {
        return try {
            val am = getSystemService(Context.ACTIVITY_SERVICE) as android.app.ActivityManager
            am.runningAppProcesses?.find { it.pid == Process.myPid() }?.processName ?: "unknown"
        } catch (e: Exception) {
            "error:${e.message}"
        }
    }
}
