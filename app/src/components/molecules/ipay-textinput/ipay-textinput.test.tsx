import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IPayTextInput from './ipay-textinput.component';
jest.mock('@app/assets/svgs/svg', () => {
    return () => <mock-User />;
  });

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
            },
            redPalette: {
                red500: 'red'
            }
        }
    })
}));


describe('IPayTextInput Component', () => {

    const onChangeText = jest.fn(); // Mocking onChangeText function
    const label = "Label"; // Example label
    const rightIcon = <mock-User />; // Assuming User is a valid component


    it('renders text correctly', () => {
        const { getByDisplayValue } = render(
          <IPayTextInput
            text="Input Labels"
            onChangeText={() => {}}
            label="Label"
            rightIcon={<mock-User />} // Use the mocked User SVG component
          />
        );
    
        expect(getByDisplayValue('Input Labels')).toBeTruthy();
      });
  

    it('triggers onFocus and onBlur callbacks', () => {
        const onFocusMock = jest.fn();
        const onBlurMock = jest.fn();
        const { getByDisplayValue } = render(
            <IPayTextInput text="Enter text..."
                onChangeText={onChangeText}
                label={label}
                rightIcon={rightIcon}
                onFocus={onFocusMock} onBlur={onBlurMock} />
        );

        const inputElement = getByDisplayValue('Enter text...');
        fireEvent(inputElement, 'focus');
        expect(onFocusMock).toHaveBeenCalled();

        fireEvent(inputElement, 'blur');
        expect(onBlurMock).toHaveBeenCalled();

    });

    it('triggers onChangeText callback', () => {
        const onChangeTextMock = jest.fn();
        const { getByDisplayValue } = render(
            <IPayTextInput text="Enter text..." onChangeText={onChangeTextMock}
                label={label}
                rightIcon={rightIcon}
            />
        );

        const inputElement = getByDisplayValue('Enter text...');
        fireEvent.changeText(inputElement, 'New text');
        expect(onChangeTextMock).toHaveBeenCalledWith('New text');
    });

    it('renders right icon when provided', () => {
        // Render the component with the right icon
        const { getByTestId } = render(
            <IPayTextInput
                testID="rightIcon"
                text=""
                onChangeText={() => { }}
                rightIcon={<mock-User />} // Use your SVG icon component with testID
                label={label}
            />
        );

        // Verify that the right icon is rendered
        const rightIconElement = getByTestId("rightIcon-text-input-base-view");
        expect(rightIconElement).toBeTruthy();
    });

    it('does not render right icon when not provided', () => {
        // Render the component without the right icon
        const { queryByTestId } = render(
            <IPayTextInput
                text=""
                onChangeText={() => { }}
                label={label}
            />
        );

        // Verify that the right icon is not rendered
        const rightIconElement = queryByTestId('rightIcon');
        expect(rightIconElement).toBeNull();
    });


});

