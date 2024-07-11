import { render } from '@testing-library/react-native';
import IPayNearestAtmComponent from './ipay-nearest-atm.component';

describe('IPayNearestAtmComponent', () => {
  const mockTheme = {
    colors: {
      appGradient: {
        gradientSecondary40: ['#FFFFFF', '#EEEEEE'], // Ensure this matches your component's usage
      },
      primary: {
        primary900: '#000000',
        primary500: '#333333',
      },
      natural: {
        natural900: '#666666',
        natural500: '#999999',
      },
    },
  };

  it('renders IPayNearestAtmComponent correctly', () => {
    const { getByTestId } = render(<IPayNearestAtmComponent testID="nearest-atm" style={{}} />, {
      theme: mockTheme,
    });

    const nearestAtmComponent = getByTestId('nearest-atm-nearest-atm');
    expect(nearestAtmComponent).toBeDefined();
  });
});
