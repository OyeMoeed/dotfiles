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
import useLocalization from '@app/localization/hooks/localization.hook';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { useNavigation } from '@react-navigation/native';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { IPayNafathVerificationProps } from './ipay-nafath-verification.interface';
import nafathVerificationStyles from './ipay-nafath-verification.style';
import { getNafathInquiry, getNafathRandom, updateWalletTierReq } from '@app/network/services/core/nafath-verification/nafath-verification.service';
import { IActivationAbsherReq, INafathInqRes, NAFATH_STATUSES, PrepareIdRenewalProp } from '@app/network/services/core/nafath-verification/nafath-verification.interface';
import { store, useTypedSelector } from '@app/store/store';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { APIResponseType, spinnerVariant } from '@app/utilities/enums.util';
import { setUserInfo } from '@app/store/slices/user-information-slice';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';

const IPayNafathVerification = forwardRef<{}, IPayNafathVerificationProps>(({ testID, onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(90); // in seconds
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = nafathVerificationStyles(colors);
  const navigation = useNavigation();
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nafathNumber, setNafathNumber] = useState<number>();
  const [nafathRequestId, setNafathRequestId] = useState<string>('');
  const [duration, setDuration] = useState<number>();
  const [waitngScnds, setWaitngScnds] = useState<number>(20);
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { showSpinner, hideSpinner } = useSpinnerContext();
  
  
  useEffect(() => {
    let timer: any = null;
    timer = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const renderSpinner = useCallback(
    (isVisbile: boolean) => {
      if (isVisbile) {
        showSpinner({
          variant: spinnerVariant.DEFAULT,
          hasBackgroundColor: true,
        });
      } else {
        hideSpinner();
      }
    },
    [isLoading],
  );

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

  const getNafathRandomNumber = async ()=>{
    const payLoad: PrepareIdRenewalProp = {
      requestId: appData?.loginData?.iamRequestId,
      channelId: appData?.loginData?.channelId
    }
    const apiResponse: any = await getNafathRandom(payLoad);
    console.log(apiResponse,'random res here')
    if (apiResponse?.status?.type === "SUCCESS") {
      setNafathRequestId(apiResponse.response.nafathRequestId); 
      setNafathNumber(isNaN(apiResponse.response.token) ?  atob(apiResponse.response.token) :apiResponse.response.token) 
      setCounter(apiResponse.response.waitingTimeSeconds);
      setDuration(apiResponse.response.waitingTimeSeconds*10)
      if(step == 2){
        setIsExpired(false);
      }else{
        setStep(2);
      }
      startInterval();
    } else if (apiResponse?.apiResponseNotOk) {
      setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
    } else {
      setAPIError(apiResponse?.error);
    }
    setIsLoading(false);
  }
  
  const getIamDate = () => {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    return year + "-" + ("0" + (month + 1)).slice(-2) + "-" + ("0" + day).slice(-2);


  }

  const updateWalletTier = async (nafathRes: INafathInqRes) => {
    renderSpinner(true);
    const { dispatch } = store || {};

    const deviceInfo = await getDeviceInfo();
    let nafathObj = nafathRes.response.mainInfo;

    let body: IActivationAbsherReq = {

      walletNumber: walletNumber,
      walletTier: 'G',
      poiNumber: userInfo?.poiNumber,
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
      deviceInfo: deviceInfo
    }
    const apiResponse = await updateWalletTierReq(body)
    
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      const updatedValues = {
        walletTier: 'G',
        poiNumber: nafathObj.idNumber,
        poiType: nafathObj.idNumber
      }
      dispatch(setUserInfo({
        ...userInfo,
        ...updatedValues
      }));

      setStep(3);
      
    } else if (apiResponse?.apiResponseNotOk) {

      const updatedValues = {
        walletTier: 'B',
      }
      dispatch(setUserInfo({
        ...userInfo,
        ...updatedValues
      }));
      setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
    } else {
      setAPIError(apiResponse?.error);
    }
    renderSpinner(false);
    
  }

  const nafathInquiry = async () => {
    
    const payLoad: PrepareIdRenewalProp = {
      requestId: appData?.loginData?.iamRequestId,
      channelId: appData?.loginData?.channelId
    }
    const apiResponse: any = await getNafathInquiry(payLoad);
    if (apiResponse?.status) {

        switch (apiResponse.status) {
          case NAFATH_STATUSES.ACCEPTED:
            clearInterval(startInterval());
            updateWalletTier(apiResponse);
            break;
          case NAFATH_STATUSES.EXPIRED:
            clearInterval(startInterval());
            setAPIError('Sorry! Nafath session has expired. Please try again later');
            break;
          case NAFATH_STATUSES.REJECTED:
            clearInterval(startInterval());
            setAPIError('Sorry ! Nafath request was rejected. Please try again later');
            setStep(1)
            break;
          default:
            break;
        }
      
      
    } else if (apiResponse?.apiResponseNotOk) {
      setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
    } else {
      setAPIError(apiResponse?.error);
    }
    setIsLoading(false);


  }

  
  const startInterval = () =>{
    
      return setInterval(() => {
        nafathInquiry();
        console.log("Interval methd called ");

      }, waitngScnds * 1000);
  }

  const format = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const onResend = () => {
    onComplete();
    navigation.navigate(screenNames.IDENTITY_SUCCESSFUL);
  }

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayView style={styles.logoWrapper}>
        <IPayImage image={images.nafathLogo} style={styles.nafathLogo} />
      </IPayView>
      {step === 1 ? (
        <>
          <IPayPageDescriptionText
            heading={localizationText.PROFILE.NAFATH_VALIDATION}
            text={localizationText.SETTINGS.NAFATH_VALIDATION_DESCRIPTION}
          />
          <IPayPressable style={styles.downloadSection}>
            <IPayFootnoteText
              regular={false}
              style={styles.downloadText}
              text={localizationText.SETTINGS.DOWNLOAD_NAFATH_ACCOUNT}
            />
            <IPayIcon icon={icons.export_3} size={24} color={colors.primary.primary500} />
          </IPayPressable>
          <IPayView style={styles.disclaimer}>
            <IPayFootnoteText
              color={colors.natural.natural900}
              text={localizationText.SETTINGS.NAFATH_TERMS_AND_CONDITION}
            />
            <IPayIcon icon={icons.infoIcon} size={20} />
          </IPayView>
          <IPayButton
            btnType="primary"
            btnText={localizationText.PROFILE.VALIDATE}
            rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
            onPress={() => getNafathRandomNumber()}
            large
            btnStyle={styles.btnStyle}
          />
        </>
      ) : (
        <>
          <IPayPageDescriptionText heading={localizationText.SETTINGS.VALIDATE_THROUGH_NAFAH} />
          <IPayPressable style={styles.stepper}>
            {renderStep('1')}
            <IPayFootnoteText
              regular={false}
              style={styles.downloadText}
              text={localizationText.SETTINGS.OPEN_NAFATH_APP}
            />
            <IPayIcon icon={icons.export_3} size={24} color={colors.primary.primary500} />
          </IPayPressable>
          <IPayView style={styles.stepTwo}>
            <IPayView style={styles.flexRow}>
              {renderStep('2')}
              <IPayView>
                <IPayHeadlineText style={styles.sectionText} text={localizationText.HOME.SELECT_CODE} />
                <IPayCaption1Text text={localizationText.COMMON.INTO_NAFATH_APP} color={colors.primary.primary800} />
              </IPayView>
            </IPayView>
            <IPayLinearGradientView
              locations={[0.1, 0.9]}
              style={styles.verifiedCodeContainer}
              gradientColors={colors.bottomsheetGradient}
            >
              {isExpired ? (
                <IPayPrimaryButton
                  btnType="primary"
                  btnText={localizationText.COMMON.SEND_NEW_CODE}
                  large
                  style={styles.resendButton}
                  onPress={() => getNafathRandomNumber()}
                  rightIcon={<IPayIcon icon={icons.refresh} color={colors.natural.natural0} />}
                />
              ) : (
                <IPayPressable style={styles.codeWrapper}>
                  <IPayGradientText
                    text={`${nafathNumber}`}
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
                onComplete={() => setIsExpired(true)}
                reverse
                showExpired={isExpired}
                intervalTime={duration}
              />
              <IPayText style={[styles.expireText, isExpired && styles.expireTextColor]}>
                {isExpired
                  ? localizationText.COMMON.CODE_HAS_EXPIRED
                  : `${localizationText.COMMON.CODE_EXPIRES_IN} ${format(counter)}`}
              </IPayText>
            </IPayView>
          </IPayView>
          <IPayPressable style={styles.stepper}>
            {renderStep('3')}
            <IPayView style={styles.backSection}>
              <IPayHeadlineText style={styles.sectionText} text={localizationText.PROFILE.BACK_TO_ALINMA_APP} />
              <IPayCaption1Text text={localizationText.PROFILE.VERIFY_ACCOUNT} color={colors.primary.primary800} />
            </IPayView>
          </IPayPressable>
        </>
      )}
    </IPayView>
  );
});

export default IPayNafathVerification;
