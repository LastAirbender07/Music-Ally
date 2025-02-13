import TrackPlayer, { Event } from 'react-native-track-player';

export const playbackService = async () => {
	console.log("🚀 Starting playback service...");
	
    TrackPlayer.addEventListener(Event.RemotePlay, async () => {
        await TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemotePause, async () => {
        await TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemoteStop, async () => {
        await TrackPlayer.stop();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        await TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        await TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async (event) => {
        console.log("Queue ended", event);
    });

    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (event) => {
        console.log("Track changed", event);
    });

    TrackPlayer.addEventListener(Event.PlaybackError, async (error) => {
        console.error("Playback Error:", error);
    });
};

export default playbackService;