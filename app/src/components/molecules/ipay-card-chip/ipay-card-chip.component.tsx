import { IPayCaption2Text, IPayIcon, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayCardChipProps } from './ipay-card-chip.interface';
import IPayCardChipStyles from './ipay-card-chip.styles';

const IPayCardChip: React.FC<IPayCardChipProps> = ({ data, testID }) => {
  const { colors } = useTheme();
  const styles = IPayCardChipStyles(colors);
  return (
    <IPayView testID={`${testID}-card-chip`} style={styles.container}>
      {data?.map((item, index) => (
        <IPayLinearGradientView
          key={`${item.icon}-${`${index}IPayLinearGradientView`}`}
          gradientColors={colors.appGradient.gradientPrimary40}
          style={styles.frame}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <IPayIcon icon={item.icon} size={22} />
          <IPayCaption2Text text={item.text} style={styles.textColor} />
        </IPayLinearGradientView>
      ))}
    </IPayView>
  );
};

export default IPayCardChip;
