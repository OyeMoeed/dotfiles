import images from '@app/assets/images';
import { IPayImage, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPaySuccess } from '@app/components/molecules';
import {
  IPayActivateBeneficiary,
  IPayActivationCall,
  IPayBottomSheet,
  IPayReceiveCall,
} from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ActivateViewTypes } from './add-beneficiary-success-message.enum';
import beneficiarySuccessStyles from './add-beneficiary-success-message.style';

const AddBeneficiarySuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = beneficiarySuccessStyles(colors);
  const localizationText = useLocalization();
  const activateBeneficiary = useRef<bottomSheetTypes>(null);
  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];
  const [activateHeight, setActivateHeight] = useState(SNAP_POINTS.SMALL);
  const [currentOption, setCurrentOption] = useState<ActivateViewTypes>(ActivateViewTypes.ACTIVATE_OPTIONS);
  const { contactList, guideStepsToCall, guideToReceiveCall } = useConstantData();
  const handleActivateBeneficiary = useCallback(() => {
    activateBeneficiary?.current?.present();
    setActivateHeight(SNAP_POINTS.SMALL);
    setCurrentOption(ActivateViewTypes.ACTIVATE_OPTIONS);
  }, []);

  const closeActivateBeneficiary = useCallback(() => {
    activateBeneficiary?.current?.close();
  }, []);

  const handleReceiveCall = useCallback(() => {
    setActivateHeight(SNAP_POINTS.LARGE);
    setCurrentOption(ActivateViewTypes.RECEIVE_CALL);
  }, []);

  const handleCallAlinma = useCallback(() => {
    setActivateHeight(SNAP_POINTS.LARGE);
    setCurrentOption(ActivateViewTypes.CALL_ALINMA);
  }, []);

  const renderCurrentOption = useMemo(() => {
    switch (currentOption) {
      case ActivateViewTypes.RECEIVE_CALL:
        return <IPayReceiveCall guideToReceiveCall={guideToReceiveCall} />;
      case ActivateViewTypes.CALL_ALINMA:
        return <IPayActivationCall contactList={contactList} guideStepsToCall={guideStepsToCall} />;
      default:
        return <IPayActivateBeneficiary handleReceiveCall={handleReceiveCall} handleCallAlinma={handleCallAlinma} />;
    }
  }, [currentOption]);

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
                medium
                btnIconsDisabled
                onPress={handleActivateBeneficiary}
              />
              <IPayButton
                btnType="outline"
                btnText={localizationText.NEW_BENEFICIARY.LOCAL_TRANSFER_PAGE}
                medium   
                btnIconsDisabled
                onPress={() => navigate(ScreenNames.LOCAL_TRANSFER)}
              />
            </IPayView>
          </IPayLinearGradientView>
        </IPayView>
      </IPayView>
      <IPayBottomSheet
        heading={
          currentOption === ActivateViewTypes.ACTIVATE_OPTIONS
            ? localizationText.ACTIVATE_BENEFICIARY.ACTIVATE_OPTIONS
            : localizationText.ACTIVATE_BENEFICIARY.CALL_TO_ACTIVATE
        }
        onCloseBottomSheet={closeActivateBeneficiary}
        customSnapPoint={activateHeight}
        ref={activateBeneficiary}
        simpleHeader
        simpleBar
        bold
        cancelBnt
      >
        <IPayView style={styles.sheetContainerStyles}>{renderCurrentOption}</IPayView>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default AddBeneficiarySuccessScreen;
