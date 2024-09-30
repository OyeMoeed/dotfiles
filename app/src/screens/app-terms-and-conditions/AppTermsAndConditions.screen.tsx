import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import { setTermsConditionsVisibility } from '@app/store/slices/bottom-sheets-slice';
import useTheme from '@app/styles/hooks/theme.hook';
import { useDispatch } from 'react-redux';
import termsStyles from './AppTermsAndConditions.styles';

const AppTermsAndConditions = () => {
  const { colors } = useTheme();
  const styles = termsStyles(colors);
  const dispatch = useDispatch();

  const onTermsAndConditionsPress = (termsType: 'registration' | 'cards') => {
    dispatch(
      setTermsConditionsVisibility({
        isVisible: true,
        isVirtualCardTermsAndConditions: termsType === 'cards',
      }),
    );
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        backBtn
        title="COMMON.TERMS_AND_CONDITIONS"
        applyFlex
        titleStyle={styles.headerTitle}
        containerStyle={styles.header}
      />

      <IPayPressable onPress={() => onTermsAndConditionsPress('registration')} style={styles.menuItemView}>
        <IPayView style={styles.iconWrapper}>
          <IPayIcon icon={icons.wallet_add_11} size={28} color={colors.primary.primary500} />
        </IPayView>

        <IPayView style={styles.menuItemTextWrapper}>
          <IPaySubHeadlineText
            regular
            text="COMMON.TERMS_AND_CONDITIONS"
            style={styles.menuItemText}
            color={colors.primary.primary900}
          />
          <IPaySubHeadlineText
            text="COMMON.FOR_OPENING_NEW_WALLET"
            style={styles.menuItemText}
            color={colors.primary.primary900}
          />
        </IPayView>

        <IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary500} />
      </IPayPressable>

      <IPayPressable onPress={() => onTermsAndConditionsPress('cards')} style={styles.menuItemView}>
        <IPayView style={styles.iconWrapper}>
          <IPayIcon icon={icons.card_tick11} size={28} color={colors.primary.primary500} />
        </IPayView>

        <IPayView style={styles.menuItemTextWrapper}>
          <IPaySubHeadlineText
            regular
            text="COMMON.TERMS_AND_CONDITIONS"
            style={styles.menuItemText}
            color={colors.primary.primary900}
          />
          <IPaySubHeadlineText
            text="COMMON.FOR_ALINMAPAY_CARDS"
            style={styles.menuItemText}
            color={colors.primary.primary900}
          />
        </IPayView>

        <IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary500} />
      </IPayPressable>
    </IPaySafeAreaView>
  );
};

export default AppTermsAndConditions;
