import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Profile from './profile.screen';

// Mocking localization and theme hooks
jest.mock('@app/localization/hooks/localization.hook', () => jest.fn());
jest.mock('@app/styles/hooks/theme.hook', () => jest.fn());

// Mocking IPayImage component
jest.mock('@app/components/atoms/index', () => ({
  IPayIcon: jest.fn(),
  IPayImage: jest.fn(() => null), // Mocking IPayImage as it's being used inside IPayPressable
}));

// Mocking IPayPressable
jest.mock('@components/atoms', () => ({
  IPayPressable: jest.fn(({ children }) => <div onClick={() => children.props.onPress()}>{children}</div>),
}));

describe('Profile Component', () => {
  const mockLocalization = {
    profile: 'Profile',
    registerationCompletion: 'Registration Completion',
    personalInfo: 'Personal Information',
    indentityVerification: 'Identity Verification',
    verify: 'Verify',
    customerKnowledgeForm: 'Customer Knowledge Form',
    complete: 'Complete',
    name: 'Name',
    number: 'Number',
    address: 'Address',
  };

  const mockTheme = {
    colors: {
      primary: {
        primary500: '#000000',
      },
      gradientTertiary: ['#FFFFFF', '#000000'],
    },
    icons: {},
  };

  beforeEach(() => {
    // Mock return values for useLocalization and useTheme hooks
    jest.clearAllMocks();
    jest.doMock('@app/localization/hooks/localization.hook', () => () => mockLocalization);
    jest.doMock('@app/styles/hooks/theme.hook', () => () => mockTheme);
  });

  it('renders correctly', () => {
    const { getByTestId, getByText } = render(<Profile />);

    expect(getByTestId('header-profile')).toBeTruthy();
    expect(getByText(mockLocalization.profile)).toBeTruthy();
    expect(getByTestId('image-container')).toBeTruthy();
    expect(getByTestId('profile')).toBeTruthy(); // Ensure the profile FlatList is rendered
  });

  it('displays selected image when available', () => {
    const selectedImageUri = 'https://example.com/image.jpg';
    const { getByTestId } = render(<Profile />);
    const imageComponent = getByTestId('profile-image');

    expect(imageComponent).toBeTruthy();
    expect(IPayImage).toHaveBeenCalledWith({ image: { uri: selectedImageUri }, style: expect.any(Object) }, {});
  });

  it('displays initials when selected image is not available', () => {
    const { getByTestId } = render(<Profile />);
    const initialsContainer = getByTestId('initials-container');

    expect(initialsContainer).toBeTruthy();
    expect(IPayImage).not.toHaveBeenCalled(); // Ensure IPayImage is not rendered
  });

  it('opens action sheet on press', async () => {
    const { getByTestId } = render(<Profile />);
    const pressableComponent = getByTestId('pressable-component');

    fireEvent.click(pressableComponent);

    await waitFor(() => {
      expect(IPayPressable).toHaveBeenCalledTimes(1);
    });
  });
});
