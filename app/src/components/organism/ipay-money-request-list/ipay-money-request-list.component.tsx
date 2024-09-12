import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { MoneyRequestStatus } from '@app/enums/money-request-status.enum';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IPayMoneyRequestListProps } from './ipay-money-request-list.interface';
import moneyRequestListStyles from './ipay-money-request.list.style';

const IPayMoneyRequestList: React.FC<IPayMoneyRequestListProps> = ({
  date,
  titleText,
  headingStyle,
  status,
  titleStyle,
  amount,
  testID,
  onPress,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = moneyRequestListStyles(colors);

  // this function should change the color of the status of the gift
  const getStatusStyles = () => {
    switch (status) {
      case MoneyRequestStatus.CANCEL:
        return {
          color: colors.natural.natural700,
          text: t('REQUEST_MONEY.CANCELLED'),
          backgroundColor: colors.natural.natural100,
        };
      case MoneyRequestStatus.PAID:
        return {
          color: colors.tertiary.tertiary500,
          text: t('REQUEST_MONEY.PAID'),
          backgroundColor: colors.success.success25,
        };
      case MoneyRequestStatus.PENDING:
        return {
          color: colors.critical.critical800,
          text: t('REQUEST_MONEY.PENDING'),
          backgroundColor: colors.critical.critical25,
        };
      default:
        return {
          color: colors.error.error500,
          text: t('REQUEST_MONEY.REJECTED'),
          backgroundColor: colors.error.error25,
        };
    }
  };

  const { color, text, backgroundColor } = getStatusStyles();

  return (
    <IPayPressable testID={`${testID}-gift-transaction-list`} style={styles.container} onPress={onPress}>
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.rightContainer}>
          <IPayView style={styles.iconBackground}>
            <IPayIcon icon={icons.money_request} size={18} color={colors.primary.primary800} />
          </IPayView>
          <IPayView style={styles.textContainer}>
            <IPaySubHeadlineText
              regular={false}
              text={titleText.substring(0, 15)}
              styles={titleStyle}
              color={colors.primary.primary900}
            />
            <IPayCaption2Text text={date} styles={headingStyle} color={colors.natural.natural500} />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayView style={styles.leftContainer}>
        <IPayView style={[styles.statusView, { backgroundColor }]}>
          <IPaySubHeadlineText regular text={text} color={color} style={styles.text} />
        </IPayView>
        <IPayFootnoteText regular={false} text={`${amount} ${t('COMMON.SAR')}`} color={colors.natural.natural900} />
      </IPayView>
    </IPayPressable>
  );
};

export default IPayMoneyRequestList;
