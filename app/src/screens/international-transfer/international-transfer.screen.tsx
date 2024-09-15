import icons from '@app/assets/icons';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayButton, IPayHeader, IPayList, IPayNoResult, IPayTextInput } from '@app/components/molecules';
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
import { SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { InternationalBeneficiaryStatus, TransferGatewayType } from '@app/enums/international-beneficiary-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  ActivationMethods,
  activateInternationalBeneficiary,
} from '@app/network/services/international-transfer/activate-international-beneficiary';
import getAlinmaExpressBeneficiaries from '@app/network/services/international-transfer/alinma-express-beneficiary/alinma-express-beneficiary.service';
import { deleteInternationalBeneficiary } from '@app/network/services/international-transfer/delete-international-beneficiary';
import { WesternUnionBeneficiary } from '@app/network/services/international-transfer/western-union-beneficiary/western-union-beneficiary.interface';
import getWesternUnionBeneficiaries from '@app/network/services/international-transfer/western-union-beneficiary/western-union-beneficiary.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { ViewAllStatus } from '@app/types/global.types';
import { ApiResponseStatusType, ToastTypes, alertType, alertVariant, buttonVariants } from '@app/utilities/enums.util';
import openPhoneNumber from '@app/utilities/open-phone-number.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Flag from 'react-native-round-flags';
import { useTranslation } from 'react-i18next';
import IPayBeneficiariesSortSheet from '../../components/templates/ipay-beneficiaries-sort-sheet/beneficiaries-sort-sheet.component';
import ActivateViewTypes from '../add-beneficiary-success-message/add-beneficiary-success-message.enum';
import internationalTransferStyles from './internation-transfer.style';
import { tabOptions } from './international-transfer.constent';
import { BeneficiaryDetailsProps } from './international-transfer.interface';

const InternationalTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = internationalTransferStyles(colors);
  const { t } = useTranslation();
  const localizationText = useLocalization();
  const [activeTab, setActiveTab] = useState<string>(TransferGatewayType.ALINMA_DIRECT);
  const [search, setSearch] = useState<string>('');
  const beneficiariesToShow = 4;
  const sortSheetRef = useRef<bottomSheetTypes>(null);
  const actionSheetRef = useRef<any>(null);
  const activateBeneficiary = useRef<bottomSheetTypes>(null);
  const [filteredBeneficiaryData, setFilteredBeneficiaryData] = useState<BeneficiaryDetailsProps[]>();
  const [viewAllState, setViewAllState] = useState({
    active: false,
    inactive: false,
  });
  const [sortedByActive, setSortedByActive] = useState<string>(InternationalBeneficiaryStatus.ACTIVE);
  const [currentOption, setCurrentOption] = useState<ActivateViewTypes>(ActivateViewTypes.ACTIVATE_OPTIONS);
  const [activateHeight, setActivateHeight] = useState(SNAP_POINTS.SMALL);
  const [selectedNumber, setSelectedNumber] = useState<string>('');
  const [, setNickName] = useState('');
  const [deleteBeneficiary, setDeleteBeneficiary] = useState<boolean>(false);
  const [selectedBeneficiary, setselectedBeneficiary] = useState<BeneficiaryDetailsProps>([]);
  const editBeneficiaryRef = useRef<any>(null);
  const [apiError, setAPIError] = useState<string>('');
  const [aeBeneficiaryData, setAEBeneficiaryData] = useState([]);
  const [wuBeneficiaryData, setWUBeneficiaryData] = useState([]);
  const { contactList, guideStepsToCall, guideToReceiveCall } = useConstantData();
  const { showToast } = useToastContext();

  useEffect(() => {
    setFilteredBeneficiaryData(aeBeneficiaryData);
  }, [aeBeneficiaryData]);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const getAEBeneficiariesData = async () => {
    try {
      const apiResponse = await getAlinmaExpressBeneficiaries();
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setAEBeneficiaryData(apiResponse?.response?.beneficiaries);
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(t('ERROR.API_ERROR_RESPONSE'));
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const getWUBeneficiariesData = async () => {
    try {
      const apiResponse = await getWesternUnionBeneficiaries();
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setWUBeneficiaryData(apiResponse?.response?.beneficiaries);
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(t('ERROR.API_ERROR_RESPONSE'));
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  useEffect(() => {
    getWUBeneficiariesData();
    getAEBeneficiariesData();
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
  }, []);

  const onPressMenuOption = (item: BeneficiaryDetailsProps) => {
    setNickName(item?.name ?? '');
    setselectedBeneficiary(item);
    setTimeout(() => {
      editBeneficiaryRef?.current?.show();
    }, 0);
  };
  const onDeleteCancel = () => {
    setDeleteBeneficiary(false);
  };

  const handleDeleteBeneficiary = async () => {
    try {
      const apiResponse = await deleteInternationalBeneficiary(selectedBeneficiary?.beneficiaryCode);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          showToast({
            title: t('BENEFICIARY_OPTIONS.BENEFICIARY_DELETED'),
            subTitle: `${selectedBeneficiary.fullName} | ${selectedBeneficiary?.beneficiaryBankDetail?.bankName}`,
            containerStyle: styles.toast,
            isShowRightIcon: false,
            leftIcon: <IPayIcon icon={icons.trashtransparent} size={24} color={colors.natural.natural0} />,
            toastType: ToastTypes.SUCCESS,
          });
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(t('ERROR.API_ERROR_RESPONSE'));
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
    setDeleteBeneficiary(false);
  };

  const renderBeneficiaryDetails = ({ item }: { item: WesternUnionBeneficiary }) => {
    const { remittanceTypeDesc, countryCode, countryDesc, beneficiaryStatus, fullName } = item;
    const country = countryCode ? countryCode.toUpperCase() : '';
    const btnText =
      beneficiaryStatus === InternationalBeneficiaryStatus.ACTIVE
        ? t('INTERNATIONAL_TRANSFER.TRANSFER')
        : t('INTERNATIONAL_TRANSFER.ACTIVATE');

    const onTransferAndActivate = (beneficiary: BeneficiaryDetailsProps) => {
      setselectedBeneficiary(beneficiary);
      if (beneficiaryStatus === InternationalBeneficiaryStatus.ACTIVE) {
        navigate(ScreenNames.INTERNATIONAL_TRANSFER_INFO, {
          transferData: item,
          transferGateway: activeTab,
        });
      } else {
        handleActivateBeneficiary();
      }
    };

    return (
      <IPayList
        key={fullName?.toString()}
        style={styles.listItem}
        title={fullName}
        subTitle={countryDesc}
        isShowSubTitle
        isShowLeftIcon
        centerContainerStyles={styles.listCenterContainer}
        adjacentSubTitle={remittanceTypeDesc}
        regularTitle={false}
        leftIcon={<Flag code={country} style={styles.countryImage} />}
        rightText={
          <IPayView style={styles.moreButton}>
            <IPayButton
              onPress={() => onTransferAndActivate(item)}
              btnText={btnText}
              btnType={buttonVariants.PRIMARY}
              small
              btnIconsDisabled
              btnStyle={styles.buttonStyle}
              btnColor={
                beneficiaryStatus === InternationalBeneficiaryStatus.INACTIVE ? colors.secondary.secondary100 : ''
              }
              textColor={
                beneficiaryStatus === InternationalBeneficiaryStatus.INACTIVE ? colors.secondary.secondary800 : ''
              }
            />
            <IPayPressable onPress={() => onPressMenuOption(item)}>
              <IPayIcon icon={icons.more_option} size={20} color={colors.natural.natural500} />
            </IPayPressable>
          </IPayView>
        }
      />
    );
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

  const getBeneficiariesByStatus = (status: string) =>
    filteredBeneficiaryData?.filter((item) => item?.beneficiaryStatus === status);

  const renderListHeader = (isActive: string, count: number, totalCount: number) => {
    const statusText = isActive === InternationalBeneficiaryStatus.ACTIVE ? t('COMMON.ACTIVE') : t('COMMON.INACTIVE');

    return totalCount ? (
      <IPayView style={styles.listHeader}>
        <IPayFootnoteText text={statusText} />
        <IPayFootnoteText text={`(${count} ${t('HOME.OF')} ${totalCount})`} />
      </IPayView>
    ) : (
      <IPayView />
    );
  };

  const renderFooter = (statusKey: ViewAllStatus, totalCount: number) =>
    totalCount > beneficiariesToShow ? (
      <IPayPressable
        style={styles.listFooter}
        onPress={() => setViewAllState((prev) => ({ ...prev, [statusKey]: !prev[statusKey] }))}
      >
        <IPaySubHeadlineText
          style={styles.capitalizeTitle}
          color={colors.primary.primary500}
          regular
          text={viewAllState[statusKey] ? t('COMMON.CLOSE') : localizationText.COMMON.VIEW_ALL}
        />
        <IPayIcon
          icon={viewAllState[statusKey] ? icons.arrowUp : icons.arrowDown}
          size={14}
          color={colors.primary.primary500}
        />
      </IPayPressable>
    ) : (
      <IPayView />
    );

  const listBeneficiaries = (viewAll: boolean, isActive: string) =>
    viewAll ? getBeneficiariesByStatus(isActive) : getBeneficiariesByStatus(isActive)?.slice(0, beneficiariesToShow);

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
      beneficiaryCode: selectedBeneficiary?.beneficiaryCode,
      activationMethod: ActivationMethods.IVR,
    };
    try {
      const apiResponse = await activateInternationalBeneficiary(activateBeneficiaryPayload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          return apiResponse?.status?.type;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          return '';
        default:
          return '';
      }
    } catch (error: any) {
      setAPIError(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
      return '';
    }
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
  }, [currentOption]);

  const hideContactUs = () => {
    actionSheetRef.current.hide();
  };

  const onPressCall = (value: string) => {
    openPhoneNumber({ phoneNumber: value, colors, showToast, translate: t });
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

  const currentOptionText =
    currentOption === ActivateViewTypes.ACTIVATE_OPTIONS
      ? t('ACTIVATE_BENEFICIARY.ACTIVATE_OPTIONS')
      : t('ACTIVATE_BENEFICIARY.CALL_TO_ACTIVATE');

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
          imageStyle={styles.tabImg}
          customStyles={styles.tabWrapper}
          tabsIcon={tabOptions}
          onSelect={onSelectTab}
          tabStyles={styles.tabStyles}
        />
        <IPayView style={styles.beneficiaryList}>
          <IPayView style={styles.listContentWrapper}>
            <IPayView style={styles.searchWrapper}>
              <IPayTextInput
                text={search}
                onChangeText={handleSearchChange}
                placeholder="COMMON.SEARCH"
                rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
                simpleInput
                showLeftIcon={search}
                style={styles.inputStyle}
                leftIcon={<IPayIcon icon={icons.crossIcon} color={colors.natural.natural700} size={20} />}
                containerStyle={styles.searchInputStyle}
                onClearInput={onClearInput}
                testID="transfer-search"
              />
              <IPayPressable onPress={() => sortSheetRef?.current?.present()}>
                <IPayIcon icon={icons.arrow_updown1} size={24} />
              </IPayPressable>
            </IPayView>
            {filteredBeneficiaryData?.length ? (
              <IPayView style={styles.listWrapper}>
                <IPayScrollView showsVerticalScrollIndicator={false}>
                  <IPayView
                    style={[
                      styles.activeInactiveListWrapper,
                      sortedByActive === InternationalBeneficiaryStatus.INACTIVE && styles.reverseList,
                    ]}
                  >
                    {!!getBeneficiariesByStatus(InternationalBeneficiaryStatus.ACTIVE)?.length && (
                      <IPayFlatlist
                        data={listBeneficiaries(viewAllState.active, InternationalBeneficiaryStatus.ACTIVE)}
                        renderItem={renderBeneficiaryDetails}
                        ListHeaderComponent={() =>
                          renderListHeader(
                            InternationalBeneficiaryStatus.ACTIVE,
                            listBeneficiaries(viewAllState.active, InternationalBeneficiaryStatus.ACTIVE)?.length ?? 0,
                            getBeneficiariesByStatus(InternationalBeneficiaryStatus.ACTIVE)?.length ?? 0,
                          )
                        }
                        ListFooterComponent={() =>
                          renderFooter(
                            InternationalBeneficiaryStatus.ACTIVE,
                            getBeneficiariesByStatus(InternationalBeneficiaryStatus.ACTIVE)?.length ?? 0,
                          )
                        }
                      />
                    )}
                    {!!getBeneficiariesByStatus(InternationalBeneficiaryStatus.INACTIVE)?.length && (
                      <IPayFlatlist
                        data={listBeneficiaries(viewAllState.inactive, InternationalBeneficiaryStatus.INACTIVE)}
                        renderItem={renderBeneficiaryDetails}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={() =>
                          renderListHeader(
                            InternationalBeneficiaryStatus.INACTIVE,
                            listBeneficiaries(viewAllState.inactive, InternationalBeneficiaryStatus.INACTIVE)?.length ??
                              0,
                            getBeneficiariesByStatus(InternationalBeneficiaryStatus.INACTIVE)?.length ?? 0,
                          )
                        }
                        ListFooterComponent={() =>
                          renderFooter(
                            InternationalBeneficiaryStatus.INACTIVE,
                            getBeneficiariesByStatus(InternationalBeneficiaryStatus.INACTIVE)?.length ?? 0,
                          )
                        }
                      />
                    )}
                  </IPayView>
                </IPayScrollView>
              </IPayView>
            ) : (
              <IPayView style={styles.noResultContainer}>
                <IPayNoResult
                  showIcon
                  icon={icons.user_search}
                  iconColor={colors.primary.primary800}
                  iconSize={40}
                  message="LOCAL_TRANSFER.NO_BENEFICIARIES"
                  containerStyle={styles.noResult}
                  testID="no-result"
                />
                <IPayButton
                  testID="add-new-beneficiary"
                  btnText="LOCAL_TRANSFER.ADD_NEW_BENEFICIARY"
                  medium
                  btnType={buttonVariants.PRIMARY}
                  btnStyle={styles.btnStyle}
                  onPress={handleAddNewBeneficiray}
                  leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} size={18} />}
                />
              </IPayView>
            )}
          </IPayView>
          {filteredBeneficiaryData?.length ? (
            <IPayButton
              onPress={handleAddNewBeneficiray}
              btnStyle={styles.addBeneficiaryBtn}
              btnText="LOCAL_TRANSFER.ADD_NEW_BENEFICIARY"
              btnType={buttonVariants.OUTLINED}
              large
              leftIcon={<IPayIcon icon={icons.add} size={24} color={colors.primary.primary500} />}
            />
          ) : (
            <IPayView />
          )}
        </IPayView>
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
          text: t('COMMON.CANCEL'),
          onPress: onDeleteCancel,
        }}
        secondaryAction={{
          text: t('COMMON.DELETE'),
          onPress: handleDeleteBeneficiary,
        }}
      />
      <IPayActionSheet
        ref={editBeneficiaryRef}
        options={[t('COMMON.CANCEL'), t('BENEFICIARY_OPTIONS.REVIEW_AND_EDIT'), t('BENEFICIARY_OPTIONS.DELETE')]}
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
