import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { IPayPasscode } from '@app/components/organism';
import { forwardRef, useEffect, useState } from 'react';

import { BulkLock } from '@app/assets/svgs';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';
import { useNavigation } from '@react-navigation/native';
import resetPasscodeStyles from './reset-passcode.styles';

const ResetPasscode = forwardRef((props, ref) => {
  const { colors } = useTheme();
  const styles = resetPasscodeStyles(colors);
  const navigation = useNavigation();
  const localizationText = useLocalization();
  const [passcode, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState(false);

  const { showToast } = useToastContext();

  useEffect(() => {
    setTopLevelNavigator(navigation);
  });
  const onEnterPassCode = (currentCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (currentCode.length == 4) {
      if (currentCode == '1234') {
        props.changeView({ currentCode: currentCode, nextComponent: 'NewPasscode' });
      } else {
        setPasscodeError(true);
        renderToast();
      }
    }
  };

  const renderToast = () => {
    showToast({
      title: localizationText.passcode_is_incorrect,
      subTitle: localizationText.please_ensure_passcode,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.lockIconView}>
        <BulkLock />
      </IPayView>
      <IPayView style={styles.headingView}>
        <IPayPageDescriptionText
          heading={localizationText.currentPasscode}
          text={localizationText.enterCurrentPasscode}
        />
      </IPayView>
      <IPayView style={{ flex: 1 }}>
        <IPayPasscode passcodeError={passcodeError} data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
      </IPayView>
    </IPayView>
  );
});

export default ResetPasscode;
