import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import IPayLaborerDetailsBanner from '@app/components/organism/ipay-laborer-details-banner/ipay-laborer-details-banner.component';
import IPayLaborerInfo from '@app/components/organism/ipay-laborer-info/ipay-laborer-info.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities';
import { useRoute } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { bottomSheetShare, getStatusStyles } from '../musaned.utils';
import { MusanedUserDetailsRouteProps } from './musaned-user-details.interface';
import musanedUserDetailsStyles from './musaned-user-details.style';

const MusanedUserDetails = () => {
  const { colors } = useTheme();
  const styles = musanedUserDetailsStyles(colors);
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const isArabic = currentLanguage === 'ar';

  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);

  const { params } = useRoute<MusanedUserDetailsRouteProps>();
  const {
    haveWalletFlag,
    borderNumber,
    poiExperationDate,
    poiNumber,
    payrollAmount,
    occupationAr,
    occupationEn,
    countryCode,
    nationalityAr,
    nationalityEn,
    name,
    lastPaidSalaryDate,
    paymentStatus,
  } = params.userInfo;
  const haveWallet = haveWalletFlag;

  const { color, text, backgroundColor } = getStatusStyles(colors, paymentStatus);

  const userData = [
    // TODO: check for mobile number in the API response
    { text: 'MUSANED.MOBILE_NUMBER', details: borderNumber.toString() },
    {
      text: 'MUSANED.NATIONALITY',
      details: isArabic ? nationalityAr : nationalityEn,
      key: countryCode,
    },
    { text: 'MUSANED.LABORER_ID', details: poiNumber.toString() },
    { text: 'MUSANED.IQAMA_EXPIRY_DATE', details: poiExperationDate },
  ];

  const onPayPress = () => {
    navigate(ScreenNames.MUSANED_PAY_SALARY);
  };

  const onInvitePress = () => {
    bottomSheetShare(walletInfo?.userContactInfo?.mobileNumber);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader testID="musaned-user-details-header" backBtn title="MUSANED.LABORER_DETAILS" applyFlex />

      <IPayLaborerDetailsBanner
        titleText={name}
        amount={payrollAmount}
        testID="musaned-user-details-laborer-details-banner"
        shouldTranslateTitle={false}
        details={isArabic ? occupationAr : occupationEn}
        isDetailsBanner
      />

      <IPayScrollView style={styles.contentContainer}>
        <IPayView>
          <IPayLaborerInfo userData={userData} />

          {haveWallet && (
            <IPayView style={styles.paymentInfoContainer}>
              <IPayFootnoteText regular style={styles.containerHeadings} text="COMMON.PERSONAL_INFO" />

              <IPayView style={styles.paymentInfoCard}>
                <IPayView>
                  <IPayFootnoteText regular text="MUSANED.PAYMENT_STATUS" />
                  <IPayCaption1Text
                    regular
                    text={`${t('MUSANED.LAST_PAYMENT')}: ${lastPaidSalaryDate}`}
                    shouldTranslate={false}
                    color={colors.natural.natural500}
                  />
                </IPayView>

                <IPayView style={[styles.statusView, { backgroundColor }]}>
                  <IPaySubHeadlineText regular text={text} color={color} style={styles.statusText} />
                </IPayView>
              </IPayView>
            </IPayView>
          )}
        </IPayView>
      </IPayScrollView>

      <IPayView style={styles.footer}>
        {haveWallet ? (
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            btnText="MUSANED.PAY"
            large
            onPress={onPayPress}
            btnIconsDisabled
          />
        ) : (
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            btnText="MUSANED.INVITE_NOW"
            btnColor={colors.secondary.secondary100}
            textColor={colors.secondary.secondary800}
            large
            onPress={onInvitePress}
            btnIconsDisabled
            withAlinmaLogo
          />
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default MusanedUserDetails;
