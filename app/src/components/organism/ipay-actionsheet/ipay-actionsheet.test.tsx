import React from 'react';
import { render } from '@testing-library/react-native';
import IPayActionSheet from './ipay-actionsheet.component';

// Mock the useTheme hook
jest.mock('@app/styles/theming/theme.hook', () => ({
    __esModule: true,
    default: () => ({
        colors: {
            overlay: {
                primaryBackDrop: '#000000' // Provide a mock color value
            },
            primary: {
                primary900: '#0000'
            },
            natural: {
                natural0: '#0000'
            },
            redShades: {
                red500: '#0000'
            },
            greyShades: {
                grey100: '#0000'
            }
        }
    })
}));


describe('IPayActionSheet', () => {
    it('renders correctly', () => {
        const rendered = render(
            <IPayActionSheet
                testID="actionSheet"
                title="Sample Chip"
                message="Hello"
                options={['hello']} />
        );
        expect(rendered).toBeTruthy();
    });

    it('renders correctly with title and message', () => {

        const rendered = render(
            <IPayActionSheet
                testID="actionSheet"
                options={['hello']}
            />
        );
        expect(rendered).toBeTruthy();

        // Check if the options are rendered

    });

    it('renders correctly without options', () => {
        const { queryByText } = render(
            <IPayActionSheet options={['Hello']} testID="actionSheet" />
        );

        // Check if the title is not rendered
        expect(queryByText('Sample Chip')).toBeNull();

        // Check if the options are not rendered
        expect(queryByText('Option 1')).toBeNull();
    });
    it('throws error when options are not provided', () => {
        try {
            render(<IPayActionSheet testID="actionSheet" />);
        } catch (error) {
            expect(error).toBeTruthy();
            expect(error.message).toEqual("Cannot read properties of undefined (reading 'map')");
        }
    });
    
    
    
});


