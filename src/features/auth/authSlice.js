import { createSlice } from '@reduxjs/toolkit';
import { youtrackApi } from '../../app/services/youtrackApi';
import { getLocalTokenInfo, isTokenExpired } from './oauthUtils';
import i18n from 'i18next';
import { setUserLocaleLang } from './localeUtils';

export const extendedYoutrackApi = youtrackApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUserInfo: builder.query({
      query: () => ({
        url: `users/me`,
        params: {
          fields: 'id,login,name,email,savedQueries(name,id),tags(name,id),profiles(general(locale(id,locale,language)))',
        },
      }),
      transformResponse: (response) => {
        const userLocaleLang = response?.profiles?.general?.locale?.language;
        i18n.changeLanguage(userLocaleLang ?? 'en');
        setUserLocaleLang(userLocaleLang);
        return response;
      },
    }),
  })
})

export const { useLazyGetCurrentUserInfoQuery, useGetCurrentUserInfoQuery } = extendedYoutrackApi

const tokenInfo = getLocalTokenInfo();
const initialState = { isGuest: false, authorized: !isTokenExpired(tokenInfo), expires_at: tokenInfo.expires_at };

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
});

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectAuthInfo = (state) => state.auth