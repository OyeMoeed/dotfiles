import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayHeader } from '@app/components/molecules';
import IPayGradientList from '@app/components/molecules/ipay-gradient-list/ipay-gradient-list.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import {
  IPayActionSheet,
  IPayActivateBeneficiary,
  IPayActivationCall,
  IPayBottomSheet,
  IPayReceiveCall,
} from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayInternationalBeneficiaryList from '@app/components/templates/ipay-international-beneficiary-list/ipay-international-beneficiary-list.component';
import { SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { InternationalBeneficiaryStatus, TransferGatewayType } from '@app/enums/international-beneficiary-status.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  ActivationMethods,
  activateInternationalBeneficiary,
} from '@app/network/services/international-transfer/activate-international-beneficiary';
import useGetAlinmaExpressBeneficiary from '@app/network/services/international-transfer/alinma-express-beneficiary/alinma-express-beneficiary.hook';
import { deleteInternationalBeneficiary } from '@app/network/services/international-transfer/delete-international-beneficiary';
import useGetWesternUnionBeneficiaries from '@app/network/services/international-transfer/western-union-beneficiary/westren-union-beneficiary.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, ToastTypes, alertType, alertVariant } from '@app/utilities/enums.util';
import openPhoneNumber from '@app/utilities/open-phone-number.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageStyle } from 'react-native';
import IPayBeneficiariesSortSheet from '../../components/templates/ipay-beneficiaries-sort-sheet/beneficiaries-sort-sheet.component';
import ActivateViewTypes from '../add-beneficiary-success-message/add-beneficiary-success-message.enum';
import internationalTransferStyles from './internation-transfer.style';
import { tabOptions } from './international-transfer.constent';
import { BeneficiaryDetailsProps } from './international-transfer.interface';

const InternationalTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = internationalTransferStyles(colors);
  const { t } = useTranslation();

  const sortSheetRef = useRef<bottomSheetTypes>(null);
  const actionSheetRef = useRef<any>(null);
  const activateBeneficiary = useRef<bottomSheetTypes>(null);

  const [activeTab, setActiveTab] = useState<string>(TransferGatewayType.ALINMA_DIRECT);
  const [search, setSearch] = useState<string>('');
  const [filteredBeneficiaryData, setFilteredBeneficiaryData] = useState<BeneficiaryDetailsProps[]>([]);

  const [sortedByActive, setSortedByActive] = useState<string>(InternationalBeneficiaryStatus.ACTIVE);
  const [currentOption, setCurrentOption] = useState<ActivateViewTypes>(ActivateViewTypes.ACTIVATE_OPTIONS);
  const [activateHeight, setActivateHeight] = useState(SNAP_POINTS.SMALL);
  const [selectedNumber, setSelectedNumber] = useState<string>('');
  const [, setNickName] = useState('');
  const [deleteBeneficiary, setDeleteBeneficiary] = useState<boolean>(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryDetailsProps>();
  const editBeneficiaryRef = useRef<any>(null);

  const { contactList, guideStepsToCall, guideToReceiveCall } = useConstantData();
  const { showToast } = useToastContext();

  const { data: aeBeneficiaryData, isLoading: isLoadingAeBeneficiaries } = useGetAlinmaExpressBeneficiary({
    onSuccess: (data) => {
      setFilteredBeneficiaryData(data?.beneficiaries);
    },
  });

  const { data: wuBeneficiaryData, isLoading: isLoadingWuBeneficiaries } = useGetWesternUnionBeneficiaries();

  useEffect(() => {
    if (activeTab === TransferGatewayType.ALINMA_DIRECT && aeBeneficiaryData) {
      setFilteredBeneficiaryData(aeBeneficiaryData);
    }
  }, []);

  const handleActivateBeneficiary = useCallback(() => {
    activateBeneficiary?.current?.present();
    setActivateHeight(SNAP_POINTS.SMALL);
    setCurrentOption(ActivateViewTypes.ACTIVATE_OPTIONS);
  }, []);

  const handleDelete = () => {
    setDeleteBeneficiary(true);
    editBeneficiaryRef.current.hide();
  };

  const handleOnEditNickName = () => {
    editBeneficiaryRef.current.hide();
    navigate(ScreenNames.EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER, { selectedBeneficiary });
  };

  const handleBeneficiaryActions = useCallback((index: number) => {
    switch (index) {
      case 1:
        handleOnEditNickName();
        break;
      case 2:
        handleDelete();
        break;
      default:
        editBeneficiaryRef.current.hide();
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressMenuOption = (item: BeneficiaryDetailsProps) => {
    setNickName(item?.nickname ?? '');
    setSelectedBeneficiary(item);
    setTimeout(() => {
      editBeneficiaryRef?.current?.show();
    }, 0);
  };

  const onDeleteCancel = () => {
    setDeleteBeneficiary(false);
  };

  const handleDeleteBeneficiary = async () => {
    const apiResponse = await deleteInternationalBeneficiary(selectedBeneficiary?.beneficiaryCode || '');
    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      showToast({
        title: 'BENEFICIARY_OPTIONS.BENEFICIARY_DELETED',
        subTitle: `${selectedBeneficiary?.fullName} | ${selectedBeneficiary?.beneficiaryBankDetail?.bankName}`,
        containerStyle: styles.toast,
        isShowRightIcon: false,
        leftIcon: <IPayIcon icon={icons.trashtransparent} size={24} color={colors.natural.natural0} />,
        toastType: ToastTypes.SUCCESS,
      });
    }
    setDeleteBeneficiary(false);
  };

  const searchInBeneficiaries = (data: BeneficiaryDetailsProps[], searchText: string) => {
    const filteredData = data?.filter((item) => item?.fullName?.toLowerCase().includes(searchText.toLowerCase()));
    return setFilteredBeneficiaryData(filteredData);
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    if (activeTab === TransferGatewayType.ALINMA_DIRECT) {
      searchInBeneficiaries(aeBeneficiaryData, text);
    } else {
      searchInBeneficiaries(wuBeneficiaryData, text);
    }
  };

  const onClearInput = () => {
    setSearch('');
    const data = activeTab === TransferGatewayType.ALINMA_DIRECT ? aeBeneficiaryData : wuBeneficiaryData;
    setFilteredBeneficiaryData(data);
  };

  const onSelectTab = (tab: string) => {
    setActiveTab(tab);
    setSearch('');
    if (tab === TransferGatewayType.ALINMA_DIRECT) {
      setFilteredBeneficiaryData(aeBeneficiaryData);
    } else {
      setFilteredBeneficiaryData(wuBeneficiaryData);
    }
  };
  const onPressPriceCalculator = () => {
    navigate(ScreenNames.PRICE_CALCULATOR);
  };
  const handleAddNewBeneficiray = () => {
    navigate(ScreenNames.ADD_INTERNATIONAL_BENEFICIARY);
  };

  const showActionSheet = (phoneNumber: string) => {
    setSelectedNumber(phoneNumber);
    activateBeneficiary?.current?.close();
    setTimeout(() => {
      actionSheetRef.current.show();
    }, 500);
  };

  const closeActivateBeneficiary = useCallback(() => {
    activateBeneficiary?.current?.close();
  }, []);

  const handleCallAlinma = useCallback(() => {
    setActivateHeight(SNAP_POINTS.LARGE);
    setCurrentOption(ActivateViewTypes.CALL_ALINMA);
  }, []);

  const onPressActivateBeneficiary = async () => {
    const activateBeneficiaryPayload = {
      beneficiaryCode: selectedBeneficiary?.beneficiaryCode || '',
      activationMethod: ActivationMethods.IVR,
    };

    const apiResponse = await activateInternationalBeneficiary(activateBeneficiaryPayload);
    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      return apiResponse?.status?.type;
    }

    return '';
  };

  const handleReceiveCall = useCallback(async () => {
    const repsonse = await onPressActivateBeneficiary();
    if (repsonse === ApiResponseStatusType.SUCCESS) {
      setActivateHeight(SNAP_POINTS.LARGE);
      setCurrentOption(ActivateViewTypes.RECEIVE_CALL);
    }
  }, []);

  const renderCurrentOption = useMemo(() => {
    switch (currentOption) {
      case ActivateViewTypes.RECEIVE_CALL:
        return (
          <IPayReceiveCall
            activateInternationalBeneficiary={onPressActivateBeneficiary}
            guideToReceiveCall={guideToReceiveCall}
          />
        );
      case ActivateViewTypes.CALL_ALINMA:
        return (
          <IPayActivationCall contactList={contactList} guideStepsToCall={guideStepsToCall} close={showActionSheet} />
        );
      default:
        return <IPayActivateBeneficiary handleReceiveCall={handleReceiveCall} handleCallAlinma={handleCallAlinma} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOption]);

  const hideContactUs = () => {
    actionSheetRef.current.hide();
  };

  const onPressCall = (value: string) => {
    openPhoneNumber({ phoneNumber: value, colors, showToast });
    hideContactUs();
  };

  const handleFinalAction = useCallback((index: number, value: string) => {
    switch (index) {
      case 0:
        onPressCall(value);
        break;
      case 1:
        hideContactUs();
        break;
      default:
        break;
    }
  }, []);

  const onPressHistory = () => {
    navigate(ScreenNames.INTERNATIONAL_TRANSFER_HISTORY);
  };

  const handlePressSortButton = () => {
    sortSheetRef?.current?.present();
  };

  const currentOptionText =
    currentOption === ActivateViewTypes.ACTIVATE_OPTIONS
      ? 'ACTIVATE_BENEFICIARY.ACTIVATE_OPTIONS'
      : 'ACTIVATE_BENEFICIARY.CALL_TO_ACTIVATE';

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="international-transfer"
        backBtn
        title="INTERNATIONAL_TRANSFER.INTERNATIONAL_TRANSFER"
        applyFlex
        titleStyle={styles.capitalizeTitle}
        rightComponent={
          <IPayPressable onPress={onPressHistory}>
            <IPayView style={styles.headerRightContent}>
              <IPayIcon icon={icons.clock_1} size={20} color={colors.primary.primary500} />
              <IPaySubHeadlineText regular color={colors.primary.primary500} text="COMMON.HISTORY" />
            </IPayView>
          </IPayPressable>
        }
      />
      <IPayView style={styles.gradientWrapper}>
        <IPayGradientList
          onPress={onPressPriceCalculator}
          testID="price-calculator"
          leftIcon={<IPayIcon icon={icons.calculator1} size={24} color={colors.primary.primary500} />}
          title="INTERNATIONAL_TRANSFER.PRICE_CALCULATOR"
          subTitle="INTERNATIONAL_TRANSFER.CALCULATE_AND_DELIVERY"
          rightIcon={<IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary500} />}
        />
      </IPayView>
      <IPayView style={styles.contentContainer}>
        <IPayTabs
          imageStyle={styles.tabImg as ImageStyle}
          customStyles={styles.tabWrapper}
          tabsIcon={tabOptions}
          onSelect={onSelectTab}
          tabStyles={styles.tabStyles}
        />

        <IPayInternationalBeneficiaryList
          search={search}
          handleSearchChange={handleSearchChange}
          onClearInput={onClearInput}
          filteredBeneficiaryData={filteredBeneficiaryData}
          handlePressSortButton={handlePressSortButton}
          sortedByActive={sortedByActive}
          setSelectedBeneficiary={setSelectedBeneficiary}
          handleActivateBeneficiary={handleActivateBeneficiary}
          activeTab={activeTab}
          onPressMenuOption={onPressMenuOption}
          handleAddNewBeneficiary={handleAddNewBeneficiray}
          isLoading={
            activeTab === TransferGatewayType.ALINMA_DIRECT ? isLoadingAeBeneficiaries : isLoadingWuBeneficiaries
          }
        />
      </IPayView>
      <IPayBeneficiariesSortSheet
        sortSheetRef={sortSheetRef}
        setSortByActive={setSortedByActive}
        sortByActive={sortedByActive}
      />
      <IPayBottomSheet
        heading={currentOptionText}
        onCloseBottomSheet={closeActivateBeneficiary}
        customSnapPoint={activateHeight}
        ref={activateBeneficiary}
        simpleHeader
        simpleBar
        bold
        cancelBnt
      >
        <IPayView style={styles.sheetContainerStyles}>{renderCurrentOption}</IPayView>
      </IPayBottomSheet>
      <IPayActionSheet
        ref={actionSheetRef}
        options={[`${t('MENU.CALL')} ${selectedNumber}`, t('COMMON.CANCEL')]}
        cancelButtonIndex={1}
        showCancel
        onPress={(index) => handleFinalAction(index, selectedNumber)}
        bodyStyle={styles.bodyStyle}
      />
      <IPayAlert
        visible={deleteBeneficiary}
        onClose={onDeleteCancel}
        title="BENEFICIARY_OPTIONS.DELETE_BENFICIARY"
        message="BENEFICIARY_OPTIONS.DELETION_CONFIRMATION"
        type={alertType.SIDE_BY_SIDE}
        closeOnTouchOutside
        variant={alertVariant.DESTRUCTIVE}
        icon={<IPayIcon icon={icons.TRASH} size={64} />}
        showIcon={false}
        primaryAction={{
          text: 'COMMON.CANCEL',
          onPress: onDeleteCancel,
        }}
        secondaryAction={{
          text: 'COMMON.DELETE',
          onPress: handleDeleteBeneficiary,
        }}
      />
      <IPayActionSheet
        ref={editBeneficiaryRef}
        options={['COMMON.CANCEL', 'BENEFICIARY_OPTIONS.REVIEW_AND_EDIT', 'BENEFICIARY_OPTIONS.DELETE']}
        cancelButtonIndex={0}
        destructiveButtonIndex={2}
        showIcon={false}
        showCancel
        bodyStyle={styles.actionSheetStyle}
        onPress={(index) => handleBeneficiaryActions(index)}
      />
    </IPaySafeAreaView>
  );
};

export default InternationalTransferScreen;
