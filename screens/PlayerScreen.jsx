import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TrackPlayer, { useProgress, State, usePlaybackState } from 'react-native-track-player';
import { setCurrentTrack, setPlaybackState } from '../store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

const PlayerScreen = () => {
    const dispatch = useDispatch();
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const currentTrack = useSelector(state => state.trackPlayer.currentTrack);
    const queue = useSelector(state => state.trackPlayer.queue);

    useEffect(() => {
        dispatch(setPlaybackState(playbackState));
    }, [playbackState, dispatch]);


    const handlePlayPause = async () => {
        console.log("🎵 Toggling: ", playbackState);
        try {
            if (playbackState.state === "playing") {
                await TrackPlayer.pause();
                dispatch(setPlaybackState((State.Paused)));
            } else {
                await TrackPlayer.play();
                dispatch(setPlaybackState(State.Playing));
            }
        } catch (error) {
            console.error("🚨 Error toggling play/pause:", error);
        }
    };

    const handleNextTrack = async () => {
        try {
            let currentIndex = await TrackPlayer.getCurrentTrack();
            if (currentIndex !== null && currentIndex < queue.length - 1) {
                await TrackPlayer.skipToNext();
                const newTrack = await TrackPlayer.getTrack(currentIndex + 1);
                dispatch(setCurrentTrack(newTrack));
            }
        } catch (error) {
            console.error("🚨 Error skipping to next:", error);
        }
    };

    const handlePrevTrack = async () => {
        try {
            let currentIndex = await TrackPlayer.getCurrentTrack();
            let currentPosition = await TrackPlayer.getPosition();

            if (currentPosition > 3) {
                await TrackPlayer.seekTo(0);
            } else if (currentIndex !== null && currentIndex > 0) {
                await TrackPlayer.skipToPrevious();
                const newTrack = await TrackPlayer.getTrack(currentIndex - 1);
                dispatch(setCurrentTrack(newTrack));
            }
        } catch (error) {
            console.error("🚨 Error skipping to previous:", error);
        }
    };

    const handleSeek = async (value) => {
        try {
            await TrackPlayer.seekTo(value);
        } catch (error) {
            console.error("🚨 Error seeking:", error);
        }
    };

    const getArtworkSource = () => {
        if (typeof currentTrack?.artwork === 'number') {
            return currentTrack.artwork; // ✅ Handles `require()` images correctly
        }
        
        if (currentTrack?.artwork?.uri) {
            return { uri: currentTrack.artwork.uri }; // ✅ Remote URL or local file path
        }
    
        return require('../assets/songs/defaultImg.jpg'); // ✅ Fallback image
    };
    
    

    if (!currentTrack) {
        return (
            <View className="flex-1 items-center justify-center bg-black">
                <Text className="text-white text-lg">No track selected</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#121212] px-6 py-8">
            {/* Song Artwork */}
            <View className="items-center">
                <Image source={getArtworkSource()} className="w-72 h-72 rounded-xl" />
            </View>

            {/* Song Details */}
            <View className="mt-6 items-center">
                <Text className="text-3xl font-bold text-white">{currentTrack?.title}</Text>
                <Text className="text-lg text-gray-400 mt-1">{currentTrack?.artist}</Text>
            </View>

            {/* Controls */}
            <View className="mt-10 flex-row justify-center items-center space-x-8">
                <TouchableOpacity onPress={handlePrevTrack} disabled={queue.length === 0}>
                    <Icon name="skip-previous" size={45} color={queue.length === 0 ? "#555" : "#FFFFFF"} />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={handlePlayPause} 
                    className="bg-[#1DB954] p-4 rounded-full shadow-lg"
                >
                    <Icon name={playbackState.state === "playing" ? "pause" : "play"} size={35} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNextTrack} disabled={queue.length === 0}>
                    <Icon name="skip-next" size={45} color={queue.length === 0 ? "#555" : "#FFFFFF"} />
                </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View className="w-full mt-8">
                <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    value={progress.position}
                    onSlidingComplete={handleSeek}
                    minimumTrackTintColor="#1DB954"
                    maximumTrackTintColor="#FFFFFF"
                    thumbTintColor="#1DB954"
                />
                <View className="flex-row justify-between mt-2">
                    <Text className="text-gray-400">{formatTime(progress.position)}</Text>
                    <Text className="text-gray-400">{formatTime(progress.duration)}</Text>
                </View>
            </View>
        </View>
    );
};

// Helper function to format time in mm:ss format
const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default PlayerScreen;
