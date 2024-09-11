import icons from '@app/assets/icons';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPayPageWrapper } from '@app/components/templates';
import { LabelKey, LocalizationKeysMapping } from '@app/enums/international-beneficiary-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { alertType, alertVariant, buttonVariants, toastTypes } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { internationalTransferData } from '../international-transfer/international-transfer.constent';
import { InternationalTransferData, OptionItem } from './international-transfer-success.interface';
import internationalSuccessStyles from './international-transfer-success.style';

const InternationalTransferSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = internationalSuccessStyles(colors);
  const localizationText = useLocalization();
  const { showToast } = useToastContext();
  const [isVatInvoice, setIsVatInvoice] = useState<boolean>(false);
  const totalAmount = '50'; // TODO will be updated on the basis of api
  const otherCountryName = 'EGP';
  const percentage = '15';

  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title,
        subTitle,
        toastType,
        isShowRightIcon: false,
        leftIcon: icon || <IPayIcon icon={icons.copy_success} size={18} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };
  const onPressCopy = (refNo: string) => {
    copyText(refNo);
    renderToast({ title: localizationText.TOP_UP.REF_NUMBER_COPIED, toastType: toastTypes.INFORMATION });
  };

  // Function to check the condition dynamically
  const isSpecialIndex = (index?: number) => {
    const specialIndices = [8, 17];
    return (index && specialIndices.includes(index)) || false;
  };

  const renderOption = ({ item, index }: { item: OptionItem; index: number }) => {
    const { label, value, icon, image } = item;
    const localizationKey = LocalizationKeysMapping[label as keyof InternationalTransferData];
    const localization = localizationText.INTERNATIONAL_TRANSFER[localizationKey] || label;

    const getTitleSuffix = (labelKeys: string) => {
      switch (labelKeys) {
        case LabelKey.AMOUNT_TO:
          return `(${localizationText.COMMON.SAR})`;
        case LabelKey.AMOUNT_FROM:
          return otherCountryName ? `(${otherCountryName})` : '';
        case LabelKey.VAT:
          return percentage ? `(${percentage}%)` : '';
        default:
          return '';
      }
    };
    const title = `${localization} ${getTitleSuffix(label)}`;

    return (
      <IPayView style={[styles.dataCardView, isSpecialIndex(index) && styles.transactionCardConditionalStyle]}>
        <IPayFootnoteText regular text={title} color={colors.natural.natural900} />
        <IPayView style={styles.transactionDetailsView}>
          <IPayView style={styles.detailsView}>
            <IPaySubHeadlineText
              regular
              text={value}
              color={colors.primary.primary800}
              numberOfLines={1}
              style={[styles.subTitle, value.length > 30 && styles.condtionalWidthSubtitle]}
            />
            {(icon || image) &&
              (image ? (
                <IPayImage image={image} style={styles.listImage} />
              ) : (
                <IPayPressable style={styles.icon} onPress={() => onPressCopy(value)}>
                  <IPayIcon icon={icon} size={18} color={colors.primary.primary500} />
                </IPayPressable>
              ))}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  const handleVatInvoice = () => {
    setIsVatInvoice(true);
  };

  const onVatInvoiceCancel = () => {
    setIsVatInvoice(false);
  };

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.minFlex}
          headingText={localizationText.TOP_UP.TRANSFER_SUCCESSFUL}
          descriptionText={`${totalAmount} ${localizationText.COMMON.SAR}`}
          descriptionStyle={styles.boldStyles}
        />
        <IPayFlatlist
          data={internationalTransferData}
          showsVerticalScrollIndicator={false}
          itemSeparatorStyle={styles.itemSeparatorStyle}
          renderItem={renderOption}
        />
        <IPayView style={styles.bottomView}>
          <IPayView style={styles.rowStyles}>
            <IPayButton
              medium
              btnType={buttonVariants.LINK_BUTTON}
              leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
              btnText={'COMMON.SHARE'}
            />
            <IPayButton
              medium
              btnType={buttonVariants.LINK_BUTTON}
              rightIcon={<IPayIcon icon={icons.export_2} color={colors.primary.primary500} size={16} />}
              btnText={'TRANSACTION_HISTORY.VAT_INVOICE'}
              onPress={handleVatInvoice}
            />
          </IPayView>
          <IPayButton
            large
            btnType={buttonVariants.PRIMARY}
            leftIcon={<IPayIcon icon={icons.HOME} color={colors.natural.natural0} />}
            btnText={'COMMON.HOME'}
            onPress={() => navigate(ScreenNames.HOME)}
          />
        </IPayView>
      </IPayView>
      <IPayAlert
        visible={isVatInvoice}
        onClose={onVatInvoiceCancel}
        title={localizationText.INTERNATIONAL_TRANSFER.VAT_INVOICE_WAS_NOT_CREATED}
        message={localizationText.INTERNATIONAL_TRANSFER.PLEASE_TRY_AGAIN_LATER}
        type={alertType.DEFAULT}
        closeOnTouchOutside
        variant={alertVariant.DEFAULT}
        icon={<IPayIcon icon={icons.note_remove} size={64} />}
        showIcon={false}
        primaryAction={{
          text: localizationText.COMMON.DONE,
          onPress: onVatInvoiceCancel,
        }}
      />
    </IPayPageWrapper>
  );
};

export default InternationalTransferSuccessScreen;
