import { render } from '@testing-library/react-native';
import React from 'react';
import { ImageSourcePropType } from 'react-native';
import IPayText from '../ipay-text/ipay-base-text/ipay-text.component';
import IPayImageBackground from './ipay-image-background.component';

describe('IPayImageBackground', () => {
  it('renders correctly with a local image', () => {
    const testID = 'test-id';
    const localImage: ImageSourcePropType = require('@assets/images/short_hand_debit_card.png');
    const { getByTestId } = render(
      <IPayImageBackground testID={testID} image={localImage}>
        <React.Fragment />
      </IPayImageBackground>,
    );

    const imageBackground = getByTestId(`${testID}-image-background`);
    expect(imageBackground).toBeTruthy();
    expect(imageBackground.props.source).toEqual(localImage);
  });

  it('renders correctly with a remote image URL', () => {
    const testID = 'test-id';
    const remoteImage = 'https://example.com/image.png';
    const { getByTestId } = render(
      <IPayImageBackground testID={testID} image={remoteImage}>
        <React.Fragment />
      </IPayImageBackground>,
    );

    const imageBackground = getByTestId(`${testID}-image-background`);
    expect(imageBackground).toBeTruthy();
    expect(imageBackground.props.source).toEqual({ uri: remoteImage });
  });

  it('applies custom styles', () => {
    const testID = 'test-id';
    const style = { width: 100, height: 100 };
    const localImage: ImageSourcePropType = require('@assets/images/short_hand_debit_card.png');
    const { getByTestId } = render(
      <IPayImageBackground testID={testID} image={localImage} style={style}>
        <React.Fragment />
      </IPayImageBackground>,
    );

    const imageBackground = getByTestId(`${testID}-image-background`);
    expect(imageBackground).toBeTruthy();
    expect(imageBackground.props.style).toContainEqual(style);
  });

  it('renders children correctly', () => {
    const testID = 'test-id';
    const localImage: ImageSourcePropType = require('@assets/images/short_hand_debit_card.png');
    const { getByTestId, getByText } = render(
      <IPayImageBackground testID={testID} image={localImage}>
        <React.Fragment>
          <IPayText>Child Content</IPayText>
        </React.Fragment>
      </IPayImageBackground>,
    );

    const imageBackground = getByTestId(`${testID}-image-background`);
    const childContent = getByText('Child Content');
    expect(imageBackground).toBeTruthy();
    expect(childContent).toBeTruthy();
  });
});
