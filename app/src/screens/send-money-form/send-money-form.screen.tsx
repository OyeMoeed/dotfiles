import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayList, IPayListView, IPayTopUpBox } from '@app/components/molecules';
import { IPayActionSheet, IPayBottomSheet, IPaySendMoneyForm } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { SendMoneyFormSheet, SendMoneyFormType, UserDatails } from './send-money-form.interface';
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
  const [formInstances, setFormInstances] = useState<SendMoneyFormType[]>([{ id: 1 }]);

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
    if (index === 0) {
      removeForm(removeFormRef?.current?.formId || 0);
    }

    removeFormRef?.current?.hide();
  };

  const addForm = () => {
    const newId = formInstances.length ? formInstances[formInstances.length - 1].id + 1 : 1;
    setFormInstances([...formInstances, { id: newId }]);
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
          subtitle={selectedContacts.givenName}
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
          <IPayButton
            disabled={amount === '' || amount === 0}
            btnIconsDisabled
            medium
            btnType="primary"
            onPress={() => navigate(ScreenNames.TRANSFER_SUMMARY, { variant: TransactionTypes.SEND_MONEY })}
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
