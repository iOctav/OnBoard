import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { youtrackApi } from './services/youtrackApi';
import authReducer from '../features/auth/authSlice';
import customFieldsReducer from '../features/customFields/customFieldsSlice';
import columnsReducer from '../features/sprint/sprintSlice';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        customFields: customFieldsReducer,
        columns: columnsReducer,
        [youtrackApi.reducerPath]: youtrackApi.reducer,
        router: routerReducer,

    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(youtrackApi.middleware).concat(routerMiddleware),

})

setupListeners(store.dispatch)

export const history = createReduxHistory(store);
