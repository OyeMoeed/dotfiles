import icons from '@app/assets/icons';
import { IPayIcon, IPayPaginatedFlatlist, IPayView } from '@app/components/atoms';
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
import { BillProps, GetSadadBillProps } from '@app/network/services/bills/get-sadad-bills/get-sadad-bills.interface';
import getSadadBills from '@app/network/services/bills/get-sadad-bills/get-sadad-bills.service';
import deleteBill from '@app/network/services/sadad-bill/delete-bill/delete-bill.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import {
  ApiResponseStatusType,
  APIResponseType,
  BillsStatusTypes,
  buttonVariants,
  toastTypes,
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
  const [selectedBillsId, setSelectedBillId] = useState<number | null>(null);
  const sadadActionSheetRef = useRef<any>(null);
  const billToEditRef = useRef<any>({});
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const [apiError, setAPIError] = useState<string>('');
  const { showToast } = useToastContext();
  const tabs = [localizationText.SADAD.ACTIVE_BILLS, localizationText.SADAD.INACTIVE_BILLS];

  const selectedBillsCount = useMemo(
    () =>
      (selectedTab === BillsStatusTypes.ACTIVE_BILLS ? activeBillsData : inactiveBillsData).filter(
        (bill) => bill.selected,
      ).length,
    [activeBillsData, sadadBills, inactiveBillsData],
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
    const bills = activeBillsData.map((bill) =>
      bill.billIndex === billId ? { ...bill, selected: !bill.selected } : bill,
    );
    const newSelectedBills = bills.filter((bill) => bill.selected);
    setActiveBillsData(bills);
    setSelectedBills(newSelectedBills);
  };

  const handleTabSelect = useCallback(
    (tab: string, billsData?: BillProps[]) => {
      if (tab === BillsStatusTypes.ACTIVE_BILLS) {
        setActiveBillsData((billsData || activeBillsData).filter((bill) => bill.active));
      } else {
        setInactiveBillsData((billsData || inactiveBillsData).filter((bill) => !bill.active));
      }
      setSelectedTab(tab);
    },
    [selectedTab, sadadBills, activeBillsData, inactiveBillsData],
  );

  const setDataForBills = (billsData: BillProps[]) => {
    setActiveBillsData(billsData.filter((bill: BillProps) => bill.active));
    setInactiveBillsData(billsData.filter((bill: BillProps) => !bill.active));
  };

  useEffect(() => {
    setDataForBills(sadadBills);
    handleTabSelect(selectedTab, sadadBills);
  }, []);

  const renderButtonText = () => {
    const selectedBillAmount = selectedBills?.reduce((acc, item) => acc + Number(item?.dueAmount), 0);

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
        setActiveBillsData((prevBillsData) => {
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
      const { id } = billToEditRef.current;
      navigate(ScreenNames.SADAD_EDIT_BILL_SCREEN, {
        billData: id,
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

  const onPressMoreOptions = (billId: number, item: BillProps) => {
    setSelectedBillId(billId);
    billToEditRef.current = item;
    getActionSheetOptions();
  };

  const onPressFooterBtn = () => {
    navigate(ScreenNames.BILL_PAYMENT_CONFIRMATION, {
      isPayOnly: true,
      showBalanceBox: false,
      billPaymentInfos: selectedBills?.map((el) => ({
        billerId: el.biller.billerId,
        billNumOrBillingAcct: el.billAccountNumber,
        amount: Number(el.dueAmount),
        dueDateTime: el.dueDateTime,
        billIdType: '1', // TODO: not receiving this value from response
        billingCycle: '1', // TODO: need to confirm where can I get this value
        billIndex: el.billIndex,
        serviceDescription: el.biller.billerCategoryDesc,
        billerName: el.biller.billerDesc,
        walletNumber,
        billNickname: el.nickName,
        billerIcon: el.biller.categoryImageURL,
      })),
    });
  };

  const addStatusToData = async (newBills: BillProps[]) => {
    const newData = newBills.map((element) => ({
      ...element,
      selected: false,
    }));
    return newData;
  };

  const getBills = async (page: number, pageSize: number): Promise<{ data: BillsProps[]; hasMore: boolean }> => {
    try {
      const payload: GetSadadBillProps = {
        filterType: 'payment',
        offset: page,
        maxRecords: pageSize,
        showloader: true,
      };

      const apiResponse: any = await getSadadBills(payload);

      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS: {
          const newBills = apiResponse?.response?.bills || [];
          const updatedData = await addStatusToData(newBills);

          // Pagination logic
          const start = (page - 1) * pageSize;
          const end = page * pageSize;
          const paginatedData = updatedData.slice(start, end);

          const hasMore = updatedData.length > end;

          // Update state with paginated data
          if (page === 1) {
            // Reset data if it's the first page
            setDataForBills(paginatedData);
          } else {
            // Append to existing data for subsequent pages
            const combinedData = [...activeBillsData, ...inactiveBillsData, ...paginatedData];
            setDataForBills(combinedData);
          }

          // Return paginated data and hasMore flag
          return { data: paginatedData, hasMore };
        }

        case apiResponse?.apiResponseNotOk:
          renderToast({
            title: localizationText.ERROR.API_ERROR_RESPONSE,
            toastType: toastTypes.WARNING,
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
        <IPayTabs customStyles={styles.tabWrapper} tabs={tabs} onSelect={handleTabSelect} />
      </IPayView>
      {sadadBillsData?.length > 0 ? (
        <IPayView style={styles.container}>
          <IPayView style={styles.listView}>
            <IPayPaginatedFlatlist
              testID="ipay-flatlist"
              externalData={sadadBillsData}
              itemSeparatorStyle={styles.itemSeparatorStyle}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <IPayView>
                  <IPaySadadBill
                    billDetails={item}
                    onSelectBill={onSelectBill}
                    onPressMoreOptions={(id) => onPressMoreOptions(Number(id), item)}
                    showCheckBox={selectedTab === BillsStatusTypes.ACTIVE_BILLS}
                  />
                  {index === activeBillsData.length - 1 && selectedBillsCount > 0 && (
                    <IPayView
                      style={selectedBillsCount > 1 ? styles.listBottomConditionalView : styles.listBottomView}
                    />
                  )}
                </IPayView>
              )}
              fetchData={getBills}
            />
            {/* <IPayFlatlist
              testID="ipay-flatlist"
              data={sadadBillsData}
              keyExtractor={(_, index) => index.toString()}
              itemSeparatorStyle={styles.itemSeparatorStyle}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <IPayView>
                  <IPaySadadBill
                    billDetails={item}
                    onSelectBill={onSelectBill}
                    onPressMoreOptions={(id) => onPressMoreOptions(Number(id), item)}
                    showCheckBox={selectedTab === BillsStatusTypes.ACTIVE_BILLS}
                  />
                  {index === activeBillsData.length - 1 && selectedBillsCount > 0 && (
                    <IPayView
                      style={selectedBillsCount > 1 ? styles.listBottomConditionalView : styles.listBottomView}
                    />
                  )}
                </IPayView>
              )}
            /> */}
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
