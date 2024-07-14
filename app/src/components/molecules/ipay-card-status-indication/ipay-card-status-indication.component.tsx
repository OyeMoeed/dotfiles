import icons from '@app/assets/icons';
import { IPayIcon, IPaySubHeadlineText } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardStatusIndication, CardStatusType } from '@app/utilities/enums.util';
import { TextStyle, ViewStyle } from 'react-native';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayList from '../ipay-list/ipay-list.component';
import { IPayCardStatusIndicationProps } from './ipay-card-status-indication.interface';
import cardStatusIndicationStyles from './ipay-card-status-indication.style';

const IPayCardStatusIndication = ({ cardStatusType, statusIndication }: IPayCardStatusIndicationProps) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const expiryDate = '12 May 2024'; // TODO will be updated on the basis of api
  const fee = 100; // TODO will be updated on the basis of api

  const styles = cardStatusIndicationStyles(colors);

  const cardStatusIndication = {
    expiry: {
      warning: {
        title: localizationText.CARDS.EXPIRING_SOON,
        subtitle: expiryDate,
        icon: icons.timer,
        rightText: <IPayButton btnType="primary" btnIconsDisabled medium btnText={localizationText.CARDS.RENEW_CARD} />,
      },
      alert: {
        title: localizationText.CARDS.CARD_EXPIRED,
        subtitle: localizationText.CARDS.PLEASE_RENEW_CARD,
        icon: icons.warning2,
        rightText: <IPayButton btnType="primary" btnIconsDisabled medium btnText={localizationText.CARDS.RENEW_CARD} />,
      },
    },
    annual: {
      warning: {
        title: localizationText.CARDS.ANNUAL_FEE_COLLECTION,
        subtitle: expiryDate,
        icon: icons.moneys_warning,
        rightText: (
          <IPaySubHeadlineText style={styles.fee} regular={false}>
            {fee} <IPaySubHeadlineText regular>{localizationText.COMMON.SAR}</IPaySubHeadlineText>
          </IPaySubHeadlineText>
        ),
      },
      alert: {
        title: localizationText.CARDS.ANNUAL_FEE_COLLECTION_FAILED,
        subtitle: localizationText.CARDS.ANNUAL_FEE_FAILED_MESSAGE,
        icon: icons.moneys_alert,
        rightText: (
          <IPayButton
            btnType="primary"
            leftIcon={<IPayIcon size={14} icon={icons.add} color={colors.natural.natural0} />}
            small
            btnStyle={styles.topUpBtn}
            btnText={localizationText.COMMON.TOP_UP}
          />
        ),
      },
    },
  };

  return (
    <IPayList
      containerStyle={[styles.cardContainer, cardStatusType === CardStatusType.ALERT && styles.alertBg] as ViewStyle}
      leftIcon={<IPayIcon size={20} icon={cardStatusIndication[statusIndication][cardStatusType].icon} />}
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
  );
};

export default IPayCardStatusIndication;
