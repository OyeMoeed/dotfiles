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
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayButton, IPayHeader, IPayList, IPayNoResult, IPayTextInput } from '@app/components/molecules';
import IPayGradientList from '@app/components/molecules/ipay-gradient-list/ipay-gradient-list.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { InternationalBeneficiaryStatus, TransferGatewayType } from '@app/enums/international-beneficiary-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { BeneficiaryTypes, alertType, alertVariant, buttonVariants, toastTypes } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useRef, useState } from 'react';
import IPayBeneficiariesSortSheet from '../../components/templates/ipay-beneficiaries-sort-sheet/beneficiaries-sort-sheet.component';
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
  const beneficiariesToShow = 2;
  const [isBeneficiary, setIsBeneficiary] = useState<boolean>(false); // TODO will be handle on the basis of api
  const sortSheetRef = useRef<bottomSheetTypes>(null);
  const [filteredBeneficiaryData, setFilteredBeneficiaryData] =
    useState<BeneficiaryDetailsProps[]>(internationalBeneficiaryData);
  const [viewAllState, setViewAllState] = useState({
    active: false,
    inactive: false,
  });
  const [sortedByActive, setSortedByActive] = useState<boolean>(true);
  const [nickName, setNickName] = useState('');
  //more options
  const { showToast } = useToastContext();
  const [deleteBeneficiary, setDeleteBeneficiary] = useState<boolean>(false);
  const [selectedBeneficiary, setselectedBeneficiary] = useState<BeneficiaryDetailsProps>([]);
  const editBeneficiaryRef = useRef<any>(null);

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
  const handleDelete = () => {
    setDeleteBeneficiary(true);
    editBeneficiaryRef.current.hide();
  };

  const handleOnEditNickName = () => {
    editBeneficiaryRef.current.hide();
    navigate(ScreenNames.EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER);
  };
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

  const showDeleteBeneficiaryToast = () => {
    setDeleteBeneficiary(false);
    showToast({
      title: localizationText.BENEFICIARY_OPTIONS.BENEFICIARY_DELETED,
      subTitle: `${nickName} | ${selectedBeneficiary?.beneficiaryBankDetail?.bankName}`,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.trashtransparent} size={24} color={colors.natural.natural0} />,
      toastType: toastTypes.SUCCESS,
    });
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
              onPress={() => navigate(ScreenNames.INTERNATIONAL_TRANSFER_INFO, { beneficiaryDummyData })}
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
            <IPayPressable onPress={() => onPressMenuOption(item)}>
              <IPayIcon icon={icons.more_option} size={20} color={colors.natural.natural500} />
            </IPayPressable>
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

  const getBeneficiariesByStatus = (status: boolean) =>
    filteredBeneficiaryData?.filter((item) => item?.active === status);

  const renderListHeader = (isActive: boolean, count: number, totalCount: number) =>
    totalCount ? (
      <IPayView style={styles.listHeader}>
        <IPayFootnoteText text={isActive ? localizationText.COMMON.ACTIVE : localizationText.COMMON.INACTIVE} />
        <IPayFootnoteText text={`(${count} ${localizationText.HOME.OF} ${totalCount})`} />
      </IPayView>
    ) : (
      <IPayView />
    );

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

  const listBeneficiaries = (viewAll: boolean, isActive: boolean) =>
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
  const gotoScreenCalculator = () => {
    navigate(ScreenNames.PRICE_CALCULATOR);
  };
  const handleAddNewBeneficiray = () => {
    navigate(ScreenNames.ADD_INTERNATIONAL_BENEFICIARY);
  };

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
          onPress={gotoScreenCalculator}
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
                  <IPayView>
                    <IPayFlatlist
                      data={listBeneficiaries(viewAllState.active, sortedByActive)}
                      renderItem={renderBeneficiaryDetails}
                      ListHeaderComponent={() =>
                        renderListHeader(
                          sortedByActive,
                          listBeneficiaries(viewAllState.active, sortedByActive)?.length,
                          getBeneficiariesByStatus(sortedByActive)?.length,
                        )
                      }
                      ListFooterComponent={() =>
                        renderFooter(BeneficiaryTypes.ACTIVE, getBeneficiariesByStatus(sortedByActive)?.length)
                      }
                    />
                    <IPayView style={styles.listMargin}>
                      <IPayFlatlist
                        data={listBeneficiaries(viewAllState.inactive, !sortedByActive)}
                        renderItem={renderBeneficiaryDetails}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={() =>
                          renderListHeader(
                            !sortedByActive,
                            listBeneficiaries(viewAllState.inactive, !sortedByActive)?.length,
                            getBeneficiariesByStatus(!sortedByActive)?.length,
                          )
                        }
                        ListFooterComponent={() =>
                          renderFooter(BeneficiaryTypes.INACTIVE, getBeneficiariesByStatus(!sortedByActive)?.length)
                        }
                      />
                    </IPayView>
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
              onPress={handleAddNewBeneficiray}
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
      <IPayAlert
        visible={deleteBeneficiary}
        onClose={onDeleteCancel}
        title={localizationText.BENEFICIARY_OPTIONS.DELETE_BENFICIARY}
        message={localizationText.BENEFICIARY_OPTIONS.DELETION_CONFIRMATION}
        type={alertType.SIDE_BY_SIDE}
        closeOnTouchOutside
        variant={alertVariant.DESTRUCTIVE}
        icon={<IPayIcon icon={icons.TRASH} size={64} />}
        showIcon={false}
        primaryAction={{
          text: localizationText.COMMON.CANCEL,
          onPress: onDeleteCancel,
        }}
        secondaryAction={{
          text: localizationText.COMMON.DELETE,
          onPress: showDeleteBeneficiaryToast,
        }}
      />
      <IPayActionSheet
        ref={editBeneficiaryRef}
        options={[
          localizationText.COMMON.CANCEL,
          localizationText.BENEFICIARY_OPTIONS.REVIEW_AND_EDIT,
          localizationText.BENEFICIARY_OPTIONS.DELETE,
        ]}
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
