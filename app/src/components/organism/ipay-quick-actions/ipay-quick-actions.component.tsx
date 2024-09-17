import React, { useEffect, useState } from 'react';
import { IPayImage, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, PayChannel } from '@app/utilities/enums.util';
import { useTranslation } from 'react-i18next';
import images from '@app/assets/images';
import IPayQuickActionsProps from './ipay-quick-actions.interface';
import iPayQuickActionsStyles from './ipay-quick-actions.styles';

const IPayQuickActions: React.FC<IPayQuickActionsProps> = ({
  payChannelType,
  setTopUpAmount,
  monthlyRemainingOutgoingAmount,
  onSelectCard,
  channel,
}) => {
  const { colors } = useTheme();
  const topupCards = [
    { value: 'visa', text: 'Visa', image: images.visa },
    { value: 'mada', text: 'Mada', image: images.mada },
    { value: 'master', text: 'Master', image: images.master },
  ];
  const [selectedVisaItem, setSelectedVisaItem] = useState<string>();
  const handleTopUp = (text: number) => {
    const newAmount = text;
    setTopUpAmount?.(newAmount.toString());
  };
  const handleSelectCard = (selectedId: string) => {
    if (onSelectCard) onSelectCard(selectedId);
    setSelectedVisaItem(selectedId);
  };
  useEffect(() => {
    handleSelectCard(topupCards[0]?.value);
  }, []);

  const styles = iPayQuickActionsStyles(colors);
  const { t } = useTranslation();
  const quickAmounts = payChannelType === PayChannel.ATM ? constants.QUICK_AMOUNT_ATM : constants.QUICK_AMOUNT_CARD;

  return (
    <>
      {payChannelType === PayChannel.CARD && channel === PayChannel.CARD && (
        <IPayView style={styles.cardsTypesContainer}>
          {topupCards.map((item, index) => (
            <IPayPressable
              onPress={() => {
                handleSelectCard(item.value);
              }}
              key={`${`${index}IPayButton`}`}
            >
              <IPayView
                style={[
                  styles.visaImageContainer,
                  selectedVisaItem === item.value ? styles.selectedCardContainer : null,
                ]}
              >
                <IPayImage image={item.image} style={styles.visaImage} />
              </IPayView>
            </IPayPressable>
          ))}
        </IPayView>
      )}
      <IPayView style={styles.buttonContainer}>
        {quickAmounts.map((amountItem, index) => (
          <IPayButton
            key={`${`${index}IPayButton`}`}
            btnText={`${amountItem.text} ${t('COMMON.SAR')}`}
            btnType={buttonVariants.PRIMARY}
            btnIconsDisabled
            btnStyle={[
              styles.buttonBg,
              {
                backgroundColor:
                  monthlyRemainingOutgoingAmount === '0' ? colors.natural.natural200 : colors.secondary.secondary100,
              },
            ]}
            textColor={colors.secondary.secondary800}
            onPress={() => handleTopUp(amountItem.value)}
            disabled={monthlyRemainingOutgoingAmount === '0'}
          />
        ))}
      </IPayView>
    </>
  );
};
export default IPayQuickActions;
