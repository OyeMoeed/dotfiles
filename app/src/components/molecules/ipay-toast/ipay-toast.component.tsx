import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayText, IPayView } from '@app/components/atoms/index';
import useTheme from '@app/styles/hooks/theme.hook';
import { variants } from '@app/utilities/enums.util';
import { getForegroundColor } from '@app/utilities/interfaceUtils';
import React from 'react';
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
  borderColor,
}) => {
  const { colors } = useTheme();
  const dynamicStyles = styles({
    bgColor: bgColor || colors.lightColorPalette.white,
    titleColor: titleColor || colors.primary.primary800,
    borderColor: borderColor || colors.secondary.secondary200,
  });
  return (
    <IPayPressable testID={`${testID}-toast`} onPress={onPress} style={dynamicStyles.mainContiner}>
      <IPayView style={[dynamicStyles.constainer]}>
        <IPayView style={[dynamicStyles.commonContainer]}>
          <IPayView style={dynamicStyles.leftIconContainer}>
            {isShowLeftIcon ? (
              leftIcon || (
                <IPayIcon icon={icons.left_list_icon} size={24} color={getForegroundColor(variants.COLORED, colors)} />
              )
            ) : (
              <></>
            )}
          </IPayView>
          <IPayView>
            <IPayText style={[dynamicStyles.font, textStyle]}>{title}</IPayText>
            {isShowSubTitle ? <IPayText style={dynamicStyles.subTitleStyle}>{subTitle}</IPayText> : <></>}
          </IPayView>
        </IPayView>
        <IPayView style={dynamicStyles.commonContainer}>
          <IPayText style={[dynamicStyles.rightIconContainer, dynamicStyles.viewText, viewTextStyle]}>
            {viewText}
          </IPayText>
        </IPayView>
      </IPayView>
    </IPayPressable>
  );
};

export default IPayToast;
