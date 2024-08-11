import icons from '@app/assets/icons';
import {
  IPayBodyText,
  IPayCaption2Text,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayText,
  IPayView,
} from '@app/components/atoms/index';
import useTheme from '@app/styles/hooks/theme.hook';
import { toastTypes } from '@app/utilities/enums.util';
import React, { useCallback } from 'react';
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
  isBottomSheet,
  toastType,
  titleStyle,
}) => {
  const { colors } = useTheme();
  const dynamicStyles = styles({
    colors,
    bgColor: bgColor || colors.error.error500,
    titleColor: titleColor || colors.primary.primary800,
    borderColor: borderColor || colors.secondary.secondary200,
  });
  const bottonStyle = { bottom: verticalScale(isBottomSheet ? 105 : 40) };
  const textViewWidth = { width: isShowRightIcon ? '80%' : '90%' };

  const toastTypeStyles = useCallback(() => {
    switch (toastType) {
      case toastTypes.INFORMATION:
        return dynamicStyles.toastInformation;
      case toastTypes.SUCCESS:
        return dynamicStyles.toastSuccess;
      default:
        return dynamicStyles.toastError;
    }
  }, [toastType]);

  return (
    <IPayPressable
      testID={`${testID}-toast`}
      onPress={onPress}
      style={[
        dynamicStyles.constainer,
        bottonStyle,
        toastTypeStyles(),
        containerStyle,
        title && !subTitle && dynamicStyles.onlyTitleContainer,
      ]}
    >
      <IPayView style={[dynamicStyles.commonContainer]}>
        <IPayView style={dynamicStyles.leftIconContainer}>
          {isShowLeftIcon ? leftIcon || <IPayIcon icon={icons.warning} color={colors.natural.natural0} /> : <></>}
        </IPayView>
        <IPayView style={[textViewWidth, { justifyContent: 'center' }]}>
          {title && !subTitle && (
            <IPaySubHeadlineText regular style={[dynamicStyles.onlyTitleText, titleStyle]} text={title} />
          )}
          {title && subTitle && <IPaySubHeadlineText regular style={[dynamicStyles.font, textStyle]} text={title} />}
          {isShowSubTitle && (
            <IPayCaption2Text regular text={subTitle} numberOfLines={2} style={dynamicStyles.subTitleStyle} />
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
