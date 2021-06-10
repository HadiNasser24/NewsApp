import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getNewsInfo } from './api';
import { Landing } from './landing.type';

const initialState: Landing = {
  news: [],
  pending: false,
  selectedArticle: {},
  tabBarVisible: true,
  viewedHistory: [],
};

const getNewsInfoApi = createAsyncThunk(
  'landing/getNewsInfo',
  async (category: string, { rejectWithValue }: any) => {
    try {
      const result = await getNewsInfo(category);
      return result?.data;
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  },
);

const landingSlice = createSlice({
  name: 'landing',
  initialState: initialState,

  reducers: {
    setLanding: (state, action) => {
      if (action?.payload?.viewedHistory) {
        const payload = action?.payload?.viewedHistory;
        const index = state.viewedHistory.findIndex(
          (obj) =>
            obj.title === payload[payload.length - 1]?.title &&
            obj.description === payload[payload.length - 1]?.description,
        );

        if (index === -1) {
          return { ...state, ...action.payload };
        }
        state.viewedHistory[index].timestamp =
          payload[payload.length - 1].timestamp;
        return;
      }
      return { ...state, ...action.payload };
    },
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNewsInfoApi.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.news = payload;
      })
      .addCase(getNewsInfoApi.rejected, (state) => {
        state.pending = false;
      })
      .addCase(getNewsInfoApi.pending, (state) => {
        state.pending = true;
      });
  },
});

export const landingReducer = landingSlice.reducer;

export const landingActions = {
  ...landingSlice.actions,
  getNewsInfoApi,
};
