import icons from '@app/assets/icons';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
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
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import openPhoneNumber from '@app/utilities/open-phone-number.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import IPayBeneficiariesSortSheet from '../../components/templates/ipay-beneficiaries-sort-sheet/beneficiaries-sort-sheet.component';
import { ActivateViewTypes } from '../add-beneficiary-success-message/add-beneficiary-success-message.enum';
import beneficiaryDummyData from '../international-transfer-info/international-transfer-info.constant';
import internationalTransferStyles from './internation-transfer.style';
import {
  internationalBeneficiaryData,
  tabOptions,
  westernUnionBeneficiaryData,
} from './international-transfer.constent';
import { BeneficiaryDetailsProps, ViewAllStatus } from './international-transfer.interface';

const InternationalTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = internationalTransferStyles(colors);
  const localizationText = useLocalization();
  const [activeTab, setActiveTab] = useState<string>(TransferGatewayType.ALINMA_DIRECT);
  const [search, setSearch] = useState<string>('');
  const beneficiariesToShow = 4;
  const [isBeneficiary, setIsBeneficiary] = useState<boolean>(false); // TODO will be handle on the basis of api
  const sortSheetRef = useRef<bottomSheetTypes>(null);
  const actionSheetRef = useRef<any>(null);
  const activateBeneficiary = useRef<bottomSheetTypes>(null);
  const [filteredBeneficiaryData, setFilteredBeneficiaryData] =
    useState<BeneficiaryDetailsProps[]>(internationalBeneficiaryData);
  const [viewAllState, setViewAllState] = useState({
    active: false,
    inactive: false,
  });
  const [sortedByActive, setSortedByActive] = useState<string>(InternationalBeneficiaryStatus.ACTIVE);
  const [currentOption, setCurrentOption] = useState<ActivateViewTypes>(ActivateViewTypes.ACTIVATE_OPTIONS);
  const [activateHeight, setActivateHeight] = useState(SNAP_POINTS.SMALL);
  const [selectedNumber, setSelectedNumber] = useState<string>('');

  const { contactList, guideStepsToCall, guideToReceiveCall } = useConstantData();
  const { showToast } = useToastContext();

  const onTransferAndActivate = (status: string) => {
    if (status === InternationalBeneficiaryStatus.ACTIVE) {
      navigate(ScreenNames.INTERNATIONAL_TRANSFER_INFO, { beneficiaryDummyData });
    } else {
      handleActivateBeneficiary();
    }
  };

  const renderBeneficiaryDetails = ({ item }: { item: BeneficiaryDetailsProps }) => {
    const { name, transferType, countryFlag, countryName, status } = item;
    return (
      <IPayList
        key={name.toString()}
        style={styles.listItem}
        title={name}
        subTitle={countryName}
        isShowSubTitle
        isShowLeftIcon
        centerContainerStyles={styles.listCenterContainer}
        adjacentSubTitle={transferType}
        regularTitle={false}
        leftIcon={<IPayImage style={styles.bankLogo} image={countryFlag} />}
        rightText={
          <IPayView style={styles.moreButton}>
            <IPayButton
              onPress={() => onTransferAndActivate(status)}
              btnText={
                status === InternationalBeneficiaryStatus.ACTIVE
                  ? localizationText.INTERNATIONAL_TRANSFER.TRANSFER
                  : localizationText.INTERNATIONAL_TRANSFER.ACTIVATE
              }
              btnType={buttonVariants.PRIMARY}
              small
              btnIconsDisabled
              btnStyle={styles.buttonStyle}
              btnColor={status === InternationalBeneficiaryStatus.INACTIVE ? colors.secondary.secondary100 : ''}
              textColor={status === InternationalBeneficiaryStatus.INACTIVE ? colors.secondary.secondary800 : ''}
            />
            <IPayIcon icon={icons.more_option} size={20} color={colors.natural.natural500} />
          </IPayView>
        }
      />
    );
  };

  const searchInBeneficiaries = (data: BeneficiaryDetailsProps[], searchText: string) => {
    const filteredData = data?.filter((item) => item?.name?.toLowerCase().includes(searchText.toLowerCase()));
    return setFilteredBeneficiaryData(filteredData);
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    if (activeTab === TransferGatewayType.ALINMA_DIRECT) {
      searchInBeneficiaries(internationalBeneficiaryData, text);
    } else {
      searchInBeneficiaries(westernUnionBeneficiaryData, text);
    }
  };

  const getBeneficiariesByStatus = (status: string) =>
    filteredBeneficiaryData?.filter((item) => item?.status === status);

  const renderListHeader = (isActive: string, count: number, totalCount: number) => {
    const statusText =
      isActive === InternationalBeneficiaryStatus.ACTIVE
        ? localizationText.COMMON.ACTIVE
        : localizationText.COMMON.INACTIVE;

    return totalCount ? (
      <IPayView style={styles.listHeader}>
        <IPayFootnoteText text={statusText} />
        <IPayFootnoteText text={`(${count} ${localizationText.HOME.OF} ${totalCount})`} />
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
          text={viewAllState[statusKey] ? localizationText.COMMON.CLOSE : localizationText.COMMON.VIEW_ALL}
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
    viewAll ? getBeneficiariesByStatus(isActive) : getBeneficiariesByStatus(isActive).slice(0, beneficiariesToShow);

  const onClearInput = () => {
    setSearch('');
    const data =
      activeTab === TransferGatewayType.ALINMA_DIRECT ? internationalBeneficiaryData : westernUnionBeneficiaryData;
    setFilteredBeneficiaryData(data);
  };

  const onSelectTab = (tab: string) => {
    setActiveTab(tab);
    setSearch('');
    if (tab === TransferGatewayType.ALINMA_DIRECT) {
      setFilteredBeneficiaryData(internationalBeneficiaryData);
    } else {
      setFilteredBeneficiaryData(westernUnionBeneficiaryData);
    }
  };

  const handleActivateBeneficiary = useCallback(() => {
    activateBeneficiary?.current?.present();
    setActivateHeight(SNAP_POINTS.SMALL);
    setCurrentOption(ActivateViewTypes.ACTIVATE_OPTIONS);
  }, []);

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

  const handleReceiveCall = useCallback(() => {
    setActivateHeight(SNAP_POINTS.LARGE);
    setCurrentOption(ActivateViewTypes.RECEIVE_CALL);
  }, []);

  const handleCallAlinma = useCallback(() => {
    setActivateHeight(SNAP_POINTS.LARGE);
    setCurrentOption(ActivateViewTypes.CALL_ALINMA);
  }, []);

  const renderCurrentOption = useMemo(() => {
    switch (currentOption) {
      case ActivateViewTypes.RECEIVE_CALL:
        return <IPayReceiveCall guideToReceiveCall={guideToReceiveCall} />;
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
    openPhoneNumber(value, colors, showToast, localizationText);
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

  const currentOptionText =
    currentOption === ActivateViewTypes.ACTIVATE_OPTIONS
      ? localizationText.ACTIVATE_BENEFICIARY.ACTIVATE_OPTIONS
      : localizationText.ACTIVATE_BENEFICIARY.CALL_TO_ACTIVATE;

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="international-transfer"
        backBtn
        title={localizationText.INTERNATIONAL_TRANSFER.INTERNATIONAL_TRANSFER}
        applyFlex
        titleStyle={styles.capitalizeTitle}
        rightComponent={
          <IPayPressable>
            <IPayView style={styles.headerRightContent}>
              <IPayIcon icon={icons.clock_1} size={20} color={colors.primary.primary500} />
              <IPaySubHeadlineText regular color={colors.primary.primary500} text={localizationText.COMMON.HISTORY} />
            </IPayView>
          </IPayPressable>
        }
      />
      <IPayView style={styles.gradientWrapper}>
        <IPayGradientList
          testID="price-calculator"
          leftIcon={<IPayIcon icon={icons.calculator1} size={24} color={colors.primary.primary500} />}
          title={localizationText.INTERNATIONAL_TRANSFER.PRICE_CALCULATOR}
          subTitle={localizationText.INTERNATIONAL_TRANSFER.CALCULATE_AND_DELIVERY}
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
                placeholder={localizationText.COMMON.SEARCH}
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
                            listBeneficiaries(viewAllState.active, InternationalBeneficiaryStatus.ACTIVE)?.length,
                            getBeneficiariesByStatus(InternationalBeneficiaryStatus.ACTIVE)?.length,
                          )
                        }
                        ListFooterComponent={() =>
                          renderFooter(
                            InternationalBeneficiaryStatus.ACTIVE,
                            getBeneficiariesByStatus(InternationalBeneficiaryStatus.ACTIVE)?.length,
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
                            listBeneficiaries(viewAllState.inactive, InternationalBeneficiaryStatus.INACTIVE)?.length,
                            getBeneficiariesByStatus(InternationalBeneficiaryStatus.INACTIVE)?.length,
                          )
                        }
                        ListFooterComponent={() =>
                          renderFooter(
                            InternationalBeneficiaryStatus.INACTIVE,
                            getBeneficiariesByStatus(InternationalBeneficiaryStatus.INACTIVE)?.length,
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
                  message={localizationText.LOCAL_TRANSFER.NO_BENEFICIARIES}
                  containerStyle={styles.noResult}
                  testID="no-result"
                />
                <IPayButton
                  testID="add-new-beneficiary"
                  btnText={localizationText.LOCAL_TRANSFER.ADD_NEW_BENEFICIARY}
                  medium
                  btnType={buttonVariants.PRIMARY}
                  btnStyle={styles.btnStyle}
                  onPress={() => setIsBeneficiary(!isBeneficiary)}
                  leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} size={18} />}
                />
              </IPayView>
            )}
          </IPayView>
          {filteredBeneficiaryData?.length ? (
            <IPayButton
              btnStyle={styles.addBeneficiaryBtn}
              btnText={localizationText.LOCAL_TRANSFER.ADD_NEW_BENEFICIARY}
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
        options={[`${localizationText.MENU.CALL} ${selectedNumber}`, localizationText.COMMON.CANCEL]}
        cancelButtonIndex={1}
        showCancel
        onPress={(index) => handleFinalAction(index, selectedNumber)}
        bodyStyle={styles.bodyStyle}
      />
    </IPaySafeAreaView>
  );
};

export default InternationalTransferScreen;
