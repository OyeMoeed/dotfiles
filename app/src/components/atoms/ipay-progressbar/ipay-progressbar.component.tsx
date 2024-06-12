import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import IPayView from '../ipay-view/ipay-view.component';
import { ProgressBarProps } from './ipay-progressbar.interface';
import { alertStyles } from './ipay-progressbar.styles';

const IPayProgressBar: React.FC<ProgressBarProps> = ({ colors: gradientColors, testID }) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        const newProgress = prev + 0.01;
        if (newProgress >= 1) {
          clearInterval(interval);
          return 1;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const { colors } = useTheme();

  const styles = alertStyles(colors);

  return (
    <IPayView testID={`${testID}-progressbar`} style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progress, { width: `${currentProgress * 100}%` }]}
      />
    </IPayView>
  );
};

export default IPayProgressBar;
