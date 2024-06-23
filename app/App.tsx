/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import MainNavigation from '@app/navigation/app-navigator.navigation';

import { persistor, store } from '@store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const App = (): JSX.Element => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MainNavigation />
    </PersistGate>
  </Provider>
);

export default App;
