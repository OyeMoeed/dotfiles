import React from 'react';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import colors from '@app/styles/colors.const';
import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import IPayButton from '../ipay-button/ipay-button.component';
import { IPayRequestCardProps } from './ipay-request-card.interface';
import getRequestCardStyles from './ipay-request-card.styles';

const statusStyles = {
  executed: {
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
  const { isPending, description, dateTime, onPress } = props;
  const { colors: themeColors } = useTheme();
  const styles = getRequestCardStyles(themeColors);

  const statusStyle = !isPending ? statusStyles[props?.status] : undefined;

  return (
    <IPayView style={styles.cardContainer}>
      <IPayView style={styles.requestInfo}>
        <IPayView style={styles.iconTextRow}>
          <IPayIcon size={20} icon={icons.money_request} color={themeColors.primary.primary900} />
          <IPayFootnoteText regular={false} text="NOTIFICATION_CENTER.REQUEST_MONEY" />
        </IPayView>
        <IPayCaption2Text color={themeColors.natural.natural900} text={description} />
      </IPayView>
      <IPayView style={styles.actionInfo}>
        {isPending ? (
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            btnText="NOTIFICATION_CENTER.VIEW"
            small
            onPress={onPress}
            rightIcon={<IPayIcon icon={icons.ARROW_RIGHT} size={16} color={themeColors.natural.natural0} />}
          />
        ) : (
          props?.status && (
            <IPayView style={[styles.statusContainer, { backgroundColor: statusStyle?.backgroundColor }]}>
              <IPaySubHeadlineText
                color={statusStyle?.textColor}
                regular
                text={`${props?.status.charAt(0).toUpperCase()}${props?.status?.slice(1)}`}
              />
            </IPayView>
          )
        )}
        <IPayCaption2Text
          color={themeColors.natural.natural500}
          style={styles.dateStyle}
          regular
          text={dateTime}
          shouldTranslate={false}
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayRequestCard;
