import useLocalization from '@app/localization/hooks/localization.hook';

const useConstantData = () => {
  const localizationText = useLocalization();

  const transferReasonData = [
    { id: 1, text: localizationText.SEND_MONEY_FORM.LIVING_EXPENSES },
    { id: 2, text: localizationText.SEND_MONEY_FORM.ACCOMMODATION_FEES },
    { id: 3, text: localizationText.SEND_MONEY_FORM.BILL_PAYMENT },
    { id: 4, text: localizationText.SEND_MONEY_FORM.CAR_FINANCE_PAYMENT },
    { id: 5, text: localizationText.SEND_MONEY_FORM.HOUSE_FINANCE_PAYMENT },
    { id: 6, text: localizationText.SEND_MONEY_FORM.INSURANCE_PAYMENT },
    { id: 7, text: localizationText.SEND_MONEY_FORM.RENT_PAYMENT },
  ];
  const contactList = [
    //TODO: List will replace by actual data
    { title: localizationText.MENU.CALL_WITHIN_SA, phone_number: '8004339000' },
    { title: localizationText.MENU.CALL_OUTSIDE_SA, phone_number: '(+966) 920000670' },
  ];
  const guideSteps = [
    { title: localizationText.ACTIVATE_BENEFICIARY.CALL_FROM_REGISTERED_NUM, stepNumber: '1', isContactList:true },
    { title: localizationText.ACTIVATE_BENEFICIARY.PRESS_NUMBER_4, stepNumber: '2', pressNumber: '4' },
    { title: localizationText.ACTIVATE_BENEFICIARY.PRESS_NUMBER_1_TO_ACTIVATE, stepNumber: '3' },
  ];
  return { transferReasonData, contactList, guideSteps };
};

export default useConstantData;
