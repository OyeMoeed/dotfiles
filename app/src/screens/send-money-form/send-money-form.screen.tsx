import icons from '@app/assets/icons';
import { IPayIcon, IPayLinearGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayButton, IPayChip, IPayHeader, IPayList, IPayListView, IPayTopUpBox } from '@app/components/molecules';
import { ListProps } from '@app/components/molecules/ipay-list-view/ipay-list-view.interface';
import { IPayActionSheet, IPayBottomSheet, IPaySendMoneyForm } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack, navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { IW2WFeesReq } from '@app/network/services/cards-management/wallet-to-wallet-fees/wallet-to-wallet-fees.interface';
import getWalletToWalletFees from '@app/network/services/cards-management/wallet-to-wallet-fees/wallet-to-wallet-fees.service';
import { IGetCoreLovPayload } from '@app/network/services/core/lov/get-lov.interface';
import { getCoreLov } from '@app/network/services/core/lov/get-lov.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { States, spinnerVariant } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SendMoneyFormSheet, SendMoneyFormType } from './send-money-form.interface';
import sendMoneyFormStyles from './send-money-form.styles';

const SendMoneyFormScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = sendMoneyFormStyles(colors);
  const localizationText = useLocalization();
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [transferReasonData, setTransferReasonData] = useState<ListProps[]>([]);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { currentBalance } = walletInfo; // TODO replace with orignal data
  const route = useRoute();
  const { selectedContacts } = route.params;
  const [selectedId, setSelectedId] = useState<number | string>('');
  const reasonBottomRef = useRef<bottomSheetTypes>(null);
  const { showSpinner, hideSpinner } = useSpinnerContext();

  const removeFormRef = useRef<SendMoneyFormSheet>(null);
  const [formInstances, setFormInstances] = useState<SendMoneyFormType[]>(
    selectedContacts.map((contact, index) => ({
      id: index + 1,
      subtitle: contact.givenName,
      amount: '',
      notes: '',
      selectedItem: { id: '', text: '' },
      mobileNumber: contact.phoneNumbers[0].number,
    })),
  );

  const getTransferreasonLovs = async () => {
    showSpinner({
      variant: spinnerVariant.DEFAULT,
      hasBackgroundColor: true,
    });
    const payload: IGetCoreLovPayload = {
      lovType: '184',
      lovCode2: 'W',
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
    };
    const apiResponse = await getCoreLov(payload);
    if (apiResponse.status.type === 'SUCCESS') {
      if (apiResponse?.response?.lovInfo)
        setTransferReasonData(
          apiResponse?.response?.lovInfo.map((item) => ({
            id: item.recTypeCode,
            text: item.recDescription,
          })),
        );
    }
    hideSpinner();
  };

  useEffect(() => {
    getTransferreasonLovs();
  }, []);

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

  const handleTransferReason = (id: number | string, value: { id: number | string; text: string }) => {
    setFormInstances((prevInstances) =>
      prevInstances.map((instance) => (instance.id === id ? { ...instance, selectedItem: value } : instance)),
    );
  };

  const onPressListItem = (reason: { id: number | string; text: string }) => {
    handleTransferReason(selectedId, reason);
    closeReason();
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

  const getW2WTransferFees = async () => {
    showSpinner({
      variant: spinnerVariant.DEFAULT,
      hasBackgroundColor: true,
    });
    const payload: IW2WFeesReq = {
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      requests: formInstances.map((item) => ({
        mobileNumber: item.mobileNumber,
        amount: +item.amount,
        note: item.notes,
        transferPurpose: item.selectedItem.id as string,
      })),
    };
    const apiResponse = await getWalletToWalletFees(userInfo.walletNumber as string, payload);
    if (apiResponse.status.type === 'SUCCESS') {
      navigate(ScreenNames.TRANSFER_SUMMARY, {
        variant: TransactionTypes.SEND_MONEY,
        data: { transfersDetails: { formInstances, fees: apiResponse?.response?.requests }, totalAmount },
      });
    }
    hideSpinner();
  };

  const onConfirm = () => {
    getW2WTransferFees();
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
          notes=""
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
            onPress={onConfirm}
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