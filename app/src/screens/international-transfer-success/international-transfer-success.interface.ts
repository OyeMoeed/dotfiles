interface OptionItem {
  label: string; // Display text for option item
  value: string; // Value associated with option item
  icon?: string; // Optional icon for visual representation
  image?: string; // Optional image for detailed representation
}

interface InternationalTransferData {
  beneficiary: string; // Beneficiary's name
  country: string; // Beneficiary's country
  transactionId: string; // Unique transaction identifier
  bankTransfer: string; // Bank transfer method information
  iban: string; // Beneficiary's IBAN
  bankName: string; // Beneficiary's bank name
  phoneNumber: string; // Beneficiary's phone number
  reasonOfTransfer: string; // Purpose of the transfer
  amountTo: string; // Amount sent to beneficiary
  amountFrom: string; // Amount deducted from sender
  exchangeRate: string; // Applied exchange rate
  vat: string; // Value-added tax on transfer
  fees: string; // Transfer-related fees
  totalAmount: string; // Total amount including fees
}

export { InternationalTransferData, OptionItem };
