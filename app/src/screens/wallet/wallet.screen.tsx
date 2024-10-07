import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayAnimatedCircularProgress, IPayGradientTextMasked, IPayHeader } from '@app/components/molecules/index';
import IPayList from '@app/components/molecules/ipay-list/ipay-list.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@app/components/templates';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { shareOptions } from '@app/utilities/shared.util';
import {
  IPayBodyText,
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPayPressable,
  IPayTitle1Text,
  IPayView,
} from '@components/atoms';
import { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import { moderateScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import useSaveQRCode from './use-save-qrcode.hook';
import walletStyles from './wallet.style';

const WalletScreen = () => {
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const styles = walletStyles(colors);
  const { t } = useTranslation();
  const { qrRef, qrData, saveQrToDisk } = useSaveQRCode();

  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const [isNameCopied, setIsNameCopied] = useState(false);
  const [isIbanCopied, setIsIbanCopied] = useState(false);

  const headingTextGradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const getShareableMessage = () => {
    const appTitle = t('COMMON.ALINMA_PAY');
    const walletInfoLabel = t('HOME.WALLET_INFO');
    const nameLabel = t('COMMON.NAME');
    const ibanLabel = t('COMMON.IBAN');

    return `${appTitle}\n${walletInfoLabel}\n${nameLabel} : ${walletInfo?.fullName}\n${ibanLabel} : ${walletInfo?.viban}`;
  };

  const bottomSheetOpen = async () => {
    const otherOptions = {
      subject: 'Wa',
      message: getShareableMessage(),
      title: t('PROFILE.ALINMA_WALLET_INFO'),
      social: Share.Social.WHATSAPP,
      whatsAppNumber: walletInfo?.userContactInfo?.mobileNumber,
    };

    Share.open(shareOptions(getShareableMessage(), otherOptions))
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
    renderToast(step === 1 ? 'HOME.NAME_COPIED' : 'HOME.IBAN_NUMBER', icons.copy_success);
  };

  const remainingSpendingLimit = parseFloat(walletInfo.limitsDetails.monthlyRemainingOutgoingAmount);
  const monthlySpendingLimit = parseFloat(walletInfo.limitsDetails.monthlyOutgoingLimit);

  function getBalancePercentage() {
    if (monthlySpendingLimit === 0) {
      // should not divide by 0
      return 0;
    }

    const balancePercentage = (remainingSpendingLimit / monthlySpendingLimit) * 100;
    return Math.ceil(balancePercentage);
  }

  const QRCodeRef = (ref: any) => {
    qrRef.current = ref;
    return null;
  };

  return (
    <IPaySafeAreaView style={styles.mainWrapper}>
      <IPayHeader title="HOME.WALLET_INFO" backBtn applyFlex />
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
              <IPayFootnoteText
                color={colors.primary.primary800}
                style={styles.limitTextStyle}
                text="HOME.SPENDING_LIMIT"
              />
              <IPayGradientTextMasked colors={headingTextGradientColors}>
                <IPayTitle1Text regular={false} shouldTranslate={false}>
                  {formatNumberWithCommas(remainingSpendingLimit)}{' '}
                </IPayTitle1Text>
              </IPayGradientTextMasked>

              <IPayLinearGradientView
                gradientColors={colors.appGradient.progressBarGradient}
                style={styles.gradientBarStyle}
              />
              <IPayView style={styles.progressBarContainer}>
                <IPayFootnoteText style={styles.amountStyle} text={`${t('HOME.OF')} `} />
                <IPayFootnoteText regular={false} style={styles.amountStyle} shouldTranslate={false}>
                  {formatNumberWithCommas(monthlySpendingLimit)}
                </IPayFootnoteText>
              </IPayView>
            </IPayView>
          </IPayAnimatedCircularProgress>
        </IPayView>
        <IPayFootnoteText color={colors.natural.natural500} text="HOME.WALLET_INFO" />
        <IPayList
          onPressIcon={() => handleClickOnCopy(1, walletInfo?.fullName)}
          title="COMMON.NAME"
          isShowSubTitle
          subTitle={walletInfo?.fullName}
          isShowIcon
          isShowDetail
          textStyle={styles.titleStyle}
          subTextStyle={styles.listTextStyle}
          detailText={isNameCopied ? 'TOP_UP.COPIED' : 'TOP_UP.COPY'}
          icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
          shouldTranslateSubTitle={false}
        />
        <IPayList
          onPressIcon={() => handleClickOnCopy(2, walletInfo?.viban)}
          title="COMMON.IBAN"
          isShowSubTitle
          subTitle={walletInfo?.viban}
          isShowIcon
          isShowDetail
          textStyle={styles.titleStyle}
          subTextStyle={styles.listTextStyle}
          detailText={isIbanCopied ? 'TOP_UP.COPIED' : 'TOP_UP.COPY'}
          icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
          shouldTranslateSubTitle={false}
        />
        <IPayList
          title="HOME.QR_CODE"
          isShowSubTitle
          subTitle="HOME.FOR_EASY_MONEY_TRANSFERS"
          isShowIcon
          textStyle={styles.titleStyle}
          isShowSaveQRButton
          onPressSaveQR={saveQrToDisk}
          icon={
            <QRCode
              getRef={QRCodeRef}
              value={qrData}
              logo={images.gradientAppIcon}
              size={moderateScale(76)}
              logoBorderRadius={moderateScale(4)}
              logoBackgroundColor={colors.natural.natural0}
              logoSize={moderateScale(20)}
              quietZone={moderateScale(5)}
            />
          }
          subTextStyle={styles.rightTextStyle}
        />

        <IPayPressable onPress={bottomSheetOpen}>
          <IPayView style={styles.buttonContainer}>
            <IPayBodyText style={styles.codeBarTextStyle} text="HOME.SHARE_ALL_DETAILS" />
            <IPayIcon icon={icons.share} size={18} color={colors.primary.primary500} />
          </IPayView>
        </IPayPressable>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default WalletScreen;
