import images from '@app/assets/images';
import { IPayImage, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPaySuccess } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import beneficiarySuccessStyles from './add-beneficiary-success-message.style';

const AddBeneficiarySuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = beneficiarySuccessStyles();
  const localizationText = useLocalization();

  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

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
              textGradientColors={gradientColors}
              headingText={localizationText.NEW_BENEFICIARY.BENEFICIARY_ADDED_SUCCESSFULLY}
              descriptionText={localizationText.NEW_BENEFICIARY.YOU_NEED_ACTIVATE_BENEFICIARY}
            />
            <IPayView style={styles.buttonWrapper}>
              <IPayButton
                btnType="primary"
                btnText={localizationText.NEW_BENEFICIARY.ACTIVATE_BENEFICIARY}
                small
                btnStyle={styles.btnStyle}
                btnIconsDisabled
              />
              <IPayButton
                btnType="outline"
                btnText={localizationText.NEW_BENEFICIARY.LOCAL_TRANSFER_PAGE}
                small
                btnStyle={styles.btnStyle}
                btnIconsDisabled
                onPress={() => navigate(ScreenNames.LOCAL_TRANSFER, {})}
              />
            </IPayView>
          </IPayLinearGradientView>
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default AddBeneficiarySuccessScreen;
