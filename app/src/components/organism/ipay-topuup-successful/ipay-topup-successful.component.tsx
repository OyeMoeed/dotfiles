import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFlatlist,
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
import { IPayButton, IPayGradientText, IPayHeader, IPayToast } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { payChannel, topupStatus } from '@app/utilities/enums.util';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import IpayTopupSuccessProps from './ipay-topup-successful.interface';
import { TopUpSuccessStyles } from './ipay-topup-successful.styles';
import { navigate } from '@app/navigation/navigation-service.navigation';
import { copyText } from '@app/utilities/clip-board.util';
import { moderateScale } from 'react-native-size-matters';
import moment from 'moment';

const IPayTopupSuccess: React.FC<IpayTopupSuccessProps> = ({ completionStatus, topupChannel, goBack }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const localizationText = useLocalization();
  const styles = TopUpSuccessStyles(colors);
  const [showToast, setShowToast] = React.useState<number>(0);


  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const date = new Date();
  const timeFormatted = moment(date).format('HH:mm');

  const dateFormatted = moment(date).format('DD/MM/YYYY');

  const formattedDate = `${timeFormatted} - ${dateFormatted}`;

  const handleClickOnCopy = (step: number, textToCopy: string) => {
    copyText(textToCopy);
    setShowToast(step);
    setTimeout(() => setShowToast(0), 3000);
  };

  const renderToast = () =>
    showToast > 0 && (
      <IPayToast
        title={showToast === 1 ? localizationText.HOME.NAME_COPIED : localizationText.HOME.IBAN_NUMBER}
        textStyle={{ color: colors.natural.natural0 }}
        isShowLeftIcon
        leftIcon={<IPayIcon icon={icons.copy_success} size={moderateScale(18)} color={colors.natural.natural0} />}
        containerStyle={styles.toastContainer}
      />
    );

  // Example data for FlatList in Apple Pay section
  const applePayDetails = [
    { id: '1', label: localizationText.TOP_UP.TOPUP_TYPE, value: localizationText.TOP_UP.APPLE_PAY, icon: icons.apple_pay, color: colors.primary.primary800 },
    { id: '2', label: localizationText.TOP_UP.TOPUP_DATE, value: formattedDate, icon: null },
    // Add more items as needed
  ];

  const cardPayDetails = [
    { id: '1', label: localizationText.TOP_UP.TOPUP_TYPE, value: localizationText.credit_card, icon: icons.cards, color: colors.primary.primary800 },
    {
      id: '2',
      label: localizationText.Adam_Ahmed,
      value: localizationText.card_number_digit,
      icon: null,
      leftIcon: icons.master_card,

    },
    { id: '3', label: localizationText.TOP_UP.REF_NUMBER, value: localizationText.number_ref, icon: icons.copy, color: colors.primary.primary500 },
    { id: '4', label: localizationText.TOP_UP.TOPUP_DATE, value: formattedDate, icon: null },
  ];

  // Render function for the FlatList items
  const renderApplePayItem = ({ item }) => (
    <IPayView style={styles.listContainer}>
      <IPayView style={styles.listView}>
        <IPayView style={styles.iconLabel}>
          {item.leftIcon && (
            <IPayView style={styles.leftIcon}>
              <IPayIcon icon={item.leftIcon} size={scaleSize(18)} />
            </IPayView>
          )}
          <IPayFootnoteText text={item.label} />
        </IPayView>
        <IPayView style={styles.listDetails}>
          <IPayFootnoteText text={item.value} style={styles.detailsText} />
          {item.icon && (
            <IPayPressable style={styles.appleIcon}>
              <IPayIcon icon={item.icon} style={styles.appleIcon} color={item.color} size={scaleSize(18)} />
            </IPayPressable>
          )}
        </IPayView>
      </IPayView>
    </IPayView>
  );

  return (
    <IPayView style={styles.container}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />
      <IPayLinearGradientView
        style={styles.innerLinearGradientView}
        gradientColors={[colors.backgrounds.successBackground]}
      >
        {completionStatus === topupStatus.FAILED && (
          <IPayView style={styles.failedVariant}>
            <IPayIcon icon={icons.danger12} size={scaleSize(80)} />
            <IPayTitle2Text text={localizationText.topupFailed} style={styles.failedText} />
            <IPayFootnoteText text={localizationText.TOP_UP.REVIEW_CARD} style={styles.failedSubtitle} />
          </IPayView>
        )}
        {completionStatus === topupStatus.SUCCESS && (
          <IPayView>
            <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
            <IPayView style={styles.linearGradientTextView}>
              <IPayGradientText
                text={localizationText.TOP_UP.TOPUP_SUCCESS}
                gradientColors={gradientColors}
                style={styles.gradientTextSvg}
                fontSize={styles.linearGradientText.fontSize}
                fontFamily={styles.linearGradientText.fontFamily}
              />
              <IPaySubHeadlineText text={`1000 ${localizationText.COMMON.SAR}`} style={styles.headlineText} />
            </IPayView>

            {topupChannel === payChannel.APPLE && (
              <>
                <IPayFlatlist
                  style={styles.detailesFlex}
                  scrollEnabled={false}
                  data={applePayDetails}
                  renderItem={renderApplePayItem}
                />
              </>
            )}
            {topupChannel === payChannel.CARD && (
              <>
                <IPayFlatlist
                  style={styles.detailesFlex}
                  scrollEnabled={false}
                  data={cardPayDetails}
                  renderItem={renderApplePayItem}
                />
              </>
            )}
          </IPayView>
        )}
        {completionStatus === topupStatus.SUCCESS && (
          <IPayView>
            {topupChannel === payChannel.APPLE && (
              <IPayPressable style={styles.newTopup} onPress={goBack}>
                <IPayIcon icon={icons.refresh2} size={scaleSize(14)} color={colors.primary.primary500} />
                <IPaySubHeadlineText text={localizationText.TOP_UP.NEW_TOP_UP} style={styles.newTopupText} regular />
              </IPayPressable>
            )}
            {topupChannel === payChannel.CARD && (
              <IPayView style={styles.cardButton}>
                <IPayPressable style={styles.newTopup} onPress={goBack}>
                  <IPayIcon icon={icons.refresh2} size={scaleSize(14)} color={colors.primary.primary500} />
                  <IPaySubHeadlineText text={localizationText.TOP_UP.NEW_TOP_UP} style={styles.newTopupText} regular />
                </IPayPressable>
                <IPayPressable style={styles.newTopup} onPress={() => navigate(screenNames.TOP_UP_SUCCESS, { topupStatus: topupStatus.FAILED })}>
                  <IPayIcon icon={icons.share} size={scaleSize(14)} color={colors.primary.primary500} />
                  <IPaySubHeadlineText text={localizationText.TOP_UP.REF_NUMBER} style={styles.newTopupText} regular />
                </IPayPressable>
              </IPayView>
            )}
            <IPayButton
              btnType="outline"
              btnText={localizationText.COMMON.HOME}
              hasLeftIcon
              leftIcon={<IPayIcon icon={icons.HOME_2} size={scaleSize(20)} color={colors.natural.natural0} />}
              onPress={() => navigation.navigate(screenNames.HOME)}
              textColor={colors.natural.natural0}
              textStyle={styles.text}
              btnStyle={styles.btnStyle}
            />
          </IPayView>
        )
        }
        {
          completionStatus === topupStatus.FAILED && (
            <IPayView>
              <IPayButton
                btnType="primary"
                btnText={localizationText.TOP_UP.START_OVER}
                large
                onPress={goBack}
                btnStyle={styles.btnStyle}
                leftIcon={<IPayIcon icon={icons.ARROW_LEFT} size={scaleSize(20)} color={colors.natural.natural0} />}
                hasLeftIcon
              />

              <IPayButton
                btnType="outline"
                btnText={localizationText.COMMON.HOME}
                textStyle={styles.text}
                hasLeftIcon
                leftIcon={<IPayIcon icon={icons.HOME_2} size={scaleSize(20)} color={colors.primary.primary500} />}
                onPress={() => navigation.navigate(screenNames.HOME)}

                btnStyle={styles.home}
              />
            </IPayView>
          )
        }
      </IPayLinearGradientView >
    </IPayView >
  );
};

export default IPayTopupSuccess;
