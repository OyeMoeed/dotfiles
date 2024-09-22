import icons from '@app/assets/icons';
import { IPayBodyText, IPayFlatlist, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import IPayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import React, { useEffect, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { buttonVariants } from '@app/utilities/enums.util';
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
    if (passcodeError) setPin([]);
  }, [passcodeError]);

  useEffect(() => {
    setPin([]);
  }, [clearPin]);

  const handleDigitPress = (digit: string) => {
    if (pin.length < 4) {
      setPin((prevPin) => [...prevPin, digit]);
      const newCode = [...pin, digit].join('');
      onEnterPassCode?.(newCode);
    }
  };
  const handleBackPress = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    if (!loginViaPasscode && item === '') {
      return <IPayView testID={`${testID}-${index}`} style={styles.transparentView} />;
    }
    if (item === '' || item === 'back') {
      const isLoginVia = loginViaPasscode ? (
        <IPayGradientIcon icon={isAndroidOS ? icons.finger_scan : icons.FACE_ID} size={40} />
      ) : (
        <IPayView />
      );

      return (
        <IPayPressable
          activeOpacity={0.8}
          testID={`${testID}-${index}-i-pay-pressable`}
          key={`${testID}-${index}-i-pay-pressable`}
          style={styles.passcodeIconTab}
          onPress={item === 'back' ? handleBackPress : onPressFaceID}
        >
          {item === 'back' ? (
            <IPayIcon icon={icons.backspaceIcon} color={colors.primary.primary800} size={20} />
          ) : (
            isLoginVia
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

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemSeparatorComponent = () => <IPayView style={styles.itemSeparator} />;

  const pinContainerMargin = forgetPasswordBtn
    ? { marginBottom: moderateScale(16) }
    : { marginBottom: moderateScale(40) };

  return (
    <IPayView testID={`${testID}-passcode-component`} style={[styles.container, style]}>
      <IPayView style={[styles.pinContainer, pinContainerMargin]}>
        {Array.from({ length: 4 }).map((_, index) => (
          <IPayView
            key={`${`${index}IPayView`}`}
            testID={`${testID}-pin-box-${index}`}
            style={[
              styles.pinBox,
              pin?.[index] ? styles.pinBoxFilled : {},
              passcodeError && { borderColor: colors.error.error500 },
            ]}
          />
        ))}
      </IPayView>
      {forgetPasswordBtn && (
        <IPayButton
          btnType={buttonVariants.LINK_BUTTON}
          btnIconsDisabled
          btnText="LOGIN.FORGOT_PASSCODE_QUESTION"
          small
          onPress={onPressForgetPassword}
          btnStyle={[styles.forgetPasscodeText, btnStyle]}
        />
      )}
      <IPayFlatlist
        numColumns={3}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `${index}-i-pay-pressable`}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </IPayView>
  );
};

export default IPayPasscode;
