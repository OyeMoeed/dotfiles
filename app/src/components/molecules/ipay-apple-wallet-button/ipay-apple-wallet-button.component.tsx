import images from '@app/assets/images';
import { IPayImage, IPayPressable } from '@app/components/atoms';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayAppleWalletButtonStyles from './ipay-apple-wallet-button.styles';

const IPayAppleWalletButton: React.FC = () => {
  const { colors } = useTheme();
  const styles = IPayAppleWalletButtonStyles(colors);
  
  const handleAddToAppleWallet = () => {
    navigate(screenNames.WALLET);
  };

  return (
    <IPayPressable onPress={handleAddToAppleWallet}>
      <IPayImage image={images.addAppleWallet} style={styles.imageStyles} />
    </IPayPressable>
  );
};

export default IPayAppleWalletButton;
