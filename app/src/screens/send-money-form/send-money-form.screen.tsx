import icons from '@app/assets/icons';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import {
  IPayBalanceStatusChip,
  IPayButton,
  IPayHeader,
  IPayList,
  IPayListView,
  IPayTopUpBox,
} from '@app/components/molecules';
import { ListProps } from '@app/components/molecules/ipay-list-view/ipay-list-view.interface';
import { IPayActionSheet, IPayBottomSheet, IPaySendMoneyForm } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack, navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { IW2WFeesReq } from '@app/network/services/cards-management/wallet-to-wallet-fees/wallet-to-wallet-fees.interface';
import getWalletToWalletFees from '@app/network/services/cards-management/wallet-to-wallet-fees/wallet-to-wallet-fees.service';
import { IGetCoreLovPayload } from '@app/network/services/core/lov/get-lov.interface';
import { getCoreLov } from '@app/network/services/core/lov/get-lov.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import {
  IW2WActiveFriends,
  IW2WCheckActiveReq,
} from '@app/network/services/transfers/wallet-to-wallet-check-active/wallet-to-wallet-check-active.interface';
import walletToWalletCheckActive from '@app/network/services/transfers/wallet-to-wallet-check-active/wallet-to-wallet-check-active.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { TopupStatus, payChannel, spinnerVariant } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Contact } from 'react-native-contacts';
import { SendMoneyFormSheet, SendMoneyFormType } from './send-money-form.interface';
import sendMoneyFormStyles from './send-money-form.styles';

const SendMoneyFormScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = sendMoneyFormStyles(colors);
  const localizationText = useLocalization();
  const MAX_CONTACT = 5;
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [transferReasonData, setTransferReasonData] = useState<ListProps[]>([]);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { currentBalance, availableBalance } = walletInfo; // TODO replace with orignal data
  const route = useRoute();
  const { selectedContacts } = route.params;
  // const { transferReasonData } = useConstantData();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedId, setSelectedId] = useState<number | string>('');
  const reasonBottomRef = useRef<bottomSheetTypes>(null);
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const [activeFriends, setActiveFriends] = useState<IW2WActiveFriends[]>();
  const [warningStatus, setWarningStatus] = useState<string>('');
  let initialDataLoaded = {
    lovs: false,
    activeContacts: false,
  };

  const removeFormRef = useRef<SendMoneyFormSheet>(null);
  const [formInstances, setFormInstances] = useState<SendMoneyFormType[]>(
    selectedContacts?.map((contact, index) => ({
      id: index + 1,
      subtitle: contact.givenName,
      amount: '',
      notes: '',
      selectedItem: { id: '', text: '' },
      mobileNumber: contact.phoneNumbers[0].number,
    })),
  );

  const isContactHasWallet = (mobileNumber: string, activeWallets: IW2WActiveFriends[]): boolean => {
    const walletNumber = activeWallets?.filter((activeFriend) => activeFriend?.mobileNumber === mobileNumber)[0]
      ?.walletNumber;

    if (walletNumber == null || !walletNumber) {
      return false;
    }
    return true;
  };

  const getW2WActiveFriends = async () => {
    showSpinner({
      variant: spinnerVariant.DEFAULT,
      hasBackgroundColor: true,
    });
    const payload: IW2WCheckActiveReq = {
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      mobileNumbers: formInstances.map((item) => item.mobileNumber),
    };
    const apiResponse = await walletToWalletCheckActive(userInfo.walletNumber as string, payload);
    if (apiResponse.status.type === 'SUCCESS') {
      if (apiResponse.response?.friends) {
        setActiveFriends(apiResponse.response?.friends);
        setFormInstances((prevValue) =>
          prevValue.map((item) => ({
            ...item,
            hasWallet: isContactHasWallet(
              item?.mobileNumber as string,
              apiResponse?.response?.friends as IW2WActiveFriends[],
            ),
          })),
        );
      }
    }
    if (initialDataLoaded.lovs) {
      hideSpinner();
    } else {
      initialDataLoaded = { ...initialDataLoaded, activeContacts: true };
    }
  };

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
    if (initialDataLoaded.activeContacts) {
      hideSpinner();
    } else {
      initialDataLoaded = { ...initialDataLoaded, lovs: true };
    }
  };

  useEffect(() => {
    setContacts(selectedContacts);
  }, [selectedContacts]);

  useEffect(() => {
    getTransferreasonLovs();
    getW2WActiveFriends();
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
      if (selectedId !== '') {
        setFormInstances((prevFormInstances) => prevFormInstances.filter((form) => form.id !== selectedId));
      }
    }
    removeFormRef?.current?.hide();
    setSelectedId('');
    goBack();
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

  const isTransferButtonDisabled = () => {
    const hasValidAmount = totalAmount > 0;
    const hasValidReason = formInstances.every((instance) => instance.selectedItem?.id && instance.selectedItem?.text);
    // return !hasValidAmount || !hasValidReason;
    return false;
  };

  const addForm = () => {
    const newId = formInstances.length ? formInstances[formInstances.length - 1].id + 1 : 1;
    setFormInstances([...formInstances, { id: newId }]);
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

  const getW2WTransferFees = async () => {
    if (constants.MOCK_API_RESPONSE) {
      // Mock API response
      navigate(ScreenNames.TOP_UP_SUCCESS, {
        topupChannel: payChannel.WALLET,
        topupStatus: TopupStatus.SUCCESS,
        amount: totalAmount,
      });
      return;
    }

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
        data: {
          transfersDetails: { formInstances, fees: apiResponse?.response?.requests, activeFriends },
          totalAmount,
        },
      });
    }
    hideSpinner();
  };

  const onConfirm = () => {
    getW2WTransferFees();
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
  const history = () => {
    navigate(ScreenNames.TRANSACTIONS_HISTORY, {
      isShowTabs: true,
      isShowCard: false,
    });
  };
  return (
    <IPaySafeAreaView style={styles.container}>
      <>
        <IPayHeader
          backBtn
          title={localizationText.HOME.SEND_MONEY}
          rightComponent={
            <IPayPressable style={styles.history} onPress={history}>
              <IPayIcon icon={icons.clock_1} size={18} color={colors.primary.primary500} />
              <IPaySubHeadlineText
                text={localizationText.WALLET_TO_WALLET.HISTORY}
                regular
                color={colors.primary.primary500}
              />
            </IPayPressable>
          }
          applyFlex
        />
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
        <IPayView style={styles.inncerContainer}>
          <IPayTopUpBox
            availableBalance={formatNumberWithCommas(availableBalance)}
            isShowTopup
            isShowRemaining
            isShowProgressBar
            monthlyIncomingLimit={walletInfo.limitsDetails.monthlyIncomingLimit}
            monthlyRemainingIncommingAmount={walletInfo.limitsDetails.monthlyRemainingIncomingAmount}
          />

          {getContactInfoText()}
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
            <IPayBalanceStatusChip
              monthlySpendingLimit={Number(monthlyRemainingOutgoingAmount)}
              currentBalance={Number(currentBalance)}
              amount={totalAmount}
              setWarningStatus={setWarningStatus}
              dailySpendingLimit={Number(dailyOutgoingLimit)}
            />
            <IPayButton
              disabled={isTransferButtonDisabled() || !totalAmount || !getSelectedItem() || !!warningStatus}
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
          messageStyle={styles.messageStyle}
        />
        <IPayBottomSheet
          noGradient
          heading={localizationText.SEND_MONEY_FORM.REASON_FOR_TRANSFER}
          onCloseBottomSheet={closeReason}
          customSnapPoint={['20%', '75%']}
          ref={reasonBottomRef}
          simpleHeader
          simpleBar
          testID="reason-for-transfer-list"
          cancelBnt
          doneBtn
          bold
        >
          <IPayListView
            list={transferReasonData}
            onPressListItem={onPressListItem}
            selectedListItem={getSelectedItem()}
            cardContainerStyle={styles.reasonItemStyle}
            cardStyles={styles.reasonItemCardStyle}
          />
        </IPayBottomSheet>
      </>
    </IPaySafeAreaView>
  );
};

export default SendMoneyFormScreen;
