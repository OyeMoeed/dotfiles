import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import { WHITELISTED_DATA } from './constants.store';

import alertReducer from './slices/alert-slice';
import appDataReducer from './slices/app-data-slice';
import authReducer from './slices/auth-slice';
import bottomSheetReducer from './slices/bottom-sheets-slice';
import cardsReducer from './slices/cards-slice';
import dropdownReducer from './slices/dropdown-slice';
import languageReducer from './slices/language-slice';
import permissionAlertReducer from './slices/permission-alert-slice';
import rearrangementReducer from './slices/rearrangement-slice';
import ResetStateSlice from './slices/reset-state-slice';
import spinnerReducer from './slices/spinner.slice';
import themeReducer from './slices/theme-slice';
import walletInfoReducer from './slices/wallet-info-slice';
import forceUpdateReducer from './slices/app-force-update-slice';
import ratingReducer from './slices/rating.slice';
import disabledModulesSlice from './slices/disabled-module-slice';
import forceMaintenanceSlice from './slices/app-maintenance-slice';
import idleTimerSlice from './slices/idle-timer-slice';

import reactotron from '../../../ReactotronConfig';

/**
 * Object containing all the reducers used in the application.
 */
const reducers = {
  themeReducer,
  appDataReducer,
  languageReducer,
  rearrangement: rearrangementReducer,
  auth: authReducer,
  walletInfoReducer,
  alertReducer,
  spinnerReducer,
  dropdownReducer,
  permissionAlertReducer,
  resetStateSlice: ResetStateSlice,
  bottomSheetReducer,
  cardsReducer,
  forceUpdateReducer,
  ratingReducer,
  disabledModulesReducer: disabledModulesSlice,
  forceMaintenanceSlice,
  idleTimerSlice,
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
 * Redux store instance configured using configureStore from redux-toolkit.
 */
export const store = configureStore({
  reducer: persistedReducer,
  enhancers: (getDefaultEnhancers) => {
    // eslint-disable-next-line no-undef
    const reactotronEnhancer = __DEV__ ? [reactotron.createEnhancer!()] : [];
    return getDefaultEnhancers().concat(reactotronEnhancer);
  },

  /**
   * Middleware setup for the Redux store.
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
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
