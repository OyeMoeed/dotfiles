// ipay-nearest-atm-locations.test.tsx

import { render } from '@testing-library/react-native';
import IPayNearestAtmLocations from './ipay-nearest-atm-locations.component';

describe('<IPayNearestAtmLocations />', () => {
  it('renders markers correctly', () => {
    const { getAllByTestId } = render(<IPayNearestAtmLocations testID="test" style={{}} />);

    // Check if markers render based on the mock data
    const markers = getAllByTestId('marker-1');
    expect(markers.length).toBe(1); // Adjust this based on your actual mock data count
  });

  it('renders with default props', () => {
    const { getByTestId } = render(<IPayNearestAtmLocations testID="test" />);

    // Check if the map view container renders with default props
    const mapView = getByTestId('test-map-view-base-view');
    expect(mapView).toBeTruthy();
  });
});
