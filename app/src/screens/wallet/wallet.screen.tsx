import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayAnimatedCircularProgress, IPayGradientTextMasked, IPayHeader } from '@app/components/molecules/index';
import IPayList from '@app/components/molecules/ipay-list/ipay-list.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import {
  IPayBodyText,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayPressable,
  IPayTitle1Text,
  IPayView,
} from '@components/atoms';
import { useState } from 'react';
import Share from 'react-native-share';
import { moderateScale } from 'react-native-size-matters';
import walletStyles from './wallet.style';

const WalletScreen = () => {
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const styles = walletStyles(colors);
  const localizationText = useLocalization();

  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);

  const [isNameCopied, setIsNameCopied] = useState(false);
  const [isIbanCopied, setIsIbanCopied] = useState(false);

  const headingTextGradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const getShareableMessage = () => {
    const appTitle = localizationText.COMMON.ALINMA_PAY;
    const walletInfoLabel = localizationText.HOME.WALLET_INFO;
    const nameLabel = localizationText.COMMON.NAME;
    const ibanLabel = localizationText.COMMON.IBAN;

    return `${appTitle}\n${walletInfoLabel}\n${nameLabel} : ${userInfo?.fullName}\n${ibanLabel} : ${walletInfo?.viban}`;
  };

  const bottonSheetOpen = async () => {
    const shareOptions = {
      subject: 'Wa',
      message: getShareableMessage(),
      title: localizationText.PROFILE.ALINMA_WALLET_INFO,
      social: Share.Social.WHATSAPP,
      whatsAppNumber: walletInfo?.userContactInfo?.mobileNumber, // country code + phone number
    };

    Share.open(shareOptions)
      .then(() => {})
      .catch(() => {});
  };

  const renderToast = (title: string, icon: string) => {
    showToast({
      title,
      leftIcon: <IPayIcon icon={icon} size={18} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainerStyle,
    });
  };

  const handleClickOnCopy = (step: number, textToCopy: string) => {
    if (step === 1) {
      setIsNameCopied(true);
      setTimeout(() => {
        setIsNameCopied(false);
      }, 1000);
    } else {
      setIsIbanCopied(true);
      setTimeout(() => {
        setIsIbanCopied(false);
      }, 1000);
    }
    copyText(textToCopy);
    renderToast(step === 1 ? localizationText.HOME.NAME_COPIED : localizationText.HOME.IBAN_NUMBER, icons.copy_success);
  };

  const getBalancePercentage = () => {
    const currentBalance = walletInfo?.currentBalance ?? 0;
    const availableBalance = walletInfo?.availableBalance ?? 0;
    if (currentBalance === 0) {
      return 0;
    }
    const percentage = (availableBalance * 100) / currentBalance;
    return Math.ceil(percentage);
  };

  return (
    <IPaySafeAreaView style={styles.mainWrapper}>
      <IPayHeader title={localizationText.HOME.WALLET_INFO} backBtn applyFlex />
      <IPayView style={styles.container}>
        <IPayView style={styles.limitContainer}>
          <IPayAnimatedCircularProgress
            size={moderateScale(200)}
            width={9}
            fill={getBalancePercentage()}
            rotation={225}
            arcSweepAngle={270}
            gradientColors={colors.appGradient.progressBarGradient}
            padding={moderateScale(10)}
            lineCap="round"
          >
            <IPayView style={styles.progressContainer}>
              <IPayFootnoteText color={colors.primary.primary800} style={styles.limitTextStyle}>
                {localizationText.HOME.SPENDING_LIMIT}
              </IPayFootnoteText>
              <IPayGradientTextMasked colors={headingTextGradientColors}>
                <IPayTitle1Text regular={false}>
                  {appData.hideBalance ? '*****' : formatNumberWithCommas(walletInfo?.availableBalance)}{' '}
                </IPayTitle1Text>
              </IPayGradientTextMasked>

              <IPayLinearGradientView
                gradientColors={colors.appGradient.progressBarGradient}
                style={styles.gradientBarStyle}
              />
              <IPayView style={styles.progressBarContainer}>
                <IPayFootnoteText style={styles.amountStyle}>{localizationText.HOME.OF} </IPayFootnoteText>
                <IPayFootnoteText regular={false} style={styles.amountStyle}>
                  {appData.hideBalance ? '*****' : formatNumberWithCommas(walletInfo?.currentBalance)}
                </IPayFootnoteText>
              </IPayView>
            </IPayView>
          </IPayAnimatedCircularProgress>
        </IPayView>
        <IPayFootnoteText color={colors.natural.natural500}>{localizationText.HOME.WALLET_INFO}</IPayFootnoteText>
        <IPayList
          onPressIcon={() => handleClickOnCopy(1, userInfo?.fullName)}
          title={localizationText.COMMON.NAME}
          isShowSubTitle
          subTitle={userInfo?.fullName}
          isShowIcon
          isShowDetail
          textStyle={styles.titleStyle}
          subTextStyle={styles.listTextStyle}
          detailText={isNameCopied ? localizationText.TOP_UP.COPIED : localizationText.TOP_UP.COPY}
          icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
        />
        <IPayList
          onPressIcon={() => handleClickOnCopy(2, walletInfo?.viban)}
          title={localizationText.COMMON.IBAN}
          isShowSubTitle
          subTitle={walletInfo?.viban}
          isShowIcon
          isShowDetail
          textStyle={styles.titleStyle}
          subTextStyle={styles.listTextStyle}
          detailText={isIbanCopied ? localizationText.TOP_UP.COPIED : localizationText.TOP_UP.COPY}
          icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
        />
        <IPayList
          title={localizationText.HOME.QR_CODE}
          isShowSubTitle
          subTitle={localizationText.HOME.FOR_EASY_MONEY_TRANSFERS}
          isShowIcon
          textStyle={styles.titleStyle}
          isShowSaveQRButton
          onPressSaveQR={() => renderToast(localizationText.HOME.QR_TO_GALLERY, icons.save)}
          icon={<IPayImage style={styles.codeBarImageStyle} image={images.codeBar} />}
          subTextStyle={styles.rightTextStyle}
        />
        <IPayPressable onPress={bottonSheetOpen}>
          <IPayView style={styles.buttonContainer}>
            <IPayBodyText style={styles.codeBarTextStyle}>{localizationText.HOME.SHARE_ALL_DETAILS}</IPayBodyText>
            <IPayIcon icon={icons.share} size={18} color={colors.primary.primary500} />
          </IPayView>
        </IPayPressable>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default WalletScreen;
