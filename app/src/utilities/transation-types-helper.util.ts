import icons from '@app/assets/icons';
import { TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';

const getTransationIcon = (transactionRequestType: TransactionTypes, transactionType: TransactionOperations) => {
  switch (transactionRequestType) {
    // type #1
    case TransactionTypes.COUT_MUSANED:
    case TransactionTypes.PAY_MRCHNT_BILL:
    case TransactionTypes.COUT_MOBILE:
    case TransactionTypes.COUT_IPS:
    case TransactionTypes.PAY_BILL:
    case TransactionTypes.CARD_ISSUE:
    case TransactionTypes.CARD_REISSUE:
    case TransactionTypes.CARD_REPLACE:
    case TransactionTypes.PAY_VCARD:
    case TransactionTypes.PAY_VCARD_REFUND:
    case TransactionTypes.BKF_TRANSFER:
    case TransactionTypes.PAY_WALLET:
      return transactionType === TransactionOperations.DEBIT ? icons.send_money : icons.money_request;
    // type #2
    case TransactionTypes.CIN_MUSANED:
    case TransactionTypes.PAY_MRCHNT_IN:
    case TransactionTypes.PAY_MRCHNT_OUT:
    case TransactionTypes.REFUND:
    case TransactionTypes.PAYMENT_REQUEST:
    case TransactionTypes.CIN_WU_REV:
    case TransactionTypes.CIN_SARIE_REV:
    case TransactionTypes.CIN_WALLET:
    case TransactionTypes.CIN_CASH_BACK:
    case TransactionTypes.COUT_ALINMA_REV:
    case TransactionTypes.COUT_SARIE_REV:
    case TransactionTypes.REFUND_SADAD_REV:
    case TransactionTypes.CASHBACK:
    case TransactionTypes.CIN_VISA_CASHBACK:
    case TransactionTypes.COUT_SWIFT_REV:
      return icons.money_request;

    // type #3
    case TransactionTypes.PAY_VCARD_POS:
    case TransactionTypes.PAY_VCARD_ECOM:
    case TransactionTypes.PAY_VCARD_SETTLE:
    case TransactionTypes.PAY_MOI:
    case TransactionTypes.PAY_VCARD_POS_MADA:
    case TransactionTypes.PAY_VCARD_POS_VISA:
    case TransactionTypes.PAY_VCARD_ECOM_MADA:
    case TransactionTypes.PAY_VCARD_ECOM_VISA:
      return icons.receipt_item;

    // type #5
    case TransactionTypes.PAY_VCARD_POS_NAQD_MADA:
    case TransactionTypes.PAY_VCARD_POS_NAQD_VISA:
    case TransactionTypes.PAY_VCARD_POS_NAQD:
    case TransactionTypes.COUT_ATM:
    case TransactionTypes.CARD_VCB_ISSUE:
    case TransactionTypes.CARD_VCB_REISSUE:
    case TransactionTypes.CARD_VCB_REPLACE:
      return icons.card;

    // type #6
    case TransactionTypes.CIN_SARIE:
    case TransactionTypes.COUT_SARIE:
      return icons.transType;

    // type #7
    case TransactionTypes.COUT_WU:
    case TransactionTypes.COUT_ALINMA:
    case TransactionTypes.CIN_ALINMA:
    case TransactionTypes.COUT_EXPRESS:
    case TransactionTypes.CIN_EXPRESS_REV:
      return icons.global;

    // type #8
    case TransactionTypes.CIN_CARD:
    case TransactionTypes.CIN_CARD_MADA:
    case TransactionTypes.CIN_CARD_VISA:
    case TransactionTypes.CIN_CARD_VISA_APAY:
    case TransactionTypes.CIN_CARD_MASTER:
    case TransactionTypes.CIN_CARD_MADA_APAY:
    case TransactionTypes.CIN_CARD_MASTER_APAY:
      return icons.wallet_add;

    // type #9
    case TransactionTypes.COUT_GIFT:
      return icons.gift;
    // type #10
    case TransactionTypes.PAY_ONECARD:
      return icons.shopping_cart;
      // type #11
    case TransactionTypes.CIN_MAZAYA:
      return icons.akhtar;

    // type #4
    default:
      return icons.transType;
  }
};

export default getTransationIcon;
