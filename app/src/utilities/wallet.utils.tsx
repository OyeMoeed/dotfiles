import { IW2WActiveFriends } from '@app/network/services/transfers/wallet-to-wallet-check-active/wallet-to-wallet-check-active.interface';

const isContactHasWallet = (mobile: string, activeFriends: IW2WActiveFriends[]): boolean => {
  const walletNumber = activeFriends?.filter(
    (activeFriend: IW2WActiveFriends) => activeFriend?.mobileNumber === mobile,
  )[0]?.walletNumber;

  return walletNumber != null && walletNumber !== '';
};

export default {
  isContactHasWallet,
};
