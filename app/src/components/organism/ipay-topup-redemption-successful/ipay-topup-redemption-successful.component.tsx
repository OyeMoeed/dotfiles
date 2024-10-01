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
import { IPayButton, IPayGradientText, IPayHeader, IPayShareableImageView } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getAktharPoints from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.service';
import getWalletInfo from '@app/network/services/core/get-wallet/get-wallet.service';
import { setPointsRedemptionReset } from '@app/store/slices/reset-state-slice';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { copyText, dateTimeFormat } from '@app/utilities';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import { buttonVariants, TopupStatus } from '@app/utilities/enums.util';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import { useTranslation } from 'react-i18next';
import IPayTopUpSuccessProps from './ipay-topup-redemption-successful.interface';
import topUpSuccessRedemptionStyles from './ipay-topup-redemption-successful.styles';

const IPayTopupRedemptionSuccess: React.FC<IPayTopUpSuccessProps> = ({ variants, testID, params }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const styles = topUpSuccessRedemptionStyles(colors);
  const { showToast } = useToastContext();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const renderToast = () => {
    showToast({
      title: 'TOP_UP.COPIED',
      subTitle: 'TOP_UP.REF_NUMBER_COPIED',
      containerStyle: styles.containerToastStyle,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
    });
  };

  const goBackToHome = () => {
    navigation.navigate(ScreenNames.HOME);
  };
  const dispatch = useDispatch();

  const onStartOverPress = () => {
    dispatch(setPointsRedemptionReset(true));
    navigation.pop(2);
  };

  const navigateTOAktharPoints = async () => {
    const aktharPointsResponse = await getAktharPoints(walletInfo.walletNumber);
    dispatch(setPointsRedemptionReset(true));
    if (
      aktharPointsResponse?.status?.type === 'SUCCESS' &&
      aktharPointsResponse?.response?.mazayaStatus !== 'USER_DOES_NOT_HAVE_MAZAYA_ACCOUNT'
    ) {
      const payload = {
        walletNumber: walletInfo?.walletNumber,
      };
      const walletInfoResponse: any = await getWalletInfo(payload);
      if (walletInfoResponse?.status?.type === 'SUCCESS') {
        dispatch(setWalletInfo(walletInfoResponse?.response));
        navigate(ScreenNames.POINTS_REDEMPTIONS, {
          aktharPointsInfo: aktharPointsResponse?.response,
          isEligible: true,
        });
      }
    } else {
      navigate(ScreenNames.POINTS_REDEMPTIONS, { isEligible: false });
    }
  };

  const successDetail = [
    {
      title: 'TOP_UP.TOPUP_TYPE',
      value: t('TOP_UP.AKHTAR_POINT'),
      icon: icons.akhtr_pay,
    },
    {
      title: 'TOP_UP.REF_NUMBER',
      value: params?.referenceNumber,
      icon: icons.copy,
      pressIcon: () => {
        renderToast();
        copyText(params?.referenceNumber as string);
      },
    },
    {
      title: 'TOP_UP.TOPUP_DATE',
      value: formatDateAndTime(new Date(params?.date as string), dateTimeFormat.TimeAndDate),
    },
    {
      title: 'TOP_UP.POINTS_REDEEMED',
      value: `${params?.redeemPoints} ${t('COMMON.POINTS')}`,
    },
  ];

  return (
    <IPayView style={styles.container} testID={testID}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />

      <IPayLinearGradientView
        style={styles.innerLinearGradientView}
        gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
      >
        <>
          {variants === TopupStatus.FAILED && (
            <IPayView style={styles.failedVariant}>
              <IPayIcon icon={icons.danger12} size={scaleSize(80)} />
              <IPayTitle2Text text="TOP_UP.TOPUP_FAILED" style={styles.failedText} />
              <IPayFootnoteText text="TOP_UP.REVIEW_CARD" style={styles.failedSubtitle} />
            </IPayView>
          )}

          <IPayShareableImageView
            otherView={
              variants === TopupStatus.SUCCESS && (
                <IPayView>
                  <IPayView style={styles.bottomActions}>
                    <IPayButton
                      onPress={navigateTOAktharPoints}
                      btnType={buttonVariants.LINK_BUTTON}
                      btnText="TOP_UP.NEW_TOP_UP"
                      leftIcon={<IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />}
                    />
                    <IPayButton
                      btnType={buttonVariants.LINK_BUTTON}
                      btnText={t('TOP_UP.SHARE')}
                      leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
                    />
                  </IPayView>
                  <IPayButton
                    btnType={buttonVariants.PRIMARY}
                    leftIcon={<IPayIcon icon={icons.HOME} size={scaleSize(20)} color={colors.natural.natural0} />}
                    btnText="COMMON.HOME"
                    onPress={goBackToHome}
                    large
                    btnStyle={styles.btnStyle}
                  />
                </IPayView>
              )
            }
            style={styles.shareView}
          >
            {variants === TopupStatus.SUCCESS && (
              <IPayView>
                <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
                <IPayView style={styles.linearGradientTextView}>
                  <IPayGradientText
                    text="TOP_UP.TOPUP_REDEMPTION_SUCESS"
                    gradientColors={gradientColors}
                    style={styles.gradientTextSvg}
                    fontSize={styles.linearGradientText?.fontSize}
                    fontFamily={styles.linearGradientText.fontFamily}
                  />
                  <IPaySubHeadlineText
                    text={`${params?.redeemAmount} ${t('COMMON.SAR')}`}
                    style={styles.headlineText}
                    shouldTranslate={false}
                  />
                </IPayView>

                {successDetail.map(({ title, value, icon, pressIcon }, index) => (
                  <IPayView style={styles.listContainer} key={`${`${index}SuccessDetail`}`}>
                    <IPayView style={styles.listView}>
                      <IPayFootnoteText text={title} color={colors.natural.natural900} />
                      <IPayView style={styles.listDetails}>
                        <IPayFootnoteText
                          text={value}
                          style={icon && styles.detailText}
                          color={colors.primary.primary800}
                          shouldTranslate={false}
                        />
                        {icon && (
                          <IPayPressable onPress={pressIcon}>
                            <IPayIcon icon={icon} size={20} color={colors.primary.primary500} />
                          </IPayPressable>
                        )}
                      </IPayView>
                    </IPayView>
                  </IPayView>
                ))}
              </IPayView>
            )}
          </IPayShareableImageView>

          {variants === TopupStatus.FAILED && (
            <IPayView>
              <IPayButton
                btnType={buttonVariants.PRIMARY}
                btnText="TOP_UP.START_OVER"
                leftIcon={<IPayIcon icon={icons.ARROW_LEFT} size={scaleSize(20)} color={colors.natural.natural0} />}
                large
                onPress={onStartOverPress}
                btnStyle={styles.btnStyle}
              />

              <IPayButton
                btnType={buttonVariants.OUTLINED}
                leftIcon={<IPayIcon icon={icons.HOME} size={scaleSize(20)} color={colors.primary.primary500} />}
                btnText="COMMON.HOME"
                hasLeftIcon
                large
                onPress={goBackToHome}
                btnStyle={styles.failedButton}
              />
            </IPayView>
          )}
        </>
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default IPayTopupRedemptionSuccess;
