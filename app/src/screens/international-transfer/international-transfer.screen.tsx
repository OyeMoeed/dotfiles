import icons from '@app/assets/icons';
import {
  IPayFlatlist,
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
import InternationalBeneficiaryStatus from '@app/enums/international-beneficiary-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import internationalTransferStyles from './internation-transfer.style';
import defaultDummyBeneficiaryData from './international-transfer.constent';
import beneficiaryItemProps from './international-transfer.interface';

const InternationalTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = internationalTransferStyles(colors);
  const localizationText = useLocalization();
  const [activeTab, setActiveTab] = useState<string>(localizationText.COMMON.ACTIVE);
  const tabOptions = [localizationText.COMMON.ACTIVE, localizationText.COMMON.INACTIVE];
  const [search, setSearch] = useState<string>('');
  const [isBeneficiary, setIsBeneficiary] = useState<boolean>(false); // TODO will be handle on the basis of api

  const generatedData = defaultDummyBeneficiaryData?.filter((item) => item?.status === activeTab);

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
              btnType="primary"
              small
              btnIconsDisabled
              btnStyle={styles.buttonStyle}
            />
            <IPayIcon icon={icons.more_option} size={20} color={colors.natural.natural500} />
          </IPayView>
        }
      />
    );
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
          leftIcon={<IPayIcon icon={icons.calculator1} size={24} color={colors.primary.primary500} />}
          title={localizationText.INTERNATIONAL_TRANSFER.PRICE_CALCULATOR}
          subTitle={localizationText.INTERNATIONAL_TRANSFER.CALCULATE_AND_DELIVERY}
          rightIcon={<IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary500} />}
        />
      </IPayView>
      {isBeneficiary ? (
        <IPayView style={styles.contentContainer}>
          <IPayTabs customStyles={styles.tabWrapper} tabs={tabOptions} onSelect={(tab) => setActiveTab(tab)} />
          <IPayView style={styles.beneficiaryList}>
            <IPayView style={styles.listContentWrapper}>
              <IPayTextInput
                text={search}
                onChangeText={setSearch}
                placeholder={localizationText.INTERNATIONAL_TRANSFER.SEARCH_BENEFICIARY}
                rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
                simpleInput
                style={styles.inputStyle}
                containerStyle={styles.searchInputStyle}
              />
              <IPayView style={styles.listWrapper}>
                <IPayScrollView showsVerticalScrollIndicator={false}>
                  <IPayView>
                    <IPayFlatlist
                      data={generatedData}
                      renderItem={beneficiaryItem}
                      keyExtractor={(item) => item.name}
                    />
                  </IPayView>
                </IPayScrollView>
              </IPayView>
            </IPayView>
            <IPayButton
              btnStyle={styles.addBeneficiaryBtn}
              btnText={localizationText.LOCAL_TRANSFER.ADD_NEW_BENEFICIARY}
              btnType="outline"
              large
              leftIcon={<IPayIcon icon={icons.add} size={24} color={colors.primary.primary500} />}
            />
          </IPayView>
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
            btnType="primary"
            btnStyle={styles.btnStyle}
            onPress={() => setIsBeneficiary(!isBeneficiary)}
            leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} size={18} />}
          />
        </IPayView>
      )}
    </IPaySafeAreaView>
  );
};

export default InternationalTransferScreen;
