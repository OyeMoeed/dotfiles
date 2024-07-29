import { render } from '@testing-library/react-native';
import IPaySadadBillDetailForm from './ipay-sadad-bill-detail.component';

// Mock the hooks
jest.mock('@app/localization/hooks/localization.hook', () =>
  jest.fn(() => ({
    NEW_SADAD_BILLS: {
      COMPANY_NAME: 'Company Name',
      SERVICE_TYPE: 'Service Type',
      ACCOUNT_NUMBER: 'Account Number',
      INVALID_ACCOUNT_NUMBER: 'Invalid Account Number',
    },
  })),
);

jest.mock('@app/styles/hooks/theme.hook', () =>
  jest.fn(() => ({
    colors: {
      primary: { primary500: '#000' },
      natural: { natural500: '#333' },
      error: { error500: 'red' },
    },
  })),
);

describe('IPaySadadBillDetailForm', () => {
  const defaultProps = {
    companyValue: 'Company A',
    serviceValue: 'Service B',
    isCompanyValue: true,
    isServiceValue: true,
    accountNumberValue: '123456789',
    onAccountNumber: jest.fn(),
    isValidAccountNo: false,
    onCompanyAction: jest.fn(),
    onServiceAction: jest.fn(),
  };

  it('should render correctly with default props', () => {
    const { getByText } = render(<IPaySadadBillDetailForm {...defaultProps} />);

    expect(getByText('Company Name')).toBeTruthy();
    expect(getByText('Service Type')).toBeTruthy();
    expect(getByText('Account Number')).toBeTruthy();
  });

  it('should display assistive text if account number is invalid', () => {
    const props = { ...defaultProps, isValidAccountNo: true };
    const { getByText } = render(<IPaySadadBillDetailForm {...props} />);
    expect(getByText('Invalid Account Number')).toBeTruthy();
  });
});
