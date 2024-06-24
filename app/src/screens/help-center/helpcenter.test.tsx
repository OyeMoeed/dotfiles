import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import HelpCenter from './helpcenter.screen';

// Mocking localization and theme hooks
jest.mock('@app/localization/hooks/localization.hook', () => jest.fn());
jest.mock('@app/styles/hooks/theme.hook', () => jest.fn());

describe('HelpCenter Component', () => {
  const mockLocalization = {
    help_center: 'Help Center',
    faq: 'FAQ',
    faq_definition: 'Frequently Asked Questions',
    faq_question: 'Can I recover my passcode?',
    faq_answers:
      'You cannot retrieve passwords due to safety and security reasons for the account owner. However, you can reset your password by verifying your identity.',
    assistance: 'Need Assistance?',
    contact_service_team: 'contact our customer service team for further assistance.',
    contact_us: 'Contact Us',
  };

  const mockTheme = {
    colors: {
      primary: {
        primary500: '#00BAFE',
      },
      secondary: {
        secondary800: '#4E1B88',
      },
    },
    icons: {
      messageQuestion1: jest.fn(),
      callReceived: jest.fn(),
    },
  };

  beforeEach(() => {
    // Mock return values for useLocalization and useTheme hooks
    jest.clearAllMocks();
    jest.doMock('@app/localization/hooks/localization.hook', () => () => mockLocalization);
    jest.doMock('@app/styles/hooks/theme.hook', () => () => mockTheme);
  });

  it('renders correctly', () => {
    const { getByTestId, getByText } = render(<HelpCenter />);

    expect(getByTestId('header-help-center')).toBeTruthy();
    expect(getByText(mockLocalization.help_center)).toBeTruthy();
    expect(getByText(mockLocalization.faq)).toBeTruthy();
    expect(getByText(mockLocalization.faq_definition)).toBeTruthy();
    expect(getByTestId('faq-list')).toBeTruthy(); // Ensure the FAQ list is rendered
    expect(getByText(mockLocalization.assistance)).toBeTruthy();
    expect(getByText(mockLocalization.contact_service_team)).toBeTruthy();
    expect(getByText(mockLocalization.contact_us)).toBeTruthy();
  });

  it('expands FAQ item when clicked', async () => {
    const { getByTestId } = render(<HelpCenter />);

    const faqItemHeader = getByTestId('faq-item-header');

    fireEvent.click(faqItemHeader);

    await waitFor(() => {
      expect(getByText(mockLocalization.faq_answers)).toBeTruthy();
    });
  });
});
