package org.flexstudios.backbench

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

class FirebasePollWorker(
    private val context: Context,
    workerParams: WorkerParameters
) : CoroutineWorker(context, workerParams) {

    companion object {
        private const val PREFS_NAME = "BackbenchPrefs"
        private const val KEY_LAST_TIMESTAMP = "lastPostTimestamp"
        private const val CHANNEL_ID = "backbench_notifications"
        private const val BASE_FIREBASE_URL = "https://backbench-ef95e-default-rtdb.asia-southeast1.firebasedatabase.app"
        private val ENDPOINTS = mapOf(
            "post" to "$BASE_FIREBASE_URL/posts.json?orderBy=\"timestamp\"&limitToLast=1",
            "poll" to "$BASE_FIREBASE_URL/polls.json?orderBy=\"timestamp\"&limitToLast=1",
            "petition" to "$BASE_FIREBASE_URL/petitions.json?orderBy=\"timestamp\"&limitToLast=1"
        )
    }

    override suspend fun doWork(): Result {
        try {
            val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
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

            return Result.success()
        } catch (e: Exception) {
            e.printStackTrace()
            return Result.retry()
        }
    }

    private fun showNotification(title: String, message: String) {
        createNotificationChannel()

        val builder = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(message)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)

        with(NotificationManagerCompat.from(context)) {
            if (ActivityCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
                notify(System.currentTimeMillis().toInt(), builder.build())
            }
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name = "Updates"
            val descriptionText = "Notifications for new posts and campus updates"
            val importance = NotificationManager.IMPORTANCE_HIGH
            val channel = NotificationChannel(CHANNEL_ID, name, importance).apply {
                description = descriptionText
            }
            val notificationManager: NotificationManager =
                context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }
}
