import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Reducer } from 'redux';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import { WHITELISTED_DATA } from './constants.store';
import appDataSlice from './slices/app-data-slice';
import authReducer from './slices/auth-slice';
import languageSlice from './slices/language-slice';
import localizationSlice from './slices/localization-slice';
import rearrangementReducer from './slices/rearrangement-slice';
import themeSlice from './slices/theme-slice';
import userInformationSlice from './slices/user-information-slice';
import walletInfoSlice from './slices/wallet-info-slice';

/**
 * Object containing all the reducers used in the application.
 */
const reducers = {
  localizationReducer: localizationSlice,
  themeReducer: themeSlice,
  appDataReducer: appDataSlice,
  userInfoReducer: userInformationSlice,
  languageReducer: languageSlice,
  rearrangement: rearrangementReducer,
  auth: authReducer,
  walletInfoReducer: walletInfoSlice
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
  whitelist: WHITELISTED_DATA
};

/**
 * Persisted reducer created using persistReducer from redux-persist.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

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
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat()
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
