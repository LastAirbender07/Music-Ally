import TrackPlayer, { Capability } from 'react-native-track-player';

export async function setupPlayer() {
  try {
    console.log('🔄 Setting up TrackPlayer...');
    await TrackPlayer.setupPlayer();
    console.log('🚀 TrackPlayer service started!');

    await TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });

    console.log('✅ TrackPlayer setup completed!');
    return true;
  } catch (error) {
    console.error('🚨 TrackPlayer setup error:', error);
    return false;
  }
}
