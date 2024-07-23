import icons from '@app/assets/icons';
import {
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayList, IPayNoResult, IPayTextInput } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { defaultDummyBeneficiaryData } from './local-transfer.constant';
import localTransferStyles from './local-transfer.style';

const LocalTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = localTransferStyles(colors);
  const isBeneficiary = true; // TODO will be handle on the basis of api
  const localizationText = useLocalization();
  const tabs = [localizationText.COMMON.ACTIVE, localizationText.COMMON.INACTIVE];
  const [search, setSearch] = useState<string>('');

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="local-transfer-ipay-header"
        backBtn
        title={localizationText.HOME.LOCAL_TRANSFER}
        applyFlex
        titleStyle={styles.capitalizeTitle as TextStyle}
        rightComponent={
          <IPayPressable>
            <IPayView style={styles.headerRightContent}>
              <IPayIcon icon={icons.clock_1} size={20} color={colors.primary.primary500} />
              <IPaySubHeadlineText regular color={colors.primary.primary500} text={localizationText.COMMON.HISTORY} />
            </IPayView>
          </IPayPressable>
        }
      />
      {isBeneficiary ? (
        <IPayView style={styles.contentContainer}>
          <IPayTabs customStyles={styles.tabWrapper} tabs={tabs} />
          <IPayView style={styles.beneficiaryList}>
            <IPayView style={styles.listContentWrapper}>
              <IPayTextInput
                text={search}
                onChangeText={setSearch}
                placeholder={localizationText.LOCAL_TRANSFER.SEARCH_FOR_NAME}
                rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
                simpleInput
                style={styles.inputStyle}
                containerStyle={styles.searchInputStyle}
              />
              <IPayView style={styles.listWrapper}>
                <IPayScrollView showsVerticalScrollIndicator={false}>
                  <IPayView>
                    {defaultDummyBeneficiaryData?.map((item) => {
                      const { name, bankName, bankLogo, accountNo } = item;
                      return (
                        <IPayList
                          key={item.toString()}
                          textStyle={styles.textStyle}
                          title={name}
                          subTitle={accountNo}
                          isShowSubTitle
                          isShowLeftIcon
                          subTitleLines={1}
                          centerContainerStyles={styles.listCenterContainer}
                          adjacentTitle={bankName}
                          leftIcon={<IPayImage style={styles.bankLogo} image={bankLogo} />}
                          rightText={
                            <IPayView style={styles.moreButton}>
                              <IPayButton
                                btnText={localizationText.LOCAL_TRANSFER.TRANSFER}
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
                    })}
                  </IPayView>
                </IPayScrollView>
              </IPayView>
            </IPayView>
            <IPayButton
              btnText={localizationText.LOCAL_TRANSFER.ADD_NEW_BENEFICIARY}
              btnType="primary"
              large
              leftIcon={<IPayIcon icon={icons.add} size={24} color={colors.natural.natural0} />}
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
            containerStyle={styles.noResult as ViewStyle}
            testID="no-result"
          />
          <IPayButton
            btnText={localizationText.LOCAL_TRANSFER.ADD_NEW_BENEFICIARY}
            medium
            btnType="primary"
            btnStyle={styles.btnStyle}
            leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} size={18} />}
          />
        </IPayView>
      )}
    </IPaySafeAreaView>
  );
};

export default LocalTransferScreen;
