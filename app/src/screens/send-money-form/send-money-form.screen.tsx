import icons from '@app/assets/icons';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
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
import TRANSFERTYPE from '@app/enums/wallet-transfer.enum';
import { useKeyboardStatus } from '@app/hooks';
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
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { regex } from '@app/styles/typography.styles';
import { buttonVariants, PayChannel, TopupStatus } from '@app/utilities/enums.util';
import { formatNumberWithCommas, removeCommas } from '@app/utilities/number-helper.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SendMoneyFormSheet, SendMoneyFormType } from './send-money-form.interface';
import sendMoneyFormStyles from './send-money-form.styles';

const SendMoneyFormScreen: React.FC = () => {
  const { colors } = useTheme();
  const { isKeyboardWillOpen, isKeyboardOpen } = useKeyboardStatus();
  const styles = sendMoneyFormStyles(colors);
  const { t } = useTranslation();

  const route = useRoute();
  const { selectedContacts, from, heading, setSelectedContacts, showHistory, activeFriends } = route.params as any;

  const reasonBottomRef = useRef<bottomSheetTypes>(null);
  const removeFormRef = useRef<SendMoneyFormSheet>(null);

  const [, setSelectedItem] = useState<string>('');
  const [transferReason, setTransferReasonData] = useState<ListProps[]>([]);
  const [selectedId, setSelectedId] = useState<number | string>('');
  const [warningStatus, setWarningStatus] = useState<string>('');

  const isItemHasWallet = (mobile: string): boolean => {
    const walletNumber = activeFriends?.filter(
      (activeFriend: IW2WActiveFriends) => activeFriend?.mobileNumber === mobile,
    )[0]?.walletNumber;

    if (walletNumber == null || !walletNumber) {
      return false;
    }
    return true;
  };

  const [formInstances, setFormInstances] = useState<SendMoneyFormType[]>(
    selectedContacts?.map((contact: any, index: number) => ({
      id: index + 1,
      subtitle: contact.givenName,
      amount: '',
      notes: '',
      selectedItem: { id: '', text: '' },
      mobileNumber: contact.phoneNumbers[0].number,
      hasWallet: isItemHasWallet(contact.phoneNumbers[0].number),
    })),
  );

  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { availableBalance } = walletInfo; // TODO replace with orignal data

  const MAX_CONTACT = 5;

  const getTransferReasonLovs = async () => {
    const payload: IGetCoreLovPayload = {
      lovType: '184',
      lovCode2: 'W',
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
    };
    const apiResponse = await getCoreLov(payload);
    if (apiResponse?.status.type === 'SUCCESS') {
      if (apiResponse?.response?.lovInfo)
        setTransferReasonData(
          apiResponse?.response?.lovInfo.map((item) => ({
            id: item.recTypeCode,
            text: item.recDescription,
          })),
        );
    }
  };

  useEffect(() => {
    if (formInstances?.length === 0) goBack();
  }, [formInstances]);

  useEffect(() => {
    getTransferReasonLovs();
  }, []);

  const totalAmount = formInstances.reduce(
    // eslint-disable-next-line no-useless-escape
    (total, contact) => total + parseFloat(contact?.amount?.replace(/\,/g, '') || '0'),
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

  const handleAmountChange = (id: number, value: string | number) => {
    const newFormInstances = formInstances.map((instance) => {
      if (instance.id === id) {
        return { ...instance, amount: value as string };
      }
      return instance;
    });

    const newAmount = removeCommas(value.toString());
    const reg = regex.AMOUNT;
    if (reg.test(newAmount.toString()) || newAmount === '') {
      setFormInstances(newFormInstances);
    }
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
        setSelectedContacts(() =>
          selectedContacts.filter((_: string, selectedIndex: number) => selectedIndex + 1 !== selectedId),
        );
      }
    }
    removeFormRef?.current?.hide();
    if (formInstances.length === 0) {
      navigate(ScreenNames.WALLET_TRANSFER);
    }

    setSelectedId('');
  };

  const openReason = (id: string | number) => {
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
    return selectedObject?.selectedItem?.text;
  };

  const isTransferButtonDisabled = () => {
    // Check if the transfer type is REQUEST_MONEY
    if (from === TRANSFERTYPE.REQUEST_MONEY) {
      // Validate amount and reason
      const hasValidAmount = totalAmount > 0;
      return !hasValidAmount;
    }
    const hasValidAmount = totalAmount > 0;
    const hasValidReason = formInstances.every((instance) => instance.selectedItem?.id && instance.selectedItem?.text);
    return !hasValidAmount || !hasValidReason;
  };

  const addForm = () => {
    goBack();
  };

  const { monthlyRemainingOutgoingAmount, dailyOutgoingLimit } = walletInfo.limitsDetails;
  const removeFormOptions = {
    title: 'SEND_MONEY_FORM.REMOVE',
    showIcon: true,
    customImage: <IPayIcon icon={icons.TRASH} size={42} />,
    message: t('SEND_MONEY_FORM.REMOVE_DETAIL'),
    options: [t('PROFILE.REMOVE'), t('COMMON.CANCEL')],
    cancelButtonIndex: 1,
    showCancel: true,
    destructiveButtonIndex: 0,
    onPress: handleActionSheetPress,
  };

  const getW2WTransferFees = async (activeFriendsParam: IW2WActiveFriends[]) => {
    if (constants.MOCK_API_RESPONSE && from === TRANSFERTYPE.REQUEST_MONEY) {
      // Mock API response
      navigate(ScreenNames.TOP_UP_SUCCESS, {
        topupChannel: PayChannel.REQUEST,
        topupStatus: TopupStatus.SUCCESS,
        amount: totalAmount,
      });
      return;
    }

    const payload: IW2WFeesReq = {
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      requests: formInstances.map((item) => ({
        mobileNumber: item.mobileNumber,
        amount: +item.amount,
        note: item.notes,
        transferPurpose: item?.selectedItem?.id as string,
      })),
    };
    const apiResponse = await getWalletToWalletFees(walletInfo.walletNumber as string, payload);
    if (apiResponse) {
      navigate(ScreenNames.TRANSFER_SUMMARY, {
        variant: TransactionTypes.SEND_MONEY,
        data: {
          transfersDetails: { formInstances, fees: apiResponse?.response?.requests, activeFriends: activeFriendsParam },
          totalAmount,
        },
      });
    }
  };

  const getW2WActiveFriends = async () => {
    const payload: IW2WCheckActiveReq = {
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      mobileNumbers: formInstances.map((item) => item.mobileNumber),
    };
    const apiResponse = await walletToWalletCheckActive(walletInfo.walletNumber as string, payload);
    if (apiResponse.status.type === 'SUCCESS') {
      if (apiResponse.response?.friends) {
        getW2WTransferFees(apiResponse.response?.friends);
      }
    }
  };

  const onConfirm = () => {
    getW2WActiveFriends();
  };

  const getContactInfoText = () => {
    const selectedContactsCount = formInstances.length;
    return (
      <IPayView style={styles.contactInfoContainer}>
        <IPayFootnoteText
          regular={false}
          text={`${selectedContactsCount} ${t('HOME.OF')}`}
          color={colors.natural.natural900}
        />
        <IPayFootnoteText
          regular
          color={colors.natural.natural500}
          text={`${MAX_CONTACT} ${t('WALLET_TO_WALLET.CONTACTS')}`}
        />
      </IPayView>
    );
  };
  const history = () => {
    navigate(ScreenNames.TRANSACTIONS_HISTORY, {
      isW2WTransactions: true,
      isShowTabs: true,
      isShowCard: false,
      contacts: selectedContacts,
    });
  };
  const btnText = from === TRANSFERTYPE.REQUEST_MONEY ? 'REQUEST_MONEY.SENT_REQUEST' : 'LOCAL_TRANSFER.TRANSFER';
  return (
    <IPaySafeAreaView style={styles.container}>
      <>
        <IPayHeader
          backBtn
          title={heading}
          rightComponent={
            showHistory ? (
              <IPayPressable style={styles.history} onPress={history}>
                <IPayIcon icon={icons.clock_1} size={18} color={colors.primary.primary500} />
                <IPaySubHeadlineText text="WALLET_TO_WALLET.HISTORY" regular color={colors.primary.primary500} />
              </IPayPressable>
            ) : (
              <IPayView />
            )
          }
          applyFlex
        />
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
          {from === TRANSFERTYPE.REQUEST_MONEY ? (
            <IPaySendMoneyForm
              showReason={false}
              subtitle={selectedContacts[0].givenName}
              openReason={openReason}
              setAmount={handleAmountChange}
              showRemoveFormOption={showRemoveFormOption}
              addForm={addForm}
              formInstances={formInstances}
              setNotes={handleNotesChange}
              setSelectedItem={setSelectedItem}
            />
          ) : (
            <IPaySendMoneyForm
              showReason
              subtitle={selectedContacts[0].givenName}
              openReason={openReason}
              setAmount={handleAmountChange}
              showRemoveFormOption={showRemoveFormOption}
              addForm={addForm}
              formInstances={formInstances}
              setNotes={handleNotesChange}
              setSelectedItem={setSelectedItem}
            />
          )}
          {!isKeyboardWillOpen && !isKeyboardOpen && (
            <IPayLinearGradientView style={styles.buttonBackground}>
              <IPayList
                title="SEND_MONEY_FORM.TOTAL_AMOUNT"
                rightText={
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    text={`${totalAmount ? formatNumberWithCommas(totalAmount) : 0} ${t('COMMON.SAR')}`}
                  />
                }
              />
              <IPayBalanceStatusChip
                monthlySpendingLimit={Number(monthlyRemainingOutgoingAmount)}
                currentBalance={Number(availableBalance)}
                amount={totalAmount}
                setWarningStatus={setWarningStatus}
                dailySpendingLimit={Number(dailyOutgoingLimit)}
              />
              <IPayButton
                disabled={isTransferButtonDisabled() || !totalAmount || !!warningStatus}
                btnIconsDisabled
                medium
                btnType={buttonVariants.PRIMARY}
                onPress={onConfirm}
                btnText={btnText}
              />
            </IPayLinearGradientView>
          )}
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
          heading="SEND_MONEY_FORM.REASON_FOR_TRANSFER"
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
            list={transferReason}
            onPressListItem={onPressListItem}
            selectedListItem={getSelectedItem()}
            cardStyles={styles.reasonItemCardStyle}
          />
        </IPayBottomSheet>
      </>
    </IPaySafeAreaView>
  );
};

export default SendMoneyFormScreen;
