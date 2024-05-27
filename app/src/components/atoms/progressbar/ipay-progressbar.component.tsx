import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBarProps } from './ipay-progressbar.interface';
import { styles } from './ipay-progressbar.styles';
import IPayView from '../view/ipay-view.component';

const IPayProgressBar: React.FC<ProgressBarProps> = ({ colors }) => {
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

  return (
    <IPayView style={styles.container}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progress, { width: `${currentProgress * 100}%` }]}
      />
    </IPayView>
  );
};

export default IPayProgressBar;
