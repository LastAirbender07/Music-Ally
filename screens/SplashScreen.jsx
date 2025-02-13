import React, {useEffect, useState} from 'react';
import {View, Alert, BackHandler, Image, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-[#121212]">
      <Image
        source={require('../assets/logo.webp')}
        style={{width: 150, height: 170}}
      />
      <ActivityIndicator size="large" color="#0000ff" className="mt-4" />
    </View>
  );
};

export default SplashScreen;
