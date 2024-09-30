import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayCaption2Text, IPayIcon, IPayImage, IPayPressable, IPayView } from '@app/components/atoms';
import { IAPPLECRYPTOREQ } from '@app/network/services/cards-management/apple-pay-crypto/apple-pay-crypto.interface';
import applePayCrypto from '@app/network/services/cards-management/apple-pay-crypto/apple-pay-crypto.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import { isIosOS } from '@app/utilities/constants';
import React, { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
import IPayAddAppleWalletProps from './ipay-add-apple-wallet-button.interface';
import addAppleWalletStyles from './ipay-add-apple-wallet-button.styles';

const { AppleWallet } = NativeModules;

const IPayAddAppleWalletButton: React.FC<IPayAddAppleWalletProps> = ({ selectedCard }) => {
  const styles = addAppleWalletStyles(colors);
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);
  const [addedSuccessfully, setAddedSuccessfully] = useState<boolean>(false);

  const { cardIndex, cardNumber, linkedName, maskedCardNumber } = selectedCard ?? {};
  const cardSuffix = selectedCard?.cardNumber?.slice(12, 16);
  const { embossingName: linkEmbossingName } = linkedName ?? {};
  const cardholderName = cardNumber || linkEmbossingName;
  const [isEligible, setIsEligible] = useState(false);

  const getCardNetworkName = (): string => {
    if (selectedCard?.cardTypeId === 'IPMC') {
      return 'VisaMadaCo';
    }
    return 'Visa';
  };

  const getCardLocalizedDescription = (): string => {
    // TODO: we need to check what is the value for cashback cards??
    if (true) {
      return 'Alinma mada-VISA Debit Classic';
    }
    return 'Alinma VISA Debit Classic';
  };

  const checkAddedToWallet = async (cardData: any) => {
    let result = false;
    if (isIosOS) {
      const canAddPaymentPass = await AppleWallet.canAddPaymentPass();
      if (canAddPaymentPass) {
        const response = await AppleWallet.eligibilityAddingToWallet(cardData);
        if ((response.Watch === 'False' && response.WatchConnected === 'TRUE') || response.Wallet === 'False') {
          result = true;
        }
      }
    }
    return result;
  };

  const eligibilityCheck = React.useCallback(() => {
    const walletData = [
      {
        cardholderName,
        primaryAccountNumberSuffix: maskedCardNumber,
        localizedDescription: getCardLocalizedDescription(), // DONE
        paymentNetwork: getCardNetworkName(), // DONE
      },
    ];
    checkAddedToWallet(walletData).then((isNotAdded) => {
      setIsEligible(isNotAdded);
    });
  }, [cardholderName, maskedCardNumber]);

  const completeProvisionning = async (body: IAPPLECRYPTOREQ) => {
    const apiResponse = await applePayCrypto(walletNumber as string, body);

    if (apiResponse?.status?.type === 'SUCCESS') {
      const { response } = apiResponse;
      const paymentPassData = {
        wrappedKey: response.wrappedKey,
        encryptedPassData: response.cryptoPass,
        activationData: response.activateCode,
      };
      AppleWallet.completeAddPaymentPass(paymentPassData)
        .then((success: any) => {
          if (!success) {
            throw Error('failed to add to card');
          }
          // eligibilityCheck();
          setAddedSuccessfully(true);
        })
        .catch((e: any) => {
          // eslint-disable-next-line no-console
          console.log(e);
        });
    }
  };

  const setWalletListener = async () => {
    const addToWalletData = {
      cardholderName,
      primaryAccountSuffix: cardSuffix,
      localizedDescription: getCardLocalizedDescription(),
      paymentNetwork: getCardNetworkName(),
      encryptionScheme: 'RSA_V2',
      primaryAccountIdentifier: '',
    };
    AppleWallet.startAddPaymentPass(addToWalletData)
      .then(async (data: any) => {
        const body: IAPPLECRYPTOREQ = {
          deviceInfo: await getDeviceInfo(),
          nonce: data[0],
          nonceSig: data[1],
          certificates: data[2],
          primaryAccountNumberPrefix: selectedCard?.cardNumber.slice(0, 6),
          networkName: getCardNetworkName(),
          cardIndex,
        };
        completeProvisionning(body);
      })
      .catch((e: any) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  useEffect(() => {
    eligibilityCheck();
  }, [eligibilityCheck]);

  if (isIosOS && isEligible) {
    return (
      <IPayPressable onPress={setWalletListener}>
        {addedSuccessfully ? (
          <IPayView style={styles.addedAppleWalletWrapper}>
            <IPayView style={styles.appleWalletTextWrapper}>
              <IPayCaption2Text style={styles.addedText} regular text="CARDS.ADDED_TO" />
              <IPayCaption2Text text="CARDS.APPLE_WALLET" regular={false} />
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
