import { useRoute } from '@react-navigation/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { Home2, Refresh2Icon, Send2Icon } from '@app/assets/svgs';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayLinearGradientView,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayShareableImageView, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import { navigate, resetNavigation } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';

import IPayLaborerDetailsBanner from '@app/components/organism/ipay-laborer-details-banner/ipay-laborer-details-banner.component';
import { isArabic } from '@app/utilities/constants';
import { MusanedPayConfirmationRouteProps } from '../musaned-pay-salary-confirm/musaned-pay-salary-confirm.interface';
import { getPaymentSalaryConfirmationData } from '../musaned.utils';
import musanedPaymentSuccessful from './musaned-payment-successful.style';

const MusanedPaymentSuccessfulScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = musanedPaymentSuccessful(colors);

  const { params } = useRoute<MusanedPayConfirmationRouteProps>();
  const successMessage = 'MUSANED.PAYMENT_SUCCESS_MESSAGE';
  const gradientColors = [colors.primary.primary50, colors.secondary.secondary50];
  const totalTransferredAmount = `500 ${t('COMMON.SAR')}`;
  const detailsInfo = getPaymentSalaryConfirmationData(params?.paymentInfo, params.userInfo);
  const { name, occupationAr, occupationEn } = params.userInfo || {};

  const onPressHome = () => {
    resetNavigation(ScreenNames.HOME_BASE);
  };

  const renderItem = ({ item }: any) => {
    const { text, details } = item;

    return (
      <IPayView style={styles.dataCardView}>
        <IPayFootnoteText regular text={text} color={colors.natural.natural900} />
        <IPayView style={styles.transactionDetailsView}>
          <IPayView style={styles.detailsView}>
            <IPaySubHeadlineText
              regular
              text={details}
              color={colors.primary.primary800}
              numberOfLines={1}
              style={styles.valueStyle}
            />
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  const onNavigateMusaned = () => navigate(ScreenNames.MUSANED);

  return (
    <IPayPageWrapper>
      <IPayLinearGradientView style={styles.innerLinearGradientView} gradientColors={gradientColors}>
        <IPaySuccess
          headingText={successMessage}
          subHeadingText={totalTransferredAmount}
          style={StyleSheet.flatten(styles.headerView)}
        />

        <IPayShareableImageView
          otherView={
            <IPayView style={styles.footerView}>
              <IPayView style={styles.linkButtonsView}>
                <IPayButton
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  leftIcon={<Refresh2Icon style={styles.iconStyle} color={colors.primary.primary500} />}
                  btnText="MUSANED.PAY_ANOTHER_LABORER"
                  onPress={onNavigateMusaned}
                />
                <IPayButton
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  leftIcon={<Send2Icon style={styles.iconStyle} color={colors.primary.primary500} />}
                  btnText="TOP_UP.SHARE"
                />
              </IPayView>
              <IPayButton
                onPress={onPressHome}
                btnType={buttonVariants.PRIMARY}
                large
                leftIcon={<Home2 style={styles.homeIcon} color={colors.natural.natural0} />}
                btnText="COMMON.HOME"
              />
            </IPayView>
          }
        >
          <IPayView style={styles.listView}>
            <IPayScrollView showsVerticalScrollIndicator={false}>
              <IPayView style={styles.dataTopView}>
                <IPayLaborerDetailsBanner
                  titleText={name}
                  testID="musaned-user-details-laborer-details-banner"
                  shouldTranslateTitle={false}
                  details={isArabic ? occupationAr : occupationEn}
                  isDetailsBanner
                  containerStyle={styles.laborerDetailsBanner}
                  withProfileIcon
                  withLogoOnRight
                  boldTitle={false}
                />

                <IPayFlatlist
                  data={detailsInfo}
                  keyExtractor={(_, index) => index.toString()}
                  itemSeparatorStyle={styles.itemSeparatorStyle}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderItem}
                  scrollEnabled={false}
                />
              </IPayView>
            </IPayScrollView>
          </IPayView>
        </IPayShareableImageView>
      </IPayLinearGradientView>
    </IPayPageWrapper>
  );
};
export default MusanedPaymentSuccessfulScreen;
