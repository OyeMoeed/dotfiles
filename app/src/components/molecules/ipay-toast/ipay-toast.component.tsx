import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayText, IPayView } from '@app/components/atoms/index';
import useTheme from '@app/styles/hooks/theme.hook';
import { variants } from '@app/utilities/enums.util';
import { getForegroundColor } from '@app/utilities/interface-utils';
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
  containerStyle,
  borderColor
}) => {
  const { colors } = useTheme();
  const dynamicStyles = styles({
    colors: colors,
    bgColor: bgColor || colors.natural.natural0,
    titleColor: titleColor || colors.primary.primary800,
    borderColor: borderColor || colors.secondary.secondary200
  });
  return (
    <IPayPressable testID={testID} onPress={onPress} style={(dynamicStyles.mainContiner, containerStyle)}>
      <IPayView style={[dynamicStyles.constainer]}>
        <IPayView style={[dynamicStyles.commonContainer]}>
          <IPayView style={dynamicStyles.leftIconContainer}>
            {isShowLeftIcon ? (
              leftIcon || (
                <IPayIcon icon={icons.warning} size={24} color={getForegroundColor(variants.COLORED, colors)} />
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
        <IPayView style={[dynamicStyles.commonContainer]}>
          <IPayText style={[dynamicStyles.rightIconContainer, dynamicStyles.viewText, viewTextStyle]}>
            {viewText}
          </IPayText>
        </IPayView>
      </IPayView>
    </IPayPressable>
  );
};

export default IPayToast;
