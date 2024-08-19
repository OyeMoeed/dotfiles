import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayButton, IPayList, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { LabelKey, LocalizationKeysMapping } from '@app/enums/international-beneficiary-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { alertType, alertVariant, buttonVariants } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { InternationalTransferData, OptionItem } from './international-transfer-success.interface';
import internationalSuccessStyles from './international-transfer-success.style';

const InternationalTransferSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = internationalSuccessStyles(colors);
  const localizationText = useLocalization();
  const { internationalTransferData } = useConstantData();
  const [isVatInvoice, setIsVatInvoice] = useState<boolean>(false);
  const totalAmount = '50'; // TODO will be updated on the basis of api
  const otherCountryName = 'EGP';
  const percentage = '15';

  const renderOption = ({ item }: { item: OptionItem }) => {
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
      <IPayList
        containerStyle={styles.heightStyles}
        title={title}
        detailText={value}
        detailTextStyle={styles.detailsText}
        isShowIcon
        icon={<IPayIcon icon={icon} color={colors.primary.primary500} />}
        rightText={image ? <IPayImage image={image} style={styles.listImage} /> : <IPayView />}
      />
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
        <IPayFlatlist data={internationalTransferData} showsVerticalScrollIndicator={false} renderItem={renderOption} />
        <IPayView style={styles.bottomView}>
          <IPayView style={styles.rowStyles}>
            <IPayButton
              medium
              btnType={buttonVariants.LINK_BUTTON}
              leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
              btnText={localizationText.COMMON.SHARE}
            />
            <IPayButton
              medium
              btnType={buttonVariants.LINK_BUTTON}
              rightIcon={<IPayIcon icon={icons.export_2} color={colors.primary.primary500} size={16} />}
              btnText={localizationText.TRANSACTION_HISTORY.VAT_INVOICE}
              onPress={handleVatInvoice}
            />
          </IPayView>
          <IPayButton
            large
            btnType={buttonVariants.PRIMARY}
            leftIcon={<IPayIcon icon={icons.HOME} color={colors.natural.natural0} />}
            btnText={localizationText.COMMON.HOME}
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
