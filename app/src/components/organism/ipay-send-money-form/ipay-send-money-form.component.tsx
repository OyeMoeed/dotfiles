import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayTransferInformation from '../ipay-transfer-information/ipay-transfer-information.component';
import { FormInstanceType, IPaySendMoneyFormProps } from './ipay-send-money-form.interface';
import sendMoneyFormStyles from './ipay-send-money-form.styles';

const IPaySendMoneyForm: React.FC<IPaySendMoneyFormProps> = ({
  testID,
  setAmount,
  openReason,
  showRemoveFormOption,
  addForm,
  formInstances,
  setNotes,
  setSelectedItem,
}) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = sendMoneyFormStyles(colors);

  const renderItem = ({ item: { subtitle, id, amount, selectedItem, notes } }: { item: FormInstanceType }) => (
    <IPayTransferInformation
      amount={amount}
      subtitle={subtitle}
      setAmount={(value) => setAmount(id, value)}
      setSelectedItem={setSelectedItem}
      selectedItem={selectedItem?.text}
      setNotes={(value) => setNotes(id, value)}
      notes={notes}
      openReason={() => openReason(id)}
      showRemoveFormOption={() => showRemoveFormOption(id)}
      showRemoveBtn
    />
  );
  return (
    <IPayFlatlist
      showsVerticalScrollIndicator={false}
      testID={`${testID}-send-money-form`}
      data={formInstances}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={() => (
        <IPayButton
          small
          btnType="link-button"
          btnStyle={styles.chipContainer}
          textColor={colors.secondary.secondary800}
          btnText={localizationText.SEND_MONEY_FORM.ADD_MORE_RECIPIENTS}
          hasLeftIcon
          leftIcon={<IPayIcon icon={icons.add} size={14} color={colors.secondary.secondary800} />}
          onPress={addForm}
        />
      )}
    />
  );
};

export default IPaySendMoneyForm;