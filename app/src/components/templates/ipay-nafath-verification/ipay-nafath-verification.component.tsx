import icons from '@app/assets/icons';
import images from '@app/assets/images/index';
import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayHeadlineText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayPressable,
  IPayProgressBar,
  IPayText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientText, IPayPageDescriptionText, IPayPrimaryButton } from '@app/components/molecules';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import {
  IActivationAbsherReq,
  INafathInqRes,
  NafathStatus,
  PrepareIdRenewalProp,
} from '@app/network/services/core/nafath-verification/nafath-verification.interface';
import {
  getNafathInquiry,
  getNafathRandom,
  updateWalletTierReq,
} from '@app/network/services/core/nafath-verification/nafath-verification.service';
import { getDeviceInfo } from '@app/network/utilities';
import { setTermsConditionsVisibility } from '@app/store/slices/nafath-verification';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import { store, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTranslation } from 'react-i18next';
import { APIResponseType, buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IPayNafathVerificationProps } from './ipay-nafath-verification.interface';
import nafathVerificationStyles from './ipay-nafath-verification.style';

const IPayNafathVerification: React.FC<IPayNafathVerificationProps> = ({ testID, onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(90); // in seconds
  const { colors } = useTheme();
  const { t } = useTranslation();

  const styles = nafathVerificationStyles(colors);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [nafathNumber, setNafathNumber] = useState<number>();
  const [duration, setDuration] = useState<number>();
  const [waitngScnds] = useState<number>(20);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [startInqiryInterval, setStartInqiryInterval] = useState<boolean>(false);

  useEffect(() => {
    let timer: any = null;
    timer = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onCloseNafathVerificationSheet = () => {
    onComplete();
  };

  const renderStep = (_step: string) => (
    <IPayView style={styles.stepIndicator}>
      <IPayGradientText
        text={_step}
        yScale={8}
        gradientColors={colors.gradient1}
        fontSize={styles.stepNoText.fontSize}
        fontFamily={styles.stepNoText.fontFamily}
        style={styles.gradientTextSvg}
      />
    </IPayView>
  );

  const getNafathRandomNumber = async () => {
    const payLoad: PrepareIdRenewalProp = {
      requestId: appData?.loginData?.iamRequestId,
      channelId: appData?.loginData?.channelId,
    };
    const apiResponse: any = await getNafathRandom(payLoad);

    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      const nafathToken = Number.isNaN(apiResponse.response.token)
        ? atob(apiResponse.response.token)
        : apiResponse.response.token;

      setNafathNumber(nafathToken);
      setCounter(apiResponse.response.waitingTimeSeconds);
      setDuration(apiResponse.response.waitingTimeSeconds * 10);
      if (step === 2) {
        setIsExpired(false);
      } else {
        setStep(2);
      }
      setStartInqiryInterval(true);
    }
  };

  const getIamDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return `${year}-${`0${month + 1}`.slice(-2)}-${`0${day}`.slice(-2)}`;
  };

  const updateWalletTier = async (nafathRes: INafathInqRes) => {
    const { dispatch } = store || {};

    const deviceInfo = await getDeviceInfo();
    const nafathObj = nafathRes.response.mainInfo;

    const body: IActivationAbsherReq = {
      walletNumber: walletInfo.walletNumber,
      walletTier: 'G',
      poiNumber: walletInfo?.poiNumber,
      poiExpiryDate: nafathObj.idExpiryDate,
      poiExpiryDateHijri: nafathObj.idExpiryDateHijri,
      birthDate: nafathObj.dateOfBirth,
      birthDateHijri: nafathObj.dateOfBirthHijri,
      gender: nafathObj.gender,
      nationalityCode: nafathObj.nationality,
      nationality: nafathObj.nationality,
      iamVerificationDate: getIamDate(),
      usernameEn: {
        firstName: nafathObj.englishName.firstName,
        fatherName: nafathObj.englishName.secondName,
        grandFatherName: nafathObj.englishName.thirdName,
        familyName: nafathObj.englishName.familyName,
        fullName: nafathObj.englishName.fullName,
      },
      usernameAr: {
        firstName: nafathObj.arabicName.firstName,
        fatherName: nafathObj.arabicName.secondName,
        grandFatherName: nafathObj.arabicName.thirdName,
        familyName: nafathObj.arabicName.familyName,
        fullName: nafathObj.arabicName.fullName,
      },
      deviceInfo,
    };
    const apiResponse = await updateWalletTierReq(body);

    if (apiResponse) {
      const updatedValues = {
        walletTier: 'G',
        poiNumber: nafathObj.idNumber,
        poiType: nafathObj.idNumber,
      };
      dispatch(
        setWalletInfo({
          ...walletInfo,
          ...updatedValues,
        }),
      );

      onCloseNafathVerificationSheet();
      navigate(screenNames.IDENTITY_SUCCESSFUL);

      return;
    }

    const updatedValues = {
      walletTier: 'B',
    };
    dispatch(
      setWalletInfo({
        ...walletInfo,
        ...updatedValues,
      }),
    );
  };
  const dispatch = useDispatch();

  const openTermsAndConditionModal = () => {
    dispatch(
      setTermsConditionsVisibility({
        isVisible: true,
        isNafathTerms: true,
      }),
    );
    onCloseNafathVerificationSheet();
  };

  const nafathInquiry = async () => {
    const payLoad: PrepareIdRenewalProp = {
      requestId: appData?.loginData?.iamRequestId,
      channelId: appData?.loginData?.channelId,
    };
    const apiResponse: any = await getNafathInquiry(payLoad);

    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      switch (apiResponse?.response?.status) {
        case NafathStatus.ACCEPTED:
          setStartInqiryInterval(false);
          updateWalletTier(apiResponse);
          break;
        case NafathStatus.EXPIRED:
          setStartInqiryInterval(false);
          break;
        case NafathStatus.REJECTED:
          setStartInqiryInterval(false);
          setStep(1);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    let timer: any = null;
    timer = setInterval(() => {
      nafathInquiry();
    }, waitngScnds * 1000);

    if (!startInqiryInterval) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [startInqiryInterval]);

  const format = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const onTimerCompete = () => {
    setIsExpired(true);
    setStartInqiryInterval(false);
  };

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayView style={styles.logoWrapper}>
        <IPayImage image={images.nafathLogo} style={styles.nafathLogo} />
      </IPayView>
      {step === 1 ? (
        <>
          <IPayPageDescriptionText heading="PROFILE.NAFATH_VALIDATION" text="SETTINGS.NAFATH_VALIDATION_DESCRIPTION" />
          <IPayPressable style={styles.downloadSection}>
            <IPayFootnoteText regular={false} style={styles.downloadText} text="SETTINGS.DOWNLOAD_NAFATH_ACCOUNT" />
            <IPayIcon icon={icons.export_3} size={24} color={colors.primary.primary500} />
          </IPayPressable>
          <IPayPressable onPress={openTermsAndConditionModal} style={styles.disclaimer}>
            <IPayFootnoteText color={colors.natural.natural900} text="SETTINGS.NAFATH_TERMS_AND_CONDITION" />
            <IPayIcon icon={icons.infoIcon} size={20} />
          </IPayPressable>
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            btnText="PROFILE.VALIDATE"
            rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
            onPress={() => getNafathRandomNumber()}
            large
            btnStyle={styles.btnStyle}
          />
        </>
      ) : (
        <>
          <IPayPageDescriptionText heading="SETTINGS.VALIDATE_THROUGH_NAFAH" />
          <IPayPressable style={styles.stepper}>
            {renderStep('1')}
            <IPayFootnoteText regular={false} style={styles.downloadText} text="SETTINGS.OPEN_NAFATH_APP" />
            <IPayIcon icon={icons.export_3} size={24} color={colors.primary.primary500} />
          </IPayPressable>
          <IPayView style={styles.stepTwo}>
            <IPayView style={styles.flexRow}>
              {renderStep('2')}
              <IPayView>
                <IPayHeadlineText style={styles.sectionText} text="HOME.SELECT_CODE" />
                <IPayCaption1Text text="COMMON.INTO_NAFATH_APP" color={colors.primary.primary800} />
              </IPayView>
            </IPayView>
            <IPayLinearGradientView
              locations={[0.1, 0.9]}
              style={styles.verifiedCodeContainer}
              gradientColors={colors.bottomsheetGradient}
            >
              {isExpired ? (
                <IPayPrimaryButton
                  btnText="COMMON.SEND_NEW_CODE"
                  large
                  style={styles.resendButton}
                  onPress={() => getNafathRandomNumber()}
                  rightIcon={<IPayIcon icon={icons.refresh} color={colors.natural.natural0} />}
                />
              ) : (
                <IPayPressable style={styles.codeWrapper}>
                  <IPayGradientText
                    text={`${nafathNumber}`}
                    shouldTranslate={false}
                    yScale={28}
                    gradientColors={colors.gradient1}
                    fontSize={styles.linearGradientText.fontSize}
                    fontFamily={styles.linearGradientText.fontFamily}
                    style={styles.gradientTextSvg}
                  />
                </IPayPressable>
              )}
            </IPayLinearGradientView>
            <IPayView style={styles.expireSection}>
              <IPayProgressBar
                colors={colors.gradientSecondary}
                onComplete={onTimerCompete}
                reverse
                showExpired={isExpired}
                intervalTime={duration}
              />
              <IPayText
                style={[styles.expireText, isExpired && styles.expireTextColor]}
                text={isExpired ? t('COMMON.CODE_HAS_EXPIRED') : `${t('COMMON.CODE_EXPIRES_IN')} ${format(counter)}`}
                shouldTranslate={false}
              />
            </IPayView>
          </IPayView>
          <IPayPressable style={styles.stepper}>
            {renderStep('3')}
            <IPayView style={styles.backSection}>
              <IPayHeadlineText style={styles.sectionText} text="PROFILE.BACK_TO_ALINMA_APP" />
              <IPayCaption1Text text="PROFILE.VERIFY_ACCOUNT" color={colors.primary.primary800} />
            </IPayView>
          </IPayPressable>
        </>
      )}
    </IPayView>
  );
};

export default IPayNafathVerification;
