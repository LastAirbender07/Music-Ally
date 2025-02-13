import { PermissionsAndroid, Platform } from 'react-native';

export async function requestPermissions() {
    try {
        if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
                // For Android 13+ (API 33+)
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                ]);
                
                if (
                    granted["android.permission.READ_MEDIA_AUDIO"] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted["android.permission.READ_MEDIA_IMAGES"] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted["android.permission.READ_MEDIA_VIDEO"] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log("✅ Media permissions granted");
                } else {
                    console.log("❌ Media permissions denied");
                }
            } else {
                // For Android 12 and below
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]);
                
                if (
                    granted["android.permission.READ_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted["android.permission.WRITE_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log("✅ Storage permissions granted");
                } else {
                    console.log("❌ Storage permissions denied");
                }
            }
        }
    } catch (err) {
        console.warn("🚨 Permission request error:", err);
    }
}
