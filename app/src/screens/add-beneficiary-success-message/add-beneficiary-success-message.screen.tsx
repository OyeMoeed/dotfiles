import images from '@app/assets/images';
import { IPayImage, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPaySuccess, useToastContext } from '@app/components/molecules';
import {
  IPayActionSheet,
  IPayActivateBeneficiary,
  IPayActivationCall,
  IPayBottomSheet,
  IPayReceiveCall,
} from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRoute } from '@react-navigation/core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { buttonVariants, openPhoneNumber } from '@app/utilities';
import { useTranslation } from 'react-i18next';
import ActivateViewTypes from './add-beneficiary-success-message.enum';
import beneficiarySuccessStyles from './add-beneficiary-success-message.style';

const AddBeneficiarySuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showToast } = useToastContext();
  const route = useRoute();
  const styles = beneficiarySuccessStyles(colors);
  const activateBeneficiary = useRef<bottomSheetTypes>(null);
  const [activateHeight, setActivateHeight] = useState(SNAP_POINTS.SMALL);
  const [currentOption, setCurrentOption] = useState<ActivateViewTypes>(ActivateViewTypes.ACTIVATE_OPTIONS);
  const { contactList, guideStepsToCall, guideToReceiveCall } = useConstantData();
  const [showBackground, setShowBackground] = useState(true);

  const handleActivateBeneficiary = useCallback(() => {
    activateBeneficiary?.current?.present();
    setActivateHeight(SNAP_POINTS.SMALL);
    setCurrentOption(ActivateViewTypes.ACTIVATE_OPTIONS);
  }, []);
  const actionSheetRef = useRef<any>(null);
  const [selectedNumber, setSelectedNumber] = useState<string>('');
  const showActionSheet = (phoneNumber: string) => {
    setSelectedNumber(phoneNumber);
    activateBeneficiary?.current?.close();
    setShowBackground(false);
    setTimeout(() => {
      actionSheetRef.current.show();
    }, 500);
  };
  const type = (route?.params as { type: string })?.type || '';
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
        return (
          <IPayActivationCall contactList={contactList} guideStepsToCall={guideStepsToCall} close={showActionSheet} />
        );
      default:
        return <IPayActivateBeneficiary handleReceiveCall={handleReceiveCall} handleCallAlinma={handleCallAlinma} />;
    }
  }, [currentOption]);

  const onPressCall = (value: string) => {
    openPhoneNumber({ phoneNumber: value, colors, showToast });
  };

  const hideContactUs = () => {
    setShowBackground(true);
    setTimeout(() => {
      actionSheetRef.current.hide();
    }, 0);
  };

  const handleFinalAction = useCallback((index: number, value: string) => {
    switch (index) {
      case 0:
        onPressCall(value);
        break;
      case 1:
        hideContactUs();
        break;
      default:
        break;
    }
  }, []);
  const handlePageNavigation = () => {
    navigate(
      type === ScreenNames.INTERNATIONAL_TRANSFER || type === ScreenNames.EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER
        ? ScreenNames.INTERNATIONAL_TRANSFER
        : ScreenNames.LOCAL_TRANSFER,
    );
  };

  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientSecondary40}>
      {showBackground ? (
        <>
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
                  headingText={
                    type === ScreenNames.EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER
                      ? 'NEW_BENEFICIARY.BENEFECIARY_UPDATED'
                      : 'NEW_BENEFICIARY.BENEFICIARY_ADDED_SUCCESSFULLY'
                  }
                  descriptionText={
                    type === ScreenNames.EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER
                      ? 'NEW_BENEFICIARY.NOW_MAKE_TRANSFER'
                      : 'NEW_BENEFICIARY.YOU_NEED_ACTIVATE_BENEFICIARY'
                  }
                />
                <IPayView style={styles.buttonWrapper}>
                  <IPayButton
                    btnType={buttonVariants.PRIMARY}
                    btnText="NEW_BENEFICIARY.ACTIVATE_BENEFICIARY"
                    medium
                    btnIconsDisabled
                    onPress={handleActivateBeneficiary}
                  />
                  <IPayButton
                    btnType={buttonVariants.OUTLINED}
                    btnText={
                      type === ScreenNames.INTERNATIONAL_TRANSFER ||
                      type === ScreenNames.EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER
                        ? 'NEW_BENEFICIARY.INTERNATIONAL_TRANSFER_PAGE'
                        : 'NEW_BENEFICIARY.LOCAL_TRANSFER_PAGE'
                    }
                    medium
                    btnIconsDisabled
                    onPress={handlePageNavigation}
                  />
                </IPayView>
              </IPayLinearGradientView>
            </IPayView>
          </IPayView>
        </>
      ) : (
        <IPayView />
      )}
      <IPayBottomSheet
        heading={
          currentOption === ActivateViewTypes.ACTIVATE_OPTIONS
            ? 'ACTIVATE_BENEFICIARY.ACTIVATE_OPTIONS'
            : 'ACTIVATE_BENEFICIARY.CALL_TO_ACTIVATE'
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
      <IPayActionSheet
        ref={actionSheetRef}
        options={[`${t('MENU.CALL')} ${selectedNumber}`, t('COMMON.CANCEL')]}
        cancelButtonIndex={1}
        showCancel
        onPress={(index) => handleFinalAction(index, selectedNumber)}
        bodyStyle={styles.bodyStyle}
      />
    </IPaySafeAreaView>
  );
};

export default AddBeneficiarySuccessScreen;
