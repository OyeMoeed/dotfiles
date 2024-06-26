import { IPayCaption1Text, IPayIcon, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import React from 'react';
import { IPayComponentHeaderProps } from './ipay-component-header.interface';
import componentHeaderStyles from './ipay-component-header.styles';


const IPayComponentHeader: React.FC<IPayComponentHeaderProps> = ({
  title,
  cardIcon1,
  cardIcon2,
  cardIcon3,
  icon,
  subtitle,
  iconSize = 13, // Default icon size
  titleStyle,
  subtitleStyle,
  containerStyle,
  showCardIcons = false, // Default is false
}) => {
  const { colors } = useTheme();
  const styles = componentHeaderStyles(colors);

  return (
    <IPayView style={[styles.cardHeader, containerStyle]}>
      {icon && (
        <IPayIcon icon={icon} size={scaleSize(iconSize)} color={colors.primary.primary900} />
      )}
      <IPayView style={styles.textContainer}>
        {title && (
          <IPayCaption1Text text={title} style={[styles.headerText, titleStyle]} />
        )}
        {subtitle && (
          <IPayCaption1Text text={subtitle} style={[styles.subtitleText, subtitleStyle]} />
        )}
      </IPayView>
      {showCardIcons && (
        <IPayView style={styles.cardIconsContainer}>
          <IPayView style={styles.icon}>
            <IPayIcon icon={cardIcon1} size={scaleSize(iconSize)} />
          </IPayView>
          <IPayView style={styles.icon}>
            <IPayIcon icon={cardIcon2} size={scaleSize(iconSize)} />
          </IPayView>
          <IPayView style={styles.icon}>
            <IPayIcon icon={cardIcon3} size={scaleSize(iconSize)} />
          </IPayView>
        </IPayView>
      )}
    </IPayView>
  );
};

export default IPayComponentHeader;


