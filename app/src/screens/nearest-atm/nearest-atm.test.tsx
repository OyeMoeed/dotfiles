import { IPayHeader } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayNearestAtmLocations, IPayNearestAtmTabComponent } from '@app/components/organism';
import { fireEvent, render } from '@testing-library/react-native';
import NearestAtmListComponent from './nearest-atm-list-component';
import NearestAtmScreen from './nearest-atm.screens';

// Mocking components imported within NearestAtmScreen
jest.mock('@app/components/atoms', () => ({
  IPayView: jest.fn(({ children }) => children),
}));

jest.mock('@app/components/molecules', () => ({
  IPayHeader: jest.fn(() => null), // Mocking IPayHeader
  IPayTabs: jest.fn(() => null), // Mocking IPayTabs
}));

jest.mock('@app/components/organism', () => ({
  IPayNearestAtmTabComponent: jest.fn(() => null), // Mocking IPayNearestAtmTabComponent
  IPayNearestAtmLocations: jest.fn(() => null), // Mocking IPayNearestAtmLocations
}));

jest.mock('./nearest-atm-list-component', () => jest.fn(() => null)); // Mocking NearestAtmListComponent

describe('<NearestAtmScreen />', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<NearestAtmScreen />);

    // Check if main components are rendered
    expect(getByTestId('ipay-safe-area-view')).toBeTruthy();
    expect(IPayHeader).toHaveBeenCalled();
    expect(IPayTabs).toHaveBeenCalled();
    expect(IPayNearestAtmTabComponent).toHaveBeenCalled();
    expect(NearestAtmListComponent).toHaveBeenCalled();
  });

  it('passes props correctly to IPayNearestAtmTabComponent', () => {
    render(<NearestAtmScreen />);

    // Check if IPayNearestAtmTabComponent receives correct props
    expect(IPayNearestAtmTabComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        headingText: expect.any(String),
        onPressDropdown: expect.any(Function),
        nearestAtmFilters: expect.any(Array),
      }),
    );
  });

  it('handles tab selection and renders correct child view', () => {
    const { getByText } = render(<NearestAtmScreen />);

    // Mocking onSelectTab function call
    fireEvent.press(getByText('List'));

    // Check if NearestAtmListComponent is rendered after tab selection
    expect(NearestAtmListComponent).toHaveBeenCalled();

    // Mocking onSelectTab function call
    fireEvent.press(getByText('Map'));

    // Check if IPayNearestAtmLocations is rendered after tab selection
    expect(IPayNearestAtmLocations).toHaveBeenCalled();
  });
});
