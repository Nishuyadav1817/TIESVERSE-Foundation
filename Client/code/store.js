

import { configureStore } from '@reduxjs/toolkit';
import authReducer, { recommendationSlice } from './authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    recommendation: recommendationSlice.reducer, 
  },
})