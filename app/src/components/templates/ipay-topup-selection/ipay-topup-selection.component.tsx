import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { payChannel } from '@app/utilities/enums.util';
import { forwardRef } from 'react';
import { IPayTopUpSelectionProps } from './ipay-topup-selection.interface';
import ipayTopupSelectionStyles from './ipay-topup-selection.styles';

const IPayTopUpSelection = forwardRef<{}, IPayTopUpSelectionProps>(({ testID, closeBottomSheet }, ref) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = ipayTopupSelectionStyles(colors);

  // Define topUpTypes within the component
  const topUpTypes = [
    {
      key: 1,
      rightIcon: icons.apple_pay,

      text: localizationText.TOP_UP.APPLE_PAY,
      iconColor: colors.primary.primary900,
      leftIcon: icons.right_greater_icon,
      navigateTo: screenNames.TOP_UP,
      payVariant: payChannel.APPLE,
    },
    {
      key: 2,
      rightIcon: icons.cards,
      text: localizationText.TOP_UP.CARD_TITLE,

      leftIcon: icons.right_greater_icon,
      iconColor: colors.primary.primary900,
      navigateTo: screenNames.TOP_UP,
      payVariant: payChannel.CARD,
    },
    {
      key: 3,
      rightIcon: icons.bank,
      text: localizationText.TOP_UP.BANK_TRANSFER_TO_MY_WALLET,

      leftIcon: icons.right_greater_icon,
      iconColor: colors.primary.primary900,
      navigateTo: screenNames.TOP_UP_IBAN,
    },
    {
      key: 4,
      rightIcon: icons.akhtar,
      text: localizationText.TOP_UP.AKHTR,
      leftIcon: icons.right_greater_icon,

      navigateTo: screenNames.POINTS_REDEMPTIONS,
      payVariant: payChannel.AKHTAR,
    },
    // Add more top-up types as needed
  ];

  // Function to handle navigation
  const handleNavigation = (navigateTo, payVariant) => {
    navigate(navigateTo, { variant: payVariant });
    if (closeBottomSheet) {
      closeBottomSheet();
    }
  };

  // Render function for the FlatList items
  const renderItem = ({ item }) => (
    <IPayView style={styles.itemContainer}>
      <IPayPressable onPress={() => handleNavigation(item.navigateTo, item.payVariant)} style={styles.cardContainer}>
        <IPayView style={styles.itemContent}>
          <IPayIcon icon={item.rightIcon} size={24} color={item.iconColor} />
          <IPayFootnoteText text={item.text} style={styles.itemText} />
        </IPayView>
        <IPayIcon icon={item.leftIcon} size={18} color={colors.primary.primary500} />
      </IPayPressable>
    </IPayView>
  );

  return (
    <IPayView ref={ref} testID={testID}>
      <IPayFlatlist
        data={topUpTypes}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()} // Ensure unique keys
        style={styles.flatlist}
      />
    </IPayView>
  );
});

export default IPayTopUpSelection;