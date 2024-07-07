import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import { WHITELISTED_DATA } from './constants.store';
import appDataReducer from './slices/app-data-slice';
import authReducer from './slices/auth-slice';
import languageReducer from './slices/language-slice';
import localizationReducer from './slices/localization-slice';
import rearrangementReducer from './slices/rearrangement-slice';
import themeReducer from './slices/theme-slice';
import userInformationReducer from './slices/user-information-slice';
import walletInfoReducer from './slices/wallet-info-slice';

/**
 * Object containing all the reducers used in the application.
 */
const reducers = {
  localizationReducer,
  themeReducer,
  appDataReducer,
  userInfoReducer: userInformationReducer,
  languageReducer,
  rearrangement: rearrangementReducer,
  auth: authReducer,
  walletInfoReducer,
};

/**
 * Combined reducer created using combineReducers from redux.
 */
const combinedReducer = combineReducers<typeof reducers>(reducers);

/**
 * Root reducer function that handles the global state reset action.
 */
export const rootReducer: Reducer<RootState> = (state, action) => combinedReducer(state, action);

/**
 * Configuration for persisting the Redux store.
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: WHITELISTED_DATA,
};

/**
 * Persisted reducer created using persistReducer from redux-persist.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * configure flipper redux debugger
 */
const reduxDebugger: any = [];
/* global __DEV__ */
if (__DEV__) {
  // eslint-disable-next-line  global-require
  const createDebugger = require('redux-flipper').default;
  reduxDebugger.push(createDebugger());
}

/**
 * Redux store instance configured using configureStore from redux-toolkit.
 */
export const store = configureStore({
  reducer: persistedReducer,

  /**
   * Middleware setup for the Redux store.
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(reduxDebugger),
});

/**
 * Setup listeners for Redux toolkit query.
 */
setupListeners(store.dispatch);

/**
 * Persistor instance for persisting the Redux store.
 */
export const persistor = persistStore(store);

/**
 * Type representing the dispatch function of the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Type representing the root state of the Redux store.
 */
export type RootState = ReturnType<typeof combinedReducer>;

/**
 * Hook for accessing the typed dispatch function of the Redux store.
 */
export const useTypedDispatch = () => useDispatch<AppDispatch>();

/**
 * Hook for accessing the typed selector function of the Redux store.
 */
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
