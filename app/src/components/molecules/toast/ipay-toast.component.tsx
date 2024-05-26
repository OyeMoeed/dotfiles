import React from 'react';
import { IPayView, IPayText, IPayPressable } from '@app/components/atoms/index';
import styles from './ipay-toast.style';
import { IPayToastProps } from './ipay-toast.interface';
import { getForegroundColor } from '@app/utilities/interfaceUtils';
import { LeftListIcon } from '@app/assets/svgs/svg';
import { variants } from '@app/utilities/enums.util';

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
  borderColor
}) => {
  const dynamicStyles = styles({ bgColor, titleColor, borderColor });
  return (
    <IPayPressable testID={testID} onPress={onPress} style={dynamicStyles.mainContiner}>
      <IPayView style={[dynamicStyles.constainer]}>
        <IPayView style={[dynamicStyles.commonContainer]}>
          <IPayView style={dynamicStyles.leftIconContainer}>
            {isShowLeftIcon ? leftIcon || <LeftListIcon color={getForegroundColor(variants.COLORED)} /> : <></>}
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
