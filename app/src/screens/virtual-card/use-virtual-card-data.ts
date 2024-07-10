import icons from '@app/assets/icons';
import images from '@app/assets/images';
import useLocalization from '@app/localization/hooks/localization.hook';
import { CardTypes } from '@app/utilities/enums.util';

const useVirtualCardData = () => {
  const localizationText = useLocalization();

  const TAB_LABELS = [
    localizationText.VIRTUAL_CARD.CLASSIC,
    localizationText.VIRTUAL_CARD.PLATINUM,
    localizationText.VIRTUAL_CARD.SIGNATURE,
  ];
  const CARD_CHIP_DATA = [
    {
      text: localizationText.VIRTUAL_CARD.MADA_PAYMENT,
      icon: icons.mada_frame,
    },
    {
      text: localizationText.VIRTUAL_CARD.APPLE_PAYMENTS,
      icon: icons.ipay_frame,
    },
    {
      text: localizationText.VIRTUAL_CARD.ISSUANCE_FEE,
      icon: icons.tag,
    },
  ];
  const VIRTUAL_CARD_DATA = [
    {
      key: CardTypes.CLASSIC,
      type: localizationText.VIRTUAL_CARD.CLASSIC_DEBIT_CARD,
      description: localizationText.VIRTUAL_CARD.DESCRIPTION,
      backgroundImage: images.classicBackground,
    },
    {
      key: CardTypes.PLATINUM,
      type: localizationText.VIRTUAL_CARD.PLATINUM_CASHBACK_PREPAID_CARD,
      description: localizationText.VIRTUAL_CARD.DESCRIPTION,
      backgroundImage: images.platinumCard,
    },
    {
      key: CardTypes.SIGNATURE,
      type: localizationText.VIRTUAL_CARD.SIGNATURE_PREPAID_CARD,
      description: localizationText.VIRTUAL_CARD.DESCRIPTION,
      backgroundImage: images.signatueCard,
    },
  ];
  const SEGMENT_LABEL = [localizationText.CARD_OPTIONS.CARD_FEATURES, localizationText.CARD_OPTIONS.CARD_FEE];

  return { TAB_LABELS, CARD_CHIP_DATA, VIRTUAL_CARD_DATA, SEGMENT_LABEL };
};

export default useVirtualCardData;
