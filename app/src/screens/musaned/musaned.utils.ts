import i18n from '@app/localization/i18n.localization';
import colors from '@app/styles/colors.const';
import { MusanedStatus } from '@app/utilities';
import { shareOptions } from '@app/utilities/shared.util';
import Share from 'react-native-share';

// this function should change the color of the status of the gift
const getStatusStyles = (theme: typeof colors, status: MusanedStatus = MusanedStatus.UNPAIED) => {
  switch (status) {
    case MusanedStatus.UNPAIED:
      return {
        color: theme.natural.natural700,
        text: 'MUSANED.UNPAID',
        backgroundColor: theme.natural.natural100,
        type: MusanedStatus.UNPAIED,
      };
    case MusanedStatus.PAID:
      return {
        color: theme.tertiary.tertiary500,
        text: 'MUSANED.PAID',
        backgroundColor: theme.success.success25,
        type: MusanedStatus.PAID,
      };
    default:
      return {
        color: theme.natural.natural700,
        text: 'MUSANED.UNPAID',
        backgroundColor: theme.natural.natural100,
        type: MusanedStatus.UNPAIED,
      };
  }
};

const getShareableMessage = i18n.t('MUSANED.INVITE_LABORER');

const bottomSheetShare = async (mobileNumber: string) => {
  const otherOptions = {
    subject: 'Wa',
    message: getShareableMessage,
    title: i18n.t('MUSANED.HEADER'),
    social: Share.Social.WHATSAPP,
    whatsAppNumber: mobileNumber,
  };

  Share.open(shareOptions(getShareableMessage, otherOptions))
    .then(() => {})
    .catch(() => {});
};

export { getStatusStyles, bottomSheetShare };
