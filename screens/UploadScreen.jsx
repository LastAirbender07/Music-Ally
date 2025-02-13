import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getAll,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';
import RNFS from 'react-native-fs';

const defaultArtwork = require('../assets/songs/defaultImg.jpg');
const appDirectory = `${RNFS.DocumentDirectoryPath}/songs`;
const metadataFile = `${appDirectory}/savedTracks.json`;

const UploadScreen = () => {
  const [songs, setSongs] = useState([]);

  // ✅ Ensure metadata file exists
  const ensureMetadataFileExists = async () => {
    const exists = await RNFS.exists(metadataFile);
    if (!exists) {
      console.warn("⚠️ Metadata file not found. Creating a new one.");
      await RNFS.writeFile(metadataFile, JSON.stringify([]), 'utf8');
    }
  };

  // ✅ Fetch music files
  const fetchMusicFiles = async () => {
    try {
      const results = await getAll({
        limit: 50,
        offset: 0,
        coverQuality: 50,
        minSongDuration: 1000,
        sortBy: SortSongFields.TITLE,
        sortOrder: SortSongOrder.ASC,
      });

      if (typeof results === 'string') {
        throw new Error(results);
      }

      const newSongs = results.map((file, index) => ({
        id: index + 1,
        title: file.title || 'Unknown Title',
        artist: file.artist || 'Unknown Artist',
        album: file.album || 'Unknown Album',
        duration: file.duration,
        artwork: file.cover && typeof file.cover === 'string' ? { uri: file.cover } : defaultArtwork,
        url: file.url,
        selected: false,
      }));

      setSongs(newSongs);
      Alert.alert('🎶 Success', 'Music files fetched successfully!');
    } catch (error) {
      console.error('❌ Error fetching songs:', error);
      Alert.alert('⚠️ Error', 'Failed to fetch music files.');
    }
  };

  // ✅ Toggle song selection
  const toggleSelection = (songId) => {
    setSongs(prevSongs =>
      prevSongs.map(song =>
        song.id === songId ? { ...song, selected: !song.selected } : song
      )
    );
  };

  // ✅ Save selected songs locally
  const saveSelectedSongs = async () => {
    try {
      await ensureMetadataFileExists();

      const dirExists = await RNFS.exists(appDirectory);
      if (!dirExists) {
        await RNFS.mkdir(appDirectory);
      }

      const selectedSongs = songs.filter(song => song.selected);
      if (selectedSongs.length === 0) {
        Alert.alert('📂 No Songs Selected', 'Please select at least one song.');
        return;
      }

      const metadataJson = await RNFS.readFile(metadataFile, 'utf8');
      const existingTracks = JSON.parse(metadataJson);
      const savedTracks = [...existingTracks];

      for (const song of selectedSongs) {
        const fileName = song.url.split('/').pop();
        const destPath = `${appDirectory}/${fileName}`;
        await RNFS.copyFile(song.url, destPath);
        savedTracks.push({
          id: savedTracks.length + 3,
          title: song.title,
          artist: song.artist,
          album: song.album,
          duration: song.duration,
          artwork: song.artwork.uri || null,
          url: `file://${destPath}`,
        });
      }

      await RNFS.writeFile(metadataFile, JSON.stringify(savedTracks), 'utf8');
      Alert.alert('✅ Success', 'Selected songs saved locally!');
      setSongs(prevSongs => prevSongs.map(song => ({ ...song, selected: false })));
    } catch (error) {
      console.error('❌ Error saving songs:', error);
      Alert.alert('⚠️ Error', 'Failed to save selected songs.');
    }
  };

  return (
    <View className="flex-1 bg-[#121212] p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-2xl font-bold">Upload Songs</Text>
        <Icon name="music" size={28} color="#1DB954" />
      </View>

      {/* Song List */}
      <FlatList
        data={songs}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`flex-row items-center p-3 rounded-lg my-1 ${
              item.selected ? 'bg-[#1DB95430]' : 'bg-zinc-800'
            }`}
            onPress={() => toggleSelection(item.id)}>
            <Image source={item.artwork} className="w-12 h-12 rounded-md mr-3" />
            <View className="flex-1">
              <Text className="text-white text-lg font-semibold">
                {item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}
              </Text>
              <Text className="text-gray-400 text-sm">
                {item.artist.length > 25 ? item.artist.substring(0, 25) + '...' : item.artist}
              </Text>
            </View>
            {item.selected && (
              <Icon name="check-circle" size={24} color="#1DB954" />
            )}
          </TouchableOpacity>
        )}
      />

      {/* Floating Buttons */}
      <View className="absolute bottom-6 right-6 flex gap-3">
        <TouchableOpacity
          className="bg-[#1DB954] p-4 rounded-full shadow-md items-center"
          onPress={fetchMusicFiles}>
          <Icon name="folder-music" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#FF4C4C] p-4 rounded-full shadow-md items-center"
          onPress={saveSelectedSongs}>
          <Icon name="content-save" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadScreen;
