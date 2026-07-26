package org.flexstudios.backbench

import android.Manifest
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

    companion object {
        private const val PREFS_NAME = "BackbenchPrefs"
        private const val KEY_LAST_TIMESTAMP = "lastPostTimestamp"
        private const val CHANNEL_ID = "backbench_notifications"
        private const val FOREGROUND_CHANNEL_ID = "backbench_foreground"
        private const val FOREGROUND_NOTIFICATION_ID = 1001
        
        private const val BASE_FIREBASE_URL = "https://backbench-ef95e-default-rtdb.asia-southeast1.firebasedatabase.app"
        private val ENDPOINTS = mapOf(
            "post" to "$BASE_FIREBASE_URL/posts.json?orderBy=\"timestamp\"&limitToLast=1",
            "poll" to "$BASE_FIREBASE_URL/polls.json?orderBy=\"timestamp\"&limitToLast=1",
            "petition" to "$BASE_FIREBASE_URL/petitions.json?orderBy=\"timestamp\"&limitToLast=1"
        )
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannels()
        if (Build.VERSION.SDK_INT >= 34) {
            startForeground(FOREGROUND_NOTIFICATION_ID, createForegroundNotification(), ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC)
        } else {
            startForeground(FOREGROUND_NOTIFICATION_ID, createForegroundNotification())
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startPollingLoop()
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onDestroy() {
        super.onDestroy()
        serviceJob.cancel()
    }

    private fun startPollingLoop() {
        serviceScope.launch {
            while (isActive) {
                pollFirebase()
                delay(45000) // Poll every 45 seconds
            }
        }
    }

    private fun pollFirebase() {
        try {
            val prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
            val lastTimestamp = prefs.getString(KEY_LAST_TIMESTAMP, "") ?: ""
            var maxTimestamp = lastTimestamp
            var newContentFound = false
            var latestType = ""

            for ((type, urlString) in ENDPOINTS) {
                val url = URL(urlString)
                val connection = url.openConnection() as HttpURLConnection
                connection.requestMethod = "GET"

                if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                    val response = connection.inputStream.bufferedReader().use { it.readText() }
                    if (response != "null" && response.isNotEmpty()) {
                        val json = JSONObject(response)
                        val keys = json.keys()
                        if (keys.hasNext()) {
                            val firstKey = keys.next()
                            val itemObj = json.getJSONObject(firstKey)
                            val timestampString = itemObj.optString("timestamp")

                            if (timestampString > maxTimestamp) {
                                maxTimestamp = timestampString
                                if (lastTimestamp.isNotEmpty()) {
                                    newContentFound = true
                                    latestType = type
                                }
                            }
                        }
                    }
                }
                connection.disconnect()
            }

            if (maxTimestamp > lastTimestamp) {
                prefs.edit().putString(KEY_LAST_TIMESTAMP, maxTimestamp).apply()
            }

            if (newContentFound) {
                showNotification("Backbench Updates", "A new $latestType was just shared on campus!")
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun showNotification(title: String, message: String) {
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

        with(NotificationManagerCompat.from(this)) {
            if (ActivityCompat.checkSelfPermission(this@FirebasePollingService, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
                notify(System.currentTimeMillis().toInt(), builder.build())
            }
        }
    }

    private fun createForegroundNotification(): Notification {
        val intent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE)

        return NotificationCompat.Builder(this, FOREGROUND_CHANNEL_ID)
            .setContentTitle("Backbench Background Sync")
            .setContentText("Checking for campus updates...")
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentIntent(pendingIntent)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
    }

    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationManager: NotificationManager =
                getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

            // Channel for high priority push notifications
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Updates",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Notifications for new posts and campus updates"
            }
            notificationManager.createNotificationChannel(channel)

            // Channel for low priority foreground service persistent notification
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
}
