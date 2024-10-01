import icons from '@app/assets/icons';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPayPageWrapper } from '@app/components/templates';
import {
  BeneficiaryDetailKeys,
  LabelKey,
  LocalizationKeysMapping,
} from '@app/enums/international-beneficiary-status.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import { alertType, alertVariant, buttonVariants, ToastTypes } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IPayFlag from '@app/components/atoms/ipay-flag/ipay-flag.component';
import {
  InternationalTransferSuccessData,
  InternationalTransferSuccessProps,
  OptionItem,
} from './international-transfer-success.interface';
import internationalSuccessStyles from './international-transfer-success.style';

const InternationalTransferSuccessScreen: React.FC<InternationalTransferSuccessProps> = ({ route }) => {
  const { successDetailsData, countryCode } = route.params;
  const { colors } = useTheme();
  const styles = internationalSuccessStyles(colors);
  const { t } = useTranslation();
  const { showToast } = useToastContext();
  const [isVatInvoice, setIsVatInvoice] = useState<boolean>(false);

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
    renderToast({ title: 'TOP_UP.REF_NUMBER_COPIED', toastType: ToastTypes.INFORMATION });
  };

  // Function to check the condition dynamically
  const isSpecialIndex = (index?: number) => {
    const specialIndices = [8, 17];
    return (index && specialIndices.includes(index)) || false;
  };

  const renderOption = ({ item, index }: { item: OptionItem; index: number }) => {
    const { label, value, icon, countryCodeValue } = item;
    const localizationKey = LocalizationKeysMapping[label as keyof InternationalTransferSuccessData];
    const localization = localizationKey ? t(`INTERNATIONAL_TRANSFER.${localizationKey}`) : label;

    const getTitleSuffix = (labelKeys: string) => {
      switch (labelKeys) {
        case LabelKey.AMOUNT_TO:
          return `(${t('COMMON.SAR')})`;
        case LabelKey.AMOUNT_FROM:
          return countryCode ? `(${countryCode})` : '';
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
              text={value ?? '-'}
              color={colors.primary.primary800}
              numberOfLines={1}
              style={[styles.subTitle, value?.length > 30 && styles.condtionalWidthSubtitle]}
            />
            {(icon || countryCodeValue) &&
              (countryCodeValue ? (
                <IPayFlag countryCode={countryCodeValue} style={styles.listImage} />
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

  const generatedBeneficiaryDetails = () =>
    Object.keys(successDetailsData)?.map((key) => {
      const getIconSuffix = (iconKeys: string) => {
        switch (iconKeys) {
          case BeneficiaryDetailKeys.TRANSACTION_ID:
            return { icon: icons.copy };
          case BeneficiaryDetailKeys.COUNTRY:
            return { countryCodeValue: countryCode };
          default:
            return '';
        }
      };

      const getValueSuffix = (suffixKey: string) => {
        if (suffixKey === BeneficiaryDetailKeys.TOTAL_AMOUNT) {
          return `${successDetailsData[suffixKey]} ${t('COMMON.SAR')}`;
        }
        return successDetailsData[suffixKey as keyof InternationalTransferSuccessData];
      };

      return { label: key, value: getValueSuffix(key), ...getIconSuffix(key) };
    });

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.minFlex}
          headingText="TOP_UP.TRANSFER_SUCCESSFUL"
          descriptionText={`${successDetailsData?.totalAmount ?? 0} ${t('COMMON.SAR')}`}
          descriptionStyle={styles.boldStyles}
        />
        <IPayFlatlist
          data={generatedBeneficiaryDetails()}
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
              btnText="COMMON.SHARE"
            />
            <IPayButton
              medium
              btnType={buttonVariants.LINK_BUTTON}
              rightIcon={<IPayIcon icon={icons.export_2} color={colors.primary.primary500} size={16} />}
              btnText="TRANSACTION_HISTORY.VAT_INVOICE"
              onPress={handleVatInvoice}
            />
          </IPayView>
          <IPayButton
            large
            btnType={buttonVariants.PRIMARY}
            leftIcon={<IPayIcon icon={icons.HOME} color={colors.natural.natural0} />}
            btnText="COMMON.HOME"
            onPress={() => navigate(ScreenNames.HOME)}
          />
        </IPayView>
      </IPayView>
      <IPayAlert
        visible={isVatInvoice}
        onClose={onVatInvoiceCancel}
        title="INTERNATIONAL_TRANSFER.VAT_INVOICE_WAS_NOT_CREATED"
        message="INTERNATIONAL_TRANSFER.PLEASE_TRY_AGAIN_LATER"
        type={alertType.DEFAULT}
        closeOnTouchOutside
        variant={alertVariant.DEFAULT}
        icon={<IPayIcon icon={icons.note_remove} size={64} />}
        showIcon={false}
        primaryAction={{
          text: 'COMMON.DONE',
          onPress: onVatInvoiceCancel,
        }}
      />
    </IPayPageWrapper>
  );
};

export default InternationalTransferSuccessScreen;
