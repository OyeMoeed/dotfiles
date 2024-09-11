import images from '@app/assets/images';
import { IPayImage, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPaySuccess } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import beneficiaryAcivationStyles from './activate-beneficiary-success.style';

const ActivateBeneficiarySuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = beneficiaryAcivationStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientSecondary40}>
      <IPayHeader centerIcon={<IPayImage image={images.logoSmall} style={styles.logoStyles} />} />
      <IPayView style={styles.container}>
        <IPayView style={styles.linearGradientView}>
          <IPayLinearGradientView
            style={styles.innerLinearGradientView}
            gradientColors={[colors.backgrounds.successBackground, colors.backgrounds.successBackground]}
          >
            <IPaySuccess
              testID="ipay-success"
              headingStyle={styles.headingStyle}
              descriptionStyle={styles.descriptionStyle}
              headingText={'ACTIVATE_BENEFICIARY.BENEFECIARY_ACTIVATED'}
              descriptionText={'ACTIVATE_BENEFICIARY.NOW_YOU_CAN_TRANSFER'}
            />
            <IPayView style={styles.buttonWrapper}>
              <IPayButton btnType="primary" btnText={'ACTIVATE_BENEFICIARY.MAKE_A_TRANSFER'} medium btnIconsDisabled />
              <IPayButton
                btnType="outline"
                btnText={'NEW_BENEFICIARY.LOCAL_TRANSFER_PAGE'}
                medium
                btnIconsDisabled
                onPress={() => navigate(ScreenNames.LOCAL_TRANSFER)}
              />
            </IPayView>
          </IPayLinearGradientView>
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default ActivateBeneficiarySuccessScreen;
