import React from 'react';
import { IPaySwitchToggleWithTitleProps } from './ipay-switch-toggle-with-title.interface';

type RNTitleWithTextProps = {
  heading?: string;
  text?: string;
};

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary500: 'blue'
      },
      natural: {
        natural300: 'gray'
      }
    }
  })
}));

jest.mock('@app/components/atoms', () => ({
  RNTitleWithText: ({ heading, text }: RNTitleWithTextProps) => (
    <div>
      <h1>{heading}</h1>
      <p>{text}</p>
    </div>
  ),
  RNView: ({ children, ...props }: any) => <div {...props}>{children}</div>
}));

jest.mock('../toggle-button/ipay-toggle-button.component', () => ({
  __esModule: true,
  default: ({ toggleState, onToggleChange }: any) => (
    <button onClick={() => onToggleChange(!toggleState)}>{toggleState ? 'On' : 'Off'}</button>
  )
}));

describe('IPaySwitchToggleWithTitle Component', () => {
  const defaultProps: IPaySwitchToggleWithTitleProps = {
    heading: 'Test Heading',
    subHeading: 'Test SubHeading',
    onSwitchToggle: jest.fn()
  };
});
