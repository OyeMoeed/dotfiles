import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayPressable,
  IPaySubHeadlineText,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientText, IPayHeader } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import useLocalization from '@app/localization/hooks/localization.hook';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { copyText } from '@app/utilities/clip-board.util';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import { topupStatus } from '@app/utilities/enums.util';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Share from 'react-native-share';
import IPayTopUpSuccessProps from './ipay-topup-redemption-successful.interface';
import topUpSuccessRedemptionStyles from './ipay-topup-redemption-successful.styles';

const IPayTopupRedemptionSuccess: React.FC<IPayTopUpSuccessProps> = ({ variants, testID }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const localizationText = useLocalization();
  const styles = topUpSuccessRedemptionStyles(colors);
  const { showToast } = useToastContext();

  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  // Format the current date and time
  const date = new Date();

  const onPressShare = () => {
    const shareOptions = {
      subject: 'Akthar Point',
      title: 'AlinmaPay',
      message: 'Ref number',
      url: 'AlinmaPay',
      social: Share.Social.WHATSAPP,
      whatsAppNumber: '9199999999',
      filename: 'test',
    };
    Share.open(shareOptions); // these share options would be updated later
  };

  const renderToast = () => {
    showToast({
      title: localizationText.copied,
      subTitle: localizationText.ref_number_copied,
      containerStyle: styles.containerToastStyle,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
    });
  };

  const points = 1000;
  const successDetail = [
    {
      title: localizationText.topup_type,
      value: localizationText.akhtr_point,
      icon: icons.akhtr_pay,
    },
    {
      title: localizationText.ref_number,
      value: 1234,
      icon: icons.copy,
      pressIcon: () => {
        renderToast();
        copyText('1234');
      },
    },
    {
      title: localizationText.topup_date,
      value: formatDateAndTime(date, dateTimeFormat.TimeAndDate),
    },
    {
      title: localizationText.points_redeemed,
      value: `${points} ${localizationText.points}`,
    },
  ];

  return (
    <IPayView style={styles.container} testID={testID}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />

      <IPayLinearGradientView
        style={styles.innerLinearGradientView}
        gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
      >
        {variants === topupStatus.FAILED && (
          <IPayView style={styles.failedVariant}>
            <IPayIcon icon={icons.danger12} size={scaleSize(80)} />
            <IPayTitle2Text text={localizationText.topup_failed} style={styles.failedText} />
            <IPayFootnoteText text={localizationText.reviewCard} style={styles.failedSubtitle} />
          </IPayView>
        )}
        {variants === topupStatus.SUCCESS && (
          <IPayView>
            <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
            <IPayView style={styles.linearGradientTextView}>
              <IPayGradientText
                text={localizationText.topup_redemption_sucess}
                gradientColors={gradientColors}
                style={styles.gradientTextSvg}
                fontSize={styles.linearGradientText.fontSize}
                fontFamily={styles.linearGradientText.fontFamily}
              />
              <IPaySubHeadlineText text={`1000 ${localizationText.SAR}`} style={styles.headlineText} />
            </IPayView>
            {successDetail.map(({ title, value, icon, pressIcon }, index) => (
              <IPayView style={styles.listContainer} key={index}>
                <IPayView style={styles.listView}>
                  <IPayFootnoteText text={title} color={colors.natural.natural900} />
                  <IPayView style={styles.listDetails}>
                    <IPayFootnoteText
                      text={value}
                      style={icon && styles.detailText}
                      color={colors.primary.primary800}
                    />
                    {icon && (
                      <IPayPressable onPress={pressIcon}>
                        <IPayIcon icon={icon} size={scaleSize(18)} />
                      </IPayPressable>
                    )}
                  </IPayView>
                </IPayView>
              </IPayView>
            ))}
          </IPayView>
        )}
        {variants === topupStatus.SUCCESS && (
          <IPayView>
            <IPayView style={styles.bottomActions}>
              <IPayPressable style={styles.newTopup} onPress={() => navigation.pop(2)}>
                <IPayIcon icon={icons.refresh2} size={scaleSize(14)} color={colors.primary.primary500} />
                <IPaySubHeadlineText text={localizationText.newTopUp} style={styles.newTopupText} regular />
              </IPayPressable>
              <IPayPressable style={styles.newTopup} onPress={onPressShare}>
                <IPayIcon icon={icons.share} size={scaleSize(14)} color={colors.primary.primary500} />
                <IPaySubHeadlineText text={localizationText.share} style={styles.newTopupText} regular />
              </IPayPressable>
            </IPayView>

            <IPayButton
              btnType="primary"
              leftIcon={<IPayIcon icon={icons.HOME} size={scaleSize(20)} color={colors.natural.natural0} />}
              btnText={localizationText.home}
              onPress={() => navigation.navigate(screenNames.HOME)}
              large
              btnStyle={styles.btnStyle}
            />
          </IPayView>
        )}
        {variants === topupStatus.FAILED && (
          <IPayView>
            <IPayButton
              btnType="primary"
              btnText={
                <>
                  <IPayIcon icon={icons.ARROW_LEFT} size={scaleSize(20)} color={colors.natural.natural0} />{' '}
                  {localizationText.startOver}
                </>
              }
              large
              onPress={() => navigation.navigate(screenNames.HOME)}
              btnStyle={styles.btnStyle}
              btnIconsDisabled
            />

            <IPayButton
              btnType="outline"
              leftIcon={<IPayIcon icon={icons.HOME} size={scaleSize(20)} color={colors.primary.primary500} />}
              btnText={localizationText.home}
              hasLeftIcon
              large
              btnStyle={styles.failedButton}
            />
          </IPayView>
        )}
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default IPayTopupRedemptionSuccess;
