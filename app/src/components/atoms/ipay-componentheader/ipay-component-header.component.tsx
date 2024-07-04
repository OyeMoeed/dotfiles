import { IPayCaption1Text, IPayIcon, IPayView } from '@app/components/atoms';
import IPaySupportedCards from '@app/components/molecules/ipay-card-icons/ipay-supported-card.compoents';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayComponentHeaderProps } from './ipay-component-header.interface';
import componentHeaderStyles from './ipay-component-header.styles';

const IPayComponentHeader: React.FC<IPayComponentHeaderProps> = ({
  title,
  icon,
  subtitle,
  titleStyle,
  subtitleStyle,
  containerStyle,
  showCardIcons = true,
}) => {
  const { colors } = useTheme();
  const styles = componentHeaderStyles(colors);

  return (
    <IPayView style={[styles.cardHeader, containerStyle]}>
      {icon && <IPayIcon icon={icon} size={24} color={colors.primary.primary900} />}
      <IPayView style={styles.textContainer}>
        {title && <IPayCaption1Text text={title} style={[styles.headerText, titleStyle]} />}
        {subtitle && <IPayCaption1Text text={subtitle} style={[styles.subtitleText, subtitleStyle]} />}
      </IPayView>
      {showCardIcons && <IPaySupportedCards />}
    </IPayView>
  );
};

export default IPayComponentHeader;
