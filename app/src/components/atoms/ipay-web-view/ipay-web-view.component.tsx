import React from 'react';
import { WebView } from 'react-native-webview';
import { IPayWebViewProps } from './ipay-web-view.interface';
import webViewStyles from './ipay-web-view.styles';

const IPayWebView: React.FC<IPayWebViewProps> = ({ testID, source, style, startInLoadingState = true, onNavigationStateChange, ...props }) => {
  const styles = webViewStyles();
  return (
    <WebView
      testID={testID}
      source={source}
      style={[styles.container, style]}
      startInLoadingState={startInLoadingState}
      onNavigationStateChange={onNavigationStateChange}
      {...props}
    />
  );
};

export default IPayWebView;
