import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { ModalPortal } from 'react-native-modals';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import StackNavigator from './StackNavigator';
import { requestPermissions } from './permissions';
import { setupPlayer } from './config/trackPlayerSetup';
import { setPlayerInitialized } from './store';

// ✅ New component that uses Redux
function AppContent() {
  const dispatch = useDispatch();
  const isPlayerInitialized = useSelector(state => state.trackPlayer.isPlayerInitialized);
  console.log(isPlayerInitialized)

  useEffect(() => {
    const initializePlayer = async () => {
      if (!isPlayerInitialized) {
        console.log('🔄 Initializing TrackPlayer...');
        const success = await setupPlayer();
        if (success) {
          dispatch(setPlayerInitialized()); // ✅ Update Redux state
        }
      } else {
        console.log('⚠️ TrackPlayer is already initialized. Skipping setup.');
      }
    };

    initializePlayer();
    requestPermissions();
  }, [isPlayerInitialized, dispatch]);

  return (
    <>
      <StackNavigator />
      <ModalPortal />
    </>
  );
}

// ✅ Wrap the entire app with Redux Provider
export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
