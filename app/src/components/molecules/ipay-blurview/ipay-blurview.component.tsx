// IPayBlurView.tsx
import { useAppState } from '@app/hooks/use-appstate.hook';
import { BlurView } from '@react-native-community/blur';
import React from 'react';
import IPayBlurViewProps from './ipay-blurview.interface';
import styles from './ipay-blurview.styles';
// Define the ConditionalBlurView component
const IPayBlurView: React.FC<IPayBlurViewProps> = ({
  blurType = 'light',
  blurAmount = 10,
  reducedTransparencyFallbackColor = 'white',
  testID,
}) => {
  const { appState } = useAppState();
  // Only render the BlurView if the app is not active
  if (appState === 'active') {
    return null;
  }

  return (
    <BlurView
      testID={testID}
      style={styles.absolute}
      blurType={blurType}
      blurAmount={blurAmount}
      reducedTransparencyFallbackColor={reducedTransparencyFallbackColor}
    />
  );
};

export default IPayBlurView;
