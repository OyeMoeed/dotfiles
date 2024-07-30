import { render } from '@testing-library/react-native';
import IPaySadadSaveBill from './ipay-sadad-save-bill.component';

jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  NEW_SADAD_BILLS: {
    SAVE_BILL_FUTURE: 'Save bill for future',
    BILL_NICK_NAME: 'Bill nickname',
  },
}));

describe('IPaySadadSaveBill Component', () => {
  it('should display localized text', () => {
    const props = {
      saveBillToggle: true,
      onSaveBillToggle: jest.fn(),
      billNameValue: 'Electric Bill',
      onBillNameChange: jest.fn(),
    };

    const { getByText } = render(<IPaySadadSaveBill {...props} />);

    expect(getByText('Save bill for future')).toBeTruthy();
    expect(getByText('Bill nickname')).toBeTruthy();
  });
});
