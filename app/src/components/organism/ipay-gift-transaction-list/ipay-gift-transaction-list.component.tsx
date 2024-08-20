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
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
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
  const localizationText = useLocalization();
  const styles = giftListStyles(colors);
  const isReceivedCardExpired = status === GiftStatus.EXPIRED && tab === localizationText.SEND_GIFT.RECEIVED;
  const isNewCard = status === GiftStatus.NEW && tab === localizationText.SEND_GIFT.RECEIVED;

  // this function should change the color of the status of the gift
  const getGiftStatusStyles = () => {
    switch (status) {
      case GiftStatus.UNOPENED:
        return {
          color: colors.warning.warning500,
          textColor: colors.warning.warning800,
          text: localizationText.SEND_GIFT.UNOPENED,
          leftIconColor: colors.warning.warning500,
          leftIconBg: styles.iconBackground,
        };
      case GiftStatus.OPENED:
        return {
          color: colors.success.success500,
          textColor: colors.success.success800,
          text: localizationText.SEND_GIFT.OPENED,
          leftIconColor: colors.primary.primary900,
        };
      case GiftStatus.NEW:
        if (tab === localizationText.SEND_GIFT.RECEIVED) {
          return {
            color: colors.secondary.secondary500,
            text: localizationText.SEND_GIFT.NEW,
            leftIconColor: colors.secondary.secondary800,
            leftIconBg: styles.newStyle,
          };
        }
        return {};
      default:
        return {
          color: colors.error.error500,
          textColor: colors.error.error800,
          text: localizationText.SEND_GIFT.EXPIRED,
          leftIconColor: colors.primary.primary900,
        };
    }
  };

  const { color, text, leftIconColor, leftIconBg } = getGiftStatusStyles();

  return (
    <IPayPressable testID={`${testID}-gift-transaction-list`} style={styles.container} onPress={onPress}>
      <IPayView>
        <IPayView style={styles.rightContainer}>
          <IPayView style={[styles.normalIconBackground, leftIconBg]}>
            <IPayIcon icon={isNewCard ? icons.giftNew : icons.gift} size={18} color={leftIconColor} />
          </IPayView>
          <IPayView style={styles.textContainer}>
            <IPayCaption2Text text={date} styles={headingStyle} color={colors.natural.natural500} />
            <IPayView style={titleWrapper}>
              <IPaySubHeadlineText
                regular={false}
                text={titleText}
                styles={titleStyle}
                color={colors.primary.primary900}
              />
            </IPayView>
            <IPayFootnoteText regular text={footText} style={footTextStyle} color={colors.natural.natural900} />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayView style={styles.leftContainer}>
        <IPayFootnoteText style={isNewCard && styles.newText} text={text} color={color} />
        {isReceivedCardExpired || isNewCard ? (
          <IPayView />
        ) : (
          <IPayFootnoteText
            regular={false}
            text={`${amount} ${localizationText.COMMON.SAR}`}
            color={colors.warning.warning800}
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
