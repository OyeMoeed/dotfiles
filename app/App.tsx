/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { ToastProvider } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import MainNavigation from '@app/navigation/app-navigator.navigation';
import { persistor, store } from '@store/store';
import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
            <MainNavigation />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
