import images from '@app/assets/images';
import useLocalization from '@app/localization/hooks/localization.hook';

const useSadadBillDetailsData = () => {
  const localizationText = useLocalization();

  const BILL_DETAILS = [
    {
      title: 'My Electricity Bill',
      currency: localizationText.COMMON.SAR,
      companyDetails: '123 - Saudi electricity co.',
      amountToPay: 300,
      isOverPaid: false,
      overPaidAmount: 200,
      companyImage: images.electricityBill,
      isTransactionDeclined: false,
      declinedTitle: '',
      declinedMessage: '',
    },
    {
      title: 'License',
      currency: localizationText.COMMON.SAR,
      companyDetails: '574 - Madinah regional mun..',
      amountToPay: 250,
      isOverPaid: false,
      overPaidAmount: 0,
      companyImage: images.liscence,
      isTransactionDeclined: false,
      declinedTitle: 'Declined transaction',
      declinedMessage: 'Saudi electricity does not accept partially payment',
    },
    {
      title: 'My Electricity Bill',
      currency: localizationText.COMMON.SAR,
      companyDetails: '123 - Saudi electricity co.',
      amountToPay: 300,
      isOverPaid: true,
      overPaidAmount: 200,
      companyImage: images.electricityBill,
      isTransactionDeclined: false,
      declinedTitle: '',
      declinedMessage: '',
    },
    {
      title: 'License',
      currency: localizationText.COMMON.SAR,
      companyDetails: '574 - Madinah regional mun..',
      amountToPay: 250,
      isOverPaid: false,
      overPaidAmount: 0,
      companyImage: images.liscence,
      isTransactionDeclined: true,
      declinedTitle: 'Declined transaction',
      declinedMessage: 'Saudi electricity does not accept partially payment',
    },
  ];
  return BILL_DETAILS;
};

export default useSadadBillDetailsData;
