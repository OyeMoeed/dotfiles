// IPayWebView.stories.tsx

import { store } from '@app/store/store';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import IPayView from '../ipay-view/ipay-view.component';
import IPayWebView from './ipay-web-view.component';
import { IPayWebViewProps } from './ipay-web-view.interface';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webViewStyle: {
    height: 400,
    width: '100%',
  },
});

const WebViewStory = (args: IPayWebViewProps) => (
  <Provider store={store}>
    <IPayView style={styles.container}>
      <IPayWebView {...args} />
    </IPayView>
  </Provider>
);

storiesOf('components/web/IPayWebView', module)
  .add('Default', () => (
    <WebViewStory testID="webview-default" source={{ uri: 'https://example.com' }} style={styles.webViewStyle} />
  ))
  .add('Custom Source', () => (
    <WebViewStory testID="webview-custom" source={{ uri: 'https://reactnative.dev' }} style={styles.webViewStyle} />
  ));
