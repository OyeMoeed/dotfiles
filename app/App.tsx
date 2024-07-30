/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SpinnerProvider } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { ToastProvider } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import MainNavigation from '@app/navigation/app-navigator.navigation';

import { persistor, store } from '@store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const App = (): JSX.Element => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SpinnerProvider>
        <ToastProvider>
          <MainNavigation />
        </ToastProvider>
      </SpinnerProvider>
    </PersistGate>
  </Provider>
);

export default App;
