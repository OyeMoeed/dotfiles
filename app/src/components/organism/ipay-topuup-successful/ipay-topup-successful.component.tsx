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
import { IPayButton, IPayGradientText, IPayHeader, IPayShareableImageView } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { TopupStatus, payChannel } from '@app/utilities/enums.util';
import React from 'react';
import IpayTopupSuccessProps, { PayData } from './ipay-topup-successful.interface';
import { TopUpSuccessStyles } from './ipay-topup-successful.styles';

const IPayTopupSuccess: React.FC<IpayTopupSuccessProps> = ({ completionStatus, topupChannel, goBack }) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = TopUpSuccessStyles(colors);
  const { applePayDetails, giftPayDetailes, cardPayDetails, walletPayDetailes } = useConstantData();

  const { showToast } = useToastContext();

  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const handleClickOnCopy = (step: number, textToCopy: string) => {
    copyText(textToCopy);
    renderToast();
  };

  const renderToast = () => {
    showToast({
      title: localizationText.TOP_UP.COPIED,
      subTitle: localizationText.TOP_UP.REF_NUMBER_COPIED,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainer,
    });
  };

  const renderPayItem = ({ item }: { item: PayData }) => {
    const { icon, detailsText, leftIcon, label, value, color } = item;
    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.listView}>
          <IPayView style={styles.iconLabel}>
            {leftIcon && (
              <IPayView style={styles.leftIcon}>
                <IPayImage image={images.master} style={styles.leftIconCard} />
              </IPayView>
            )}
            <IPayFootnoteText color={colors.natural.natural900} text={label} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            <IPayFootnoteText text={value} style={styles.detailsText} />
            {icon && (
              <IPayPressable
                onPress={() => {
                  if (icon === icons.copy) {
                    handleClickOnCopy(3, detailsText);
                  }
                }}
                style={styles.appleIcon}
              >
                <IPayIcon icon={item.icon} style={styles.appleIcon} color={color} size={18} />
              </IPayPressable>
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  const renderWallerPayItem = ({ item }: { item: PayData }) => {
    const { icon, detailsText, leftIcon, label, value, color } = item;

    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.walletListBackground}>
          <IPayView style={styles.iconLabel}>
            {leftIcon && (
              <IPayView style={styles.leftIcon}>
                <IPayIcon icon={leftIcon} size={18} />
              </IPayView>
            )}
            <IPayFootnoteText text={label} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            <IPayFootnoteText text={value} style={styles.detailsText} />
            {icon && (
              <IPayPressable
                style={styles.appleIcon}
                onPress={() => {
                  if (icon === icons.copy) {
                    handleClickOnCopy(3, detailsText);
                  }
                }}
              >
                <IPayIcon icon={icon} style={styles.appleIcon} color={color} size={18} />
              </IPayPressable>
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  const renderText = () => {
    if (topupChannel === payChannel.GIFT) {
      return localizationText.TOP_UP.GIFT_SUCCESSFUL;
    } else if (topupChannel === payChannel.WALLET) {
      return localizationText.TOP_UP.TRANSFER_SUCCESSFUL;
    } else {
      return localizationText.TOP_UP.TOPUP_SUCCESS;
    }
  };

  return (
    <IPayView style={styles.container}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />

      <IPayLinearGradientView
        style={styles.innerLinearGradientView}
        gradientColors={[colors.backgrounds.successBackground, colors.backgrounds.successBackground]}
      >
        <IPayShareableImageView
          otherView={
            <>
              {topupChannel === payChannel.CARD && (
                <IPayView style={[styles.cardButton, styles.margins]}>
                  <IPayButton
                    onPress={goBack}
                    btnType="link-button"
                    btnText={localizationText.TOP_UP.NEW_TOP_UP}
                    leftIcon={<IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />}
                  />
                  <IPayButton
                    btnType="link-button"
                    btnText={localizationText.TOP_UP.SHARE}
                    leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
                  />
                </IPayView>
              )}
            </>
          }
        >
          {completionStatus === TopupStatus.SUCCESS && (
            <IPayView>
              <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
              <IPayView style={styles.linearGradientTextView}>
                <IPayGradientText
                  text={renderText()}
                  gradientColors={gradientColors}
                  style={styles.gradientTextSvg}
                  fontSize={styles.linearGradientText.fontSize}
                  fontFamily={styles.linearGradientText.fontFamily}
                />
                <IPaySubHeadlineText
                  regular={false}
                  text={`1000 ${localizationText.COMMON.SAR}`}
                  style={styles.headlineText}
                />
              </IPayView>
              {topupChannel === payChannel.WALLET || topupChannel === payChannel.GIFT ? (
                <IPayView style={styles.walletBackground}>
                  <IPayFlatlist
                    style={styles.detailesFlex}
                    scrollEnabled={false}
                    data={topupChannel === payChannel.WALLET ? walletPayDetailes : giftPayDetailes}
                    renderItem={renderWallerPayItem}
                  />
                  <IPayPressable style={styles.newTopup}>
                    <IPayIcon icon={icons.share} color={colors.primary.primary500} size={14} />
                    <IPaySubHeadlineText text={localizationText.TOP_UP.SHARE} regular style={styles.newTopupText} />
                  </IPayPressable>
                </IPayView>
              ) : (
                <IPayFlatlist
                  style={styles.detailesFlex}
                  scrollEnabled={false}
                  data={topupChannel === payChannel.APPLE ? applePayDetails : cardPayDetails}
                  renderItem={renderPayItem}
                />
              )}
            </IPayView>
          )}
        </IPayShareableImageView>
        <>
          {completionStatus === TopupStatus.SUCCESS && (
            <IPayView>
              {topupChannel === payChannel.APPLE ||
                (topupChannel === payChannel.WALLET && (
                  <IPayPressable style={styles.newTopup} onPress={goBack}>
                    <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
                    <IPaySubHeadlineText
                      text={
                        topupChannel === payChannel.APPLE
                          ? localizationText.TOP_UP.NEW_TOP_UP
                          : localizationText.TOP_UP.NEW_TRANSFER
                      }
                      style={styles.newTopupText}
                      regular
                    />
                  </IPayPressable>
                ))}
              {topupChannel === payChannel.GIFT && (
                <IPayView style={styles.giftText}>
                  <IPayPressable style={styles.newTopup} onPress={goBack}>
                    <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
                    <IPaySubHeadlineText
                      text={localizationText.SEND_GIFT.SEND_ANOTHER}
                      style={styles.newTopupText}
                      regular
                    />
                  </IPayPressable>
                  <IPayPressable style={styles.newTopup}>
                    <IPayIcon icon={icons.play} size={14} color={colors.primary.primary500} />
                    <IPaySubHeadlineText
                      text={localizationText.SEND_GIFT.PREVIEW}
                      style={styles.newTopupText}
                      regular
                    />
                  </IPayPressable>
                </IPayView>
              )}
              <IPayButton
                large
                btnType="primary"
                btnText={localizationText.COMMON.HOME}
                hasLeftIcon
                leftIcon={<IPayIcon icon={icons.HOME_2} size={20} color={colors.natural.natural0} />}
                onPress={() => navigate(screenNames.HOME)}
                textStyle={styles.text}
              />
            </IPayView>
          )}

          {completionStatus === TopupStatus.FAILED && (
            <IPayView style={styles.failedVariant}>
              <IPayIcon icon={icons.danger12} size={80} />
              <IPayTitle2Text text={localizationText.TOP_UP.TOPUP_FAILED} style={styles.failedText} />
              <IPayFootnoteText text={localizationText.TOP_UP.REVIEW_CARD} style={styles.failedSubtitle} />
            </IPayView>
          )}

          {completionStatus === TopupStatus.FAILED && (
            <IPayView>
              <IPayButton
                btnType="primary"
                btnText={localizationText.TOP_UP.START_OVER}
                large
                onPress={goBack}
                btnStyle={styles.btnStyle}
                leftIcon={<IPayIcon icon={icons.ARROW_LEFT} size={20} color={colors.natural.natural0} />}
                hasLeftIcon
              />

              <IPayButton
                btnType="outline"
                btnText={localizationText.COMMON.HOME}
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
    </IPayView>
  );
};

export default IPayTopupSuccess;
