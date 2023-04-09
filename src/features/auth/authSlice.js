import { createSlice } from '@reduxjs/toolkit';
import { youtrackApi } from '../../app/services/youtrackApi';
import { getLocalTokenInfo } from './oauthUtils';

export const extendedYoutrackApi = youtrackApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUserInfo: builder.query({
      query: () => ({
        url: `users/me`,
        params: {
          fields: 'id,login,name,email,savedQueries(name,id),tags(name,id)',
        },
      })
    }),
  })
})

export const { useLazyGetCurrentUserInfoQuery, useGetCurrentUserInfoQuery } = extendedYoutrackApi

const tokenInfo = getLocalTokenInfo();
const initialState = { isGuest: false, authorized: tokenInfo.expires_at > Date.now(), expires_at: tokenInfo.expires_at };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { isGuest, authorized, expires_at } }) => {
      state.isGuest = isGuest;
      state.authorized = authorized;
      state.expires_at = expires_at;
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectAuthInfo = (state) => state.auth