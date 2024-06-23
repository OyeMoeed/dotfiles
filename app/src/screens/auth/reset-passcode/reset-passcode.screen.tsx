import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { IPayPasscode } from '@app/components/organism';

import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { useNavigation } from '@react-navigation/native';
import { setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import icons from '@app/assets/icons';
import resetPasscodeStyles from './reset-passcode.styles';
import { BulkLock } from '@app/assets/svgs';

const ResetPasscode = forwardRef((props, ref) => {
  const { colors } = useTheme();
  const styles = resetPasscodeStyles(colors);
  const navigation = useNavigation();
  const localizationText = useLocalization();
  const [passcode, setPasscode] = useState<string>('');

  useEffect(() => {
    setTopLevelNavigator(navigation);
  });
  const onEnterPassCode = (newCode: string) => {
    if (newCode.length <= 4) {
      setPasscode(newCode);
    }
    if (newCode.length == 4) props.changeView('NewPasscode');
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
        <IPayPasscode data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
      </IPayView>
    </IPayView>
  );
});

export default ResetPasscode;
