import React from 'react';

export interface FormValues {
  companyName: string;
  serviceType: string;
  accountNumber: string;
  saveBill: boolean;
  billName: string;
}

export interface SadadBillDetailFormProps {
  /**
   * test id to test element
   * */
  testID?: string;
  /**
   * Boolean indicating if the company value is valid or present
   * */
  isCompanyValue?: boolean;
  /**
   * Boolean indicating if the service value is valid or present
   * */
  isServiceValue?: boolean;
  /**
   * Function to handle comapny action
   * */
  onCompanyAction?: () => void;
  /**
   * Function to handle service action
   * */
  onServiceAction?: () => void;
  /**
   * left image for animated text input.
   */
  companyLeftImage?: React.ReactElement<any> | undefined;
  /**
   * name of company input to use
   */
  companyInputName: string;
  /**
   * name of service input to use
   */
  serviceInputName: string;
  /**
   * name of input to use
   */
  accountInputName: string;
  /**
   * label for account number
   */
  accountInputLabel?: string;
}
