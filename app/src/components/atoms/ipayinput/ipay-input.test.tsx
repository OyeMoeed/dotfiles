import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import IPayInput from './ipay-input.component';
import { TextStyle } from 'react-native';
// Mock the useTheme hook
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

describe('IpayTextInput Component', () => {

  it('renders correctly', () => {
    const { getByTestId } = render(
      <IPayInput
        testID="input-test-id"
        text="Input Labels"
        placeholder="Enter text"
        autoFocus={true}
        editable={true}
      />
    );

    // Test if the component renders
    const input = getByTestId('input-test-id-input');
    expect(input).toBeTruthy();

    // You can add more specific tests here as needed
  });


  it('renders text correctly', () => {
    const { getByDisplayValue } = render(<IPayInput text="Input Labels" testID='ipay-input' />);
    expect(getByDisplayValue('Input Labels')).toBeTruthy();
  });



  it('renders with custom style', () => {
    const customStyle: TextStyle = { color: 'red' };
    const { getByDisplayValue } = render(<IPayInput text="Custom Style" style={[customStyle]} />);
    const textComponent = getByDisplayValue('Custom Style');

    // Flatten the style array to properly check for the presence of customStyle
    const flatStyle = Array.isArray(textComponent.props.style)
      ? textComponent.props.style.flat()
      : [textComponent.props.style];

    expect(flatStyle).toContainEqual(expect.objectContaining(customStyle));
  });
  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(<IPayInput text="Input Labels" placeholder="Enter text here" />);
    expect(getByPlaceholderText('Enter text here')).toBeTruthy();
  });

  it('calls onFocus when focused', () => {
    const handleFocus = jest.fn();
    const { getByDisplayValue } = render(
      <IPayInput text="Focus Test" handleFocus={handleFocus} />
    );
    const input = getByDisplayValue('Focus Test');
    fireEvent(input, 'focus');
    expect(handleFocus).toHaveBeenCalled();
  });

  it('calls onBlur when blurred', () => {
    const handleBlur = jest.fn();
    const { getByDisplayValue } = render(
      <IPayInput text="Blur Test" handleBlur={handleBlur} />
    );
    const input = getByDisplayValue('Blur Test');
    fireEvent(input, 'blur');
    expect(handleBlur).toHaveBeenCalled();
  });

  it('renders with specified number of lines', () => {
    const { getByDisplayValue } = render(<IPayInput text="Multiple Lines" numberOfLines={1} />);
    const input = getByDisplayValue('Multiple Lines');
    expect(input.props.numberOfLines).toBe(1);
  });

  it('calls onSubmitEditing when submitted', () => {
    const onSubmitEditing = jest.fn();
    const { getByDisplayValue } = render(
      <IPayInput text="Submit Test" onSubmitEditing={onSubmitEditing} />
    );
    const input = getByDisplayValue('Submit Test');
    fireEvent(input, 'submitEditing');
    expect(onSubmitEditing).toHaveBeenCalledWith('Submit Test');
  });

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <IPayInput text="Initial Text" onChangeText={onChangeText} />
    );
    const input = getByDisplayValue('Initial Text');
    fireEvent.changeText(input, 'New Text');
    expect(onChangeText).toHaveBeenCalledWith('New Text');
  });
  it('is not editable when editable prop is false', () => {
    const { getByDisplayValue } = render(<IPayInput text="Non-editable Input" editable={false} />);
    const inputComponent = getByDisplayValue('Non-editable Input');

    expect(inputComponent.props.editable).toBe(false);

    fireEvent.changeText(inputComponent, 'New Text');
    expect(getByDisplayValue('Non-editable Input')).toBeTruthy(); // Text should not change
  });

});
