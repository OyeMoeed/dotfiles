import icons from '@app/assets/icons';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayBalanceStatusChip, IPayButton, IPayHeader, IPayList, IPayTopUpBox } from '@app/components/molecules';
import { IPayActionSheet, IPaySendMoneyForm } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useKeyboardStatus from '@app/hooks/use-keyboard-status';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack, navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import getTotalAmount from '@app/utilities/total-amount-utils';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SendMoneyFormSheet, SendMoneyFormType } from './send-money-request.interface';
import sendMoneyFormStyles from './send-money-request.styles';

const SendMoneyRequest: React.FC = () => {
  const { colors } = useTheme();
  const { isKeyboardWillOpen, isKeyboardOpen } = useKeyboardStatus();
  const styles = sendMoneyFormStyles(colors);
  const localizationText = useLocalization();
  const MAX_CONTACT = 5;
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { availableBalance } = walletInfo; // TODO replace with orignal data
  const route = useRoute();
  const { selectedContacts, heading } = route.params as any;
  const [selectedId, setSelectedId] = useState<number | string>('');
  const [warningStatus, setWarningStatus] = useState<string>('');

  const removeFormRef = useRef<SendMoneyFormSheet>(null);
  const [formInstances, setFormInstances] = useState<SendMoneyFormType[]>(
    selectedContacts?.map(
      (contact: { givenName: string; phoneNumbers: { number: string | number }[] }, index: number) => ({
        id: index + 1,
        subtitle: contact.givenName,
        amount: '',
        notes: '',
        mobileNumber: contact.phoneNumbers[0].number,
      }),
    ),
  );

  useEffect(() => {
    if (formInstances?.length === 0) goBack();
  }, [formInstances]);

  const showRemoveFormOption = useCallback((id: number) => {
    if (removeFormRef.current) {
      setSelectedId(id);
      requestAnimationFrame(() => {
        removeFormRef?.current?.show?.();
      });
    }
  }, []);

  const handleAmountChange = (id: number, value: string) => {
    setFormInstances((prevInstances) =>
      prevInstances.map((instance) => (instance.id === id ? { ...instance, amount: value } : instance)),
    );
  };

  const handleNotesChange = (id: number, value: string) => {
    setFormInstances((prevInstances) =>
      prevInstances.map((instance) => (instance.id === id ? { ...instance, notes: value } : instance)),
    );
  };

  const handleActionSheetPress = (index: number) => {
    if (index === 0) {
      if (selectedId !== '') {
        setFormInstances((prevFormInstances) => prevFormInstances.filter((form) => form.id !== selectedId));
      }
    }
    removeFormRef?.current?.hide();
    setSelectedId('');
  };

  const isTransferButtonDisabled = () => {
    let isDisabled = false;
    // eslint-disable-next-line no-restricted-syntax
    for (const instances of formInstances) {
      if (!instances.amount || instances.amount <= 0) {
        isDisabled = true;
      }
    }
    return isDisabled;
  };

  const addForm = () => {
    goBack();
  };

  const { monthlyRemainingOutgoingAmount, dailyOutgoingLimit } = walletInfo.limitsDetails;
  const removeFormOptions = {
    title: localizationText.SEND_MONEY_FORM.REMOVE,
    showIcon: true,
    customImage: <IPayIcon icon={icons.TRASH} size={42} />,
    message: localizationText.SEND_MONEY_FORM.REMOVE_DETAIL,
    options: [localizationText.PROFILE.REMOVE, localizationText.COMMON.CANCEL],
    cancelButtonIndex: 1,
    showCancel: true,
    destructiveButtonIndex: 0,
    onPress: handleActionSheetPress,
  };

  const onConfirm = async () => {
    navigate(ScreenNames.CREATE_MONEY_REQUEST_SUMMARY, {
      variant: TransactionTypes.PAYMENT_REQUEST,
      data: {
        transfersDetails: { formInstances },
        totalAmount: getTotalAmount(formInstances),
      },
    });
  };

  const getContactInfoText = () => {
    const selectedContactsCount = formInstances.length;
    return (
      <IPayView style={styles.contactInfoContainer}>
        <IPayFootnoteText
          regular={false}
          text={`${selectedContactsCount} ${localizationText.HOME.OF}`}
          color={colors.natural.natural900}
        />
        <IPayFootnoteText
          regular
          color={colors.natural.natural500}
          text={`${MAX_CONTACT} ${localizationText.WALLET_TO_WALLET.CONTACTS}`}
        />
      </IPayView>
    );
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <>
        {/* header */}
        <IPayHeader backBtn title={heading} applyFlex />

        <IPayView style={styles.inncerContainer}>
          {/* Topup box */}
          <IPayTopUpBox
            availableBalance={formatNumberWithCommas(availableBalance)}
            isShowTopup
            isShowRemaining
            isShowProgressBar
            monthlyIncomingLimit={walletInfo.limitsDetails.monthlyIncomingLimit}
            monthlyRemainingIncommingAmount={walletInfo.limitsDetails.monthlyRemainingIncomingAmount}
          />

          {/* total selected contact label */}
          {getContactInfoText()}

          {/* amount form */}
          <IPaySendMoneyForm
            showReason={false}
            subtitle={selectedContacts[0].givenName}
            setAmount={handleAmountChange}
            showRemoveFormOption={showRemoveFormOption}
            addForm={addForm}
            formInstances={formInstances}
            notes=""
            setNotes={handleNotesChange}
          />
          {!isKeyboardWillOpen && !isKeyboardOpen && (
            <IPayLinearGradientView style={styles.buttonBackground}>
              <IPayList
                title={localizationText.SEND_MONEY_FORM.TOTAL_AMOUNT}
                rightText={
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    text={`${getTotalAmount(formInstances) ? formatNumberWithCommas(getTotalAmount(formInstances)) : 0} ${localizationText.COMMON.SAR}`}
                  />
                }
              />
              <IPayBalanceStatusChip
                monthlySpendingLimit={Number(monthlyRemainingOutgoingAmount)}
                currentBalance={Number(availableBalance)}
                amount={getTotalAmount(formInstances)}
                setWarningStatus={setWarningStatus}
                dailySpendingLimit={Number(dailyOutgoingLimit)}
              />
              <IPayButton
                disabled={isTransferButtonDisabled() || !getTotalAmount(formInstances) || !!warningStatus}
                btnIconsDisabled
                medium
                btnType="primary"
                onPress={onConfirm}
                btnText={localizationText.REQUEST_MONEY.SEND_REQUEST_TITLE}
              />
            </IPayLinearGradientView>
          )}
        </IPayView>
        <IPayActionSheet
          ref={removeFormRef}
          title={removeFormOptions.title}
          showIcon={removeFormOptions.showIcon}
          customImage={removeFormOptions.customImage}
          message={formInstances.length === 1 ? removeFormOptions.message : ''}
          options={removeFormOptions.options}
          cancelButtonIndex={removeFormOptions.cancelButtonIndex}
          showCancel={removeFormOptions.showCancel}
          destructiveButtonIndex={removeFormOptions.destructiveButtonIndex}
          onPress={removeFormOptions.onPress}
          bodyStyle={styles.alert}
          messageStyle={styles.messageStyle}
        />
      </>
    </IPaySafeAreaView>
  );
};

export default SendMoneyRequest;
