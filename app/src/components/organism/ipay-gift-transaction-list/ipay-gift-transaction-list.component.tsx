import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import GiftStatus from '@app/enums/gift-status.enum';
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
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = giftListStyles(colors);

  //this function should change the color of the status of the gift
  const statusColor = () => {
    if (status === GiftStatus.UNOPENED) {
      return { color: colors.warning.warning500 };
    } else if (status === GiftStatus.OPENED) {
      return { color: colors.success.success500 };
    } else {
      return { color: colors.error.error500 };
    }
  };

  //this function should change the STATUS of the gift
  const statusText = () => {
    if (status === GiftStatus.UNOPENED) {
      return { text: localizationText.SEND_GIFT.UNOPENED };
    } else if (status === GiftStatus.OPENED) {
      return { text: localizationText.SEND_GIFT.OPENED };
    } else {
      return { text: localizationText.SEND_GIFT.EXPIRED };
    }
  };

  return (
    <IPayPressable testID={`${testID}-gift-transaction-list`} style={styles.container} onPress={onPress}>
      <IPayView>
        <IPayView style={styles.rightContainer}>
          <IPayView style={status === GiftStatus.UNOPENED ? styles.iconBackground : styles.normalIconBackground}>
            <IPayIcon
              icon={icons.gift}
              size={18}
              color={status === GiftStatus.UNOPENED ? colors.warning.warning500 : colors.primary.primary900}
            />
          </IPayView>
          <IPayView style={styles.textContainer}>
            <IPayCaption2Text text={date} styles={headingStyle} color={colors.natural.natural500} />
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
      <IPayView style={styles.leftContainer}>
        <IPayFootnoteText text={statusText().text} color={statusColor().color} />
        <IPayFootnoteText
          regular={false}
          text={`${amount} ${localizationText.COMMON.SAR}`}
          color={colors.warning.warning800}
        />
        <IPayIcon icon={icons.arrow_right_square} size={18} color={colors.primary.primary900} />
      </IPayView>
    </IPayPressable>
  );
};

export default IPayGiftTransactionList;
