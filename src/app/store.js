import { configureStore } from '@reduxjs/toolkit';
import issuesSlice from '../features/issues/issuesSlice';

export default configureStore({
    reducer: {
        issues: issuesSlice,
    },
})