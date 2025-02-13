import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';

const PlayerControls = ({ isPlaying, onPlayPause }) => {
    return (
        <View className="flex-row items-center mt-6">
            <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
                <Icon name="play-skip-back" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPlayPause} className="mx-6">
                <Icon name={isPlaying ? "pause-circle" : "play-circle"} size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
                <Icon name="play-skip-forward" size={40} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default PlayerControls;
