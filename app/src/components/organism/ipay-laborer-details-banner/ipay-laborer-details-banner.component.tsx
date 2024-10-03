import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImageStyle } from 'react-native';

import { isArabic } from '@app/utilities/constants';
import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';

import laborerDetailsStyles from './ipay-laborer-details-banner.styles';
import { IPayLaborerDetailsBannerProps } from './ipay-laborer-details-banner.interface';

const IPayLaborerDetailsBanner: React.FC<IPayLaborerDetailsBannerProps> = ({
  titleText,
  amount,
  testID,
  onPress,
  shouldTranslateTitle = true,
  withArrow = false,
  details,
  isDetailsBanner,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = laborerDetailsStyles(colors);

  return (
    <IPayPressable
      testID={`${testID}-laborer-details-banner`}
      style={[styles.container, isDetailsBanner ? styles.detailsBannerContainer : {}]}
      onPress={onPress}
      disabled={!onPress}
    >
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.rightContainer}>
          <IPayView style={styles.iconBackground}>
            <IPayImage
              style={styles.logoIcon as ImageStyle}
              resizeMode="contain"
              testID="alinmaPBlack"
              image={images.alinmaPBlack}
            />
          </IPayView>
          <IPayView style={styles.textContainer}>
            <IPaySubHeadlineText
              regular={false}
              style={styles.titleStyle}
              text={titleText.substring(0, isArabic ? 12 : 15)}
              color={isDetailsBanner ? colors.natural.natural900 : colors.primary.primary900}
              shouldTranslate={shouldTranslateTitle}
            />
            <IPayCaption2Text
              text={details}
              color={colors.natural.natural500}
              style={isDetailsBanner ? styles.laborerPosition : styles.titleStyle}
            />
          </IPayView>
        </IPayView>
      </IPayView>

      <IPayView style={styles.leftContainer}>
        {isDetailsBanner ? (
          amount && (
            <IPayView>
              <IPayCaption2Text
                text="MUSANED.BASIC_SALARY"
                color={colors.primary.primary900}
                style={styles.basicSalaryText}
                numberOfLines={1}
              />
              <IPaySubHeadlineText
                regular={false}
                shouldTranslate={false}
                color={colors.primary.primary900}
                style={styles.basicSalaryAmount}
              >
                {Number(amount)} <IPayFootnoteText style={styles.sarText} text="COMMON.SAR" />
              </IPaySubHeadlineText>
            </IPayView>
          )
        ) : (
          <IPaySubHeadlineText
            regular={false}
            text={`${Number(amount)} ${t('COMMON.SAR')}`}
            shouldTranslate={false}
            color={colors.natural.natural900}
            style={styles.basicSalaryAmount}
          />
        )}
        {withArrow ? <IPayIcon icon={icons.arrow_right_1} size={16} /> : null}
      </IPayView>
    </IPayPressable>
  );
};

export default IPayLaborerDetailsBanner;
