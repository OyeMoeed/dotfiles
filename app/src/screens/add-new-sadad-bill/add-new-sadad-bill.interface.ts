export interface SelectedValue {
  id: number;
  image: string;
  text: string;
  type: string;
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
