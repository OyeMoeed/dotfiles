import { render } from '@testing-library/react-native';
import IPayWebView from './ipay-web-view.component';

describe('IPayWebView', () => {
  test('renders WebView with the correct props', () => {
    const testID = 'webview-test';
    const source = { uri: 'https://example.com' };
    const style = { height: 400, width: '100%' };

    const { getByTestId } = render(<IPayWebView testID={testID} source={source} style={style} />);

    const webView = getByTestId(testID);

    // Assert that the WebView is rendered with the correct testID
    expect(webView).toBeDefined();

    // Assert that the WebView has the correct source prop
    expect(webView.props.source).toEqual(source);

    // Assert that the WebView has the correct style prop
    expect(webView.props.style).toContainEqual(style);
  });
});
