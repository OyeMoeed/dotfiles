import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayCaption2Text, IPayIcon, IPayImage, IPayPressable, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import colors from '@app/styles/colors.const';
import { isIosOS } from '@app/utilities/constants';
import React from 'react';
import IPayAddAppleWalletProps from './ipay-add-apple-wallet-button.interface';
import addAppleWalletStyles from './ipay-add-apple-wallet-button.styles';

const IPayAddAppleWalletButton: React.FC<IPayAddAppleWalletProps> = ({ onPress, isAdded }) => {
  const localizationText = useLocalization();
  const styles = addAppleWalletStyles(colors);

  if (isIosOS) {
    return (
      <IPayPressable onPress={onPress}>
        {isAdded ? (
          <IPayView style={styles.addedAppleWalletWrapper}>
            <IPayView style={styles.appleWalletTextWrapper}>
              <IPayCaption2Text style={styles.addedText} regular>
                {localizationText.CARDS.ADDED_TO}
              </IPayCaption2Text>
              <IPayCaption2Text regular={false}>{localizationText.CARDS.APPLE_WALLET}</IPayCaption2Text>
            </IPayView>
            <IPayView style={styles.applePay}>
              <IPayIcon icon={icons.apple_pay} size={28} color={colors.natural.natural900} />
            </IPayView>
          </IPayView>
        ) : (
          <IPayImage image={images.appleWallet} style={styles.appleWalletImg} />
        )}
      </IPayPressable>
    );
  }

  return null;
};

export default IPayAddAppleWalletButton;
