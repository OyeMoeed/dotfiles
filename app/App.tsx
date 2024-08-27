/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SpinnerProvider } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { ToastProvider } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import MainNavigation from '@app/navigation/app-navigator.navigation';
import { isIosOS } from '@app/utilities/constants';
import { persistor, store } from '@store/store';
import { KeyboardAvoidingView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import appStyles from './app.styles';

const App = (): JSX.Element => {
  const style = appStyles();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <KeyboardAvoidingView behavior={isIosOS ? 'padding' : 'height'} style={style.kavStyle}>
          <GestureHandlerRootView style={style.rootView}>
            <Host>
              <SpinnerProvider>
                <ToastProvider>
                  <MainNavigation />
                </ToastProvider>
              </SpinnerProvider>
            </Host>
          </GestureHandlerRootView>
        </KeyboardAvoidingView>
      </PersistGate>
    </Provider>
  );
};

export default App;
