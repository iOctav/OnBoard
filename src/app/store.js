import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { youtrackApi } from './services/youtrackApi';
import authReducer from '../features/auth/authSlice';
import nestedSwimlanesReducer from '../features/nestedSwimlanes/nestedSwimlanesSlice';

export const store = configureStore({
    reducer: {
        nestedSwimlanes: nestedSwimlanesReducer,
        [youtrackApi.reducerPath]: youtrackApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(youtrackApi.middleware),
})

setupListeners(store.dispatch)
