// ipay-success.interface.ts

import { AnimationObject } from 'lottie-react-native';

export interface IPayCardSuccessProps {
  testID?: string;
  title: string;
  subTitle?: string;
  isAddAppleWallet?: boolean;
  animation?: AnimationObject;
  showPrintCard?: boolean;
  handleGoToCard?: () => void;
  handleHomePress: Function;
  goHomeText: string;
}
