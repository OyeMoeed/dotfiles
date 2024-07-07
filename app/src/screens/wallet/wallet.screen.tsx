import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayAnimatedCircularProgress, IPayHeader } from '@app/components/molecules/index';
import IPayList from '@app/components/molecules/ipay-list/ipay-list.component';
import IPayToast from '@app/components/molecules/ipay-toast/ipay-toast.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { formatNumberWithCommas } from '@utilities/number-comma-helper.util';

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
import React from 'react';
import Share from 'react-native-share';
import { moderateScale } from 'react-native-size-matters';
import walletStyles from './wallet.style';

const Wallet = () => {
  const { colors } = useTheme();
  const styles = walletStyles(colors);
  const localizationText = useLocalization();
  const [showToast, setShowToast] = React.useState<number>(0);

  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);

  const bottonSheetOpen = async () => {
    const shareOptions = {
      subject: 'Wa',
      message: localizationText.alinma_pay_wallet_info,
      title: localizationText.alinma_pay_wallet_info,
      social: Share.Social.WHATSAPP,
      whatsAppNumber: walletInfo?.userContactInfo?.mobileNumber, // country code + phone number
    };
    Share.open(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  const handleClickOnCopy = (step: number, textToCopy: string) => {
    copyText(textToCopy);
    setShowToast(step);
    setTimeout(() => setShowToast(0), 3000);
  };

  const renderToast = () =>
    showToast ? (
      <IPayToast
        title={showToast === 1 ? localizationText.name_copied : localizationText.IBAN_number}
        borderColor={colors.secondary.secondary500}
        bgColor={colors.secondary.secondary500}
        textStyle={{ color: colors.natural.natural0 }}
        isShowLeftIcon
        leftIcon={<IPayIcon icon={icons.copy_success} size={18} color={colors.natural.natural0} />}
        containerStyle={styles.toastContainer}
      />
    ) : (
      <></>
    );

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
      <IPayHeader title={localizationText.walletInfo} backBtn applyFlex />
      <IPayView style={styles.container}>
        <IPayView style={[styles.limitContainer]}>
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
            <IPayView style={[styles.progressContainer]}>
              <IPayFootnoteText style={[styles.footnoteTextStyle, styles.limitTextStyle]}>
                {localizationText.spending_limit}
              </IPayFootnoteText>

              <IPayTitle1Text style={styles.titleTextStyle}>
                {appData.hideBalance ? '*****' : formatNumberWithCommas(walletInfo?.availableBalance)}{' '}
              </IPayTitle1Text>

              <IPayLinearGradientView style={styles.gradientBarStyle} />
              <IPayView style={styles.progressBarContainer}>
                <IPayFootnoteText style={styles.amountStyle}>{localizationText.of} </IPayFootnoteText>
                <IPayFootnoteText regular={false} style={[styles.amountStyle]}>
                  {appData.hideBalance ? '*****' : formatNumberWithCommas(walletInfo?.currentBalance)}
                </IPayFootnoteText>
              </IPayView>
            </IPayView>
          </IPayAnimatedCircularProgress>
        </IPayView>
        <IPayFootnoteText style={styles.footnoteTextStyle}>{localizationText.walletInfo}</IPayFootnoteText>
        <IPayList
          onPressIcon={() => handleClickOnCopy(1, userInfo?.fullName)}
          title={localizationText.name}
          isShowSubTitle
          subTitle={userInfo?.fullName}
          isShowIcon
          isShowDetail
          subTextStyle={styles.listTextStyle}
          detailText={showToast === 1 ? localizationText.copied : localizationText.copy}
          icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
          detailTextStyle={styles.rightTextStyle}
        />
        <IPayList
          onPressIcon={() => handleClickOnCopy(2)}
          title={localizationText.IBAN}
          isShowSubTitle
          subTitle={walletInfo?.viban}
          isShowIcon
          isShowDetail
          subTextStyle={styles.listTextStyle}
          detailText={showToast === 2 ? localizationText.copied : localizationText.copy}
          icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
          detailTextStyle={styles.rightTextStyle}
        />
        <IPayList
          title={localizationText.qr_code}
          isShowSubTitle
          subTitle={localizationText.for_easy_money_transfers}
          isShowIcon
          isShowSaveQRButton
          icon={<IPayImage style={styles.codeBarImageStyle} image={images.codeBar} />}
          detailTextStyle={styles.rightTextStyle}
        />
        <IPayPressable onPress={bottonSheetOpen}>
          <IPayView style={styles.buttonContainer}>
            <IPayBodyText style={styles.codeBarTextStyle}>{localizationText.share_all_details}</IPayBodyText>
            <IPayIcon icon={icons.share} size={18} color={colors.primary.primary500} />
          </IPayView>
        </IPayPressable>
      </IPayView>
      {renderToast()}
    </IPaySafeAreaView>
  );
};

export default Wallet;
