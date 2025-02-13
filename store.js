// import { configureStore, createSlice } from '@reduxjs/toolkit';

// const trackPlayerSlice = createSlice({
//   name: 'trackPlayer',
//   initialState: { isPlayerInitialized: false },
//   reducers: {
//     setPlayerInitialized: (state) => {
//       state.isPlayerInitialized = true;
//     },
//   },
// });

// export const { setPlayerInitialized } = trackPlayerSlice.actions;

// const store = configureStore({
//   reducer: {
//     trackPlayer: trackPlayerSlice.reducer,
//   },
// });

// export default store;


import { configureStore, createSlice } from '@reduxjs/toolkit';

const trackPlayerSlice = createSlice({
  name: 'trackPlayer',
  initialState: { 
    isPlayerInitialized: false,
    currentTrack: null,
    queue: [],
    playbackState: 'paused'
  },
  reducers: {
    setPlayerInitialized: (state) => {
      state.isPlayerInitialized = true;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    setPlaybackState: (state, action) => {
      state.playbackState = action.payload;
    }
  },
});

export const { setPlayerInitialized, setCurrentTrack, setQueue, setPlaybackState } = trackPlayerSlice.actions;

const store = configureStore({
  reducer: {
    trackPlayer: trackPlayerSlice.reducer,
  },
});

export default store;
