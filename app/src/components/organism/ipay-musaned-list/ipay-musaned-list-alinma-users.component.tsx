import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
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
import { MusanedStatus } from '@app/utilities';
import moment from 'moment';
import moneyRequestListStyles from './ipay-musaned-list.style';
import { IPayMusanedListProps } from './ipay-musaned-list.interface';

const IPayMusanedAlinmaUser: React.FC<IPayMusanedListProps> = ({
  date,
  titleText,
  status,
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

  // this function should change the color of the status of the gift
  const getStatusStyles = () => {
    switch (status) {
      case MusanedStatus.UNPAIED:
        return {
          color: colors.natural.natural700,
          text: 'MUSANED.UNPAID',
          backgroundColor: colors.natural.natural100,
          type: MusanedStatus.UNPAIED,
        };
      case MusanedStatus.PAID:
        return {
          color: colors.tertiary.tertiary500,
          text: 'MUSANED.PAID',
          backgroundColor: colors.success.success25,
          type: MusanedStatus.PAID,
        };
      default:
        return {
          color: colors.natural.natural700,
          text: 'MUSANED.UNPAID',
          backgroundColor: colors.natural.natural100,
          type: MusanedStatus.UNPAIED,
        };
    }
  };

  const { color, text, backgroundColor, type } = getStatusStyles();

  const showDate = moment(date).format('MM/YYYY');

  return (
    <IPayPressable testID={`${testID}-musaned-list-alinma-users`} style={styles.container} onPress={onPress}>
      <IPayView style={styles.rightContainer}>
        <IPayView style={styles.iconBackground}>
          <IPayImage style={styles.logoIcon} resizeMode="contain" testID="alinmaPx3" image={images.alinmaPx3} />
        </IPayView>
      </IPayView>
      <IPayView style={styles.leftMainContainer}>
        <IPayView style={styles.textContainer}>
          <IPaySubHeadlineText
            regular={false}
            text={titleText.substring(0, 15)}
            color={colors.primary.primary900}
            shouldTranslate={shouldTranslateTitle}
          />
          <IPayView style={styles.textWithIcon}>
            <IPayView style={[styles.statusView, { backgroundColor }]}>
              <IPaySubHeadlineText regular text={text} color={color} style={styles.text} />
            </IPayView>
            {withArrow ? <IPayIcon icon={icons.arrow_right_1} /> : null}
          </IPayView>
        </IPayView>
        <IPayView style={styles.leftContainer}>
          <IPayCaption2Text text={details} color={colors.natural.natural500} />
          <IPayFootnoteText shouldTranslate={false}>
            {type !== MusanedStatus.PAID ? (
              <>
                <IPayCaption1Text color={colors.error.error500} text={`Date: ${showDate}`} />
                <IPayFootnoteText text="  |  " />
              </>
            ) : (
              <IPayView />
            )}
            <IPayFootnoteText
              color={colors.natural.natural900}
              regular={false}
              text={`${Number(amount)} ${t('COMMON.SAR')}`}
            />
          </IPayFootnoteText>
        </IPayView>
      </IPayView>
    </IPayPressable>
  );
};

export default IPayMusanedAlinmaUser;
