import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayHeadlineText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import menuStyles from './menu.style';

const Menu: React.FC = () => {
  const { colors } = useTheme();
  const styles = menuStyles(colors);
  const localizationText = useLocalization();

  const onPressSettings = () => {
    navigate(screenNames.SETTINGS);
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader languageBtn menu />
      <IPayView style={styles.container}>
        <IPayView style={styles.profileHeaderView}>
          <IPayLinearGradientView gradientColors={colors.appGradient.gradientPrimary10} style={styles.profileView}>
            <IPayImage image={images.profile} style={styles.profileImage} />
            <IPayView style={styles.profileTextView}>
              <IPayHeadlineText
                regular={false}
                text="Adam Ahmed"
                color={colors.primary.primary900}
                style={styles.profileNameText}
              />
              <IPayCaption1Text text={localizationText.show_profile} color={colors.natural.natural900} />
            </IPayView>
            <IPayIcon icon={icons.drill_in_icon} size={18} color={colors.primary.primary900} />
          </IPayLinearGradientView>
        </IPayView>
        <IPayPressable onPress={onPressSettings} style={styles.menuItemView}>
          <IPayIcon icon={icons.setting} size={24} color={colors.primary.primary900} />
          <IPaySubHeadlineText
            regular
            text={localizationText.settings}
            style={styles.menuItemText}
            color={colors.primary.primary800}
          />
          <IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary800} />
        </IPayPressable>

        <IPayPressable onPress={() => {}} style={styles.menuItemView}>
          <IPayIcon icon={icons.messageQuestion} size={24} color={colors.primary.primary900} />
          <IPaySubHeadlineText
            regular
            text={localizationText.support_and_help}
            style={styles.menuItemText}
            color={colors.primary.primary800}
          />
          <IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary800} />
        </IPayPressable>

        <IPayPressable onPress={() => {}} style={styles.menuItemView}>
          <IPayIcon icon={icons.cards} size={24} color={colors.primary.primary900} />
          <IPaySubHeadlineText
            regular
            text={localizationText.cards_management}
            style={styles.menuItemText}
            color={colors.primary.primary800}
          />
          <IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary800} />
        </IPayPressable>

        <IPayView style={styles.separatorBar} />

        <IPayPressable onPress={() => {}} style={styles.secondayItemView}>
          <IPayIcon icon={icons.logout} size={24} color={colors.natural.natural700} />
          <IPaySubHeadlineText
            regular
            text={localizationText.delink}
            style={styles.menuItemText}
            color={colors.natural.natural700}
          />
        </IPayPressable>

        <IPayPressable onPress={() => {}} style={styles.secondayItemView}>
          <IPaySubHeadlineText
            regular
            text={localizationText.logout}
            style={styles.menuItemText}
            color={colors.natural.natural700}
          />
        </IPayPressable>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default Menu;
