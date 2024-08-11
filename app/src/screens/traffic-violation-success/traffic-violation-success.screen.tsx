import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import IPayDeclinedCard from '@app/components/molecules/ipay-declined-card/ipay-declined-card.component';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import useTrafficViolationSuccess from './traffic-violation-success.hook';
import trafficViolationSuccessStyles from './traffic-violation-success.style';

const TrafficViolationSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = trafficViolationSuccessStyles(colors);
  const localizationText = useLocalization();
  const { goToHome, billPayDetailes, declinedBillPayDetails, paidBilled, paymentDeclined } =
    useTrafficViolationSuccess();

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.minFlex}
          headingText={localizationText.TRAFFIC_VIOLATION.VIOLATION_PAID_SUCCESS}
          descriptionText={localizationText.COMMON.SAR}
          descriptionStyle={styles.boldStyles}
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
            />
          </>
        </IPayScrollView>
        <IPayView style={styles.bottomView}>
          <IPayView style={styles.rowStyles}>
            <IPayButton
              medium
              btnType={buttonVariants.LINK_BUTTON}
              leftIcon={<IPayIcon icon={icons.refresh_48} color={colors.primary.primary500} size={16} />}
              btnText={localizationText.TRAFFIC_VIOLATION.PAY_ANOTHER_VIOLATION}
            />
            <IPayButton
              medium
              btnType={buttonVariants.LINK_BUTTON}
              leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
              btnText={localizationText.COMMON.SHARE}
            />
          </IPayView>
          <IPayButton
            onPress={goToHome}
            large
            btnType={buttonVariants.PRIMARY}
            leftIcon={<IPayIcon icon={icons.HOME} color={colors.natural.natural0} />}
            btnText={localizationText.COMMON.HOME}
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default TrafficViolationSuccessScreen;