/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { JSX } from 'react';
import { QueryClientProvider } from 'react-query';
import { KeyboardAvoidingView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { queryClient } from '@app/network';
import { persistor, store } from '@store/store';
import { isIosOS } from '@app/utilities/constants';
import MainNavigation from '@app/navigation/app-navigator.navigation';
import { ToastProvider } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import IPayBottomSheetProvider from '@app/components/organism/ipay-bottomsheet-provider/ipay-bottomsheet-provider.component';
import usePushNotifications from '@app/hooks/use-push-notifications';

import appStyles from './app.styles';

const App = (): JSX.Element => {
  const style = appStyles();
  usePushNotifications();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <KeyboardAvoidingView behavior={isIosOS ? 'padding' : 'height'} style={style.kavStyle}>
            <GestureHandlerRootView style={style.rootView}>
              <Host>
                <ToastProvider>
                  <IPayBottomSheetProvider>
                    <MainNavigation />
                  </IPayBottomSheetProvider>
                </ToastProvider>
              </Host>
            </GestureHandlerRootView>
          </KeyboardAvoidingView>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
