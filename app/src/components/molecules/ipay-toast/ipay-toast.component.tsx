import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayText, IPayView } from '@app/components/atoms/index';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { verticalScale } from 'react-native-size-matters';
import { IPayToastProps } from './ipay-toast.interface';
import styles from './ipay-toast.style';

/**
 * A component consisting of a heading and an input field.
 * @param {IPayToastProps} props - The props for the Ipay component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayToast: React.FC<IPayToastProps> = ({
  testID,
  title,
  bgColor,
  textStyle,
  isShowLeftIcon,
  leftIcon,
  viewText,
  viewTextStyle,
  isShowSubTitle,
  subTitle,
  onPress,
  titleColor,
  containerStyle,
  borderColor,
  isShowRightIcon,
  rightIcon,
  isBottomSheet
}) => {
  const { colors } = useTheme();
  const dynamicStyles = styles(colors);

  const bottonStyle = { bottom: verticalScale(isBottomSheet ? 105 : 40) };
  const textViewWidth = { width: isShowRightIcon ? '80%' : '90%' };

  return (
    <IPayPressable
      testID={`${testID}-toast`}
      onPress={onPress}
      style={[dynamicStyles.constainer, bottonStyle, containerStyle]}
    >
      <IPayView style={[dynamicStyles.commonContainer]}>
        <IPayView style={dynamicStyles.leftIconContainer}>
          {isShowLeftIcon ? leftIcon || <IPayIcon icon={icons.warning} color={colors.natural.natural0} /> : <></>}
        </IPayView>
        <IPayView style={textViewWidth}>
          <IPayText style={[dynamicStyles.font, textStyle]}>{title}</IPayText>
          {isShowSubTitle ? (
            <IPayText numberOfLines={2} style={dynamicStyles.subTitleStyle}>
              {subTitle}
            </IPayText>
          ) : (
            <></>
          )}
        </IPayView>
      </IPayView>
      {isShowRightIcon ? (
        <IPayView style={dynamicStyles.rightIconContainer}>
          {rightIcon || <IPayIcon icon={icons.crossIcon} size={18} color={colors.natural.natural0} />}
        </IPayView>
      ) : (
        <IPayView style={dynamicStyles.commonContainer}>
          <IPayText style={[dynamicStyles.rightIconContainerText, dynamicStyles.viewText, viewTextStyle]}>
            {viewText}
          </IPayText>
        </IPayView>
      )}
    </IPayPressable>
  );
};

export default IPayToast;
