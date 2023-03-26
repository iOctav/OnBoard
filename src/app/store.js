import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { youtrackApi } from './services/youtrackApi';
import authReducer from '../features/auth/authSlice';
import nestedSwimlanesReducer from '../features/nestedSwimlanes/nestedSwimlanesSlice';
import customFieldsReducer from '../features/customFields/customFieldsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        nestedSwimlanes: nestedSwimlanesReducer,
        customFields: customFieldsReducer,
        [youtrackApi.reducerPath]: youtrackApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(youtrackApi.middleware),
})

setupListeners(store.dispatch)
