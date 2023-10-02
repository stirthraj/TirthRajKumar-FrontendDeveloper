import { configureStore } from '@reduxjs/toolkit';
import capsuleSlice from '../redux/capsule/capsuleSlice';

export const store = configureStore({
  reducer: {
    capsule: capsuleSlice
  }
});
