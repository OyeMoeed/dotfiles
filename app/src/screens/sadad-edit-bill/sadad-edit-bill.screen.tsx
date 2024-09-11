import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayCaption1Text, IPayIcon, IPayImage, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import { BillDetailsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import { SadadEditBillFields } from '@app/enums/edit-sadad-bill.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack } from '@app/navigation/navigation-service.navigation';
import { EditBillPayloadTypes } from '@app/network/services/bills-management/edit-bill/edit-bill.interface';
import editBillService from '@app/network/services/bills-management/edit-bill/edit-bill.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import sadadEditBillsStyles from './sadad-edit-bill.style';

const SadadEditBillsScreen: React.FC = ({ route }) => {
  const { billData, setEditBillSuccessToast, billId } = route.params;
  const {
    billTitle = '',
    vendor = '',
    vendorIcon = images.saudi_electricity_co,
    serviceType = '',
    accountNumber = '',
  }: BillDetailsProps = billData;
  const { colors } = useTheme();
  const styles = sadadEditBillsStyles(colors);
  const localizationText = useLocalization();
  const [showAlert, setShowAlert] = useState(false);
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const {
    getValues,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onSubmit = async () => {
    // Handle form submission here
    const billName = getValues(SadadEditBillFields.BILL_NICK_NAME);
    if (billName) {
      const payload: EditBillPayloadTypes = {
        billNumOrBillingAcct: accountNumber,
        billId,
        billNickname: billName,
        walletNumber,
        deviceInfo: {
          platformVersion: '',
          deviceId: '',
          deviceName: '',
          platform: '',
        },
      };
      const apiResponse = await editBillService(payload);
      if (apiResponse.successfulResponse) {
        setEditBillSuccessToast(billName);
        goBack();
      }
    }
  };

  useEffect(() => {
    setValue(SadadEditBillFields.BILL_NICK_NAME, billTitle);
  }, []);

  // Watch the bill nickname field to dynamically update button state
  const billNickName = watch(SadadEditBillFields.BILL_NICK_NAME);

  const checkIfNickNameUpdated = () => {
    if (billNickName !== billTitle) {
      return false;
    }
    return true;
  };

  const onBackPress = () => {
    if (!checkIfNickNameUpdated()) {
      setShowAlert(true);
    } else {
      goBack();
    }
  };

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const isSaveButtonDisabled = !billNickName || checkIfNickNameUpdated();

  return (
    <IPaySafeAreaView>
      <IPayHeader
        testID="sadad-edit-bill-header"
        backBtn
        onBackPress={onBackPress}
        title={localizationText.SADAD.EDIT_BILL}
        titleStyle={styles.headerText}
        applyFlex
      />
      <IPayView style={styles.formView}>
        <IPayView style={styles.contentContainer}>
          <Controller
            name={SadadEditBillFields.BILL_NICK_NAME}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <IPayAnimatedTextInput
                testID="bill-nick-name-input"
                label={localizationText.NEW_SADAD_BILLS.BILL_NICK_NAME}
                labelColor={colors.primary.primary500}
                editable
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <IPayView style={styles.diabledCardView}>
            <IPayView style={styles.infoView}>
              <IPayImage image={vendorIcon} style={styles.vendorIcon} />
              <IPayView>
                <IPayCaption1Text text={'NEW_SADAD_BILLS.COMPANY_NAME'} color={colors.natural.natural500} />
                <IPaySubHeadlineText regular text={vendor} style={styles.inputValueText} />
              </IPayView>
            </IPayView>
            <IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.natural.natural500} />
          </IPayView>

          <IPayView style={styles.diabledCardView}>
            <IPayView>
              <IPayCaption1Text text={'NEW_SADAD_BILLS.SERVICE_TYPE'} color={colors.natural.natural500} />
              <IPaySubHeadlineText regular text={serviceType} style={styles.inputValueText} />
            </IPayView>
            <IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.natural.natural500} />
          </IPayView>

          <IPayView style={styles.diabledCardView}>
            <IPayView>
              <IPayCaption1Text text={'NEW_SADAD_BILLS.ACCOUNT_NUMBER'} color={colors.natural.natural500} />
              <IPaySubHeadlineText regular text={accountNumber} style={styles.inputValueText} />
            </IPayView>
          </IPayView>
        </IPayView>
      </IPayView>

      <IPayButton
        btnText={localizationText.COMMON.SAVE}
        btnType={buttonVariants.PRIMARY}
        onPress={onSubmit}
        large
        btnIconsDisabled
        btnStyle={styles.saveBtn}
        disabled={isSaveButtonDisabled}
      />
      <IPayAlert
        icon={<IPayIcon icon={icons.info_circle} size={64} color={colors.warning.warning600} />}
        visible={showAlert}
        closeOnTouchOutside
        animationType="fade"
        showIcon={false}
        title={localizationText.SADAD.DISCARD_CHANGES}
        onClose={onCloseAlert}
        message={localizationText.SADAD.EDIT_YOU_MADE_WILL_LOST}
        primaryAction={{
          text: localizationText.COMMON.YES,
          onPress: () => {
            setShowAlert(false);
            goBack();
          },
        }}
        tertiaryAction={{
          text: localizationText.COMMON.CANCEL,
          onPress: () => {
            setShowAlert(false);
          },
        }}
      />
    </IPaySafeAreaView>
  );
};

export default SadadEditBillsScreen;
