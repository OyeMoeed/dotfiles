import { IPayPressable, IPayText, IPayView } from '@app/components/atoms/index';
import { variants } from '@app/utilities/enums.util';
import { getForegroundColor } from '@app/utilities/interface-utils';
import React from 'react';
import { IPayToastProps } from './ipay-toast.interface';
import styles from './ipay-toast.style';
import colors from '@app/styles/colors.const';
import { LeftListIcon } from '@app/assets/svgs';

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
  const dynamicStyles = styles({ bgColor, titleColor, borderColor });
  return (
    <IPayPressable testID={testID} onPress={onPress} style={dynamicStyles.mainContiner}>
      <IPayView style={[dynamicStyles.constainer]}>
        <IPayView style={[dynamicStyles.commonContainer]}>
          <IPayView style={[dynamicStyles.leftIconContainer]}>
            {isShowLeftIcon ? leftIcon || <LeftListIcon color={getForegroundColor(variants.COLORED, colors)} /> : <></>}
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
