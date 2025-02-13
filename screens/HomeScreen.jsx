import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {loadTracks} from '../utils/trackService';
import {setQueue, setCurrentTrack} from '../store';
import TrackPlayer from 'react-native-track-player';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [trackList, setTrackList] = useState([]);
  const isPlayerInitialized = useSelector(
    state => state.trackPlayer.isPlayerInitialized,
  );

  const initializeTracks = useCallback(async () => {
    try {
      console.log('🎶 Loading tracks...');
      const loadedTracks = await loadTracks();
      if (!Array.isArray(loadedTracks)) {
        console.error('❌ Error: loadTracks() did not return an array.');
        return;
      }
      setTrackList(loadedTracks);
      dispatch(setQueue(loadedTracks)); // Store queue in Redux
    } catch (error) {
      console.error('❌ Error loading tracks:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isPlayerInitialized) {
      initializeTracks();
    }
  }, [isPlayerInitialized, initializeTracks]);

  useFocusEffect(
    useCallback(() => {
      if (isPlayerInitialized) {
        initializeTracks();
      }
    }, [isPlayerInitialized, initializeTracks]),
  );

  const handlePlayTrack = async (track, index) => {
    try {
      console.log(`🎵 Now Playing: ${track.title}`);
      await TrackPlayer.reset();
      await TrackPlayer.add(trackList);
      await TrackPlayer.skip(index);
      await TrackPlayer.play();

      dispatch(setCurrentTrack(track));
      dispatch(setQueue(trackList));
    } catch (error) {
      console.error('🚨 Error playing track:', error);
    }
    navigation.navigate('Player');
  };

  return (
    <View className="flex-1 bg-[#121212]">
      <View className="bg-zinc-800 p-4">
        <Text className="text-2xl text-white font-bold">Your Playlist</Text>
      </View>

      {isPlayerInitialized && trackList.length > 0 ? (
        <FlatList
          data={trackList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              className="flex-row items-center my-2"
              onPress={() => handlePlayTrack(item, index)}>
              <Image
                source={
                  typeof item.artwork === 'number' // ✅ Handle `require()` images correctly
                    ? item.artwork
                    : item.artwork?.uri
                    ? {uri: item.artwork.uri}
                    : require('../assets/songs/defaultImg.jpg')
                }
                className="w-16 h-16 rounded-md"
              />
              <View className="ml-4">
                <Text className="text-lg text-white">
                  {item.title || 'Unknown Title'}
                </Text>
                <Text className="text-gray-400">
                  {item.artist || 'Unknown Artist'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text className="text-white text-center mt-4">Loading Tracks...</Text>
      )}
    </View>
  );
};

export default HomeScreen;
