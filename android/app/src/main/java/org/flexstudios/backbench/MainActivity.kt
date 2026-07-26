package org.flexstudios.backbench

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.webkit.JavascriptInterface
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
        val serviceIntent = Intent(this, FirebasePollingService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(serviceIntent)
        } else {
            startService(serviceIntent)
        }
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

    inner class WebAppInterface(private val mContext: Context) {
        @JavascriptInterface
        fun signInWithGoogle() {
            val authUrl = "https://backbench.ddns.net/native-auth.html?callback=backbench://auth"
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(authUrl))
            mContext.startActivity(intent)
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
                onWebViewCreated(this)
                loadUrl(url)
            }
        }
    )
}