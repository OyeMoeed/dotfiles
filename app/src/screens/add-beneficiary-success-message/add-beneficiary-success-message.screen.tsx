import images from '@app/assets/images';
import { IPayImage, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPaySuccess, useToastContext } from '@app/components/molecules';
import {
  IPayActionSheet,
  IPayActivateBeneficiary,
  IPayActivationCall,
  IPayReceiveCall,
} from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { navigateAndReset } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, openPhoneNumber } from '@app/utilities';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { RouteProp, useRoute } from '@react-navigation/core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  activateInternationalBeneficiary,
  ActivationMethods,
} from '@app/network/services/international-transfer/activate-international-beneficiary';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { ImageStyle } from 'react-native';
import ActivateViewTypes from './add-beneficiary-success-message.enum';
import beneficiarySuccessStyles from './add-beneficiary-success-message.style';

const AddBeneficiarySuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showToast } = useToastContext();
  const route = useRoute<RouteProp<{ params: { beneficiaryCode?: string } }>>();
  const styles = beneficiarySuccessStyles(colors);
  const activateBeneficiary = useRef<bottomSheetTypes>(null);
  const [currentOption, setCurrentOption] = useState<ActivateViewTypes>(ActivateViewTypes.ACTIVATE_OPTIONS);
  const { contactList, guideStepsToCall, guideToReceiveCall } = useConstantData();
  const [showBackground, setShowBackground] = useState(true);

  const handleActivateBeneficiary = useCallback(() => {
    activateBeneficiary?.current?.present();
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
  const isInternationalEdit = type === ScreenNames.EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER;

  const closeActivateBeneficiary = useCallback(() => {
    activateBeneficiary?.current?.close();
  }, []);

  const handleReceiveCall = useCallback(() => {
    setCurrentOption(ActivateViewTypes.RECEIVE_CALL);
  }, []);

  const handleCallAlinma = useCallback(() => {
    setCurrentOption(ActivateViewTypes.CALL_ALINMA);
  }, []);

  const activateBen = useCallback(
    async (activationMethod: ActivationMethods) => {
      try {
        if (route?.params?.beneficiaryCode) {
          const apiResponse = await activateInternationalBeneficiary({
            beneficiaryCode: route?.params?.beneficiaryCode,
            activationMethod,
          });
          if (!apiResponse?.successfulResponse) {
            setCurrentOption(ActivateViewTypes.ACTIVATE_OPTIONS);
          }
        }
      } catch {
        setCurrentOption(ActivateViewTypes.ACTIVATE_OPTIONS);
        /* empty */
      }
    },
    [route?.params?.beneficiaryCode],
  );

  const hanldePageNavigation = () => {
    navigateAndReset(ScreenNames.HOME_BASE, {
      screen:
        type === ScreenNames.INTERNATIONAL_TRANSFER || type === ScreenNames.EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER
          ? ScreenNames.INTERNATIONAL_TRANSFER
          : ScreenNames.LOCAL_TRANSFER,
    });
  };

  const renderCurrentOption = useMemo(() => {
    switch (currentOption) {
      case ActivateViewTypes.RECEIVE_CALL:
        return (
          <IPayReceiveCall
            activateInternationalBeneficiary={activateBen}
            guideToReceiveCall={guideToReceiveCall}
            makeTransfer
            hanldePageNavigation={hanldePageNavigation}
          />
        );
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
    activateBen(ActivationMethods.IVR);
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
    navigateAndReset(ScreenNames.HOME_BASE, {
      screen:
        type === ScreenNames.INTERNATIONAL_TRANSFER || isInternationalEdit
          ? ScreenNames.INTERNATIONAL_TRANSFER
          : ScreenNames.LOCAL_TRANSFER,
    });
  };

  return (
    <>
      <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientSecondary40}>
        {showBackground ? (
          <>
            <IPayHeader centerIcon={<IPayImage image={images.logoSmall} style={styles.logoStyles as ImageStyle} />} />
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
                      isInternationalEdit
                        ? 'NEW_BENEFICIARY.BENEFECIARY_UPDATED'
                        : 'NEW_BENEFICIARY.BENEFICIARY_ADDED_SUCCESSFULLY'
                    }
                    descriptionText={
                      isInternationalEdit
                        ? 'NEW_BENEFICIARY.NOW_MAKE_TRANSFER'
                        : 'NEW_BENEFICIARY.YOU_NEED_ACTIVATE_BENEFICIARY'
                    }
                  />
                  <IPayView style={styles.buttonWrapper}>
                    {!isInternationalEdit && (
                      <IPayButton
                        btnType={buttonVariants.PRIMARY}
                        btnText="NEW_BENEFICIARY.ACTIVATE_BENEFICIARY"
                        medium
                        btnIconsDisabled
                        onPress={handleActivateBeneficiary}
                      />
                    )}
                    <IPayButton
                      btnType={isInternationalEdit ? buttonVariants.PRIMARY : buttonVariants.OUTLINED}
                      btnText={
                        type === ScreenNames.INTERNATIONAL_TRANSFER || isInternationalEdit
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
      </IPaySafeAreaView>
      <IPayPortalBottomSheet
        heading={
          currentOption === ActivateViewTypes.ACTIVATE_OPTIONS
            ? 'ACTIVATE_BENEFICIARY.ACTIVATE_OPTIONS'
            : 'ACTIVATE_BENEFICIARY.CALL_TO_ACTIVATE'
        }
        onCloseBottomSheet={closeActivateBeneficiary}
        ref={activateBeneficiary}
        enableDynamicSizing
        simpleHeader
        simpleBar
        bold
        cancelBnt
        overrideContainerStyle={styles.portalSheet}
      >
        <IPayView style={styles.sheetContainerStyles}>{renderCurrentOption}</IPayView>
      </IPayPortalBottomSheet>
      <IPayActionSheet
        ref={actionSheetRef}
        options={[`${t('MENU.CALL')} ${selectedNumber}`, t('COMMON.CANCEL')]}
        cancelButtonIndex={1}
        showCancel
        onPress={(index) => handleFinalAction(index, selectedNumber)}
        bodyStyle={styles.bodyStyle}
      />
    </>
  );
};

export default AddBeneficiarySuccessScreen;
