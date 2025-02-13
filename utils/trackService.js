import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import { Alert } from 'react-native';

const appDirectory = `${RNFS.DocumentDirectoryPath}/songs`;
const metadataFile = `${appDirectory}/savedTracks.json`;

// ✅ Default hardcoded tracks (always available)
const defaultTracks = [
    {
        id: 1,
        title: 'Running Up That Hill',
        artist: 'Kate Bush',
        artwork: require('../assets/songs/runningUpThatHill.jpg'), // ✅ Fix: Use require() for local images
        url: 'file:///android_asset/songs/runningUpThatHill.mp3',
      },
    {
        id: 2,
        title: 'Kannodu Kaanberallam',
        artist: 'AR Rahman',
        artwork: require('../assets/songs/defaultImg.jpg'),
        url: 'file:///android_asset/songs/Kannodu-Kaanberallam.mp3',
    },
];

const ensureMetadataFileExists = async () => {
    const dirExists = await RNFS.exists(appDirectory);
    if (!dirExists) {
        Alert.alert("Creating Playlist Database", "📂 Songs directory missing. Creating...");
        await RNFS.mkdir(appDirectory);
    }

    const metadataExists = await RNFS.exists(metadataFile);
    if (!metadataExists) {
        Alert.alert("Creating Playlist Database", "⚠️ Metadata file not found. Creating a new one.");
        await RNFS.writeFile(metadataFile, JSON.stringify([]), 'utf8');
    }
};



export const loadTracks = async () => {
    try {
        const isInitialized = await TrackPlayer.isServiceRunning();
        if (!isInitialized) {
            console.error("🚨 TrackPlayer is not initialized! Call setupPlayer first.");
            return [];
        }

        await ensureMetadataFileExists(); // 🔥 Ensure the file exists before reading

        const metadataJson = await RNFS.readFile(metadataFile, 'utf8');
        const savedTracks = JSON.parse(metadataJson);

        const formattedTracks = savedTracks.map((track, index) => ({
            id: index + 3, // Start IDs after default tracks
            ...track,
            artwork: track.artwork && typeof track.artwork === 'string'
            ? { uri: track.artwork } 
            : require('../assets/songs/defaultImg.jpg'),
        }));

        await TrackPlayer.reset();
        await TrackPlayer.add([...defaultTracks, ...formattedTracks]);
        console.log("✅ Tracks added successfully!");

        return [...defaultTracks, ...formattedTracks];
    } catch (error) {
        console.error('❌ Error loading tracks:', error);
        return [];
    }
};
