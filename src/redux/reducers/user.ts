import { FetchState } from '@/enums/Fetch';
import { fetchSignIn } from '@/networks/user';
import type { AppState } from '@/redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { SignInParams, SignInResponse } from '@/types/user';
import type { APIResponse } from '@/types/response';

export interface UserState {
  status: FetchState;
}

const initialState: UserState = {
  status: FetchState.IDLE,
};

export const signIn = createAsyncThunk('user/sign-in', async (data: SignInParams, { rejectWithValue }) => {
  try {
    const response: SignInResponse = await fetchSignIn({ data });
    return response;
  } catch (error: any) {
    if (!error.response) throw error;
    return rejectWithValue(error.response);
  }
});

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.status = FetchState.IDLE;
      })
      .addCase(signIn.rejected, (state) => {
        state.status = FetchState.FAILED;
      });
  },
});

export const selectUser = (state: AppState) => state.user;

export default UserSlice.reducer;
