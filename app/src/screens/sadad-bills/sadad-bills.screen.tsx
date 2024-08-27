import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult, SadadFooterComponent } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPaySadadBill } from '@app/components/organism';
import { BillDetailsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import { ACTIVE_SADAD_BILLS, INACTIVEACTIVE_SADAD_BILLS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import deleteBill from '@app/network/services/sadad-bill/delete-bill/delete-bill.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType, BillsStatusTypes, buttonVariants, toastTypes } from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SadadBillsActionSheet from './component/sadad-bills-action-sheet.component';
import { ActionSheetProps } from './component/sadad-bills-action-sheet.interface';
import sadadBillsStyles from './sadad-bills.style';

const SadadBillsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = sadadBillsStyles();
  const localizationText = useLocalization();
  const [selectedTab, setSelectedTab] = useState<string>(BillsStatusTypes.ACTIVE_BILLS);
  const [billsData, setBillsData] = useState<BillDetailsProps[]>([]);
  const [selectedBills, setSelectedBills] = useState<BillDetailsProps[]>([]);
  const [selectedBillsId, setSelectedBillId] = useState<number | null>(null);
  const sadadActionSheetRef = useRef<any>(null);
  const billToEditRef = useRef<any>({});
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const [apiError, setAPIError] = useState<string>('');
  const { showToast } = useToastContext();
  const tabs = [localizationText.SADAD.ACTIVE_BILLS, localizationText.SADAD.INACTIVE_BILLS];
  const selectedBillsCount = useMemo(
    () => billsData.filter((bill) => bill.selected).length,
    [billsData, ACTIVE_SADAD_BILLS],
  );
  const multipleBillsSelected = selectedBillsCount > 1;

  const onPressAddNewBill = () => navigate(ScreenNames.ADD_NEW_SADAD_BILLS);
  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title,
        subTitle,
        toastType,
        isShowRightIcon: false,
        leftIcon: icon || <IPayIcon icon={icons.trash} size={18} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };

  const onSelectBill = (billId: string | number) => {
    const bills = billsData.map((bill) => (bill.id === billId ? { ...bill, selected: !bill.selected } : bill));
    const newSelectedBills = bills.filter((bill) => bill.selected);
    setBillsData(bills);
    setSelectedBills(newSelectedBills);
  };

  const handleTabSelect = useCallback(
    (tab: string) => {
      if (tab === BillsStatusTypes.ACTIVE_BILLS) {
        setBillsData(ACTIVE_SADAD_BILLS);
      } else {
        setBillsData(INACTIVEACTIVE_SADAD_BILLS);
      }
      setSelectedTab(tab);
    },
    [selectedTab, ACTIVE_SADAD_BILLS],
  );

  useEffect(() => {
    handleTabSelect(selectedTab);
  }, []);

  const renderButtonText = () => {
    const selectedBillAmount = selectedBills?.reduce((acc, item) => acc + Number(item?.billAmount), 0);

    return multipleBillsSelected
      ? `${localizationText.NEW_SADAD_BILLS.PAY_TOTAL_AMOUNT} (${selectedBillAmount})`
      : localizationText.SADAD.COMPLETE_PAYMENT;
  };

  const onPressPartialPay = () => navigate(ScreenNames.ADD_NEW_SADAD_BILLS, { selectedBills, isPayPartially: true });

  const renderButtonRightIcon = () =>
    !multipleBillsSelected ? (
      <IPayIcon icon={icons.rightArrow} size={20} color={colors.natural.natural0} />
    ) : (
      <IPayView />
    );

  const showActionSheet = () => {
    setTimeout(() => {
      sadadActionSheetRef?.current?.show();
    }, 0);
  };

  const handleDeleteBill = async (selectedBill: BillDetailsProps) => {
    const { accountNumber, vendor, id } = selectedBill;
    try {
      const deviceInfo = await getDeviceInfo();
      const prepareLoginPayload = {
        billNumOrBillingAcct: accountNumber,
        billId: id,
        billNickname: vendor,
        walletNumber: walletNumber,
        deviceInfo,
      };

      const apiResponse: any = await deleteBill(prepareLoginPayload);
      if (apiResponse.status.type === APIResponseType.SUCCESS) {
        setBillsData((prevBillsData) => {
          const billToDelete = prevBillsData.find((bill) => bill.id === selectedBillsId);
          const updatedBillsData = prevBillsData.filter((bill) => bill.id !== selectedBillsId);

          renderToast({
            title: localizationText.SADAD.BILL_HAS_BEEN_DELETED,
            subTitle: billToDelete?.billTitle,
            toastType: toastTypes.SUCCESS,
          });

          return updatedBillsData;
        });
      }
    } catch (error) {
      setAPIError(localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const handleActionSheetPress = (index: number) => {
    if (index === 0 && selectedTab === BillsStatusTypes.INACTIVE_BILLS) {
      navigate(ScreenNames.BILL_ACTIVATION);
      return;
    }
    if (index === 0) {
      handleDeleteBill(billToEditRef.current);
    }
    sadadActionSheetRef?.current?.hide();
  };

  const setEditBillSuccessToast = (billSubTitle: string) => {
    renderToast({
      title: localizationText.SADAD.INVOICE_UPDATED_SUCCESSFULLY,
      subTitle: billSubTitle,
      icon: <IPayIcon icon={icons.tick_square} size={24} color={colors.natural.natural0} />,
      toastType: toastTypes.SUCCESS,
    });
  };

  const handelEditOrDelete = (index: number) => {
    if (index === 0) {
      navigate(ScreenNames.SADAD_EDIT_BILL_SCREEN, { billData: billToEditRef.current, setEditBillSuccessToast });
    } else {
      setActionSheetOptions(deleteBillOptions);
    }
    sadadActionSheetRef?.current?.hide();
    showActionSheet();
  };

  const deleteBillOptions = {
    title: localizationText.SADAD.DELETE_NEW_BILL,
    showIcon: true,
    customImage: <IPayIcon icon={icons.TRASH} size={42} />,
    message: localizationText.SADAD.DELETE_BILL_WARNING_TEXT,
    options: [localizationText.COMMON.DELETE, localizationText.COMMON.CANCEL],
    cancelButtonIndex: 1,
    showCancel: true,
    destructiveButtonIndex: 0,
    onPress: handleActionSheetPress,
    styles: styles.actionSheetStyles,
  };

  const editOrDeletedBillOptions = {
    options: [localizationText.PROFILE.EDIT, localizationText.COMMON.DELETE, localizationText.COMMON.CANCEL],
    cancelButtonIndex: 2,
    showCancel: true,
    destructiveButtonIndex: 1,
    onPress: handelEditOrDelete,
  };

  const activeBillOptions = {
    title: localizationText.SADAD.ACTIVATE_BILL,
    showIcon: true,
    customImage: <IPayIcon icon={icons.receipt_add} size={48} color={colors.primary.primary500} />,
    message: localizationText.SADAD.ACTIVATE_BILL_MESSAGE,
    options: [localizationText.SADAD.ACTIVATE, localizationText.COMMON.CANCEL],
    cancelButtonIndex: 1,
    showCancel: true,
    onPress: handleActionSheetPress,
    styles: styles.actionSheetStyles,
  };

  const [actionSheetOptions, setActionSheetOptions] = useState<ActionSheetProps>(
    selectedTab === BillsStatusTypes.ACTIVE_BILLS ? editOrDeletedBillOptions : activeBillOptions,
  );

  const getActionSheetOptions = () => {
    if (selectedTab === BillsStatusTypes.ACTIVE_BILLS) {
      setActionSheetOptions(editOrDeletedBillOptions);
    } else {
      setActionSheetOptions(activeBillOptions);
    }
    showActionSheet();
  };

  const onPressMoreOptions = (billId: number, item: BillDetailsProps) => {
    setSelectedBillId(billId);
    billToEditRef.current = item;
    getActionSheetOptions();
  };

  const onPressFooterBtn = () => {
    navigate(ScreenNames.BILL_PAYMENT_CONFIRMATION);
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        applyFlex
        title={localizationText.SADAD.SADAD_BILLS}
        titleStyle={styles.screenTitle}
        rightComponent={
          <IPayButton
            small
            onPress={onPressAddNewBill}
            btnType={buttonVariants.LINK_BUTTON}
            btnText={localizationText.COMMON.NEW}
            rightIcon={<IPayIcon icon={icons.add_square} size={20} color={colors.primary.primary500} />}
          />
        }
      />
      <IPayView style={styles.headerStyle}>
        <IPayTabs customStyles={styles.tabWrapper} tabs={tabs} onSelect={handleTabSelect} />
      </IPayView>
      {billsData?.length > 0 ? (
        <IPayView style={styles.container}>
          <IPayView style={styles.listView}>
            <IPayFlatlist
              testID="ipay-flatlist"
              data={billsData}
              keyExtractor={(_, index) => index.toString()}
              itemSeparatorStyle={styles.itemSeparatorStyle}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <IPayView>
                  <IPaySadadBill
                    billDetails={item}
                    onSelectBill={onSelectBill}
                    onPressMoreOptions={(id) => onPressMoreOptions(id, item)}
                    showCheckBox={selectedTab === BillsStatusTypes.ACTIVE_BILLS}
                  />
                  {index === billsData.length - 1 && selectedBillsCount > 0 && (
                    <IPayView
                      style={selectedBillsCount > 1 ? styles.listBottomConditionalView : styles.listBottomView}
                    />
                  )}
                </IPayView>
              )}
            />
          </IPayView>
          {selectedBillsCount > 0 && (
            <IPayView style={styles.footerView}>
              <SadadFooterComponent
                btnText={renderButtonText()}
                selectedItemsCount={selectedBillsCount}
                onPressBtn={onPressFooterBtn}
                btnRightIcon={renderButtonRightIcon()}
                partialPay={multipleBillsSelected}
                onPressPartialPay={onPressPartialPay}
              />
            </IPayView>
          )}
        </IPayView>
      ) : (
        <IPayView style={styles.noResultView}>
          <IPayNoResult
            showIcon
            icon={icons.note_remove}
            iconColor={colors.primary.primary800}
            iconSize={40}
            iconViewStyles={styles.noResultIconView}
            message={localizationText.SADAD.NO_ACTIVE_BILLS}
          />
          <IPayButton
            medium
            btnType={buttonVariants.PRIMARY}
            btnText={localizationText.SADAD.ADD_NEW_BILL}
            btnStyle={styles.addNewBillBtn}
            onPress={() => navigate(ScreenNames.ADD_NEW_SADAD_BILLS)}
            leftIcon={<IPayIcon icon={icons.add_square} size={18} color={colors.natural.natural0} />}
          />
        </IPayView>
      )}
      <SadadBillsActionSheet ref={sadadActionSheetRef} actionSheetOptions={actionSheetOptions} />
    </IPaySafeAreaView>
  );
};

export default SadadBillsScreen;
