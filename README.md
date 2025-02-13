# 🎵 Music-Ally

## 📱 Overview
**Music-Ally** is a simple and modern music player app built using **React Native**. It provides a seamless music playback experience with features like track uploads, custom playlists, and offline music support. The app is designed with a clean, responsive UI, leveraging Tailwind CSS for styling and React Native Track Player for audio playback.

**Install it from here - [MusicAlly](MusicAlly.apk)**

## 🚀 Key Features
- 🎧 **Play Local Songs**: Load and play MP3 files stored locally within the app.
- 📥 **Upload Songs**: Users can upload songs to their custom playlist.
- 🖼️ **Artwork Support**: Each song can have custom artwork, or a default image is shown if artwork is missing.
- ⏯️ **Player Controls**: Play, Pause, Next, and Previous controls are provided.
- 📂 **Persistent Playlist**: User playlists are saved as JSON in local storage (`savedTracks.json`) for persistence across app launches.
- 🛠️ **Modern UI**: Styled with Tailwind CSS for a sleek and responsive design.

---

## 📂 Project Structure
```plaintext
.
|-- App.tsx                # Entry point of the app
|-- StackNavigator.jsx     # Navigation setup for screens
|-- components             # Reusable components
|   `-- PlayerControls.jsx # Player control buttons
|-- config
|   `-- trackPlayerSetup.js # TrackPlayer setup & service binding
|-- screens
|   |-- HomeScreen.jsx     # Displays playlist and upload option
|   |-- PlayerScreen.jsx   # Music player with track info and controls
|   |-- SplashScreen.jsx   # Initial splash screen
|   `-- UploadScreen.jsx   # Screen for uploading local songs
|-- utils
|   `-- trackService.js    # Handles track loading, metadata, and playlist management
|-- assets
|   |-- songs              # Bundled default songs & images
|   |-- logo.png           # App logo
|   `-- user.png           # Placeholder user image
|-- permissions.js         # Handles Android/iOS permissions
|-- service.js             # Background service for track player
|-- store.js               # Placeholder for global state (if any)
```
---

## ⚙️ How It Works

### 🏃‍♂️ App Flow
1. **Splash Screen** → **Home Screen** → **Player Screen / Upload Screen** via React Navigation.
2. **Home Screen**:
   - Displays a list of all available tracks.
   - Provides an option to navigate to the **Upload Screen**.
3. **Player Screen**:
   - Displays the current track's details like **Title, Artist, and Artwork**.
   - Provides playback controls like **Play, Pause, Next, and Previous**.
4. **Upload Screen**:
   - Allows the user to **browse local audio files (MP3)** and add them to the playlist.
   - Metadata such as **track title, artist, and artwork** can be saved for custom uploads.

---

## 🎵 Track Management

### 📥 **Loading Tracks**
- **Default Tracks**: Bundled with the app in the `/assets/songs/` directory.
- **Custom Tracks**: Uploaded by the user and saved to `DocumentDirectoryPath/songs/`.
- Track metadata is stored in `savedTracks.json` for persistence.

### 📄 **savedTracks.json**
A JSON file that stores an array of user-uploaded track metadata:
```json
[
  {
    "id": 3,
    "title": "Custom Song",
    "artist": "Unknown Artist",
    "url": "file:///path/to/song.mp3",
    "artwork": "file:///path/to/artwork.jpg"
  }
]

```

### 🔄 TrackPlayer Integration
The app utilizes React Native Track Player for music playback, which supports:

Background playback.
Media controls (Play, Pause, Next, Previous).
Track queue management.

### 📂 Songs Directory
- **Path:** `DocumentDirectoryPath/songs/`
- Custom uploaded tracks and their metadata are stored here.

### 📝 Metadata File
- **File:** `savedTracks.json`
- **Path:** Inside `songs` directory.
- Stores user-uploaded track information in JSON format.
- Automatically created if not found when the app launches.

---

## 🛠️ Core Functionalities Explained

### 🧑‍💻 Track Loading Service (trackService.js)
Responsible for:
- Checking if `savedTracks.json` exists.
- Creating the metadata file if it is missing.
- Reading default tracks and user-uploaded tracks from storage.
- Formatting tracks with proper artwork paths.
- Loading tracks into **TrackPlayer**.

### 🧑‍💻 TrackPlayer Setup (trackPlayerSetup.js)
Responsible for:
- Initializing **React Native Track Player**.
- Configuring playback services to handle background controls and media notifications.

### 📂 File Handling (react-native-fs)
- Creating directories.
- Reading and writing files (like `savedTracks.json`).
- Handling local paths for uploaded songs and artwork.


## 🧑‍💻 Permissions Handling

### Android Permissions:
- **READ_EXTERNAL_STORAGE** – Required to read audio files from the device.
- **WRITE_EXTERNAL_STORAGE** – Required to save uploaded tracks and metadata.

### iOS Permissions:
- **NSMicrophoneUsageDescription** – Needed if microphone access is required in the future.
- **NSMusicLibraryUsageDescription** – Optional if music library access is added later.

---

## 🖥️ Tech Stack Overview

| **Technology**                | **Purpose**                                      |
|-------------------------------|--------------------------------------------------|
| **React Native**               | Cross-platform mobile app development            |
| **React Native Track Player**  | Audio playback and media controls                |
| **React Navigation**           | Screen transitions and navigation                |
| **Tailwind CSS**               | Utility-first CSS framework for styling          |
| **react-native-fs**            | File system operations                           |

---

## 🧑‍💻 Installation & Setup

```bash
# Install dependencies
yarn install

# Start Metro Bundler
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios
```

