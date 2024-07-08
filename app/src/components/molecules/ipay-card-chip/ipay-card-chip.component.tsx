import { IPayCaption2Text, IPayIcon, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayCardChipProps } from './ipay-card-chip.interface';
import IPayCardChipStyles from './ipay-card-chip.styles';

const IPayCardChip: React.FC<IPayCardChipProps> = ({ data }) => {
  const { colors } = useTheme();
  const styles = IPayCardChipStyles(colors);
  return (
    <IPayView style={styles.container}>
      {data.map((item, index) => (
        <IPayLinearGradientView
          key={index}
          gradientColors={['rgba(202, 167, 255, 0.08)', 'rgba(0, 186, 254, 0.08)']}
          style={styles.frame}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <IPayIcon icon={item.icon} size={20} />
          <IPayCaption2Text text={item.text} />
        </IPayLinearGradientView>
      ))}
    </IPayView>
  );
};

export default IPayCardChip;
