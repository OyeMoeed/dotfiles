import { render } from '@testing-library/react-native';
import IPayCheckboxTitle from './ipay-chekbox-title.component'; // Adjust the import path accordingly

describe('IPayCheckboxTitle', () => {
  const onPressMock = jest.fn();

  jest.mock('@app/styles/hooks/theme.hook', () => ({
    __esModule: true,
    default: () => ({
      colors: {
        primary: {
          primary500: '#FFFFFF',
          primary100: '#D3D3D3',
        },
        tertiary: {
          tertiary500: '#FFFFFF',
          tertiary100: '#D3D3D3',
        },
        natural: {
          natural0: '#F5F5F5',
          natural500: '#4CAF50',
          natural300: '',
        },
        lightColorPalette: { white: 'white' },
      },
    }),
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with the correct props', () => {
    const { getByTestId, getByText } = render(
      <IPayCheckboxTitle
        checkBoxStyle={{}}
        checkboxBackgroundColor="blue"
        onPress={onPressMock}
        heading="Test Heading"
        text="Test Text"
        testID="test-checkbox-title"
        isCheck={false}
      />,
    );

    expect(getByTestId('test-checkbox-title-checkbox-pressable')).toBeTruthy();
    expect(getByText('Test Heading')).toBeTruthy();
    expect(getByText('Test Text')).toBeTruthy();
  });
});
