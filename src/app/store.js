import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { youtrackApi } from '../store/youtrackApi';

export const store = configureStore({
    reducer: {
        // issues: issuesSlice,
        [youtrackApi.reducerPath]: youtrackApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(youtrackApi.middleware),
})

setupListeners(store.dispatch)
