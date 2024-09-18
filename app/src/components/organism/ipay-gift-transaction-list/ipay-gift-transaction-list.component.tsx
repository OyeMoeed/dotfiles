import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { GiftStatus } from '@app/enums/gift-status.enum';
import useTheme from '@app/styles/hooks/theme.hook';
import { dateTimeFormat } from '@app/utilities';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import giftListStyles from './ipay-gift-transaction-list.styles';
import { IPayGiftTransactionListProps } from './ipay-gift-transaction.interface';

const IPayGiftTransactionList: React.FC<IPayGiftTransactionListProps> = ({
  date,
  titleText,
  footText,
  headingStyle,
  status,
  titleStyle,
  footTextStyle,
  amount,
  testID,
  onPress,
  titleWrapper,
  tab,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = giftListStyles(colors);
  const isReceivedCardExpired = status === GiftStatus.FAILED && tab === t('SEND_GIFT.RECEIVED');
  const isNewCard = status === GiftStatus.INITIATED && tab === t('SEND_GIFT.RECEIVED');

  // this function should change the color of the status of the gift
  const getGiftStatusStyles = () => {
    switch (status) {
      case GiftStatus.INITIATED:
        if (tab === t('SEND_GIFT.RECEIVED')) {
          return {
            color: colors.secondary.secondary500,
            text: t('SEND_GIFT.NEW'),
            leftIconColor: colors.secondary.secondary800,
            leftIconBg: styles.newStyle,
          };
        }
        return {
          color: colors.warning.warning500,
          textColor: colors.warning.warning800,
          text: t('SEND_GIFT.UNOPENED'),
          leftIconColor: colors.warning.warning500,
          leftIconBg: styles.iconBackground,
        };
      case GiftStatus.EXECUTED:
        return {
          color: colors.success.success500,
          textColor: colors.success.success800,
          text: t('SEND_GIFT.OPENED'),
          leftIconColor: colors.primary.primary900,
        };
      case GiftStatus.FAILED:
        return {
          color: colors.error.error500,
          textColor: colors.error.error800,
          text: t('SEND_GIFT.EXPIRED'),
          leftIconColor: colors.primary.primary900,
        };
      default:
        return {
          color: colors.warning.warning500,
          textColor: colors.warning.warning800,
          text: t('SEND_GIFT.UNOPENED'),
          leftIconColor: colors.warning.warning500,
          leftIconBg: styles.iconBackground,
        };
    }
  };

  const { color, text, leftIconColor, leftIconBg } = getGiftStatusStyles();
  const formattedDate = date ? formatDateAndTime(date, dateTimeFormat.DateAndTime) : '';

  return (
    <IPayPressable testID={`${testID}-gift-transaction-list`} style={styles.container} onPress={onPress}>
      <IPayView>
        <IPayView style={styles.rightContainer}>
          <IPayView style={[styles.normalIconBackground, leftIconBg]}>
            <IPayIcon icon={isNewCard ? icons.giftNew : icons.gift} size={18} color={leftIconColor} />
          </IPayView>
          <IPayView style={styles.textContainer}>
            <IPayCaption2Text text={formattedDate} styles={headingStyle} color={colors.natural.natural500} />
            <IPayView style={titleWrapper}>
              <IPaySubHeadlineText
                regular={false}
                text={titleText}
                styles={titleStyle}
                color={colors.primary.primary900}
              />
              <IPayFootnoteText regular text={footText} style={footTextStyle} color={colors.natural.natural900} />
            </IPayView>
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayView style={styles.leftContainer}>
        <IPayFootnoteText style={[isNewCard && styles.newText, styles.statusText]} text={text} color={color} />
        {isReceivedCardExpired || isNewCard ? (
          <IPayView />
        ) : (
          <IPayFootnoteText
            regular={false}
            text={`${amount} ${t('COMMON.SAR')}`}
            color={colors.warning.warning800}
            shouldTranslate={false}
          />
        )}
        {isNewCard && (
          <IPayView style={styles.newIconStyle}>
            <IPayIcon icon={icons.giftSecondary} size={100} color={colors.secondary.secondary800} />
          </IPayView>
        )}
        <IPayIcon
          icon={isReceivedCardExpired ? icons.danger12 : icons.arrow_right_square}
          size={18}
          color={isNewCard ? colors.secondary.secondary800 : colors.primary.primary900}
        />
      </IPayView>
    </IPayPressable>
  );
};

export default IPayGiftTransactionList;
