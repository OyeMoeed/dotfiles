import icons from '@app/assets/icons';
import { IPayBodyText, IPayFlatlist, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import IPayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import React, { useEffect, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { IPayPasscodeProps } from './ipay-passcode.interface';
import ipayPasscodeStyles from './ipay-passcode.style';

const IPayPasscode: React.FC<IPayPasscodeProps> = ({
  testID,
  style,
  data,
  passcodeError,
  onEnterPassCode,
  loginViaPasscode,
  forgetPasswordBtn,
  onPressForgetPassword,
  onPressFaceID,
  btnStyle,
  clearPin,
}) => {
  const { colors } = useTheme();
  const styles = ipayPasscodeStyles(colors);
  const [pin, setPin] = useState<string[]>([]);

  useEffect(() => {
    passcodeError && setPin([]);
  }, [passcodeError]);

  useEffect(() => {
    setPin([]);
  }, [clearPin]);

  const handleDigitPress = (digit: string) => {
    if (pin.length < 4) {
      setPin((prevPin) => [...prevPin, digit]);
      const newCode = [...pin, digit].join('');
      onEnterPassCode(newCode);
    }
  };
  const localizationText = useLocalization();
  const handleBackPress = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    if (!loginViaPasscode && item === '') {
      return <IPayView testID={`${testID}-${index}`} style={styles.transparentView} />;
    }
    if (item === '' || item === 'back') {
      return (
        <IPayPressable
          activeOpacity={0.8}
          testID={`${testID}-${index}`}
          style={styles.passcodeIconTab}
          onPress={item === 'back' ? handleBackPress : onPressFaceID}
        >
          {item === 'back' ? (
            <IPayIcon icon={icons.backspaceIcon} color={colors.primary.primary800} size={20} />
          ) : loginViaPasscode ? (
            <IPayGradientIcon icon={isAndroidOS ? icons.finger_scan : icons.FACE_ID} size={40} />
          ) : (
            <></>
          )}
        </IPayPressable>
      );
    }
    return (
      <IPayPressable
        activeOpacity={0.8}
        testID={`${testID}-${index}`}
        style={styles.passcodeTab}
        onPress={() => handleDigitPress(item)}
      >
        <IPayBodyText regular text={item} color={colors.primary.primary800} />
      </IPayPressable>
    );
  };

  const pinContainerMargin = forgetPasswordBtn
    ? { marginBottom: moderateScale(16) }
    : { marginBottom: moderateScale(40) };

  return (
    <IPayView testID={`${testID}-passcode-component`} style={[styles.container, style]}>
      <IPayView style={[styles.pinContainer, pinContainerMargin]}>
        {Array.from({ length: 4 }).map((_, index) => (
          <IPayView
            key={index}
            testID={`${testID}-pin-box-${index}`}
            style={[
              styles.pinBox,
              pin[index] && styles.pinBoxFilled,
              passcodeError && { borderColor: colors.error.error500 },
            ]}
          />
        ))}
      </IPayView>
      {forgetPasswordBtn && (
        <IPayButton
          btnType="link-button"
          btnIconsDisabled
          btnText={'LOGIN.FORGOT_PASSCODE_QUESTION'}
          small
          onPress={onPressForgetPassword}
          btnStyle={[styles.forgetPasscodeText, btnStyle]}
        />
      )}
      <IPayFlatlist
        numColumns={3}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <IPayView style={styles.itemSeparator} />}
      />
    </IPayView>
  );
};

export default IPayPasscode;
