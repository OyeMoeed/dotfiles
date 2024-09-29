import {
  IPayCaption2Text,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { useTranslation } from 'react-i18next';
import images from '@app/assets/images';
import icons from '@app/assets/icons';
import moneyRequestListStyles from './ipay-musaned-list-non-alinma-user.style';
import { IPayMusanedListProps } from './ipay-musaned-list.interface';

const IPayMusanedNonAlinmaUserList: React.FC<IPayMusanedListProps> = ({
  titleText,
  amount,
  testID,
  onPress,
  shouldTranslateTitle,
  withArrow = true,
  details,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = moneyRequestListStyles(colors);

  return (
    <IPayPressable testID={`${testID}-gift-transaction-list`} style={styles.container} onPress={onPress}>
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.rightContainer}>
          <IPayView style={styles.iconBackground}>
            <IPayImage style={styles.logoIcon} resizeMode="contain" testID="alinmaPBlack" image={images.alinmaPBlack} />
          </IPayView>
          <IPayView style={styles.textContainer}>
            <IPaySubHeadlineText
              regular={false}
              text={titleText.substring(0, 15)}
              color={colors.primary.primary900}
              shouldTranslate={shouldTranslateTitle}
            />
            <IPayCaption2Text text={details} color={colors.natural.natural500} />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayView style={styles.leftContainer}>
        <IPaySubHeadlineText
          regular={false}
          text={`${Number(amount)} ${t('COMMON.SAR')}`}
          shouldTranslate={false}
          color={colors.natural.natural900}
        />
        {withArrow ? <IPayIcon icon={icons.arrow_right_1} /> : null}
      </IPayView>
    </IPayPressable>
  );
};

export default IPayMusanedNonAlinmaUserList;
