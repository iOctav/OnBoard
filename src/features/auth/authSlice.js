import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null, token: null, expires_at: null };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token, expires_at } }) => {
      state.user = user;
      state.token = token;
      state.expires_at = expires_at;
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state) => state.auth.user