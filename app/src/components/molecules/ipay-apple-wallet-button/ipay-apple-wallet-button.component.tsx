import images from '@app/assets/images';
import { IPayImage, IPayPressable } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayAppleWalletButtonProps from './ipay-apple-wallet-button.interface';
import appleWalletButtonStyles from './ipay-apple-wallet-button.styles';

const IPayAppleWalletButton: React.FC<IPayAppleWalletButtonProps> = ({ testID, onPress }) => {
  const { colors } = useTheme();
  const styles = appleWalletButtonStyles(colors);

  return (
    <IPayPressable testID={`${testID}-apple-wallet-button`} onPress={onPress}>
      <IPayImage image={images.addAppleWallet} style={styles.imageStyles} />
    </IPayPressable>
  );
};

export default IPayAppleWalletButton;
