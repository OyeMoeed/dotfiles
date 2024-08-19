import React from 'react';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import colors from '@app/styles/colors.const';
import icons from '@app/assets/icons';
import IPayButton from '../ipay-button/ipay-button.component';
import { IPayRequestCardProps } from './ipay-request-card.interface';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import getRequestCardStyles from './ipay-request-card.styles';

const statusStyles = {
  paid: {
    backgroundColor: colors.success.success25,
    textColor: colors.success.success500,
  },
  cancelled: {
    backgroundColor: colors.natural.natural100,
    textColor: colors.natural.natural700,
  },
  rejected: {
    backgroundColor: colors.error.error25,
    textColor: colors.error.error500,
  },
};

const IPayRequestCard: React.FC<IPayRequestCardProps> = (props) => {
  const { isPending, description, dateTime } = props;
  const localization =  useLocalization();
  const { colors } = useTheme();
  const styles = getRequestCardStyles(colors);

  const statusStyle = !isPending ? statusStyles[props.status] : undefined;

  return (
    <IPayView style={styles.cardContainer}>
      <IPayView style={styles.requestInfo}>
        <IPayView style={styles.iconTextRow}>
          <IPayIcon size={20} icon={icons.money_request} color={colors.primary.primary900} />
          <IPayFootnoteText regular={false} text={localization.NOTIFICATION_CENTER.REQUEST_MONEY} />
        </IPayView>
        <IPayCaption2Text color={colors.natural.natural900} text={description} />
      </IPayView>
      <IPayView style={styles.actionInfo}>
        {isPending ? (
          <IPayButton
            btnType="primary"
            btnText={localization.NOTIFICATION_CENTER.VIEW}
            small
            rightIcon={<IPayIcon icon={icons.ARROW_RIGHT} size={16} color={colors.natural.natural0} />}
          />
        ) : (
          props.status && (
            <IPayView style={[styles.statusContainer, { backgroundColor: statusStyle?.backgroundColor }]}>
              <IPaySubHeadlineText
                color={statusStyle?.textColor}
                regular
                text={props.status.charAt(0).toUpperCase() + props.status.slice(1)}
              />
            </IPayView>
          )
        )}
        <IPayCaption2Text color={colors.natural.natural500} style={styles.dateStyle} regular text={dateTime} />
      </IPayView>
    </IPayView>
  );
};

export default IPayRequestCard;
