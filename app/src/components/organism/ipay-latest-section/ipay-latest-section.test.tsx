import { render } from '@testing-library/react-native';
import IPayLatestList from './ipay-latest-section.component';

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      overlays: {
        primaryBackDrop: '#000000', // Provide a mock color value
      },
      primary: {
        primary900: '#0000',
      },
      natural: {
        natural0: '#0000',
      },
      redShades: {
        red500: '#0000',
      },
      greyShades: {
        grey100: '#0000',
      },
    },
  }),
}));

describe('IPayLatestList', () => {
  it('renders correctly', () => {
    const rendered = render(<IPayLatestList testID="actionSheet" openBottomSheet={() => 'press'} />);
    expect(rendered).toBeDefined();
  });

  it('renders correctly with title and message', () => {
    const rendered = render(<IPayLatestList testID="actionSheet" openProfileBottomSheet={() => 'bottomSheet'} />);
    expect(rendered).toBeDefined();

    // Check if the options are rendered
  });
});
