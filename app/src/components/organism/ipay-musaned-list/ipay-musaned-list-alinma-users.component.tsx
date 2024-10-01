import icons from '@app/assets/icons';
import images from '@app/assets/images';
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
import { getStatusStyles } from '@app/screens/musaned/musaned.utils';
import useTheme from '@app/styles/hooks/theme.hook';
import { MusanedStatus } from '@app/utilities';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IPayMusanedListProps } from './ipay-musaned-list.interface';
import moneyRequestListStyles from './ipay-musaned-list.style';

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

  const { color, text, backgroundColor, type } = getStatusStyles(colors, status);

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
