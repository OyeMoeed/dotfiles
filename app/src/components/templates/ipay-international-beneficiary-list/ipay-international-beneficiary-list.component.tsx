import icons from '@app/assets/icons';
import {
  IPayFlag,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayList, IPayNoResult, IPayTextInput } from '@app/components/molecules';
import IPaySkeletonBuilder from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.component';
import { IPaySkeletonEnums } from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.interface';
import { InternationalBeneficiaryStatus } from '@app/enums/international-beneficiary-status.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { WesternUnionBeneficiary } from '@app/network/services/international-transfer/western-union-beneficiary/western-union-beneficiary.interface';
import { BeneficiaryDetailsProps } from '@app/screens/international-transfer/international-transfer.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import { ViewAllStatus } from '@app/types/global.types';
import { buttonVariants } from '@app/utilities';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IPayInternationalBeneficiaryListProps from './ipay-international-beneficiary-list.interface';
import internationalBeneficiaryListStyle from './ipay-international-beneficiary-list.style';
import remittanceTypeDescKeysMapping from './ipay-international-beneficiary-list.utils';

const IPayInternationalBeneficiaryList: FC<IPayInternationalBeneficiaryListProps> = ({
  search,
  handleSearchChange,
  onClearInput,
  filteredBeneficiaryData,
  handlePressSortButton,
  sortedByActive,
  setSelectedBeneficiary,
  handleActivateBeneficiary,
  activeTab,
  onPressMenuOption,
  handleAddNewBeneficiary,
  isLoading,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = internationalBeneficiaryListStyle(colors);
  const beneficiariesToShow = 4;

  const [viewAllState, setViewAllState] = useState({
    active: false,
    inactive: false,
  });

  const getBeneficiariesByStatus = (isActive: boolean) =>
    filteredBeneficiaryData?.filter((item) => {
      if (isActive) return item?.beneficiaryStatus === InternationalBeneficiaryStatus.ACTIVE;

      return item?.beneficiaryStatus !== InternationalBeneficiaryStatus.ACTIVE;
    });

  const listBeneficiaries = (viewAll: boolean, isActive: boolean) =>
    viewAll ? getBeneficiariesByStatus(isActive) : getBeneficiariesByStatus(isActive)?.slice(0, beneficiariesToShow);

  const onTransferAndActivate = (beneficiary: BeneficiaryDetailsProps) => {
    setSelectedBeneficiary(beneficiary);
    if (beneficiary?.beneficiaryStatus === InternationalBeneficiaryStatus.ACTIVE) {
      navigate(ScreenNames.INTERNATIONAL_TRANSFER_INFO, {
        transferData: beneficiary,
        transferGateway: activeTab,
      });
    } else {
      handleActivateBeneficiary();
    }
  };

  const renderBeneficiaryDetailsRightText = (item: WesternUnionBeneficiary) => {
    const { beneficiaryStatus } = item;
    const btnText =
      beneficiaryStatus === InternationalBeneficiaryStatus.ACTIVE
        ? 'INTERNATIONAL_TRANSFER.TRANSFER'
        : 'INTERNATIONAL_TRANSFER.ACTIVATE';

    return (
      <IPayView style={styles.moreButton}>
        <IPayButton
          onPress={() => onTransferAndActivate(item)}
          btnText={btnText}
          btnType={buttonVariants.PRIMARY}
          small
          btnIconsDisabled
          btnStyle={styles.buttonStyle}
          btnColor={beneficiaryStatus !== InternationalBeneficiaryStatus.ACTIVE ? colors.secondary.secondary100 : ''}
          textColor={beneficiaryStatus !== InternationalBeneficiaryStatus.ACTIVE ? colors.secondary.secondary800 : ''}
        />
        <IPayPressable
          onPress={() => {
            setSelectedBeneficiary(item);
            onPressMenuOption();
          }}
        >
          <IPayIcon icon={icons.more_option} size={20} color={colors.natural.natural500} />
        </IPayPressable>
      </IPayView>
    );
  };

  const renderBeneficiaryDetails = ({ item }: { item: WesternUnionBeneficiary }) => {
    const { remittanceTypeDesc, countryCode, countryDesc, fullName } = item;
    const country = countryCode ? countryCode.toUpperCase() : '';

    return (
      <IPayList
        shouldTranslateTitle={false}
        key={fullName?.toString()}
        style={styles.listItem}
        title={fullName}
        subTitle={countryDesc}
        isShowSubTitle
        isShowLeftIcon
        centerContainerStyles={styles.listCenterContainer}
        adjacentSubTitle={t(remittanceTypeDescKeysMapping(remittanceTypeDesc))}
        regularTitle={false}
        leftIcon={<IPayFlag countryCode={country} />}
        rightText={renderBeneficiaryDetailsRightText(item)}
      />
    );
  };

  const renderListHeader = (isActive: string, count: number, totalCount: number) => {
    const statusText = isActive === InternationalBeneficiaryStatus.ACTIVE ? 'COMMON.ACTIVE' : 'COMMON.INACTIVE';

    return totalCount ? (
      <IPayView style={styles.listHeader}>
        <IPayFootnoteText text={statusText} />
        <IPayFootnoteText text={`(${count} ${t('HOME.OF')} ${totalCount})`} shouldTranslate={false} />
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
          text={viewAllState[statusKey] ? 'COMMON.CLOSE' : 'COMMON.VIEW_ALL'}
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

  const renderActiveBeneficiariesList = () => {
    if (getBeneficiariesByStatus(true)?.length) {
      return (
        <IPayFlatlist
          scrollEnabled={false}
          data={listBeneficiaries(viewAllState.active, true)}
          renderItem={renderBeneficiaryDetails}
          keyExtractor={(item, index) => `${item.fullName}-active-status-${index}`}
          ListHeaderComponent={() =>
            renderListHeader(
              InternationalBeneficiaryStatus.ACTIVE,
              listBeneficiaries(viewAllState.active, true)?.length ?? 0,
              getBeneficiariesByStatus(true)?.length ?? 0,
            )
          }
          ListFooterComponent={() =>
            renderFooter(InternationalBeneficiaryStatus.ACTIVE, getBeneficiariesByStatus(true)?.length ?? 0)
          }
        />
      );
    }

    return <IPayView />;
  };

  const renderInActiveBeneficiariesList = () => {
    if (getBeneficiariesByStatus(false)?.length) {
      return (
        <IPayFlatlist
          scrollEnabled={false}
          data={listBeneficiaries(viewAllState.inactive, false)}
          renderItem={renderBeneficiaryDetails}
          keyExtractor={(item, index) => `${item.fullName}-inactive-status-${index}`}
          ListHeaderComponent={() =>
            renderListHeader(
              InternationalBeneficiaryStatus.INACTIVE,
              listBeneficiaries(viewAllState.inactive, false)?.length ?? 0,
              getBeneficiariesByStatus(false)?.length ?? 0,
            )
          }
          ListFooterComponent={() =>
            renderFooter(InternationalBeneficiaryStatus.INACTIVE, getBeneficiariesByStatus(false)?.length ?? 0)
          }
        />
      );
    }

    return <IPayView />;
  };

  const renderNoBeneficiaries = () => (
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
        onPress={handleAddNewBeneficiary}
        leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} size={18} />}
      />
    </IPayView>
  );

  const renderList = () => {
    if (isLoading) {
      return (
        <IPayView style={styles.loadingContainer}>
          <IPaySkeletonBuilder isLoading variation={IPaySkeletonEnums.TRANSACTION_LIST} />
        </IPayView>
      );
    }

    if (filteredBeneficiaryData?.length) {
      return (
        <IPayView style={styles.listWrapper}>
          <IPayScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
            <IPayView
              style={[
                styles.activeInactiveListWrapper,
                sortedByActive !== InternationalBeneficiaryStatus.ACTIVE ? styles.reverseList : {},
              ]}
            >
              {renderActiveBeneficiariesList()}
              {renderInActiveBeneficiariesList()}
            </IPayView>
          </IPayScrollView>
        </IPayView>
      );
    }

    return renderNoBeneficiaries();
  };

  return (
    <IPayView style={styles.beneficiaryList}>
      <IPayView style={styles.listContentWrapper}>
        <IPayView style={styles.searchWrapper}>
          <IPayTextInput
            text={search}
            onChangeText={handleSearchChange}
            placeholder="COMMON.SEARCH"
            rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
            simpleInput
            showLeftIcon={!!search}
            style={styles.inputStyle}
            leftIcon={<IPayIcon icon={icons.crossIcon} color={colors.natural.natural700} size={20} />}
            containerStyle={styles.searchInputStyle}
            onClearInput={onClearInput}
            testID="transfer-search"
          />
          <IPayPressable onPress={handlePressSortButton}>
            <IPayIcon icon={icons.arrow_updown1} size={24} />
          </IPayPressable>
        </IPayView>
        {renderList()}
      </IPayView>
      {filteredBeneficiaryData?.length && !isLoading ? (
        <IPayButton
          onPress={handleAddNewBeneficiary}
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
  );
};

export default IPayInternationalBeneficiaryList;
