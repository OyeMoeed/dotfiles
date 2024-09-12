import icons from '@app/assets/icons';
import images from '@app/assets/images';
import useLocalization from '@app/localization/hooks/localization.hook';
import { CardTypes } from '@app/utilities/enums.util';
import { useTranslation } from 'react-i18next';

const useVirtualCardData = () => {
  const { t } = useTranslation();
  const localizationText = useLocalization();

  const TAB_LABELS = [
    localizationText.VIRTUAL_CARD.CLASSIC,
    localizationText.VIRTUAL_CARD.PLATINUM,
    localizationText.VIRTUAL_CARD.SIGNATURE,
  ];
  const CARD_CHIP_DATA = {
    [CardTypes.CLASSIC]: [
      {
        text: t('VIRTUAL_CARD.MADA_PAYMENT'),
        icon: icons.mada_frame,
      },
      {
        text: t('VIRTUAL_CARD.APPLE_PAYMENTS'),
        icon: icons.ipay_frame,
      },
      {
        text: t('VIRTUAL_CARD.ISSUANCE_FREE'),
        icon: icons.tag,
      },
    ],
    [CardTypes.DEBIT_CARD]: [
      {
        text: t('VIRTUAL_CARD.MADA_PAYMENT'),
        icon: icons.mada_frame,
      },
      {
        text: t('VIRTUAL_CARD.APPLE_PAYMENTS'),
        icon: icons.ipay_frame,
      },
      {
        text: t('VIRTUAL_CARD.ISSUANCE_FREE'),
        icon: icons.tag,
      },
    ],
    [CardTypes.PLATINUM]: [
      {
        text: t('VIRTUAL_CARD.LOUNGE_ACCESS'),
        icon: icons.airplaneSquare1,
      },
      {
        text: t('VIRTUAL_CARD.APPLE_PAYMENTS'),
        icon: icons.ipay_frame,
      },
      {
        text: t('VIRTUAL_CARD.CASH_BACK'),
        icon: icons.discountShape1,
      },
    ],
    [CardTypes.PLATINUIM_CARD]: [
      {
        text: t('VIRTUAL_CARD.LOUNGE_ACCESS'),
        icon: icons.airplaneSquare1,
      },
      {
        text: t('VIRTUAL_CARD.APPLE_PAYMENTS'),
        icon: icons.ipay_frame,
      },
      {
        text: t('VIRTUAL_CARD.CASH_BACK'),
        icon: icons.discountShape1,
      },
    ],
    [CardTypes.SIGNATURE]: [
      {
        text: t('VIRTUAL_CARD.LOUNGE_ACCESS'),
        icon: icons.airplaneSquare1,
      },
      {
        text: t('VIRTUAL_CARD.APPLE_PAYMENTS'),
        icon: icons.ipay_frame,
      },
      {
        text: t('VIRTUAL_CARD.CASH_BACK'),
        icon: icons.discountShape1,
      },
    ],
    [CardTypes.SIGNATURE_CARD]: [
      {
        text: t('VIRTUAL_CARD.LOUNGE_ACCESS'),
        icon: icons.airplaneSquare1,
      },
      {
        text: t('VIRTUAL_CARD.APPLE_PAYMENTS'),
        icon: icons.ipay_frame,
      },
      {
        text: t('VIRTUAL_CARD.CASH_BACK'),
        icon: icons.discountShape1,
      },
    ],
  };
  const VIRTUAL_CARD_DATA = [
    {
      key: CardTypes.CLASSIC,
      type: t('VIRTUAL_CARD.CLASSIC_DEBIT_CARD'),
      description: t('VIRTUAL_CARD.MADA_DETAILS'),
      backgroundImage: images.classicBackground,
    },
    {
      key: CardTypes.PLATINUM,
      type: t('VIRTUAL_CARD.PLATINUM_CASHBACK_PREPAID_CARD'),
      description: t('VIRTUAL_CARD.SIGNATURE_DETAILS'),
      backgroundImage: images.platinumCard,
    },
    {
      key: CardTypes.SIGNATURE,
      type: t('VIRTUAL_CARD.SIGNATURE_PREPAID_CARD'),
      description: t('VIRTUAL_CARD.SIGNATURE_DETAILS'),
      backgroundImage: images.signatueCard,
    },
  ];
  const SEGMENT_LABEL = [localizationText.CARD_OPTIONS.CARD_FEATURES, localizationText.CARD_OPTIONS.CARD_FEE];

  return { TAB_LABELS, CARD_CHIP_DATA, VIRTUAL_CARD_DATA, SEGMENT_LABEL };
};

export default useVirtualCardData;
