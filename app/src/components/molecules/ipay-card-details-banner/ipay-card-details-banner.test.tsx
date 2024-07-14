import React from 'react';
import { render } from '@testing-library/react-native';
import IPayCardDetailsBannerComponent from './ipay-card-details-banner.component';
import { cardTypes } from '@app/utilities/enums.util';

const mockProps = {
  cardType: cardTypes.signature,
  cardTypeName: 'Signature Card',
  carHolderName: 'John Doe',
  containerStyle: {},
  cardLastFourDigit: '1234',
};

describe('IPayCardDetailsBannerComponent', () => {
  it('renders correctly with signature card type', () => {
    const { getByText, getByTestId } = render(<IPayCardDetailsBannerComponent {...mockProps} />);

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('**** 1234')).toBeTruthy();
    expect(getByText('Signature Card')).toBeTruthy();
  });

  it('renders correctly with mada card type', () => {
    const madaProps = { ...mockProps, cardType: cardTypes.mada, cardTypeName: 'Mada Card' };
    const { getByText } = render(<IPayCardDetailsBannerComponent {...madaProps} />);

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('**** 1234')).toBeTruthy();
    expect(getByText('Mada Card')).toBeTruthy();
  });

  it('renders the correct images based on card type', () => {
    const { getByTestId, rerender } = render(<IPayCardDetailsBannerComponent {...mockProps} />);

    const madaProps = { ...mockProps, cardType: cardTypes.mada };
    rerender(<IPayCardDetailsBannerComponent {...madaProps} />);
    expect(getByTestId('madaIcon-image')).toBeTruthy();
  });
});
