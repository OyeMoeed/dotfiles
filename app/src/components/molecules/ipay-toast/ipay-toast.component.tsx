import icons from '@app/assets/icons';
// TODO: refactor code to handle cyclic ref
// eslint-disable-next-line import/no-cycle
import {
  IPayCaption2Text,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayText,
  IPayView,
} from '@app/components/atoms/index';
import useTheme from '@app/styles/hooks/theme.hook';
import { ToastTypes } from '@app/utilities/enums.util';
import React, { useCallback } from 'react';
import { verticalScale } from 'react-native-size-matters';
import { Portal } from 'react-native-portalize';
import { ViewStyle } from 'react-native';
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
  isShowRightIcon,
  rightIcon,
  isBottomSheet,
  toastType,
  titleStyle,
  borderColor,
}) => {
  const { colors } = useTheme();
  const dynamicStyles = styles(
    bgColor || colors.error.error500,
    titleColor || colors.primary.primary800,
    borderColor || colors.secondary.secondary200,
  );
  const bottonStyle = { bottom: verticalScale(isBottomSheet ? 105 : 40) };
  const textViewWidth: ViewStyle = { width: isShowRightIcon ? '80%' : '90%' };

  const toastTypeStyles = useCallback(() => {
    switch (toastType) {
      case ToastTypes.INFORMATION:
        return dynamicStyles.toastInformation;
      case ToastTypes.SUCCESS:
        return dynamicStyles.toastSuccess;
      default:
        return dynamicStyles.toastError;
    }
  }, [toastType]);

  return (
    <Portal>
      <IPayPressable
        testID={`${testID}-toast`}
        onPress={onPress}
        style={[
          dynamicStyles.constainer,
          bottonStyle,
          toastTypeStyles(),
          containerStyle,
          title && !subTitle ? dynamicStyles.onlyTitleContainer : null,
        ]}
      >
        <IPayView style={dynamicStyles.commonContainer}>
          <IPayView style={dynamicStyles.leftIconContainer}>
            {isShowLeftIcon ? leftIcon || <IPayIcon icon={icons.warning} color={colors.natural.natural0} /> : null}
          </IPayView>
          <IPayView style={[textViewWidth, dynamicStyles.justifyCenter]}>
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
            <IPayText
              style={[dynamicStyles.rightIconContainerText, dynamicStyles.viewText, viewTextStyle]}
              text={viewText}
            />
          </IPayView>
        )}
      </IPayPressable>
    </Portal>
  );
};

export default IPayToast;
