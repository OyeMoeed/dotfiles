import { IPayCaption1Text, IPayFootnoteText, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayGradientListProps from './ipay-gradient-list.interface';
import gradientListStyle from './ipay-gradient-list.styles';

/**
 * Represents props for the IPayGradientList component.
 * @param {React.JSX.Element} [props.leftIcon] - Optional left icon element.
 * @param {string} props.title - Required main title text.
 * @param {string} [props.subTitle] - Optional subtitle text.
 * @param {React.JSX.Element} [props.rightIcon] - Optional right icon element.
 * @param {TextStyle} [props.titleStyle] - Optional style object for customizing the title text.
 * @param {TextStyle} [props.subTitleStyle] - Optional style object for customizing the subtitle text.
 * @param {TextStyle} [props.gradientColors] - Optional gradient colors for customizing gradient.
 */
const IPayGradientList: React.FC<IPayGradientListProps> = ({
  leftIcon,
  title,
  subTitle,
  rightIcon,
  titleStyle,
  subTitleStyle,
  gradientColors,
}) => {
  const { colors } = useTheme();
  const styles = gradientListStyle(colors);
  return (
    <IPayLinearGradientView gradientColors={gradientColors} style={styles.container}>
      <IPayView style={styles.wrapper}>
        {leftIcon && leftIcon}
        <IPayView>
          <IPayFootnoteText style={[styles.titleStyle, titleStyle]}>{title}</IPayFootnoteText>
          {subTitle && <IPayCaption1Text style={[styles.subTitleStyle, subTitleStyle]}>{subTitle}</IPayCaption1Text>}
        </IPayView>
      </IPayView>
      <IPayView>{rightIcon && rightIcon}</IPayView>
    </IPayLinearGradientView>
  );
};

export default IPayGradientList;
