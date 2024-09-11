import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import CardDetailsKeys from '@app/enums/card-details-type.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import React from 'react';
import { cardDetailsProps, FieldKeyMappingProps } from './ipay-card-details.interface';
import cardDetailsStyle from './ipay-card-details.style';

const IPayCardDetails: React.FC<cardDetailsProps> = ({cardDetails}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = cardDetailsStyle(colors);
  const { showToast } = useToastContext();

  const renderToast = (value: string) => {
    showToast({
      title: localizationText.TOP_UP.COPIED,
      subTitle: value,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      toastType: 'success',
    });
  };

  const dummyCardDetails: FieldKeyMappingProps = {
    [CardDetailsKeys.CARD_NUMBER]: cardDetails?.cardNumber,
    [CardDetailsKeys.CARD_HOLDER_NAME]: cardDetails?.cardHolderName,
    [CardDetailsKeys.CVV]: cardDetails?.cvv,
    [CardDetailsKeys.EXPIRY_DATE]: cardDetails?.expiryDate,
  };

  const fieldKeyMapping: FieldKeyMappingProps = {
    [CardDetailsKeys.CARD_NUMBER]: localizationText.CARDS[CardDetailsKeys.CARD_NUMBER],
    [CardDetailsKeys.CARD_HOLDER_NAME]: localizationText.CARDS[CardDetailsKeys.CARD_HOLDER_NAME],
    [CardDetailsKeys.CVV]: localizationText.CARDS[CardDetailsKeys.CVV],
    [CardDetailsKeys.EXPIRY_DATE]: localizationText.CARDS[CardDetailsKeys.EXPIRY_DATE],
  };

  const copyRefNo = (value: string) => {
    copyText(value);
    renderToast(value);
  };

  const renderItem = (field: string) => (
    <IPayView style={styles.cardStyle}>
      <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
        {fieldKeyMapping[field]}
      </IPayFootnoteText>
      <IPayView style={styles.actionWrapper}>
        <IPaySubHeadlineText regular color={colors.primary.primary800}>
          {dummyCardDetails[field]}
        </IPaySubHeadlineText>
        {(field === CardDetailsKeys.CARD_NUMBER || field === CardDetailsKeys.CARD_HOLDER_NAME) && (
          <IPayPressable onPress={() => copyRefNo(dummyCardDetails[field])}>
            <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />
          </IPayPressable>
        )}
      </IPayView>
    </IPayView>
  );

  return <IPayView testID="copy-button">{Object.keys(dummyCardDetails).map(renderItem)}</IPayView>;
};

export default IPayCardDetails;
