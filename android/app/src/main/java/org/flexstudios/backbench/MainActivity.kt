package org.flexstudios.backbench

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.PowerManager
import android.provider.Settings
import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import org.flexstudios.backbench.ui.theme.BackbenchTheme
import java.util.concurrent.TimeUnit

class MainActivity : ComponentActivity() {

    private var myWebView: WebView? = null

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted: Boolean ->
        // Handle permission result
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        askNotificationPermission()
        askBatteryOptimizationPermission()
        startPollingService()

        setContent {
            BackbenchTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    BackbenchWebView(
                        url = "https://backbench.ddns.net",
                        modifier = Modifier.padding(innerPadding),
                        onWebViewCreated = { webView ->
                            myWebView = webView
                            webView.addJavascriptInterface(WebAppInterface(this), "AndroidInterface")
                        }
                    )
                }
            }
        }
        
        handleIntent(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        handleIntent(intent)
    }

    private fun handleIntent(intent: Intent?) {
        if (intent?.action == Intent.ACTION_VIEW) {
            val uri = intent.data
            if (uri != null && uri.scheme == "backbench" && uri.host == "auth") {
                val idToken = uri.getQueryParameter("idToken")
                val accessToken = uri.getQueryParameter("accessToken")
                
                myWebView?.post {
                    myWebView?.evaluateJavascript(
                        "if(window.onAndroidGoogleAuth) { window.onAndroidGoogleAuth('$idToken', '$accessToken'); }",
                        null
                    )
                }
            }
        }
    }

    private fun startPollingService() {
        Log.i("MainActivity", "STEP A1: startPollingService() ENTER")
        val serviceIntent = Intent(this, FirebasePollingService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Log.i("MainActivity", "STEP A2: calling startForegroundService()")
            startForegroundService(serviceIntent)
        } else {
            Log.i("MainActivity", "STEP A2: calling startService() (pre-O)")
            startService(serviceIntent)
        }
        Log.i("MainActivity", "STEP A3: startPollingService() EXIT")
    }

    private fun askNotificationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) !=
                PackageManager.PERMISSION_GRANTED
            ) {
                requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
            }
        }
    }

    private fun askBatteryOptimizationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val pm = getSystemService(Context.POWER_SERVICE) as PowerManager
            if (!pm.isIgnoringBatteryOptimizations(packageName)) {
                try {
                    val intent = Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS).apply {
                        data = Uri.parse("package:$packageName")
                    }
                    startActivity(intent)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }

    inner class WebAppInterface(private val mContext: Context) {
        
        private fun updateAuthState(key: String, value: String?) {
            try {
                val file = java.io.File(mContext.filesDir, "auth_state.json")
                val json = if (file.exists()) org.json.JSONObject(file.readText()) else org.json.JSONObject()
                if (value == null) {
                    json.remove(key)
                } else {
                    json.put(key, value)
                }
                file.writeText(json.toString())
            } catch (e: Exception) {
                Log.e("WebAppInterface", "Failed to write auth_state.json", e)
            }
        }

        @JavascriptInterface
        fun signInWithGoogle() {
            Log.i("WebAppInterface", "STEP B1: signInWithGoogle() called from JS")
            val authUrl = "https://backbench.ddns.net/native-auth.html?callback=backbench://auth"
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(authUrl))
            mContext.startActivity(intent)
        }
        @JavascriptInterface
        fun saveAuthToken(refreshToken: String) {
            Log.i("WebAppInterface", "STEP B2: saveAuthToken() called from JS, tokenLength=${refreshToken.length}")
            val prefs = mContext.getSharedPreferences("BackbenchPrefs", Context.MODE_PRIVATE)
            prefs.edit().putString("firebase_refresh_token", refreshToken).apply()
            updateAuthState("firebase_refresh_token", refreshToken)
            Log.i("WebAppInterface", "STEP B3: firebase_refresh_token persisted to SharedPreferences and auth_state.json")
        }

        @JavascriptInterface
        fun saveUserId(uid: String) {
            Log.i("WebAppInterface", "STEP B4: saveUserId() called from JS, uid=$uid")
            val prefs = mContext.getSharedPreferences("BackbenchPrefs", Context.MODE_PRIVATE)
            prefs.edit().putString("firebase_uid", uid).apply()
            updateAuthState("firebase_uid", uid)
            Log.i("WebAppInterface", "STEP B5: firebase_uid persisted to SharedPreferences and auth_state.json")
        }

        @JavascriptInterface
        fun clearUserId() {
            Log.i("WebAppInterface", "STEP B6: clearUserId() called from JS")
            val prefs = mContext.getSharedPreferences("BackbenchPrefs", Context.MODE_PRIVATE)
            prefs.edit().remove("firebase_uid").apply()
            updateAuthState("firebase_uid", null)
            updateAuthState("firebase_refresh_token", null)
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun BackbenchWebView(url: String, modifier: Modifier = Modifier, onWebViewCreated: (WebView) -> Unit) {
    AndroidView(
        modifier = modifier.fillMaxSize(),
        factory = { context ->
            WebView(context).apply {
                settings.apply {
                    javaScriptEnabled = true
                    domStorageEnabled = true
                    cacheMode = WebSettings.LOAD_DEFAULT
                }
                webViewClient = WebViewClient()
                webChromeClient = object : WebChromeClient() {
                    override fun onConsoleMessage(msg: ConsoleMessage): Boolean {
                        Log.i("WebConsole", "${msg.messageLevel()} ${msg.sourceId()}:${msg.lineNumber()} - ${msg.message()}")
                        return true
                    }
                }
                onWebViewCreated(this)
                loadUrl(url)
            }
        }
    )
}