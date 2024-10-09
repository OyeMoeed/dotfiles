/* eslint-disable @typescript-eslint/no-use-before-define */
import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult, SadadFooterComponent } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPaySadadBill } from '@app/components/organism';
import { BillsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { InActivateBillProps } from '@app/network/services/bills-management/activate-bill/activate-bill.interface';
import activateBill from '@app/network/services/bills-management/activate-bill/activate-bill.service';
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
  APIResponseType,
  ApiResponseStatusType,
  BillingStatus,
  BillsStatusTypes,
  ToastTypes,
  buttonVariants,
} from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SadadBillsActionSheet from './component/sadad-bills-action-sheet.component';
import { ActionSheetProps } from './component/sadad-bills-action-sheet.interface';
import { SadadBillsScreenProps } from './sadad-bills.interface';
import sadadBillsStyles from './sadad-bills.style';

const SadadBillsScreen: React.FC<SadadBillsScreenProps> = ({ route }) => {
  const { sadadBills } = route.params;
  const { colors } = useTheme();
  const styles = sadadBillsStyles();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<string>(BillsStatusTypes.ACTIVE_BILLS);
  const [activeBillsData, setActiveBillsData] = useState<BillsProps[]>([]);
  const [inactiveBillsData, setInactiveBillsData] = useState<BillsProps[]>([]);
  const [selectedBills, setSelectedBills] = useState<BillsProps[]>([]);
  const [selectedBillsId, setSelectedBillId] = useState<string | null>(null);
  const [selectedBillsCount, setSelectedBillsCount] = useState<number>(0);
  const sadadActionSheetRef = useRef<any>(null);
  const billToEditRef = useRef<any>({});
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);
  const { showToast } = useToastContext();
  const tabs = [t('SADAD.ACTIVE_BILLS'), t('SADAD.INACTIVE_BILLS')];

  const getSelectedBillsCount = (billsData: BillsProps[]) => {
    const count = billsData.filter((bill) => bill.selected).length;
    setSelectedBillsCount(count);
  };

  const multipleBillsSelected = selectedBillsCount >= 1;

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
    if (sadadBills) {
      setActiveBillsData(sadadBills);
      getSelectedBillsCount(sadadBills);
    } else {
      getBills(BillsStatusTypes.ACTIVE_BILLS);
    }
  }, []);

  const billPaymentDetails = selectedBills?.map((bill) => ({
    billerId: bill.billerId,
    billNumOrBillingAcct: bill.billNumOrBillingAcct,
    billAmount: Number(bill.amount || 0),
    amount: Number(bill.amount || 0),
    dueDateTime: bill.dueDateTime,
    billIdType: bill.billIdType,
    billingCycle: bill.billCycle,
    billIndex: bill.billId,
    serviceDescription: bill.serviceDescription,
    billerName: bill.billerName,
    walletNumber,
    billNickname: bill.billDesc,
    billerIcon: BILLS_MANAGEMENT_URLS.GET_BILLER_IMAGE(bill.billerId),
  }));

  const selectedBillAmount = selectedBills?.reduce((acc, item) => acc + Number(item?.amount || 0), 0);
  const renderButtonText = () => `${t('NEW_SADAD_BILLS.PAY_TOTAL_AMOUNT')} (${selectedBillAmount})`;

  const onPressPartialPay = () =>
    navigate(ScreenNames.NEW_SADAD_BILL, {
      selectedBills,
      isPayPartially: true,
      saveBill: true,
      billDetailsList: billPaymentDetails,
      totalAmount: selectedBillAmount,
    });

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
      const billToDelete = activeBillsData.find((bill) => bill.billId === selectedBillsId);
      getBills(selectedTab).then(() => {
        renderToast({
          title: 'SADAD.BILL_HAS_BEEN_DELETED',
          subTitle: billToDelete?.billDesc,
          toastType: ToastTypes.SUCCESS,
        });
      });
    }
  };

  const redirectToBillActivation = (selectedBill: PaymentInfoProps) => {
    const {
      billNumOrBillingAcct,
      billerName,
      billIdType,
      billerId,
      billDesc,
      serviceDescription,
      svcType,
      dueDateTime,
      amount,
    } = selectedBill;
    const headerAttributes = {
      title: billDesc,
      companyDetails: billerName,
      companyImage: BILLS_MANAGEMENT_URLS.GET_BILLER_IMAGE(billerId),
    };
    const billPaymentInfos = {
      billerId,
      billNumOrBillingAcct,
      serviceType: svcType,
      billIdType,
      serviceDescription,
      billerName,
      billNickname: billDesc,
      billerIcon: BILLS_MANAGEMENT_URLS.GET_BILLER_IMAGE(billerId),
    };
    const billPaymentData = [
      {
        id: '1',
        label: 'PAY_BILL.SERVICE_TYPE',
        value: svcType,
      },
      {
        id: '2',
        label: 'PAY_BILL.ACCOUNT_NUMBER',
        value: billNumOrBillingAcct,
      },
      {
        id: '3',
        label: 'COMMON.DUE_DATE',
        value: dueDateTime,
      },
      {
        id: '4',
        label: 'PAY_BILL.AMOUNT',
        value: amount,
      },
    ];

    sadadActionSheetRef?.current?.hide();
    navigate(ScreenNames.BILL_ACTIVATION, {
      headerAttributes,
      billPaymentInfos,
      billPaymentData,
    });
  };

  const activeteSelectedBill = async (selectedBill: PaymentInfoProps) => {
    const { billNumOrBillingAcct, billerName, billIdType, billerId, billDesc } = selectedBill;
    const deviceInfo = await getDeviceInfo();
    const payload: InActivateBillProps = {
      deviceInfo,
      billNumOrBillingAcct,
      billIdType,
      billerId,
      billerName,
      walletNumber,
      billNickname: billDesc,
    };
    const apiResponse: any = await activateBill(payload);
    if (apiResponse.status.type === APIResponseType.SUCCESS) {
      redirectToBillActivation(selectedBill);
    }
  };

  const handleActionSheetPress = (index: number) => {
    if (index === 0 && t(selectedTab) === BillsStatusTypes.INACTIVE_BILLS) {
      activeteSelectedBill(billToEditRef.current);
      return;
    }
    if (index === 0) {
      handleDeleteBill(billToEditRef.current);
    }
    sadadActionSheetRef?.current?.hide();
  };

  const setEditBillSuccessToast = (billSubTitle: string) => {
    renderToast({
      title: 'SADAD.INVOICE_UPDATED_SUCCESSFULLY',
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
    } else if (index === 1) {
      setActionSheetOptions(deleteBillOptions);
    }
    sadadActionSheetRef?.current?.hide();
    showActionSheet();
  };

  const deleteBillOptions = {
    title: 'SADAD.DELETE_NEW_BILL',
    showIcon: true,
    customImage: <IPayIcon icon={icons.TRASH} size={42} />,
    message: 'SADAD.DELETE_BILL_WARNING_TEXT',
    options: ['COMMON.DELETE', 'COMMON.CANCEL'],
    cancelButtonIndex: 1,
    showCancel: true,
    destructiveButtonIndex: 0,
    onPress: handleActionSheetPress,
    styles: styles.actionSheetStyles,
  };

  const editOrDeletedBillOptions = {
    options: ['PROFILE.EDIT', 'COMMON.DELETE', 'COMMON.CANCEL'],
    cancelButtonIndex: 2,
    showCancel: true,
    destructiveButtonIndex: 1,
    // TODO: refactor codebase
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onPress: handelEditOrDelete,
  };

  const activeBillOptions = {
    title: 'SADAD.ACTIVATE_BILL',
    showIcon: true,
    customImage: <IPayIcon icon={icons.receipt_add} size={48} color={colors.primary.primary500} />,
    message: 'SADAD.ACTIVATE_BILL_MESSAGE',
    options: ['SADAD.ACTIVATE', 'COMMON.CANCEL'],
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
    navigate(ScreenNames.BILL_PAYMENT_CONFIRMATION, {
      isPayOnly: true,
      showBalanceBox: true,
      saveBill: true,
      billPaymentInfos: { billPaymentDetails, totalAmount: selectedBillAmount },
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
    const payload: GetSadadBillByStatusProps = {
      walletNumber,
      billStatus: tab === BillsStatusTypes.ACTIVE_BILLS ? BillingStatus.ENABLED : BillingStatus.NOT_ENABLED,
      showloader: true,
    };
    const apiResponse: any = await getSadadBillsByStatus(payload);

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      const newBills = apiResponse?.response?.paymentInfoList || [];
      const updatedData = await addStatusToData(newBills);
      setDataForBills(updatedData, tab);
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

  const allHaveDueDate = useMemo(() => selectedBills.every((item) => item.amount), [selectedBills]);

  const handlePress = () => {
    if (allHaveDueDate) {
      onPressFooterBtn();
    } else {
      onPressPartialPay();
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        applyFlex
        title="SADAD.SADAD_BILLS"
        titleStyle={styles.screenTitle}
        rightComponent={
          <IPayButton
            small
            onPress={onPressAddNewBill}
            btnType={buttonVariants.LINK_BUTTON}
            btnText="COMMON.NEW"
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
                onPressBtn={handlePress}
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
            message="SADAD.NO_ACTIVE_BILLS"
          />
          <IPayButton
            medium
            btnType={buttonVariants.PRIMARY}
            btnText="SADAD.ADD_NEW_BILL"
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
