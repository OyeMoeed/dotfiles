import icons from '@app/assets/icons';
import images from '@app/assets/images';
import IPayGradientText from '@app/components/atoms/ipay-gradient-text/ipay-gradient-text.component';
import IPayList from '@app/components/molecules/ipay-list/ipay-list.component';
import IPayToast from '@app/components/molecules/ipay-toast/ipay-toast.component';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import colors from '@app/styles/colors.const';
import {
  IPayBodyText,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@components/atoms';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Share from 'react-native-share';
import { moderateScale } from 'react-native-size-matters';
import styles from './wallet.style';

const Wallet: React.FC = () => {
  const navigation = useNavigation();
  const localizationText = useLocalization();
  const [userName, setUserName] = useState<Boolean>(false);
  const [ibanNumber, setIbanNumber] = useState<Boolean>(false);
  const spendingLimit = '5,000';
  const totalLimit = '20,000';
  useEffect(() => {
    setTimeout(() => {
      setUserName(false);
    }, 3000);
  }, [userName]);
  const ref = React.createRef<any>();
  const bottonSheetOpen = async () => {
    const shareOptions = constants.SHARE_OPTION;
    Share.open(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };
  const BackToScreen = () => {
    navigation.goBack();
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayView style={styles.headerContainer}>
        <IPayPressable onPress={BackToScreen} style={styles.backContainerStyle}>
          <IPayView style={styles.backbtnCon}>
            <IPayIcon icon={icons.back_btn_icon} size={18} color={colors.primary.primary500} />
            <IPaySubHeadlineText style={styles.backbtnText}>{localizationText.back}</IPaySubHeadlineText>
          </IPayView>
        </IPayPressable>
        <IPayView style={styles.backContainerStyle}>
          <IPaySubHeadlineText style={styles.headerTitleStyle}>{localizationText.wallet_Info}</IPaySubHeadlineText>
        </IPayView>
        <IPayView style={styles.backContainerStyle} />
      </IPayView>
      <IPayView style={styles.limitContainer}>
        <AnimatedCircularProgress
          size={moderateScale(200)}
          width={moderateScale(9)}
          fill={80}
          rotation={225}
          arcSweepAngle={270}
          tintColor={colors.greenPalette.green500}
          tintTransparency={true}
          backgroundColor={colors.white}
          style={styles.arcStyle}
          padding={moderateScale(10)}
          lineCap={'round'}
        >
          {(fill) => (
            <IPayView style={[styles.progressContainer]}>
              <IPayFootnoteText style={[styles.footnoteTextStyle, styles.limitTextStyle]}>
                {localizationText.spending_limit}
              </IPayFootnoteText>
              <IPayGradientText
                style={styles.titleTextStyle}
                colors={[colors.tertiary.tertiary400, colors.primary.primary500]}
              >
                {spendingLimit}
              </IPayGradientText>
              <IPayLinearGradientView style={styles.gradientBarStyle} gradientColors={colors.gradientTertiary} />
              <IPayView style={styles.progressBarContainer}>
                <IPayFootnoteText style={[styles.footnoteTextStyle, styles.footnoteOfTextStyle]}>
                  {localizationText.of}{' '}
                </IPayFootnoteText>
                <IPayFootnoteText style={[styles.footnoteTextStyle, styles.footnoteStyleText]}>
                  {totalLimit}
                </IPayFootnoteText>
              </IPayView>
            </IPayView>
          )}
        </AnimatedCircularProgress>
      </IPayView>
      <IPayFootnoteText style={styles.footnoteTextStyle}>{localizationText.wallet_Info}</IPayFootnoteText>

      <IPayList
        onPress={() => setUserName(true)}
        containerStyle={styles.listContainer}
        title={localizationText.name}
        textStyle={styles.titleStyle}
        subTextStyle={styles.subTextStyle}
        isShowSubTitle
        subTitle="Adam Ahmed"
        isShowIcon
        isShowDetail
        detailText={userName ? localizationText.copied : localizationText.copy}
        icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
        detailTextStyle={styles.rightTextStyle}
      />
      <IPayList
        onPress={() => setIbanNumber(true)}
        containerStyle={styles.listContainer}
        title={localizationText.iban}
        textStyle={styles.titleStyle}
        subTextStyle={styles.subTextStyle}
        isShowSubTitle
        subTitle="SA8876676690798685"
        isShowIcon
        isShowDetail
        detailText={ibanNumber ? localizationText.copied : localizationText.copy}
        icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
        detailTextStyle={styles.rightTextStyle}
      />
      <IPayList
        title={localizationText.qr_code}
        textStyle={styles.titleStyle}
        containerStyle={styles.listContainer}
        subTextStyle={styles.subTextStyle}
        isShowSubTitle
        subTitle={localizationText.for_easy_money_transfers}
        isShowIcon
        icon={<IPayImage style={styles.codeBarImageStyle} image={images.codeBar} />}
        detailTextStyle={styles.rightTextStyle}
        isShowSubButton
      />

      <IPayPressable onPress={bottonSheetOpen}>
        <IPayView style={styles.buttonContainer}>
          <IPayBodyText style={styles.codeBarTextStyle}>{localizationText.share_all_details}</IPayBodyText>
          <IPayIcon icon={icons.share} size={18} color={colors.primary.primary500} />
        </IPayView>
      </IPayPressable>

      {userName && (
        <IPayView style={styles.toastContainer}>
          <IPayToast
            leftIcon={<IPayIcon icon={icons.copy_success} size={18} color={colors.primary.primary500} />}
            isShowLeftIcon
            title={localizationText.IBAN_number}
          />
        </IPayView>
      )}
    </IPaySafeAreaView>
  );
};

export default Wallet;
