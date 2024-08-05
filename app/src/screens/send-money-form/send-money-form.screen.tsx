import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayLinearGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayList, IPayListView, IPayTopUpBox } from '@app/components/molecules';
import { IPayActionSheet, IPayBottomSheet, IPaySendMoneyForm } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import TRANSFERTYPE from '@app/enums/wallet-transfer.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useRef, useState } from 'react';
import { SendMoneyFormSheet, SendMoneyFormType, UserDatails } from './send-money-form.interface';
import sendMoneyFormStyles from './send-money-form.styles';

const SendMoneyFormScreen: React.FC = ({ route }) => {
  const { heading, from = TRANSFERTYPE.SEND_MONEY, selectedContacts } = route?.params || {};
  const { colors } = useTheme();
  const styles = sendMoneyFormStyles(colors);
  const localizationText = useLocalization();

  const [notes, setNotes] = useState<string>('');
  const { transferReasonData } = useConstantData();
  const [selectedItem, setSelectedItem] = useState<string>('');
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { currentBalance } = walletInfo; // TODO replace with orignal data
  const [amount, setAmount] = useState<number | string>('');
  const reasonBottomRef = useRef<bottomSheetTypes>(null);

  const openReason = () => {
    reasonBottomRef?.current?.present();
  };

  const closeReason = () => {
    reasonBottomRef?.current?.close();
  };

  const onPressListItem = (reason: string) => {
    setSelectedItem(reason);
    closeReason();
  };

  const buttonText: { [key: string]: string } = {
    [TRANSFERTYPE.SEND_MONEY]: localizationText.COMMON.TRANSFER,
    [TRANSFERTYPE.REQUEST_MONEY]: localizationText.REQUEST_MONEY.SEND_REQUEST,
  };

  const onSubmit = () => {
    switch (from) {
      case TRANSFERTYPE.SEND_MONEY:
        navigate(ScreenNames.TRANSFER_SUMMARY, { variant: TransactionTypes.SEND_MONEY });
        break;
      case TRANSFERTYPE.REQUEST_MONEY:
        navigate(ScreenNames.TRANSFER_SUMMARY, { variant: TransactionTypes.TRANSFER_SEND_MONEY });
        break;
      default:
        break;
    }
  };

  const renderItem = ({ item }: { item: UserDatails }) => {
    const { text } = item;
    return (
      <IPayList
        textStyle={styles.titleStyle}
        title={text}
        isShowIcon={selectedItem && selectedItem === text}
        icon={
          selectedItem &&
          selectedItem === text && (
            <IPayIcon icon={icons.tick_mark_default} size={20} color={colors.primary.primary500} />
          )
        }
        onPress={() => {
          closeReason();
          setSelectedItem(text);
        }}
      />
    );
  };
  const renderItemList = () => (
    <IPayFlatlist
      renderItem={renderItem}
      data={transferReasonData}
      keyExtractor={(item) => item.id.toString()}
      style={styles.listContainer}
    />
  );

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

  const showRemoveFormOption = useCallback((id: number) => {
    if (removeFormRef.current) {
      removeFormRef.current.formId = id;
      removeFormRef?.current?.show();
    }
  }, []);

  const removeForm = (id: number) => {
    setFormInstances(formInstances.filter((form) => form.id !== id));
  };

  const handleActionSheetPress = (index: number) => {
    if (index === formInstances.id) {
      // Assuming 0 is the index for the remove option
      const id = removeFormRef?.current?.formId;
      if (id !== undefined) {
        setFormInstances((prevFormInstances) => prevFormInstances.filter((form) => form.id !== id));
      }
    }

    removeFormRef?.current?.hide();
  };

  const addForm = () => {
    const newId = formInstances.length ? formInstances[formInstances.length - 1].id + 1 : 1;
    setFormInstances([...formInstances, { id: newId }]);
  };

  const { monthlyRemainingOutgoingAmount, dailyRemainingOutgoingAmount, dailyOutgoingLimit } = walletInfo.limitsDetails;
  const renderChip = () => {
    const monthlyRemaining = parseFloat(monthlyRemainingOutgoingAmount);
    const dailyRemaining = parseFloat(dailyRemainingOutgoingAmount);
    const updatedTopUpAmount = parseFloat(formatNumberWithCommas(amount));

    let chipValue = '';

    switch (true) {
      case updatedTopUpAmount > dailyRemaining && updatedTopUpAmount < monthlyRemaining:
        chipValue = `${localizationText.SEND_MONEY_FORM.LIMIT_EXCEEDES} ${dailyOutgoingLimit} SAR`;
        break;
      case updatedTopUpAmount > monthlyRemaining:
        chipValue = localizationText.SEND_MONEY.INSUFFICIENT_BALANCE;
        break;
      default:
        chipValue = '';
        break;
    }

    return chipValue;
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
      <IPayHeader backBtn title={heading} applyFlex />
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
          amount={amount}
          openReason={openReason}
          setAmount={setAmount}
          showRemoveFormOption={showRemoveFormOption}
          addForm={addForm}
          formInstances={formInstances}
          notes={notes}
          setNotes={setNotes}
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
                text={`${amount ? amount : 0} ${localizationText.COMMON.SAR}`}
              />
            }
          />
          {renderChip()}
          <IPayButton
            disabled={amount === '' || amount === 0}
            btnIconsDisabled
            medium
            btnType="primary"
            onPress={onSubmit}
            btnText={buttonText[from]}
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
        heading={localizationText.TRANSACTION_HISTORY.TRANSACTION_DETAILS}
        onCloseBottomSheet={closeReason}
        customSnapPoint={['20%', '75%']}
        ref={reasonBottomRef}
        simpleHeader
        simpleBar
        cancelBnt
        doneBtn
        bold
      >
        <IPayListView list={transferReasonData} onPressListItem={onPressListItem} selectedListItem={selectedItem} />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default SendMoneyFormScreen;
