import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import IPayDeclinedCard from '@app/components/molecules/ipay-declined-card/ipay-declined-card.component';
import { IPayPageWrapper } from '@app/components/templates';
import { TOTAL_AMOUNT } from '@app/constants/constants';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useTrafficViolationSuccess from './traffic-violation-success.hook';
import trafficViolationSuccessStyles from './traffic-violation-success.style';

const TrafficViolationSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = trafficViolationSuccessStyles(colors);
  const { t } = useTranslation();
  const { goToHome, billPayDetailes, declinedBillPayDetails, paidBilled, paymentDeclined, payOtherViolation } =
    useTrafficViolationSuccess();
  const route = useRoute();
  const payOnly = route?.params?.payOnly;
  const variant = route?.params?.variant;
  const headingText =
    variant === ScreenNames.TRAFFIC_VOILATION_NUM_REFUND
      ? 'TRAFFIC_VIOLATION.VIOLATION_SUCCESS'
      : 'TRAFFIC_VIOLATION.VIOLATION_PAID_SUCCESS';

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.minFlex}
          headingText={headingText}
          descriptionText={`${TOTAL_AMOUNT} ${t('COMMON.SAR')}`}
          descriptionStyle={[styles.boldStyles, styles.descriptionText]}
        />
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <>
            {paymentDeclined && (
              <IPayDeclinedCard
                declinedTrasactionData={declinedBillPayDetails}
                style={styles.marginStyles}
                paidViolation={paidBilled}
              />
            )}
            <IPayBillDetailsOption
              showHeader={false}
              data={billPayDetailes}
              style={styles.conatinerStyles}
              optionsStyles={styles.optionsStyle}
              showShareBtn
            />
          </>
        </IPayScrollView>
        <IPayView style={styles.bottomView}>
          {!payOnly ? (
            <IPayView style={styles.rowStyles}>
              <IPayButton
                medium
                onPress={payOtherViolation}
                btnType={buttonVariants.LINK_BUTTON}
                leftIcon={<IPayIcon icon={icons.refresh_48} color={colors.primary.primary500} size={16} />}
                btnText="TRAFFIC_VIOLATION.PAY_ANOTHER_VIOLATION"
              />

              <IPayButton
                medium
                btnType={buttonVariants.LINK_BUTTON}
                leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
                btnText="COMMON.SHARE"
              />
            </IPayView>
          ) : (
            <IPayButton
              medium
              onPress={payOtherViolation}
              btnType={buttonVariants.LINK_BUTTON}
              leftIcon={<IPayIcon icon={icons.refresh_48} color={colors.primary.primary500} size={16} />}
              btnText="TRAFFIC_VIOLATION.PAY_ANOTHER_VIOLATION"
            />
          )}
          <IPayButton
            onPress={goToHome}
            large
            btnType={buttonVariants.PRIMARY}
            leftIcon={<IPayIcon icon={icons.HOME} color={colors.natural.natural0} />}
            btnText="COMMON.HOME"
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default TrafficViolationSuccessScreen;
