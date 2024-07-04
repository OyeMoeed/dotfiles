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
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientText, IPayHeader, IPayShareableImageView } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { payChannel, topupStatus } from '@app/utilities/enums.util';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import IpayTopupSuccessProps from './ipay-topup-successful.interface';
import { TopUpSuccessStyles } from './ipay-topup-successful.styles';

const IPayTopupSuccess: React.FC<IpayTopupSuccessProps> = ({ completionStatus, topupChannel, goBack }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const localizationText = useLocalization();
  const styles = TopUpSuccessStyles(colors);
  const { showToast } = useToastContext();
  const date = new Date();
  const timeFormatted = moment(date).format('HH:mm');

  const dateFormatted = moment(date).format('DD/MM/YYYY');

  const formattedDate = `${timeFormatted} - ${dateFormatted}`;

  const applePayDetails = [
    {
      id: '1',
      label: localizationText.topup_type,
      value: localizationText.apple_pay,
      icon: icons.apple_pay,
      color: colors.primary.primary800,
    },
    { id: '2', label: localizationText.topup_date, value: formattedDate, icon: null },
  ];

  const cardPayDetails = [
    {
      id: '1',
      label: localizationText.topup_type,
      value: localizationText.credit_card,
      icon: icons.cards,
      color: colors.primary.primary800,
    },
    {
      id: '2',
      label: localizationText.Adam_Ahmed,
      value: localizationText.card_number_digit,
      icon: null,
      leftIcon: icons.master_card,
    },
    {
      id: '3',
      label: localizationText.ref_number,
      value: localizationText.number_ref,
      icon: icons.copy,
      color: colors.primary.primary500,
    },
    { id: '4', label: localizationText.topup_date, value: formattedDate, icon: null },
  ];

  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const handleClickOnCopy = (step: number, textToCopy: string) => {
    copyText(textToCopy);
    renderToast();
  };

  const renderToast = () => {
    showToast({
      title: localizationText.copied,
      subTitle: localizationText.ref_number_copied,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainer,
    });
  };
  const renderPayItem = ({ item }) => (
    <IPayView style={styles.listContainer}>
      <IPayView style={styles.listView}>
        <IPayView style={styles.iconLabel}>
          {item.leftIcon && (
            <IPayView style={styles.leftIcon}>
              <IPayImage image={images.master} style={styles.leftIconCard} />
            </IPayView>
          )}
          <IPayFootnoteText color={colors.natural.natural900} text={item.label} />
        </IPayView>
        <IPayView style={styles.listDetails}>
          <IPayFootnoteText text={item.value} style={styles.detailsText} />
          {item.icon && (
            <IPayPressable
              onPress={() => {
                if (item.icon == icons.copy) {
                  handleClickOnCopy(3, item.detailsText);
                }
              }}
              style={styles.appleIcon}
            >
              <IPayIcon icon={item.icon} style={styles.appleIcon} color={item.color} size={18} />
            </IPayPressable>
          )}
        </IPayView>
      </IPayView>
    </IPayView>
  );

  return (
    <IPayView style={styles.container}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />
      <IPayShareableImageView
        otherView={
          <IPayView style={styles.cardButton}>
            <IPayButton
              onPress={goBack}
              btnType="link-button"
              btnText={localizationText.newTopUp}
              leftIcon={<IPayIcon icon={icons.refresh2} size={14} color={colors.primary.primary500} />}
            />
            <IPayButton
              btnType="link-button"
              btnText={localizationText.share}
              leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
            />
          </IPayView>
        }
      >
        <IPayLinearGradientView
          style={styles.innerLinearGradientView}
          gradientColors={[colors.backgrounds.successBackground]}
        >
          <>
            {completionStatus === topupStatus.SUCCESS && (
              <IPayView>
                <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
                <IPayView style={styles.linearGradientTextView}>
                  <IPayGradientText
                    yScale={17.5}
                    text={localizationText.topup_success}
                    gradientColors={gradientColors}
                    style={styles.gradientTextSvg}
                    fontSize={styles.linearGradientText.fontSize}
                    fontFamily={styles.linearGradientText.fontFamily}
                  />
                  <IPaySubHeadlineText text={`1000 ${localizationText.SAR}`} style={styles.headlineText} />
                </IPayView>
                <IPayFlatlist
                  style={styles.detailesFlex}
                  scrollEnabled={false}
                  data={topupChannel === payChannel.APPLE ? applePayDetails : cardPayDetails}
                  renderItem={renderPayItem}
                />
              </IPayView>
            )}

            {completionStatus === topupStatus.SUCCESS && (
              <IPayView>
                {topupChannel === payChannel.APPLE && (
                  <IPayPressable style={styles.newTopup} onPress={goBack}>
                    <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
                    <IPaySubHeadlineText text={localizationText.newTopUp} style={styles.newTopupText} regular />
                  </IPayPressable>
                )}
                {topupChannel === payChannel.CARD && (
                  <IPayView style={styles.cardButton}>
                    <IPayButton
                      onPress={goBack}
                      btnType="link-button"
                      btnText={localizationText.newTopUp}
                      leftIcon={<IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />}
                    />
                    <IPayButton
                      btnType="link-button"
                      btnText={localizationText.share}
                      leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
                    />
                  </IPayView>
                )}
                <IPayButton
                  large
                  btnType="primary"
                  btnText={localizationText.home}
                  hasLeftIcon
                  leftIcon={<IPayIcon icon={icons.HOME_2} size={20} color={colors.natural.natural0} />}
                  onPress={() => navigate(screenNames.HOME)}
                  textStyle={styles.text}
                />
              </IPayView>
            )}

            {completionStatus === topupStatus.FAILED && (
              <IPayView style={styles.failedVariant}>
                <IPayIcon icon={icons.danger12} size={80} />
                <IPayTitle2Text text={localizationText.topupFailed} style={styles.failedText} />
                <IPayFootnoteText text={localizationText.reviewCard} style={styles.failedSubtitle} />
              </IPayView>
            )}

            {completionStatus === topupStatus.FAILED && (
              <IPayView>
                <IPayButton
                  btnType="primary"
                  btnText={localizationText.startOver}
                  large
                  onPress={goBack}
                  btnStyle={styles.btnStyle}
                  leftIcon={<IPayIcon icon={icons.ARROW_LEFT} size={20} color={colors.natural.natural0} />}
                  hasLeftIcon
                />

                <IPayButton
                  btnType="outline"
                  btnText={localizationText.home}
                  textStyle={styles.text}
                  hasLeftIcon
                  leftIcon={<IPayIcon icon={icons.HOME_2} size={20} color={colors.primary.primary500} />}
                  onPress={() => navigate(screenNames.HOME)}
                  btnStyle={styles.home}
                />
              </IPayView>
            )}
          </>
        </IPayLinearGradientView>
      </IPayShareableImageView>
    </IPayView>
  );
};

export default IPayTopupSuccess;
