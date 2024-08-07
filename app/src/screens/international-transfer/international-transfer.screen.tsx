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
import { IPaySafeAreaView } from '@app/components/templates';
import { InternationalBeneficiaryStatus, TransferGatewayType } from '@app/enums/international-beneficiary-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { BeneficiaryTypes, buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef, useState } from 'react';
import IPayTransferSortSheet from '../local-transfer/component/transfer-sort-sheet.component';
import internationalTransferStyles from './internation-transfer.style';
import {
  internationalBeneficiaryData,
  tabOptions,
  westernUnionBeneficiaryData,
} from './international-transfer.constent';
import { beneficiaryItemProps, ViewAllStatus } from './international-transfer.interface';

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
    useState<beneficiaryItemProps[]>(internationalBeneficiaryData);
  const [viewAll, setViewAll] = useState({
    active: false,
    inactive: false,
  });
  const [sortBy, setSortBy] = useState<boolean>(true);

  const beneficiaryItem = ({ item }: { item: beneficiaryItemProps }) => {
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
              onPress={() => navigate(ScreenNames.INTERNATIONAL_TRANSFER_INFO)}
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

  const searchedData = (data: beneficiaryItemProps[], searchText: string) => {
    const filteredData = data?.filter((item) => item?.name?.toLowerCase().includes(searchText.toLowerCase()));
    return setFilteredBeneficiaryData(filteredData);
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    if (activeTab === TransferGatewayType.ALINMA_DIRECT) {
      searchedData(internationalBeneficiaryData, text);
    } else {
      searchedData(westernUnionBeneficiaryData, text);
    }
  };

  const getSortedData = (status: boolean) => filteredBeneficiaryData?.filter((item) => item?.active === status);

  const renderHeader = (sort: boolean, count: number, totalCount: number) =>
    totalCount ? (
      <IPayView style={styles.listHeader}>
        <IPayFootnoteText text={sort ? localizationText.COMMON.ACTIVE : localizationText.COMMON.INACTIVE} />
        <IPayFootnoteText text={`(${count} ${localizationText.HOME.OF} ${totalCount})`} />
      </IPayView>
    ) : (
      <IPayView />
    );

  const renderFooter = (statusKey: ViewAllStatus, totalCount: number) =>
    totalCount > beneficiariesToShow ? (
      <IPayPressable
        style={styles.listFooter}
        onPress={() => setViewAll((prev) => ({ ...prev, [statusKey]: !prev[statusKey] }))}
      >
        <IPaySubHeadlineText
          style={styles.capitalizeTitle}
          color={colors.primary.primary500}
          regular
          text={viewAll[statusKey] ? localizationText.COMMON.CLOSE : localizationText.COMMON.VIEW_ALL}
        />
        <IPayIcon
          icon={viewAll[statusKey] ? icons.arrowUp : icons.arrowDown}
          size={14}
          color={colors.primary.primary500}
        />
      </IPayPressable>
    ) : (
      <IPayView />
    );

  const listData = (status: boolean, sort: boolean) =>
    status ? getSortedData(sort) : getSortedData(sort).slice(0, beneficiariesToShow);

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
                showLeftIcon
                style={styles.inputStyle}
                leftIcon={<IPayIcon icon={icons.crossIcon} color={colors.natural.natural700} size={20} />}
                containerStyle={styles.searchInputStyle}
                onClearInput={onClearInput}
                testID="transfer-search"
              />
              <IPayPressable onPress={() => sortSheetRef?.current?.present()}>
                <IPayIcon icon={icons.arrow_31} size={24} />
              </IPayPressable>
            </IPayView>
            {filteredBeneficiaryData?.length ? (
              <IPayView style={styles.listWrapper}>
                <IPayScrollView showsVerticalScrollIndicator={false}>
                  <IPayView>
                    <IPayFlatlist
                      data={listData(viewAll.active, sortBy)}
                      renderItem={beneficiaryItem}
                      ListHeaderComponent={() =>
                        renderHeader(sortBy, listData(viewAll.active, sortBy)?.length, getSortedData(sortBy)?.length)
                      }
                      ListFooterComponent={() => renderFooter(BeneficiaryTypes.ACTIVE, getSortedData(sortBy)?.length)}
                    />
                    <IPayView style={styles.listMargin}>
                      <IPayFlatlist
                        data={listData(viewAll.inactive, !sortBy)}
                        renderItem={beneficiaryItem}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={() =>
                          renderHeader(
                            !sortBy,
                            listData(viewAll.inactive, !sortBy)?.length,
                            getSortedData(!sortBy)?.length,
                          )
                        }
                        ListFooterComponent={() =>
                          renderFooter(BeneficiaryTypes.INACTIVE, getSortedData(!sortBy)?.length)
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
          {!!filteredBeneficiaryData?.length && (
            <IPayButton
              btnStyle={styles.addBeneficiaryBtn}
              btnText={localizationText.LOCAL_TRANSFER.ADD_NEW_BENEFICIARY}
              btnType={buttonVariants.OUTLINED}
              large
              leftIcon={<IPayIcon icon={icons.add} size={24} color={colors.primary.primary500} />}
            />
          )}
        </IPayView>
      </IPayView>
      <IPayTransferSortSheet sortSheetRef={sortSheetRef} setSortBy={setSortBy} sortBy={sortBy} />
    </IPaySafeAreaView>
  );
};

export default InternationalTransferScreen;
