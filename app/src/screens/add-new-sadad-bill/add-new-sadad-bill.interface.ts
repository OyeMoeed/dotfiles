import { SadadBillItemProps } from '@app/components/organism/ipay-sadad-bill-details-box/ipay-sadad-bill-details-box.interface';

export interface SelectedValue {
  id: number | string;
  image?: string;
  text: string;
  type?: string;
}

/**
 * Interface for form values.
 */
export interface FormValues {
  /**
   * Name of the company.
   */
  companyName: string;

  /**
   * Type of service.
   */
  serviceType: string;

  /**
   * Account number.
   */
  accountNumber: string;

  /**
   * Name of the bill.
   */
  billName: string;

  /**
   * Whether to save the bill.
   */
  saveBill: boolean;
}

interface NewSadadBillParams {
  selectedBills: SadadBillItemProps[];
  isSaveOnly: boolean;
  isPayPartially: boolean;
}

export interface NewSadadBillProps {
  route: {
    params: NewSadadBillParams;
  };
  testID?: string;
}
