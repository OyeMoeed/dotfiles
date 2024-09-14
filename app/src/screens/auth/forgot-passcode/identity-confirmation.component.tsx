import { IPayIcon, IPayView } from '@app/components/atoms';
import {
  IPayRHFAnimatedTextInput as IPayAnimatedTextInput,
  IPayButton,
  IPayPageDescriptionText,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import constants from '@app/constants/constants';
import { setToken } from '@app/network/client';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import { PrepareForgetPasscodeProps } from '@app/network/services/core/prepare-forget-passcode/prepare-forget-passcode.interface';
import { prepareForgetPasscode } from '@app/network/services/core/prepare-forget-passcode/prepare-forget-passcode.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo, encryptData } from '@app/network/utilities';
import { getValidationSchemas } from '@app/services';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType } from '@app/utilities/enums.util';
import icons from '@assets/icons';
import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { SetPasscodeComponentProps } from './forget-passcode.interface';
import ForgotPasscodeStyles from './forgot.passcode.styles';

const IdentityConfirmationComponent: React.FC<SetPasscodeComponentProps> = ({ onCallback, onPressHelp }) => {
  const dispatch = useTypedDispatch();
  const { colors } = useTheme();
  const [apiError, setAPIError] = useState<string>('');
  const styles = ForgotPasscodeStyles(colors);
  const { t } = useTranslation();
  const { showToast } = useToastContext();
  const { appData } = useTypedSelector((state) => state.appDataReducer);

  const validationSchema = Yup.object().shape({
    iqamaId: getValidationSchemas(t).iqamaIdSchema,
  });

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError || t('CARDS.VERIFY_CODE_ACCURACY'),
      borderColor: colors.error.error25,
      isBottomSheet: true,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainerStyle,
    });
  };

  const prepareForgetPass = async (
    encryptedData: {
      passwordEncryptionPrefix: string;
      passwordEncryptionKey: string;
    },
    transactionId: string,
    iqamaId: string,
  ) => {
    const encryptedPoiNumber = encryptData(
      `${encryptedData.passwordEncryptionPrefix}${iqamaId}`,
      encryptedData.passwordEncryptionKey,
    );

    const payload = {
      poiNumber: encryptedPoiNumber,
      authentication: { transactionId },
      deviceInfo: appData.deviceInfo,
    } as PrepareForgetPasscodeProps;
    const apiResponse: any = await prepareForgetPasscode(payload);
    if (apiResponse && onCallback) {
      const { otpRef, walletNumber } = apiResponse?.data?.response || {};
      dispatch(setAppData({ otpRef, walletNumber }));
      onCallback({
        nextComponent: constants.FORGET_PASSWORD_COMPONENTS.CONFIRM_OTP,
        data: {
          iqamaId,
          otpRef: apiResponse?.response?.otpRef,
          transactionId,
          resendOtpPayload: payload,
        },
      });
    }
  };

  const prepareEncryptionData = async (iqamaId: string) => {
    try {
      const deviceInfo = await getDeviceInfo();
      const prepareLoginPayload: DeviceInfoProps = {
        ...deviceInfo,
        locationDetails: {},
      };

      const apiResponse: any = await prepareLogin(prepareLoginPayload);
      if (apiResponse.status.type === APIResponseType.SUCCESS) {
        dispatch(
          setAppData({
            transactionId: apiResponse?.authentication?.transactionId,
            encryptionData: apiResponse?.response,
          }),
        );
        setToken(apiResponse?.headers?.authorization);
        await prepareForgetPass(apiResponse?.response, apiResponse?.authentication?.transactionId, iqamaId);
      } else {
        setAPIError(t('ERROR.SOMETHING_WENT_WRONG'));
        renderToast(t('ERROR.SOMETHING_WENT_WRONG'));
      }
    } catch (error) {
      setAPIError(t('ERROR.SOMETHING_WENT_WRONG'));
      renderToast(t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const onSubmit = (data: { iqamaId: string }) => {
    prepareEncryptionData(data.iqamaId);
  };

  const handleOnPressHelp = () => {
    if (onPressHelp) onPressHelp();
  };

  return (
    <IPayFormProvider validationSchema={validationSchema} defaultValues={{ iqamaId: '' }}>
      {({ handleSubmit }) => (
        <IPayView style={styles.identityContainer}>
          <IPayView style={styles.loginIconView}>
            <icons.userTick width={scale(40)} height={verticalScale(40)} />
          </IPayView>

          <IPayView style={styles.headingView}>
            <IPayPageDescriptionText
              style={styles.headingStyle}
              heading="FORGOT_PASSCODE.FORGOT_PASSCODE_HEADING"
              text="FORGOT_PASSCODE.FORGOT_PASSCODE_SUBTITLE"
            />
          </IPayView>

          <IPayView style={styles.inputFieldsContainer}>
            <IPayView style={styles.inputTextView}>
              <IPayAnimatedTextInput
                name="iqamaId"
                label="COMMON.ID_IQAMA"
                editable
                keyboardType="decimal-pad"
                maxLength={constants.IQAMA_ID_NUMBER_LENGTH}
              />
            </IPayView>
          </IPayView>

          <IPayButton
            onPress={handleSubmit(onSubmit)}
            btnType="primary"
            btnText="COMMON.NEXT"
            large
            rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
          />

          <IPayButton
            onPress={handleOnPressHelp}
            btnType="link-button"
            btnText="COMMON.NEED_HELP"
            large
            btnStyle={styles.needHelpBtn}
            rightIcon={<IPayIcon icon={icons.messageQuestion} size={20} color={colors.primary.primary500} />}
          />
        </IPayView>
      )}
    </IPayFormProvider>
  );
};

export default IdentityConfirmationComponent;
