import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import MoneyRequestStatus from '@app/enums/money-request-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
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
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = moneyRequestListStyles(colors);

  //this function should change the color of the status of the gift
  const statusColor = () => {
    switch (status) {
      case MoneyRequestStatus.CANCEL:
        return { color: colors.natural.natural700 };
      case MoneyRequestStatus.PAID:
        return { color: colors.tertiary.tertiary500 };
      case MoneyRequestStatus.PENDING:
        return { color: colors.critical.critical800 };
      default:
        return { color: colors.error.error500 };
    }
  };

  // This function should change the STATUS of the gift
  const statusText = () => {
    switch (status) {
      case MoneyRequestStatus.CANCEL:
        return { text: localizationText.REQUEST_MONEY.CANCEL };
      case MoneyRequestStatus.PAID:
        return { text: localizationText.REQUEST_MONEY.PAID };
      case MoneyRequestStatus.PENDING:
        return { text: localizationText.REQUEST_MONEY.PENDING };
      default:
        return { text: localizationText.REQUEST_MONEY.PAID };
    }
  };

  const statusBackgroundColor = () => {
    switch (status) {
      case MoneyRequestStatus.CANCEL:
        return { backgroundColor: colors.natural.natural100 };
      case MoneyRequestStatus.PAID:
        return { backgroundColor: colors.success.success25 };
      case MoneyRequestStatus.PENDING:
        return { backgroundColor: colors.critical.critical25 };
      default:
        return { backgroundColor: colors.error.error25 };
    }
  };

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
              text={titleText}
              styles={titleStyle}
              color={colors.primary.primary900}
            />
            <IPayCaption2Text text={date} styles={headingStyle} color={colors.natural.natural500} />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayView style={styles.leftContainer}>
        <IPayView style={[styles.statusView, statusBackgroundColor()]}>
          <IPaySubHeadlineText regular text={statusText().text} color={statusColor().color} style={styles.text} />
        </IPayView>
        <IPayFootnoteText
          regular={false}
          text={`${amount} ${localizationText.COMMON.SAR}`}
          color={colors.natural.natural900}
        />
      </IPayView>
    </IPayPressable>
  );
};

export default IPayMoneyRequestList;
