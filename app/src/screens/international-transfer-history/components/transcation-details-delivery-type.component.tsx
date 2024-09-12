import { IPayCaption2Text, IPayCheckbox, IPayFootnoteText, IPayImage, IPayView } from '@app/components/atoms';
import IPaySectionList from '@app/components/atoms/ipay-section-list/ipay-section-list.component';
import { TransferGatewayType } from '@app/enums/international-beneficiary-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import transactionDetailsCompStyles from './transaction-details-component.style';
import { IPayInternationalTransferDeliveryTypeComponentProps } from './transction-details-component.interface';

const IPayInternationalTransferDeliveryTypeComponent: React.FC<IPayInternationalTransferDeliveryTypeComponentProps> = ({
  testID,
  deliveryTypesData,
  selectedListItem,
  onPressListItem,
  selectTransactionType,
}) => {
  const { colors } = useTheme();
  const styles = transactionDetailsCompStyles(colors);
  const localizationText = useLocalization();
  const selectedItem = (title: string, type: string) =>
    selectedListItem === title && (selectedListItem !== 'Digital Wallet' ? type === selectTransactionType : true);

  const getAmount = (amount: string) => `${t('LOCAL_TRANSFER.FEES')} ${amount} ${t('COMMON.SAR')}`;

  return (
    <IPayView style={styles.deliveryTypeContainer} testID={`${testID}-delivery-type`}>
      <IPaySectionList
        data={deliveryTypesData}
        itemSeparatorStyle={styles.deliveryTypeItemSeparator}
        renderItem={({ item: { title, amount, type } }) => (
          <IPayView style={styles.deliveryTypeCard}>
            <IPayView style={styles.titleView}>
              <IPayFootnoteText text={title} color={colors.natural.natural900} />
            </IPayView>
            <IPayView style={styles.checkBoxView}>
              <IPayCaption2Text text={getAmount(amount)} style={styles.deliveryTypeAmount} />
              <IPayCheckbox
                isCheck={selectedItem(title, type)}
                onPress={() => {
                  onPressListItem?.(title, type);
                }}
              />
            </IPayView>
          </IPayView>
        )}
        renderSectionHeader={({ section: { title, image } }) => (
          <IPayView
            style={[
              styles.deliveryTypeHeader,
              title === TransferGatewayType.WESTERN_UNION && styles.deliveryTypeHeaderConditional,
            ]}
          >
            <IPayImage image={image} style={styles.deliveryTypeImage} />
            <IPayFootnoteText text={title} style={styles.deliveryTypeTitleTextConditional} />
          </IPayView>
        )}
      />
    </IPayView>
  );
};

export default IPayInternationalTransferDeliveryTypeComponent;
