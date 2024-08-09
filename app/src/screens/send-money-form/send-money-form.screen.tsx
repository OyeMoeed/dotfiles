import icons from '@app/assets/icons';
import { IPayIcon, IPayLinearGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton, IPayChip, IPayHeader, IPayList, IPayListView, IPayTopUpBox } from '@app/components/molecules';
import { IPayActionSheet, IPayBottomSheet, IPaySendMoneyForm } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack, navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { States } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { SendMoneyFormSheet, SendMoneyFormType } from './send-money-form.interface';
import sendMoneyFormStyles from './send-money-form.styles';

const SendMoneyFormScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = sendMoneyFormStyles(colors);
  const localizationText = useLocalization();
  const [notes, setNotes] = useState<string>('');
  const { transferReasonData } = useConstantData();
  const [selectedItem, setSelectedItem] = useState<string>('');
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { currentBalance } = walletInfo; // TODO replace with orignal data
  const route = useRoute();
  const { selectedContacts } = route.params;
  const [selectedId, setSelectedId] = useState<number | string>('');
  const reasonBottomRef = useRef<bottomSheetTypes>(null);

  const removeFormRef = useRef<SendMoneyFormSheet>(null);
  const [formInstances, setFormInstances] = useState<SendMoneyFormType[]>(
    selectedContacts.map((contact, index) => ({
      id: index + 1,
      subtitle: contact.givenName,
      amount: '',
      notes: '',
      selectedItem: '',
    })),
  );

  const totalAmount = formInstances.reduce(
    (total, contact) => total + parseFloat(contact?.amount?.replace(/\,/g, '') || 0),
    0,
  );
  const showRemoveFormOption = useCallback((id: number) => {
    if (removeFormRef.current) {
      setSelectedId(id);
      requestAnimationFrame(() => {
        removeFormRef?.current?.show?.();
      });
    }
  }, []);

  const handleAmountChange = (id: number, value: string) => {
    setFormInstances((prevInstances) => {
      return prevInstances.map((instance) => (instance.id === id ? { ...instance, amount: value } : instance));
    });
  };

  const handleNotesChange = (id: number, value: string) => {
    setFormInstances((prevInstances) => {
      return prevInstances.map((instance) => (instance.id === id ? { ...instance, notes: value } : instance));
    });
  };

  const handleActionSheetPress = (index: number) => {
    if (index === 0) {
      // Assuming 0 is the index for the remove option
      if (selectedId !== '') {
        setFormInstances((prevFormInstances) => prevFormInstances.filter((form) => form.id !== selectedId));
      }
    }
    removeFormRef?.current?.hide();
    setSelectedId('');
  };

  const openReason = (id: number) => {
    reasonBottomRef?.current?.present();
    setSelectedId(id);
  };

  const closeReason = () => {
    reasonBottomRef?.current?.close();
  };

  const onPressListItem = (reason: string) => {
    handleTransferReason(selectedId, reason);
    closeReason();
  };

  const handleTransferReason = (id: number | string, value: string) => {
    setFormInstances((prevInstances) => {
      return prevInstances.map((instance) => (instance.id === id ? { ...instance, selectedItem: value } : instance));
    });
  };

  const getSelectedItem = () => {
    const selectedObject = formInstances?.find((item) => item?.id === selectedId);
    return selectedObject?.selectedItem;
  };

  const addForm = () => {
    goBack();
  };

  const { monthlyRemainingOutgoingAmount, dailyRemainingOutgoingAmount, dailyOutgoingLimit } = walletInfo.limitsDetails;
  const renderChip = () => {
    const monthlyRemaining = parseFloat(monthlyRemainingOutgoingAmount);
    const dailyRemaining = parseFloat(dailyRemainingOutgoingAmount);
    const updatedTopUpAmount = parseFloat(totalAmount);

    let chipValue = '';

    switch (true) {
      case updatedTopUpAmount > dailyRemaining && updatedTopUpAmount < monthlyRemaining:
        chipValue = `${localizationText.SEND_MONEY_FORM.LIMIT_EXCEEDES} ${dailyOutgoingLimit} SAR`;
        break;
      case updatedTopUpAmount > monthlyRemaining:
        chipValue = localizationText.SEND_MONEY_FORM.INSUFFICIENT_BALANCE;
        break;
      default:
        chipValue = '';
        break;
    }

    return (
      chipValue && (
        <IPayChip
          textValue={chipValue}
          variant={States.WARNING}
          isShowIcon
          containerStyle={styles.chipContainer}
          icon={
            <IPayIcon
              icon={chipValue === localizationText.TOP_UP.LIMIT_REACHED ? icons.warning : icons.shield_cross}
              color={colors.critical.critical800}
              size={16}
            />
          }
        />
      )
    );
  };

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

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title={localizationText.HOME.SEND_MONEY} applyFlex />
      <IPayView style={styles.inncerContainer}>
        <IPayTopUpBox
          availableBalance={formatNumberWithCommas(currentBalance)}
          isShowTopup
          isShowRemaining
          isShowProgressBar
          currentBalance={formatNumberWithCommas(currentBalance)}
          monthlyRemainingOutgoingBalance={formatNumberWithCommas(currentBalance)}
        />

        <IPaySendMoneyForm
          subtitle={selectedContacts[0].givenName}
          openReason={openReason}
          setAmount={handleAmountChange}
          showRemoveFormOption={showRemoveFormOption}
          addForm={addForm}
          formInstances={formInstances}
          notes={notes}
          setNotes={handleNotesChange}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <IPayLinearGradientView style={styles.buttonBackground}>
          <IPayList
            title={localizationText.SEND_MONEY_FORM.TOTAL_AMOUNT}
            rightText={
              <IPaySubHeadlineText
                regular
                color={colors.primary.primary800}
                text={`${totalAmount ? formatNumberWithCommas(totalAmount) : 0} ${localizationText.COMMON.SAR}`}
              />
            }
          />
          {renderChip()}
          <IPayButton
            disabled={totalAmount === 0}
            btnIconsDisabled
            medium
            btnType="primary"
            onPress={() =>
              navigate(ScreenNames.TRANSFER_SUMMARY, {
                variant: TransactionTypes.SEND_MONEY,
                data: { detail: formInstances, totalAmount },
              })
            }
            btnText={localizationText.COMMON.TRANSFER}
          />
        </IPayLinearGradientView>
      </IPayView>
      <IPayActionSheet
        ref={removeFormRef}
        title={removeFormOptions.title}
        showIcon={removeFormOptions.showIcon}
        customImage={removeFormOptions.customImage}
        message={removeFormOptions.message}
        options={removeFormOptions.options}
        cancelButtonIndex={removeFormOptions.cancelButtonIndex}
        showCancel={removeFormOptions.showCancel}
        destructiveButtonIndex={removeFormOptions.destructiveButtonIndex}
        onPress={removeFormOptions.onPress}
        bodyStyle={styles.alert}
      />
      <IPayBottomSheet
        heading={localizationText.SEND_MONEY_FORM.REASON_FOR_TRANSFER}
        onCloseBottomSheet={closeReason}
        customSnapPoint={['20%', '75%']}
        ref={reasonBottomRef}
        simpleHeader
        simpleBar
        cancelBnt
        doneBtn
        bold
      >
        <IPayListView
          list={transferReasonData}
          onPressListItem={onPressListItem}
          selectedListItem={getSelectedItem()}
        />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default SendMoneyFormScreen;
