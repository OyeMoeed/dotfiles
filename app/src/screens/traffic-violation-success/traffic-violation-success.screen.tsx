import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayShareableImageView, IPaySuccess } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import IPayDeclinedCard from '@app/components/molecules/ipay-declined-card/ipay-declined-card.component';
import { IPayPageWrapper } from '@app/components/templates';
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
  const { goToHome, declinedBillPayDetails, paidBilled, paymentDeclined, payOtherViolation } =
    useTrafficViolationSuccess();
  const route = useRoute();
  const { payOnly, violationDetails } = route.params;

  const billPayDetailsData = [
    {
      id: '1',
      label: t('TRAFFIC_VIOLATION.AMOUNT'),
      value: violationDetails?.amount ? `${violationDetails?.amount} ${t('COMMON.SAR')}` : '',
    },
    {
      id: '2',
      label: t('TRAFFIC_VIOLATION.SERVICE_PROVIDER'),
      value: violationDetails?.serviceProvider ?? '',
    },
    {
      id: '3',
      label: t('TRAFFIC_VIOLATION.SERVICE_TYPE'),
      value: violationDetails?.serviceType ?? '',
    },
    {
      id: '4',
      label: t('TRAFFIC_VIOLATION.VIOLATOR_ID'),
      value: violationDetails?.violatorId ?? '',
    },
    {
      id: '5',
      label: t('TRAFFIC_VIOLATION.VIOLATION_NUMBER_FULL'),
      value: violationDetails?.violationNo ?? '',
    },
    {
      id: '6',
      label: t('TRAFFIC_VIOLATION.VIOLATION_DATE'),
      value: '-',
    },
  ];

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.minFlex}
          headingText="TRAFFIC_VIOLATION.VIOLATION_PAID_SUCCESS"
          descriptionText={`${violationDetails?.amount ?? 0} ${t('COMMON.SAR')}`}
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
            <IPayShareableImageView
              otherView={
                <IPayView style={styles.bottomView}>
                  {payOnly ? (
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
                        btnText={t('TOP_UP.SHARE')}
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
              }
            >
              <IPayBillDetailsOption
                showHeader={false}
                data={billPayDetailsData}
                style={styles.conatinerStyles}
                optionsStyles={styles.optionsStyle}
              />
            </IPayShareableImageView>
          </>
        </IPayScrollView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default TrafficViolationSuccessScreen;
