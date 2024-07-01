import useLocalization from '@app/localization/hooks/localization.hook';
import { topupStatus } from '@app/utilities/enums.util';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import IPayTopupRedemptionSuccess from './ipay-topup-redemption-successful.component';

jest.mock('@app/localization/hooks/localization.hook');
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary50: '#fff',
        primary450: '#000',
        primary500: '#000',
      },
      secondary: {
        secondary50: '#fff',
      },
      tertiary: {
        tertiary500: '#000',
      },
      natural: {
        natural0: '#fff',
      },
    },
  }),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: jest.fn(),
    navigate: jest.fn(),
  }),
}));

const mockLocalizationText = {
  topup_failed: 'Top-up Failed',
  reviewCard: 'Please review your card details and try again.',
  topup_redemption_sucess: 'Top-up Successful',
  SAR: 'SAR',
  topup_type: 'Top-up Type',
  ref_number: 'Reference Number',
  topup_date: 'Top-up Date',
  points_redeemed: 'Points Redeemed',
  newTopUp: 'New Top-up',
  share: 'Share',
  home: 'Home',
  startOver: 'Start Over',
};

useLocalization.mockReturnValue(mockLocalizationText);

describe('IPayTopupRedemptionSuccess', () => {
  it('renders correctly with SUCCESS variant', () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <IPayTopupRedemptionSuccess variants={topupStatus.SUCCESS} />
      </NavigationContainer>,
    );

    expect(getByText(mockLocalizationText.topup_redemption_sucess)).toBeTruthy();
    expect(getByText(`1000 ${mockLocalizationText.SAR}`)).toBeTruthy();
    expect(getByText(mockLocalizationText.newTopUp)).toBeTruthy();
    expect(getByText(mockLocalizationText.share)).toBeTruthy();
    expect(getByText(mockLocalizationText.home)).toBeTruthy();
    expect(getByTestId('success-animation')).toBeTruthy();
  });

  it('renders correctly with FAILED variant', () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <IPayTopupRedemptionSuccess variants={topupStatus.FAILED} />
      </NavigationContainer>,
    );

    expect(getByText(mockLocalizationText.topup_failed)).toBeTruthy();
    expect(getByText(mockLocalizationText.reviewCard)).toBeTruthy();
    expect(getByText(mockLocalizationText.startOver)).toBeTruthy();
    expect(getByText(mockLocalizationText.home)).toBeTruthy();
    expect(getByTestId('failed-icon')).toBeTruthy();
  });

  it('calls navigation functions on button press for SUCCESS variant', () => {
    const navigation = require('@react-navigation/native').useNavigation();
    const { getByText } = render(
      <NavigationContainer>
        <IPayTopupRedemptionSuccess variants={topupStatus.SUCCESS} />
      </NavigationContainer>,
    );

    fireEvent.press(getByText(mockLocalizationText.newTopUp));
    expect(navigation.goBack).toHaveBeenCalled();

    fireEvent.press(getByText(mockLocalizationText.home));
    expect(navigation.navigate).toHaveBeenCalledWith('HOME');
  });

  it('calls navigation functions on button press for FAILED variant', () => {
    const navigation = require('@react-navigation/native').useNavigation();
    const { getByText } = render(
      <NavigationContainer>
        <IPayTopupRedemptionSuccess variants={topupStatus.FAILED} />
      </NavigationContainer>,
    );

    fireEvent.press(getByText(mockLocalizationText.startOver));
    expect(navigation.navigate).toHaveBeenCalledWith('HOME');

    fireEvent.press(getByText(mockLocalizationText.home));
    expect(navigation.navigate).toHaveBeenCalledWith('HOME');
  });

  it('displays the formatted date correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <IPayTopupRedemptionSuccess variants={topupStatus.SUCCESS} />
      </NavigationContainer>,
    );

    const date = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: false,
    };
    const formatedDate = date.toLocaleString('en-GB', options).replace(',', ' -');
    expect(getByText(formatedDate)).toBeTruthy();
  });
});
