import { AccountBalanceStatus } from '@app/enums/bill-payment.enum';
import { States } from '@app/utilities/enums.util';
import React from 'react';

interface ChipDetailOptions {
  text: string; // The text to display in the chip
  variant: States; // Variant for chip
  icon?: React.ReactElement; // Icon for Chip
}

interface BalanceStatusVariants {
  [AccountBalanceStatus.INSUFFICIENT_BALANCE]: ChipDetailOptions;
  [AccountBalanceStatus.NO_REMAINING_AMOUNT]: ChipDetailOptions;
  [AccountBalanceStatus.MONTHLY_INCOMING_LIMIT]: ChipDetailOptions;
  [AccountBalanceStatus.MONTHLY_OUTGOING_LIMIT]: ChipDetailOptions;
  [AccountBalanceStatus.DAILY_INCOMING_LIMIT]: ChipDetailOptions;
  [AccountBalanceStatus.DAILY_OUTGOING_LIMIT]: ChipDetailOptions;
  [AccountBalanceStatus.MONTHLY_REMAINING_INCOMING_AMOUNT]: ChipDetailOptions;
  [AccountBalanceStatus.MONTHLY_REMAINING_OUTGOING_AMOUNT]: ChipDetailOptions;
  [AccountBalanceStatus.DAILY_REMAINING_INCOMING_AMOUNT]: ChipDetailOptions;
  [AccountBalanceStatus.DAILY_REMAINING_OUTGOING_AMOUNT]: ChipDetailOptions;
  [AccountBalanceStatus.SPENDING_LIMIT_EXCEED]: ChipDetailOptions;
}

interface IPayBalanceStatusChipProps {
  testID?: string; // Identifier for testing
  amount: number; // Amount value for balance
  currentBalance: number; // Current balance value
  monthlySpendingLimit: number; // Monthly spending limit
  dailySpendingLimit: number; // Daily spending limit
}

export { BalanceStatusVariants, IPayBalanceStatusChipProps };
