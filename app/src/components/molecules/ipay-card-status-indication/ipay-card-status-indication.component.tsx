import icons from '@app/assets/icons';
import { IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, CardStatusIndication, CardStatusType } from '@app/utilities/enums.util';
import { useTranslation } from 'react-i18next';
import { TextStyle, ViewStyle } from 'react-native';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayList from '../ipay-list/ipay-list.component';
import { IPayCardStatusIndicationProps } from './ipay-card-status-indication.interface';
import cardStatusIndicationStyles from './ipay-card-status-indication.style';

const IPayCardStatusIndication = ({ cardStatusType, statusIndication, onPress }: IPayCardStatusIndicationProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const fee = 100; // TODO will be updated on the basis of api
  const currentCard = useTypedSelector((state) => state.cardsReducer.currentCard);

  const styles = cardStatusIndicationStyles(colors);
  const alertSubTitle = `${t('CARDS.ANNUAL_FEE_FAILED_MESSAGE')} 
    ${Number(currentCard?.nextAnnualFeeAmt) + Number(currentCard?.nextAnnualFeeVAT)} ${t('COMMON.SAR')}`;

  const cardStatusIndication: any = {
    expiry: {
      warning: {
        title: 'CARDS.EXPIRING_SOON',
        subtitle: `${t('COMMON.ON')} ${currentCard?.expiryDate}`,
        icon: icons.timer,
        rightText: (
          <IPayButton
            onPress={onPress}
            btnType={buttonVariants.PRIMARY}
            btnIconsDisabled
            btnStyle={styles.renewBtn}
            btnText="CARDS.RENEW_CARD"
          />
        ),
      },
      alert: {
        title: 'CARDS.CARD_EXPIRED',
        subtitle: t('CARDS.PLEASE_RENEW_CARD'),
        icon: icons.warning2,
        rightText: (
          <IPayButton
            onPress={onPress}
            btnType={buttonVariants.PRIMARY}
            btnIconsDisabled
            btnStyle={styles.renewBtn}
            small
            btnText="CARDS.RENEW_CARD"
          />
        ),
      },
    },
    annual: {
      warning: {
        title: 'CARDS.ANNUAL_FEE_COLLECTION',
        subtitle: currentCard?.creditCardDetails?.nextAnnualFeesDueDate,
        icon: icons.moneys_warning,
        rightText: (
          <IPaySubHeadlineText style={styles.fee} regular={false} shouldTranslate={false}>
            {fee} <IPaySubHeadlineText regular text="COMMON.SAR" />
          </IPaySubHeadlineText>
        ),
      },
      alert: {
        title: 'CARDS.ANNUAL_FEE_COLLECTION_FAILED',
        subtitle: alertSubTitle,
        icon: icons.moneys_alert,
        rightText: (
          <IPayButton
            onPress={onPress}
            btnType={buttonVariants.PRIMARY}
            leftIcon={<IPayIcon size={16} icon={icons.add_bold} color={colors.natural.natural0} />}
            small
            btnStyle={styles.topUpBtn}
            btnText="COMMON.TOP_UP"
          />
        ),
      },
    },
  };

  return currentCard ? (
    <IPayList
      containerStyle={[styles.cardContainer, cardStatusType === CardStatusType.ALERT && styles.alertBg] as ViewStyle}
      leftIcon={
        <IPayView style={styles.statusIconContainer}>
          <IPayIcon size={20} icon={cardStatusIndication[statusIndication][cardStatusType].icon} />
        </IPayView>
      }
      isShowSubTitle
      subTitle={cardStatusIndication[statusIndication][cardStatusType].subtitle}
      subTextStyle={
        [styles.cardSubTitle, cardStatusType === CardStatusType.ALERT && styles.alertTextColor] as TextStyle
      }
      leftIconContainerStyles={
        [
          styles.cardLeftContainer,
          statusIndication === CardStatusIndication.EXPIRY && styles.expiryLeftContainer,
        ] as ViewStyle
      }
      isShowLeftIcon
      title={cardStatusIndication[statusIndication][cardStatusType].title}
      textStyle={[styles.cardTitle, cardStatusType === CardStatusType.ALERT && styles.alertTextColor]}
      rightText={cardStatusIndication[statusIndication][cardStatusType].rightText}
      shouldTranslateSubTitle={false}
    />
  ) : (
    <IPayView />
  );
};

export default IPayCardStatusIndication;
