import icons from '@app/assets/icons';
import { IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, CardStatusIndication, CardStatusType } from '@app/utilities/enums.util';
import { TextStyle, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayList from '../ipay-list/ipay-list.component';
import { IPayCardStatusIndicationProps } from './ipay-card-status-indication.interface';
import cardStatusIndicationStyles from './ipay-card-status-indication.style';

const IPayCardStatusIndication = ({
  cardStatusType,
  statusIndication,
  onPress,
  currentCard,
}: IPayCardStatusIndicationProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const localizationText = useLocalization();
  const fee = 100; // TODO will be updated on the basis of api

  const styles = cardStatusIndicationStyles(colors);

  const cardStatusIndication = {
    expiry: {
      warning: {
        title: t('CARDS.EXPIRING_SOON'),
        subtitle: `${localizationText.COMMON.ON} ${currentCard?.expiryDate}`,
        icon: icons.timer,
        rightText: (
          <IPayButton
            onPress={onPress}
            btnType={buttonVariants.PRIMARY}
            btnIconsDisabled
            small
            btnStyle={styles.renewBtn}
            btnText="CARDS.RENEW_CARD"
          />
        ),
      },
      alert: {
        title: t('CARDS.CARD_EXPIRED'),
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
        title: t('CARDS.ANNUAL_FEE_COLLECTION'),
        subtitle: currentCard?.expiryDate,
        icon: icons.moneys_warning,
        rightText: (
          <IPaySubHeadlineText style={styles.fee} regular={false}>
            {fee} <IPaySubHeadlineText regular>{localizationText.COMMON.SAR}</IPaySubHeadlineText>
          </IPaySubHeadlineText>
        ),
      },
      alert: {
        title: t('CARDS.ANNUAL_FEE_COLLECTION_FAILED'),
        subtitle: t('CARDS.ANNUAL_FEE_FAILED_MESSAGE'),
        icon: icons.moneys_alert,
        rightText: (
          <IPayButton
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
    />
  ) : (
    <IPayView />
  );
};

export default IPayCardStatusIndication;
