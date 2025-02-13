import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import PlayerScreen from './screens/PlayerScreen';
import UploadScreen from './screens/UploadScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: '#1a1a1a'}, // Dark background color for tabs
          tabBarActiveTintColor: '#4a90e2', // Light blue for active tab (or any color that contrasts well)
          tabBarInactiveTintColor: '#b0b0b0', // Gray for inactive tab
          tabBarLabelStyle: {fontSize: 12}, // Customize label style
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon2 name="home-sharp" size={30} color="#4a90e2" />
              ) : (
                <Icon2 name="home-outline" size={30} color="#b0b0b0" />
              ),
          }}
        />
        <Tab.Screen
          name="Upload"
          component={UploadScreen}
          options={{
            tabBarLabel: 'Upload',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon1 name="upload" size={30} color="#4a90e2" />
              ) : (
                <Icon1 name="upload" size={30} color="#b0b0b0" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Profile',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon1 name="account" size={30} color="#4a90e2" />
              ) : (
                <Icon1 name="account-outline" size={30} color="#b0b0b0" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
