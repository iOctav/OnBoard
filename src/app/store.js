import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { youtrackApi } from './services/youtrackApi';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        // issues: issuesSlice,
        [youtrackApi.reducerPath]: youtrackApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(youtrackApi.middleware),
})

setupListeners(store.dispatch)
