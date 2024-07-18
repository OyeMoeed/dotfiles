import { IPayHeader } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayNearestAtmFilterComponent, IPayNearestAtmLocations } from '@app/components/organism';
import { fireEvent, render } from '@testing-library/react-native';
import NearestAtmListComponent from './nearest-atm-list-component';
import NearestAtmScreen from './nearest-atm.screen';

// Mocking components imported within NearestAtmScreen
jest.mock('@app/components/atoms', () => ({
  IPayView: jest.fn(({ children }) => children),
}));

jest.mock('@app/components/molecules', () => ({
  IPayHeader: jest.fn(() => null), // Mocking IPayHeader
  IPayTabs: jest.fn(() => null), // Mocking IPayTabs
}));

jest.mock('@app/components/organism', () => ({
  IPayNearestAtmFilterComponent: jest.fn(() => null), // Mocking IPayNearestAtmFilterComponent
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
    expect(IPayNearestAtmFilterComponent).toHaveBeenCalled();
    expect(NearestAtmListComponent).toHaveBeenCalled();
  });

  it('passes props correctly to IPayNearestAtmFilterComponent', () => {
    render(<NearestAtmScreen />);

    // Check if IPayNearestAtmFilterComponent receives correct props
    expect(IPayNearestAtmFilterComponent).toHaveBeenCalledWith(
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
