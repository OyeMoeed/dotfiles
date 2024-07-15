import { fireEvent, render } from '@testing-library/react-native';
import IPayMapView from './ipay-map-view.component';

// Mock the useTheme hook to return some default colors
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: 'blue',
    background: 'white',
  },
}));

// Mock the MapView component to properly handle refs and children
jest.mock('react-native-maps', () => {
  const React = require('react');
  const MockMapView = React.forwardRef((props, ref) => <div ref={ref} {...props} />);
  return {
    __esModule: true,
    default: MockMapView,
  };
});

const initialRegion = {
  latitude: 40.7128,
  longitude: -74.006,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

describe('IPayMapView', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<IPayMapView testID="test-map" initialRegion={initialRegion} />);
    const mapView = getByTestId('test-map-map-view');
    expect(mapView).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(<IPayMapView testID="test-map" style={customStyle} initialRegion={initialRegion} />);
    const mapView = getByTestId('test-map-map-view');
    expect(mapView.props.style).toContainEqual(customStyle);
  });

  it('sets initial region', () => {
    const { getByTestId } = render(<IPayMapView testID="test-map" initialRegion={initialRegion} />);
    const mapView = getByTestId('test-map-map-view');
    expect(mapView.props.initialRegion).toEqual(initialRegion);
  });

  it('handles showsUserLocation and showsMyLocationButton props', () => {
    const { getByTestId } = render(
      <IPayMapView testID="test-map" showsUserLocation showsMyLocationButton initialRegion={initialRegion} />,
    );
    const mapView = getByTestId('test-map-map-view');
    expect(mapView.props.showsUserLocation).toBe(true);
    expect(mapView.props.showsMyLocationButton).toBe(true);
  });

  it('calls onRegionChangeComplete when the region changes', () => {
    const onRegionChangeComplete = jest.fn();
    const { getByTestId } = render(
      <IPayMapView testID="test-map" onRegionChangeComplete={onRegionChangeComplete} initialRegion={initialRegion} />,
    );
    const mapView = getByTestId('test-map-map-view');
    fireEvent(mapView, 'onRegionChangeComplete', { latitude: 40.7128, longitude: -74.006 });
    expect(onRegionChangeComplete).toHaveBeenCalledWith({ latitude: 40.7128, longitude: -74.006 });
  });

  it('calls onUserLocationChangeData when the user location changes', () => {
    const onUserLocationChangeData = jest.fn();
    const { getByTestId } = render(
      <IPayMapView
        testID="test-map"
        onUserLocationChangeData={onUserLocationChangeData}
        initialRegion={initialRegion}
      />,
    );
    const mapView = getByTestId('test-map-map-view');
    fireEvent(mapView, 'onUserLocationChange', {
      nativeEvent: { coordinate: { latitude: 40.7128, longitude: -74.006 } },
    });
    expect(onUserLocationChangeData).toHaveBeenCalledWith({
      nativeEvent: { coordinate: { latitude: 40.7128, longitude: -74.006 } },
    });
  });
});
