import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Headlines } from './headlines.type';
import { getSourceHeadlines } from './api';

const initialState: Headlines = {
  headlines: [],
  pending: false,
};

const getSourceHeadlinesApi = createAsyncThunk(
  'headlines/getSourceHeadlines',
  async (source: string, { rejectWithValue }: any) => {
    try {
      const result = await getSourceHeadlines(source);
      return result?.data;
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  },
);

const headlinesSlice = createSlice({
  name: 'headlines',
  initialState: initialState,
  reducers: {
    setHeadlines: (state, action) => {
      return { ...state, ...action.payload };
    },
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(getSourceHeadlinesApi.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getSourceHeadlinesApi.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.headlines = payload;
    });
    builder.addCase(getSourceHeadlinesApi.rejected, (state) => {
      state.pending = false;
    });
  },
});

export const headlinesReducer = headlinesSlice.reducer;

export const headlinesActions = {
  ...headlinesSlice.actions,
  getSourceHeadlinesApi,
};
