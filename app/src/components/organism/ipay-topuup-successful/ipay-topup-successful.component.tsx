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
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import IpayTopupSuccessProps, { PayData } from './ipay-topup-successful.interface';
import { TopUpSuccessStyles } from './ipay-topup-successful.styles';
import useData from './use-data';

const IPayTopupSuccess: React.FC<IpayTopupSuccessProps> = ({ completionStatus, topupChannel, goBack }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const localizationText = useLocalization();
  const { getDetails, renderText } = useData();
  const styles = TopUpSuccessStyles(colors);

  const { showToast } = useToastContext();
  const { walletPayDetailes } = useConstantData();

  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const handleClickOnCopy = (step: number, textToCopy: string) => {
    copyText(textToCopy);
    renderToast();
  };

  const renderToast = () => {
    showToast({
      title: topupChannel === payChannel.ORDER ? localizationText.ORDER_SCREEN.COPY : localizationText.TOP_UP.COPIED,
      subTitle: topupChannel !== payChannel.ORDER && localizationText.TOP_UP.REF_NUMBER_COPIED,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      containerStyle: topupChannel === payChannel.ORDER ? styles.orderToast : styles.toastContainer,
    });
  };

  const renderWallerPayItem = ({ item }: { item: PayData }) => {
    const { isAlinma, icon, detailsText, leftIcon, label, value, color } = item;

    const renderLeftIcon = () => {
      if (!leftIcon) {
        return null;
      }

      if (isAlinma) {
        return (
          <IPayView style={styles.leftIcon}>
            <IPayImage image={images.alinmaP} style={styles.alinmaLogo} resizeMode={ImageResize.CONTAIN} />
          </IPayView>
        );
      }

      return (
        <IPayPressable style={styles.appleIcon}>
          <IPayIcon icon={icons.user_square} size={18} color={colors.primary.primary900} />
        </IPayPressable>
      );
    };
    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.walletListBackground}>
          <IPayView style={styles.iconLabel}>
            {renderLeftIcon()}
            <IPayFootnoteText text={label} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            <IPayFootnoteText text={value} style={styles.detailsText} />
            {icon && (
              <IPayPressable
                style={styles.copyIcon}
                onPress={() => {
                  if (icon === icons.copy) {
                    handleClickOnCopy(3, detailsText);
                  }
                }}
              >
                <IPayIcon icon={icon} color={color} size={18} />
              </IPayPressable>
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
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
              {topupChannel === payChannel.WALLET ? (
                <IPayView style={styles.walletBackground}>
                  <IPayFlatlist
                    style={styles.detailesFlex}
                    scrollEnabled={false}
                    data={getDetails()}
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
                  data={getDetails()}
                  renderItem={renderWallerPayItem}
                />
              )}
            </IPayView>
          )}
        </IPayShareableImageView>
        <>
          {completionStatus === TopupStatus.SUCCESS && (
            <IPayView style={styles.backgroundColor}>
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
              {topupChannel === payChannel.ORDER && (
                <IPayView style={styles.cardButton}>
                  <IPayPressable style={styles.newTopup} onPress={goBack}>
                    <IPayIcon icon={icons.ARROW_LEFT} size={14} color={colors.primary.primary500} />
                    <IPaySubHeadlineText
                      text={localizationText.ORDER_SCREEN.BACK}
                      style={styles.newTopupText}
                      regular
                    />
                  </IPayPressable>
                  <IPayPressable style={styles.newTopup} onPress={goBack}>
                    <IPaySubHeadlineText
                      text={localizationText.ORDER_SCREEN.VAT_INVOICE}
                      style={styles.newTopupText}
                      regular
                    />
                    <IPayView style={styles.exportIcon}>
                      <IPayIcon icon={icons.export_2} size={14} color={colors.primary.primary500} />
                    </IPayView>
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
