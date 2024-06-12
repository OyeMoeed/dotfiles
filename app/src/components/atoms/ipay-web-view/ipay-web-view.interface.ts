import { WebViewProps } from './../../../../../node_modules/react-native-webview/index.d';

/**
 * Defines the props interface for the IPayWebView component.
 * These props are used to customize the behavior and appearance of the webview.
 */
export interface IPayWebViewProps extends WebViewProps {
  testID?: string;
}
