import images from '@app/assets/images';
import { delinkAnimation } from '@app/assets/lottie';
import {
  IPayFootnoteText,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientText, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack, navigateAndReset } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setAppData } from '@app/store/slices/app-data-slice';
import useTheme from '@app/styles/hooks/theme.hook';
import { setAuth } from '@store/slices/auth-slice';
import { useTypedDispatch } from '@store/store';
import genratedStyles from './delink-success.style';

const DelinkSuccess: React.FC = ({ route }: any) => {
  const paramsData = route.params;
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const localizationText = useLocalization();
  const dispatch = useTypedDispatch();

  const handleDonePress = () => {
    if (paramsData && paramsData?.menuOptions) {
      dispatch(setAppData({ isLinkedDevice: false, isFirstTime: false }));
      goBack();
    } else {
      dispatch(setAuth(false));
      dispatch(setAppData({ isLinkedDevice: false, isFirstTime: false, isAuthenticated: false, hideBalance: false }));
      navigateAndReset(screenNames.MOBILE_IQAMA_VERIFICATION);
    }
  };

  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientSecondary40}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} />
      <IPayView style={styles.container}>
        <IPayView style={styles.linearGradientView}>
          <IPayLinearGradientView
            style={[styles.innerLinearGradientView]}
            gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
          >
            <IPayLottieAnimation source={delinkAnimation} style={styles.successIcon} />
            <IPayView style={styles.linearGradientTextView}>
              <IPayGradientText
                text={localizationText.successfully_delink}
                gradientColors={colors.gradientPrimary}
                fontSize={styles.linearGradientText.fontSize}
                fontFamily={styles.linearGradientText.fontFamily}
                style={styles.gradientTextSvg}
                yScale={17.5}
              />
            </IPayView>
            <IPayFootnoteText regular color={colors.primary.primary800} text={localizationText.need_login} />
            <IPayButton
              btnType="primary"
              btnText={localizationText.done}
              large
              btnStyle={styles.btnStyle}
              btnIconsDisabled
              onPress={handleDonePress}
            />
          </IPayLinearGradientView>
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default DelinkSuccess;
