import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult, SadadFooterComponent } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPaySadadBill } from '@app/components/organism';
import { BillsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import BILLS_MANAGEMENT_URLS from '@app/network/services/bills-management/bills-management.urls';
import deleteBill from '@app/network/services/bills-management/delete-bill/delete-bill.service';
import {
  GetSadadBillByStatusProps,
  PaymentInfoProps,
} from '@app/network/services/bills-management/get-sadad-bills-by-status/get-sadad-bills-by-status.interface';
import getSadadBillsByStatus from '@app/network/services/bills-management/get-sadad-bills-by-status/get-sadad-bills-by-status.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import {
  ApiResponseStatusType,
  APIResponseType,
  BillingStatus,
  BillsStatusTypes,
  buttonVariants,
  ToastTypes,
} from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SadadBillsActionSheet from './component/sadad-bills-action-sheet.component';
import { ActionSheetProps } from './component/sadad-bills-action-sheet.interface';
import sadadBillsStyles from './sadad-bills.style';

const SadadBillsScreen: React.FC = ({ route }) => {
  const { sadadBills } = route.params;
  const { colors } = useTheme();
  const styles = sadadBillsStyles();
  const localizationText = useLocalization();
  const [selectedTab, setSelectedTab] = useState<string>(BillsStatusTypes.ACTIVE_BILLS);
  const [activeBillsData, setActiveBillsData] = useState<BillsProps[]>([]);
  const [inactiveBillsData, setInactiveBillsData] = useState<BillsProps[]>([]);
  const [selectedBills, setSelectedBills] = useState<BillsProps[]>([]);
  const [selectedBillsId, setSelectedBillId] = useState<string | null>(null);
  const [selectedBillsCount, setSelectedBillsCount] = useState<number>(0);
  const sadadActionSheetRef = useRef<any>(null);
  const billToEditRef = useRef<any>({});
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [, setAPIError] = useState<string>('');
  const { showToast } = useToastContext();
  const tabs = [localizationText.SADAD.ACTIVE_BILLS, localizationText.SADAD.INACTIVE_BILLS];

  const getSelectedBillsCount = (billsData: BillsProps[]) => {
    const count = billsData.filter((bill) => bill.selected).length;
    setSelectedBillsCount(count);
  };

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
    const bills = activeBillsData.map((bill) =>
      bill.billId === billId ? { ...bill, selected: !bill.selected } : bill,
    );
    const newSelectedBills = bills.filter((bill) => bill.selected);
    setActiveBillsData(bills);
    setSelectedBills(newSelectedBills);
    getSelectedBillsCount(newSelectedBills);
  };

  const setDataForBills = (billsData: PaymentInfoProps[], tab: string) => {
    if (tab === BillsStatusTypes.ACTIVE_BILLS) {
      setActiveBillsData(billsData);
    } else {
      setInactiveBillsData(billsData);
    }
    getSelectedBillsCount(billsData);
  };

  useEffect(() => {
    setActiveBillsData(sadadBills);
    getSelectedBillsCount(sadadBills);
  }, []);

  const renderButtonText = () => {
    const selectedBillAmount = selectedBills?.reduce((acc, item) => acc + Number(item?.amount), 0);

    return `${localizationText.NEW_SADAD_BILLS.PAY_TOTAL_AMOUNT} (${selectedBillAmount})`;
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

  const handleDeleteBill = async (selectedBill: PaymentInfoProps) => {
    const { billNumOrBillingAcct, billerName, billId } = selectedBill;
    try {
      const deviceInfo = await getDeviceInfo();
      const prepareLoginPayload = {
        billNumOrBillingAcct,
        billId,
        billNickname: billerName,
        walletNumber,
        deviceInfo,
      };

      const apiResponse: any = await deleteBill(prepareLoginPayload);
      if (apiResponse.status.type === APIResponseType.SUCCESS) {
        setActiveBillsData((prevBillsData) => {
          const billToDelete = prevBillsData.find((bill) => bill.billId === selectedBillsId);
          const updatedBillsData = prevBillsData.filter((bill) => bill.billId !== selectedBillsId);

          renderToast({
            title: localizationText.SADAD.BILL_HAS_BEEN_DELETED,
            subTitle: billToDelete?.billDesc,
            toastType: ToastTypes.SUCCESS,
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
      toastType: ToastTypes.SUCCESS,
    });
    getBills(selectedTab);
  };

  const handelEditOrDelete = (index: number) => {
    if (index === 0) {
      const { id } = billToEditRef.current;
      navigate(ScreenNames.SADAD_EDIT_BILL_SCREEN, {
        billData: billToEditRef.current,
        setEditBillSuccessToast,
        billId: id,
      });
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
    // TODO: refactor codebase
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
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

  const onPressMoreOptions = (billId: string, item: PaymentInfoProps) => {
    setSelectedBillId(billId);
    billToEditRef.current = item;
    getActionSheetOptions();
  };

  const onPressFooterBtn = () => {
    const billPaymentDetails = selectedBills?.map((bill) => ({
      billerId: bill.billerId,
      billNumOrBillingAcct: bill.billNumOrBillingAcct,
      amount: Number(bill.amount),
      dueDateTime: bill.dueDateTime,
      billIdType: bill.billIdType, // TODO: not receiving this value from response
      billingCycle: bill.billCycle, // TODO: need to confirm where can I get this value
      billIndex: bill.billId,
      serviceDescription: bill.serviceDescription,
      billerName: bill.billerName,
      walletNumber,
      billNickname: bill.billDesc,
      billerIcon: BILLS_MANAGEMENT_URLS.GET_BILLER_IMAGE(bill.billerId),
    }));

    navigate(ScreenNames.BILL_PAYMENT_CONFIRMATION, {
      isPayOnly: true,
      showBalanceBox: false,
      billPaymentInfos: billPaymentDetails,
    });
  };

  const addStatusToData = async (newBills: PaymentInfoProps[]) => {
    const newData = newBills.map((element) => ({
      ...element,
      selected: false,
    }));
    return newData;
  };

  const getBills = async (tab: string) => {
    try {
      const payload: GetSadadBillByStatusProps = {
        walletNumber,
        billStatus: tab === BillsStatusTypes.ACTIVE_BILLS ? BillingStatus.ENABLED : BillingStatus.NOT_ENABLED,
        showloader: true,
      };
      const apiResponse: any = await getSadadBillsByStatus(payload);

      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          {
            const newBills = apiResponse?.response?.paymentInfoList || [];
            const updatedData = await addStatusToData(newBills);

            setDataForBills(updatedData, tab);
          }
          break;
        case apiResponse?.apiResponseNotOk:
          renderToast({
            title: localizationText.ERROR.API_ERROR_RESPONSE,
            toastType: ToastTypes.WARNING,
          });
          break;

        case ApiResponseStatusType.FAILURE:
          renderToast(apiResponse?.error);
          break;

        default:
          break;
      }
    } catch (error: any) {
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }

    // Fallback return if an error occurs
    return { data: [], hasMore: false };
  };

  const handleTabSelect = useCallback(
    (tab: string) => {
      getBills(tab);
      setSelectedTab(tab);
    },
    [selectedTab, sadadBills, activeBillsData, inactiveBillsData],
  );

  const sadadBillsData = useMemo(
    () => (selectedTab === BillsStatusTypes.ACTIVE_BILLS ? activeBillsData : inactiveBillsData),
    [sadadBills, activeBillsData, inactiveBillsData],
  );

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
        <IPayTabs tabs={tabs} onSelect={handleTabSelect} />
      </IPayView>
      {sadadBillsData?.length > 0 ? (
        <IPayView style={styles.container}>
          <IPayView style={styles.listView}>
            <IPayFlatlist
              testID="ipay-flatlist"
              data={sadadBillsData}
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
                  {index === activeBillsData.length - 1 && selectedBillsCount > 0 && (
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
                btnStyle={styles.btn}
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
