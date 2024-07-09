import { render } from '@testing-library/react-native';
import Cards from './cards.screen';

// Mocking the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      natural: {
        natural900: '#FFA500',
      },
    },
  }),
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    cards: 'Cards',
    // Add other localized strings as needed
  }),
}));

jest.mock('@app/navigation/navigation-service.navigation', () => ({
  __esModule: true,
  navigate: jest.fn(),
}));

describe('Cards', () => {
  it('render correctly', () => {
    const { getByText } = render(<Cards />);
    expect(getByText('Cards-')).toBeTruthy();
  });
});
