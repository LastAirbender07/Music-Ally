# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Keep classes for react-native-get-sms-android
-keep class com.react.SmsPackage.** { *; }
-dontwarn com.react.SmsPackage.**

-keep class com.reactlibrary.RNSms.** { *; }
-dontwarn com.reactlibrary.RNSms.**

# Keep classes for React Native core
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# Keep classes for React Native Vector Icons
-keep class com.oblador.vectoricons.** { *; }
-dontwarn com.oblador.vectoricons.**

# Keep classes for AsyncStorage
-keep class com.reactnativecommunity.asyncstorage.** { *; }
-dontwarn com.reactnativecommunity.asyncstorage.**

# Keep classes for NetInfo
-keep class com.reactnativecommunity.netinfo.** { *; }
-dontwarn com.reactnativecommunity.netinfo.**

# Keep classes for React Native Permissions
-keep class com.reactnativecommunity.rnpermissions.** { *; }
-dontwarn com.reactnativecommunity.rnpermissions.**

# Keep classes for React Native Navigation
-keep class com.reactnativenavigation.** { *; }
-dontwarn com.reactnativenavigation.**

# Keep classes for React Navigation
-keep class androidx.navigation.** { *; }
-dontwarn androidx.navigation.**

# Keep classes for React Native Screens
-keep class com.swmansion.rnscreens.** { *; }
-dontwarn com.swmansion.rnscreens.**

# Keep classes for React Native Gesture Handler
-keep class com.swmansion.gesturehandler.** { *; }
-dontwarn com.swmansion.gesturehandler.**

# Keep classes for React Native Webview
-keep class com.reactnativecommunity.webview.** { *; }
-dontwarn com.reactnativecommunity.webview.**

# Keep classes for JailMonkey (Jailbreak/Root detection)
-keep class com.gantix.JailMonkey.** { *; }
-dontwarn com.gantix.JailMonkey.**

# Keep Redux and Toolkit
-keep class org.reduxjs.** { *; }
-dontwarn org.reduxjs.**

# Keep JWT Decode
-keep class com.auth0.jwt.** { *; }
-dontwarn com.auth0.jwt.**

# Keep SHA-256 hashing-related classes (js-sha256)
-keep class sha256.** { *; }

# Keep for Axios (okhttp)
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**

# General settings to avoid issues with obfuscation
-keepattributes Signature
-keepattributes *Annotation*
-keepclasseswithmembers class * {
    native <methods>;
}

# Disable warnings for potential unused code
-dontwarn java.lang.invoke.*
-dontwarn javax.annotation.**
-dontwarn okio.**
-dontwarn androidx.**
