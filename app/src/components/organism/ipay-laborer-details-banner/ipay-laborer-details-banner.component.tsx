import { isArabic } from '@app/utilities/constants';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImageStyle } from 'react-native';

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

import IPayLaborerDetailsBannerProps from './ipay-laborer-details-banner.interface';
import laborerDetailsStyles from './ipay-laborer-details-banner.styles';

const IPayLaborerDetailsBanner: React.FC<IPayLaborerDetailsBannerProps> = ({
  titleText,
  amount,
  testID,
  onPress,
  shouldTranslateTitle = true,
  withArrow = false,
  details,
  isDetailsBanner,
  containerStyle,
  withProfileIcon,
  profileIconStyle,
  onlyAmount,
  withLogoOnRight,
  boldTitle = true,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = laborerDetailsStyles(colors);

  return (
    <IPayPressable
      testID={`${testID}-laborer-details-banner`}
      style={[styles.container, isDetailsBanner ? styles.detailsBannerContainer : {}, containerStyle]}
      onPress={onPress}
      disabled={!onPress}
    >
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.rightContainer}>
          {withProfileIcon ? (
            <IPayView style={[styles.userIcon, profileIconStyle]}>
              <IPayIcon icon={icons?.user1} size={20} />
            </IPayView>
          ) : (
            <IPayView style={styles.iconBackground}>
              <IPayImage
                style={styles.logoIcon as ImageStyle}
                resizeMode="contain"
                testID="alinmaPBlack"
                image={images.alinmaPBlack}
              />
            </IPayView>
          )}
          <IPayView style={styles.textContainer}>
            <IPaySubHeadlineText
              regular={!boldTitle}
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
        {isDetailsBanner && amount && (
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
        )}
        {onlyAmount && (
          <IPaySubHeadlineText
            regular={false}
            text={`${Number(amount)} ${t('COMMON.SAR')}`}
            shouldTranslate={false}
            color={colors.natural.natural900}
            style={styles.basicSalaryAmount}
          />
        )}
        {withLogoOnRight && (
          <IPayImage
            style={styles.logoIcon as ImageStyle}
            resizeMode="contain"
            testID="alinmaPBlack"
            image={images.alinmaP}
          />
        )}
        {withArrow ? <IPayIcon icon={icons.arrow_right_1} size={16} /> : null}
      </IPayView>
    </IPayPressable>
  );
};

export default IPayLaborerDetailsBanner;
