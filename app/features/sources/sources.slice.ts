import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Sources } from './sources.type';
import { getSources } from './api';

const initialState: Sources = {
  pending: true,
  sources: [],
  selectedSource: {},
};

const getSourcesApi = createAsyncThunk(
  'sources/getSources',
  async (_, { rejectWithValue }: any) => {
    try {
      const result = await getSources();
      return result?.data;
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  },
);

const sourcesSlice = createSlice({
  name: 'sources',
  initialState: initialState,

  reducers: {
    setSources: (state, action) => {
      return { ...state, ...action.payload };
    },
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(getSourcesApi.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getSourcesApi.fulfilled, (state, { payload }: any) => {
      state.pending = false;
      state.sources = payload;
    });
    builder.addCase(getSourcesApi.rejected, (state) => {
      state.pending = false;
    });
  },
});

export const sourcesReducer = sourcesSlice.reducer;

export const sourcesActions = { ...sourcesSlice.actions, getSourcesApi };
