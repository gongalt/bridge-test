import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserDataFromApi } from '../api/api';

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (page, thunkAPI) => {
      const response = await fetchUserDataFromApi(page + 1, 10);
      return response;
    }
  );

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    page: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage: setUserPage } = userSlice.actions;

export default userSlice.reducer;
