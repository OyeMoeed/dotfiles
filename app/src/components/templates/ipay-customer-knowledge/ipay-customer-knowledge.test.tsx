import { render } from '@testing-library/react-native';
import IPayCustomerKnowledge from './ipay-customer-knowledge.component';

// Mock dependencies
jest.mock('@app/localization/hooks/localization.hook', () => jest.fn());

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    colors: {
      primary: { primary900: '', primary500: '' },
      natural: { natural500: '#000000' },
      redPalette: { red500: '' }
    },
    icons: {
      searchIcon: jest.fn().mockReturnValue('SearchIcon'), // Mock icons as needed
    }
  })
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    confirm: "Confirm",
    save: "Save",
    employee_name:"Employee Name",
    street_name:"Street Name",
    building_number:"Building number",
    employment_details: "Employment details",
    occupation: "Occupation",
    income_source: "Income Source",
    monthly_income: "Monthly income",
    national_address_details: "National Address details",
    city_name: "City Name",
    district: "District",
    streen_name: "Street Name",
    postal_code: "Postal Code",
    additional_code: "Additional code",
    building_name: "Building number",
    unit_number: "Unit number",
    customer_knowledge: "Customer knowledge",
    govt_employee: "Government employee",
    private_sector_employee: "Private sector employee",
    freelancer: "Freelancer",
    investor: "Investor",
    unemployed: "Unemployed",
    diplomatic_employee: "Diplomatic Employee",
    salaries: "Salaries",
    stocks: "Stocks",
    trade: "Trade",
    other: "Other",
    to: "to",
    more_than: "More than"
  })
}));

describe('IPayCustomerKnowledge', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<IPayCustomerKnowledge testID="customer-knowledge" />);
    const container = getByTestId('customer-knowledge-base-view');
    expect(container).toBeTruthy();
  });
});
