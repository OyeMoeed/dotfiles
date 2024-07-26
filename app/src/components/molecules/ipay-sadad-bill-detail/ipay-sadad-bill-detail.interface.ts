import React from 'react';

export interface SadadBillDetailFormProps {
  /**
   * Represents the company value
   * */
  companyValue?: string;
  /**
   * Represents the service value
   * */
  serviceValue?: string;
  /**
   * Boolean indicating if the company value is valid or present
   * */
  isCompanyValue?: boolean;
  /**
   * Boolean indicating if the service value is valid or present
   * */
  isServiceValue?: boolean;
  /**
   * Represents the account number value
   * */
  accountNumberValue?: string;
  /**
   * Function to handle account number updates
   * */
  onAccountNumber?: (accountNumber: string) => void;
  /**
   * Boolean indicating if the account number is valid
   * */
  isValidAccountNo?: boolean;
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
}
