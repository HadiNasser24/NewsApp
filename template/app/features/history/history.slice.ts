import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { History } from './history.type';

const initialState: History = {};

const historySlice = createSlice({
  name: 'history',
  initialState: initialState,
  reducers: {
    setHistory: (state, action) => {
      return { ...state, ...action.payload };
    },
    reset: () => initialState,
  },
});

export const historyReducer = historySlice.reducer;

export const historyActions = { ...historySlice.actions };
