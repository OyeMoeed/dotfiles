import { IPayView } from '@components/atoms';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBarProps } from './ipay-progressbar.interface';
import { styles } from './ipay-progressbar.styles';

const IpayProgressBar: React.FC<ProgressBarProps> = ({ testID, colors, gradientWidth, reverse, showExpired, onComplete }) => {
  const [currentProgress, setCurrentProgress] = useState(reverse ? 1 : 0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        const newProgress = reverse ? prev - 0.01 : prev + 0.01;
        if (reverse ? newProgress <= 0 : newProgress >= 1) {
          clearInterval(interval);
          setIsCompleted(true);
          onComplete && onComplete();
          return reverse ? 0 : 1;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <IPayView
      testID={`${testID}-progressbar`}
      style={[styles.container, showExpired && isCompleted && styles.containerExpired]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.progress,
          styles.expireStyle,
          reverse && styles.reverseStyle,
          { width: gradientWidth },
        ]}
      />
    </IPayView>
  );
};

export default IpayProgressBar;
