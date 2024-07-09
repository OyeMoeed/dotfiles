import React, { useRef, useState } from 'react';

import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules';
import { IPaySafeAreaView } from '@components/templates';

import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { IPayCheckbox, IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { verticalScale } from 'react-native-size-matters';
// eslint-disable-next-line max-len
import IPayCardDetailsBannerComponent from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import { buttonVariants } from '@app/utilities/enums.util';
import { IPayTermsAndConditions } from '@app/components/organism';
import icons from '@app/assets/icons';
import constants from '@app/constants/constants';
import cardRenewalStyles from './card-renewal.style';

import { TermsAndConditionsRefTypes } from './card-renewal.screen.interface';

const CardRenewal: React.FC = () => {
  const { colors } = useTheme();

  const localizationText = useLocalization();
  const termsAndConditionSheetRef = useRef<TermsAndConditionsRefTypes>(null);

  const styles = cardRenewalStyles(colors);
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);

  const toggleTermsAndConditions = () => setCheckTermsAndConditions((prev) => !prev);

  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef.current?.showTermsAndConditions();
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.CARD_RENEWAL.CARD_RENEWAL} backBtn applyFlex />
      <IPayView style={styles.childContainer}>
        <IPayAccountBalance balance="5,200.40" onPressTopup={() => {}} />
        <IPayView style={styles.contentContainer}>
          <IPayView style={{ gap: verticalScale(20) }}>
            <IPayCardDetailsBannerComponent
              containerStyle={styles.zeroMargin}
              cardType={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE}
              cardTypeName={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE_NAME}
              carHolderName={constants.DUMMY_USER_CARD_DETAILS.CARD_HOLDER_NAME}
              cardLastFourDigit={constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}
            />
            <IPayView
              style={{
                gap: verticalScale(12),
              }}
            >
              <IPayList
                containerStyle={styles.zeroMargin}
                isShowIcon
                icon={<IPayView />}
                title={localizationText.CARD_RENEWAL.HOLDER_NAME}
                detailText={constants.DUMMY_USER_CARD_DETAILS.CARD_HOLDER_NAME}
              />
              <IPayList
                containerStyle={styles.zeroMargin}
                isShowIcon
                icon={<IPayView />}
                title={localizationText.CARD_RENEWAL.CARD_TYPE}
                detailText={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE_NAME}
              />
            </IPayView>
            <IPayList
              containerStyle={styles.zeroMargin}
              isShowIcon
              icon={<IPayView />}
              title={localizationText.CARD_RENEWAL.RENEWAL_FEE}
              detailText={`100 ${localizationText.COMMON.SAR}`}
            />
          </IPayView>

          <IPayView style={styles.bottomContainer}>
            <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsContainer}>
              <IPayView style={styles.termsChildContainer}>
                <IPayCheckbox onPress={toggleTermsAndConditions} isCheck={checkTermsAndConditions} />
                <IPayFootnoteText style={styles.termText} text={localizationText.COMMON.TERMS_AND_CONDITIONS_TEXT} />
                <IPayIcon icon={icons.infoIcon} size={18} color={colors.primary.primary500} />
              </IPayView>
            </IPayPressable>
            <IPayButton
              large
              btnIconsDisabled
              btnType={buttonVariants.PRIMARY}
              btnText={localizationText.COMMON.CONFIRM}
            />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayTermsAndConditions ref={termsAndConditionSheetRef} />
    </IPaySafeAreaView>
  );
};

export default CardRenewal;
