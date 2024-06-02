import { IPayToggleTitleProps } from './ipay-toggle-button-title.interface';

type IPayTitleAssistiveProps = {
  heading?: string;
  text?: string;
};

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary500: 'blue',
      },
      natural: {
        natural300: 'gray',
      },
    },
  }),
}));

jest.mock('@app/components/atoms', () => ({
  IPayTitleAssistiveText: ({ heading, text }: IPayTitleAssistiveProps) => (
    <div>
      <h1>{heading}</h1>
      <p>{text}</p>
    </div>
  ),
  RNView: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../ipay-toggle-button/ipay-toggle-button.component', () => ({
  __esModule: true,
  default: ({ toggleState, onToggleChange }: any) => (
    <button onClick={() => onToggleChange(!toggleState)}>{toggleState ? 'On' : 'Off'}</button>
  ),
}));

describe('IPayToggleTitle Component', () => {
  const defaultProps: IPayToggleTitleProps = {
    heading: 'Test Heading',
    subHeading: 'Test SubHeading',
    onSwitchToggle: jest.fn(),
  };
});
