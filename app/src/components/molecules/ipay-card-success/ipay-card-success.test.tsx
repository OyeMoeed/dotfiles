import { successIconAnimation } from '@app/assets/lottie';
import useLocalization from '@app/localization/hooks/localization.hook';
import { render } from '@testing-library/react-native';
import { default as IPayCardSuccess } from './ipay-card-success.component';

jest.mock('@app/navigation/navigation-service.navigation', () => ({
  __esModule: true,
  navigate: jest.fn(),
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      tertiary: {
        tertiary500: '#FFFFFF',
        tertiary100: '#D3D3D3',
      },
      natural: {
        natural0: '#F5F5F5',
        natural500: '#4CAF50',
      },
      appGradient: {
        gradientSecondary40: '#234444',
      },
      primary: {
        primary450: '#09098',
      },
      secondary: {
        secondary50: '#78989',
      },
    },
  }),
}));

describe('IPayCardSuccess', () => {
  const localizationText = {
    CARDS: {
      GO_TO_CARD: 'Go to Card',
    },
    COMMON: {
      TOP_UP: 'Top Up',
      IPaySafeAreaView: 'Safe Area',
    },
  };
  beforeEach(() => {
    (useLocalization as jest.Mock).mockReturnValue(localizationText);
  });
  it('renders correctly', () => {
    const { getByTestId } = render(
      <IPayCardSuccess
        testID="ipay-success"
        title="Success Titles"
        subTitle="Success Subtitle"
        animation={successIconAnimation}
      />,
    );
    expect(getByTestId('ipay-success-success-component-safe-area-view-linear-gradient')).toBeTruthy();
  });

  it('renders title and subtitle correctly', () => {
    const { getByTestId } = render(
      <IPayCardSuccess
        testID="ipay-success"
        title="Success Wallet"
        subTitle="Success Wallet Subtitle"
        animation={successIconAnimation}
      />,
    );
    expect(getByTestId('ipay-success-success-component-safe-area-view-linear-gradient')).toBeTruthy();
  });

  it('renders IPayAppleWalletButton when isAddAppleWallet is true', () => {
    const { getByTestId } = render(
      <IPayCardSuccesss
        testID="ipay-success"
        title="Success Title"
        subTitle="Success Subtitle"
        animation={successIconAnimation}
        isAddAppleWallet
      />,
    );
    expect(getByTestId('ipay-success-success-component-safe-area-view-linear-gradient')).toBeTruthy();
  });

  it('renders IPayPrintCard when showPrintCard is true', () => {
    const { getByTestId } = render(
      <IPayCardSuccess
        testID="ipay-success"
        title="Success Title"
        subTitle="Success Subtitle"
        animation={successIconAnimation}
        showPrintCard
      />,
    );
    expect(getByTestId('ipay-success-success-component-safe-area-view-linear-gradient')).toBeTruthy();
  });
});
