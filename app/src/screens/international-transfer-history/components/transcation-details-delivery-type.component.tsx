import { IPayCaption2Text, IPayCheckbox, IPayFootnoteText, IPayImage, IPayView } from '@app/components/atoms';
import IPaySectionList from '@app/components/atoms/ipay-section-list/ipay-section-list.component';
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
    (selectedListItem !== 'Digital Wallet'
      ? selectedListItem && selectedListItem === title && type === selectTransactionType
      : selectedListItem && selectedListItem === title) || false;

  const getAmount = (amount: string) =>
    `${localizationText.LOCAL_TRANSFER.FEES} ${amount} ${localizationText.COMMON.SAR}`;

  return (
    <IPayView style={styles.deliveryTypeContainer} testID={`${testID}-delivery-type`}>
      <IPaySectionList
        data={deliveryTypesData}
        itemSeparatorStyle={styles.deliveryTypeItemSeparator}
        renderItem={({ item: { title, amount, image, type } }) => (
          <IPayView style={styles.deliveryTypeCard}>
            <IPayView style={styles.titleView}>
              <IPayImage image={image} style={styles.deliveryTypeImage} />
              <IPayFootnoteText text={title} color={colors.natural.natural900} />
            </IPayView>
            <IPayView style={styles.titleView}>
              <IPayCaption2Text text={getAmount(amount)} style={styles.deliveryTypeAmount} />
              <IPayCheckbox
                isCheck={selectedItem(title, type)}
                onPress={() => {
                  if (onPressListItem) onPressListItem(title, type);
                }}
              />
            </IPayView>
          </IPayView>
        )}
        renderSectionHeader={({ section: { id, title } }) => (
          <IPayFootnoteText
            text={title}
            style={[styles.deliveryTypeTitleText, id === '1' && styles.deliveryTypeTitleTextConditional]}
          />
        )}
      />
    </IPayView>
  );
};

export default IPayInternationalTransferDeliveryTypeComponent;
