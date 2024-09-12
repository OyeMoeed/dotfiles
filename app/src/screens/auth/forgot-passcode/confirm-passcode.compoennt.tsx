import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { isIosOS } from '@app/utilities/constants';
import icons from '@assets/icons';
import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import passcodeStyles from '../set-passcode/set-passcode.style';
import { SetPasscodeComponentProps } from './forget-passcode.interface';

const ConfirmPasscodeComponent: React.FC<SetPasscodeComponentProps> = ({ passcode, passcodeReacted }) => {
  const { colors } = useTheme();
  const styles = passcodeStyles();
  const { t } = useTranslation();
  const localizationText = useLocalization();
  const [passcodeError, setPassCodeError] = useState<boolean>(false);
  const { showToast } = useToastContext();

  const renderToast = (title: string) => {
    showToast({
      title: title || t('COMMON.INCORRECT_CODE'),
      subTitle: t('REGISTRATION.ENSURE_YOU_WRITE'),
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      containerStyle: { bottom: isIosOS ? scaleSize(80) : scaleSize(24) },
    });
  };

  const handleDigitPress = (newCode: string) => {
    if (passcode && newCode && passcode !== newCode) {
      setPassCodeError(true);
      renderToast(t('ERROR.PASSODE_NOT_MATCHING'));
    } else if (passcodeReacted) passcodeReacted();
  };

  const onEnterPassCode = (newCode: string) => {
    if (newCode.length <= 4) {
      if (passcodeError) setPassCodeError(false);
      if (newCode.length === 4) handleDigitPress(newCode);
    }
  };

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.lockIconView}>
        <icons.bulkLock width={scale(40)} height={verticalScale(40)} />
      </IPayView>

      <IPayView style={styles.forgetPasscodeheadingView}>
        <IPayPageDescriptionText heading="REGISTRATION.CONFIRM_PASSCODE" text="REGISTRATION.ENTER_PASSCODE_AGAIN" />
      </IPayView>
      <IPayPasscode data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} passcodeError={passcodeError} />
    </IPayView>
  );
};

export default ConfirmPasscodeComponent;
