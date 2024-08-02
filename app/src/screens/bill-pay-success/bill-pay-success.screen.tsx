import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayChip, IPayList, IPaySuccess } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, States } from '@app/utilities/enums.util';
import React from 'react';
import usePayBillSuccess from './bill-pay-success.hook';
import { BillPaySuccessProps } from './bill-pay-success.interface';
import ipayBillSuccessStyles from './bill-pay-success.style';

const PayBillScreen: React.FC<BillPaySuccessProps> = ({ route }) => {
  const { isSaveOnly } = route.params;
  const { colors } = useTheme();
  const styles = ipayBillSuccessStyles(colors);
  const localizationText = useLocalization();
  const { goToHome, billPayDetailes, billHeaderDetail, billSaveDetails } = usePayBillSuccess();
  // TODO will be updated basis of API.
  const isPayOnly = false;
  const isPayPartially = false;
  const billStatus = {
    paid: '1 Paid Bills',
    unpaid: '1 Unpaid Bills',
  };

  const successMessage = isSaveOnly ? localizationText.PAY_BILL.SAVED_SUCCESS : localizationText.PAY_BILL.PAID_SUCCESS;

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.minFlex}
          headingText={successMessage}
          descriptionText={`300 ${localizationText.COMMON.SAR}`}
          descriptionStyle={styles.boldStyles}
          headingStyle={styles.headingStyle}
        />
        {isPayPartially && (
          <IPayView style={styles.chipWrapper}>
            <IPayChip textValue={billStatus.paid} isShowIcon={false} variant={States.SUCCESS} />
            <IPayChip textValue={billStatus.unpaid} isShowIcon={false} variant={States.ERROR} />
          </IPayView>
        )}
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayView style={styles.conatinerStyles}>
            {isPayPartially && (
              <IPayList
                isShowLeftIcon
                containerStyle={styles.listContainer}
                leftIcon={<IPayIcon icon={icons.clipboard_close1} color={colors.error.error500} size={24} />}
                title={localizationText.PAY_BILL.DECLINED_TRANSACTION}
                isShowSubTitle
                subTitle={localizationText.PAY_BILL.DOES_NOT_ACCEPT_PARTIALLY_PAYMENT}
                subTextStyle={{ color: colors.error.error500 }}
                textStyle={{ color: colors.error.error500 }}
                regularTitle={false}
              />
            )}
            <IPayBillDetailsOption
              headerData={billHeaderDetail}
              data={billPayDetailes}
              style={styles.billContainer}
              optionsStyles={styles.optionsStyle}
            />
            {isPayPartially && (
              <IPayButton
                medium
                btnType={buttonVariants.LINK_BUTTON}
                leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
                btnText={localizationText.COMMON.SHARE}
                btnStyle={styles.btnStyle}
              />
            )}
          </IPayView>
          {isSaveOnly && (
            <IPayView style={[styles.conatinerStyles, isSaveOnly && styles.saveContainer]}>
              <IPayBillDetailsOption
                showHeader={false}
                style={styles.billContainer}
                data={billSaveDetails}
                optionsStyles={styles.optionsStyle}
              />
              <IPayButton
                small
                btnType={buttonVariants.PRIMARY}
                btnStyle={styles.btnStyle}
                btnIconsDisabled
                btnText={localizationText.PAY_BILL.PAY_NOW}
              />
            </IPayView>
          )}
        </IPayScrollView>
        <IPayView style={styles.bottomView}>
          {isSaveOnly ? (
            <IPayButton
              medium
              btnType={buttonVariants.OUTLINED}
              leftIcon={<IPayIcon icon={icons.ARROW_LEFT} color={colors.primary.primary500} size={16} />}
              btnText={localizationText.PAY_BILL.VIEW_SADAD_BILLS}
              btnStyle={styles.btnStyle}
              onPress={() => navigate(ScreenNames.BILL_PAYMENTS_SCREEN)}
            />
          ) : (
            <IPayView style={isPayOnly && styles.btnWrapper}>
              <IPayButton
                medium
                btnType={buttonVariants.LINK_BUTTON}
                leftIcon={<IPayIcon icon={icons.refresh_48} color={colors.primary.primary500} size={16} />}
                btnText={localizationText.TRAFFIC_VIOLATION.PAY_ANOTHER_VIOLATION}
              />
              {isPayOnly && (
                <IPayButton
                  medium
                  btnType={buttonVariants.LINK_BUTTON}
                  leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
                  btnText={localizationText.COMMON.SHARE}
                  btnStyle={styles.btnStyle}
                />
              )}
            </IPayView>
          )}
          <IPayButton
            onPress={goToHome}
            large
            btnType={isSaveOnly ? buttonVariants.LINK_BUTTON : buttonVariants.PRIMARY}
            leftIcon={
              <IPayIcon icon={icons.HOME} color={isSaveOnly ? colors.primary.primary500 : colors.natural.natural0} />
            }
            btnText={localizationText.COMMON.HOME}
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default PayBillScreen;
