import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface SadadBillItemProps {
  /** Amount that has been overpaid */
  overPaidAmount?: number;

  /** Flag indicating if the payment is considered overpaid */
  isOverPaid?: boolean;

  /** Title or description related to the bill */
  billTitle: string;

  /** Details about the company receiving the payment */
  vendor?: string;

  /** URL or path to the image representing the vendor */
  vendorIcon?: string;

  /** Currency in which the payment amount is specified */
  currency?: string;

  /** Amount that needs to be pay for bill */
  billAmount?: number;

  /** Flag indicating if the transaction was declined */
  isTransactionDeclined?: boolean;

  /** Title or message shown when the transaction is declined */
  declinedTitle?: string;

  /** Detailed message explaining why the transaction was declined */
  declinedMessage?: string;
}

/**
 * Defines the props interface for the IPaySadadBillDetailBoxProps component.
 */
export interface IPaySadadBillDetailBoxProps {
  /**
   * testID for the component to test the element.
   */
  testID?: string;

  /**
   *  React element for the left icon
   */
  leftIcon?: React.ReactElement;

  /**
   * React element for the right icon
   */
  rightIcon?: React.ReactElement;
  /**
   * Text for action button
   */
  actionBtnText?: string;
  /**
   * Show action button
   */
  showActionBtn?: boolean;
  /**
   * Callback function called when the Pressable is pressed.
   */
  onPress?: () => void;
  /**
   * Show amount to pay
   */
  showAmountToPay?: boolean;
  /**
   * Item for bill Details
   */
  item: SadadBillItemProps;
  /**
   * Standard styles for a View
   */
  style?: StyleProp<ViewStyle>;
}
