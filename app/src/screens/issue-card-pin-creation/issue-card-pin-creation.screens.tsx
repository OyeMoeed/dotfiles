import images from '@app/assets/images';
import { IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import { IPayOtpVerification } from '@app/components/templates';
import constants from '@app/constants/constants';
import { IConfirmIssueCardReq } from '@app/network/services/cards-management/issue-card-confirm/issue-card-confirm.interface';
import confirmIssueCard from '@app/network/services/cards-management/issue-card-confirm/issue-card-confirm.service';
import { IPrepareIssueCardReq } from '@app/network/services/cards-management/issue-card-prepare/issue-card-prepare.interface';
import prepareIssueCard from '@app/network/services/cards-management/issue-card-prepare/issue-card-prepare.service';
import { encryptData, getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangeCardPinProps, ChangeCardPinViewTypes } from './issue-card-pin-creation.interface';
import changeCardPinStyles from './issue-card-pin-creation.style';

const IssueCardPinCreationScreen = ({
  onSuccess,
  handleOnPressHelp,
  issuanceDetails,
  isPhysicalCard,
}: ChangeCardPinProps) => {
  const { colors } = useTheme();
  const styles = changeCardPinStyles();
  const { t } = useTranslation();
  const [passcodeError, setPasscodeError] = useState(false);
  const [currentView, setCurrentView] = useState<ChangeCardPinViewTypes>(ChangeCardPinViewTypes.NewPin);
  const [newPin, setNewPin] = useState<string>('');
  const [clearPin, setClearPin] = useState<boolean>();
  const otpVerificationRef = useRef(null);
  const [otp, setOtp] = useState<string>('');
  const [otpRef, setOtpRef] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<string>('');
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);
  const appData = useTypedSelector((state) => state.appDataReducer.appData);

  const getTitle = (selectedView: string) => {
    switch (selectedView) {
      case ChangeCardPinViewTypes.NewPin:
        return 'VIRTUAL_CARD.CREATE_CARD_PIN_PIN';
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return 'VIRTUAL_CARD.CONFIRM_CARD_PIN';
      default:
        return '';
    }
  };

  const getDescription = (selectedView: string) => {
    switch (selectedView) {
      case ChangeCardPinViewTypes.NewPin:
        return 'VIRTUAL_CARD.FIRST_TIME_CODE';
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return 'VIRTUAL_CARD.ENTER_PASSCODE_AGAIN';
      default:
        return '';
    }
  };

  const getErrorTitle = (selectedView: string) => {
    switch (selectedView) {
      case ChangeCardPinViewTypes.NewPin:
        return 'CHANGE_PIN.INVALID_PIN';
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return 'CHANGE_PIN.PIN_NOT_MATCHING';
      default:
        return '';
    }
  };

  const getErrorDescription = (selectedView: string) => {
    switch (selectedView) {
      case ChangeCardPinViewTypes.NewPin:
        return 'CHANGE_PIN.OLD_PIN';
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return 'CHANGE_PIN.ENSURE_YOU_WRITE';
      default:
        return '';
    }
  };

  const { showToast } = useToastContext();

  const isPinMatched = (enteredCode: string) => enteredCode === newPin;

  const renderToast = () => {
    showToast({
      title: getErrorTitle(currentView),
      subTitle: getErrorDescription(currentView),
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const prepareOtp = async (resendOtp = false) => {
    const body: IPrepareIssueCardReq = {
      deviceInfo: await getDeviceInfo(),
      physicalCard: false,
      transactionType: issuanceDetails.transactionType,
    };
    const apiResponse = await prepareIssueCard(walletNumber, body);

    if (apiResponse?.status?.type === 'SUCCESS') {
      setOtpRef(apiResponse?.response?.otpRef as string);
      if (!resendOtp) {
        setCurrentView(ChangeCardPinViewTypes.EnterReceiveOtp);
      }
      otpVerificationRef?.current?.resetInterval();
    }
  };

  const isExist = (checkStr: string | undefined) => checkStr || '';

  const confirmOtp = async () => {
    setIsLoading(true);
    const encryptedPinCode =
      encryptData(
        isExist(appData?.encryptionData?.passwordEncryptionPrefix) + pinCode,
        isExist(appData?.encryptionData?.passwordEncryptionKey),
      ) || '';
    const body: IConfirmIssueCardReq = {
      deviceInfo: await getDeviceInfo(),
      cardIndex: issuanceDetails?.cardIndex,
      cardManageStatus: issuanceDetails?.cardManageStatus,
      cardPinCode: encryptedPinCode,
      cardType: issuanceDetails?.cardType,
      otp,
      otpRef,
      physicalCard: isPhysicalCard ? true : false,
      transactionType: issuanceDetails.transactionType,
    };
    const apiResponse = await confirmIssueCard(walletNumber, body);
    if (apiResponse?.status?.type === 'SUCCESS') {
      onSuccess(apiResponse?.response?.cardInfo);
    }
    setIsLoading(false);
  };

  const onEnterPassCode = async (enteredCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (enteredCode.length !== 4) return;

    switch (currentView) {
      case ChangeCardPinViewTypes.NewPin:
        setNewPin(enteredCode);
        setCurrentView(ChangeCardPinViewTypes.ConfirmNewPin);
        setClearPin((prev) => !prev);

        break;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        if (isPinMatched(enteredCode)) {
          setPinCode(enteredCode);
          await prepareOtp();
        } else {
          setPasscodeError(true);
          renderToast();
        }
        break;
      default:
        break;
    }
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'));
    } else {
      confirmOtp();
    }
  };

  const onResendCodePress = () => {
    prepareOtp(true);
  };

  const renderOtpSheet = () => (
    <IPayOtpVerification
      ref={otpVerificationRef}
      onPressConfirm={onConfirmOtp}
      mobileNumber={walletInfo?.mobileNumber}
      setOtp={setOtp}
      setOtpError={setOtpError}
      otpError={otpError}
      isLoading={isLoading}
      otp={otp}
      isBottomSheet={false}
      handleOnPressHelp={handleOnPressHelp}
      timeout={Number(walletInfo?.otpTimeout)}
      onResendCodePress={onResendCodePress}
    />
  );

  return currentView === ChangeCardPinViewTypes.EnterReceiveOtp ? (
    renderOtpSheet()
  ) : (
    <IPayView style={styles.container}>
      <IPayImage image={images.securityCard} style={styles.lockIconView} />
      <IPayView style={styles.headingView}>
        <IPayPageDescriptionText heading={getTitle(currentView)} text={getDescription(currentView)} />
      </IPayView>
      <IPayView style={styles.pincodeViewContainer}>
        <IPayPasscode
          clearPin={clearPin}
          passcodeError={passcodeError}
          data={constants.DIALER_DATA}
          onEnterPassCode={onEnterPassCode}
        />
      </IPayView>
    </IPayView>
  );
};

export default IssueCardPinCreationScreen;
