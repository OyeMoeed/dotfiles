import images from '@app/assets/images';
import { IPayImage, IPayPressable } from '@app/components/atoms';
import React from 'react';
import IPayAppleWalletButtonProps from './ipay-apple-wallet-button.interface';
import appleWalletButtonStyles from './ipay-apple-wallet-button.styles';

const IPayAppleWalletButton: React.FC<IPayAppleWalletButtonProps> = ({ testID, onPress }) => {
  const styles = appleWalletButtonStyles();

  return (
    <IPayPressable testID={`${testID}-apple-wallet-button`} onPress={onPress}>
      <IPayImage image={images.addAppleWallet} style={styles.imageStyles} />
    </IPayPressable>
  );
};

export default IPayAppleWalletButton;
