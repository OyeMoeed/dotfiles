import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import IPayTransferInformation from '../ipay-transfer-information/ipay-transfer-information.component';
import { FormInstanceType, IPaySendMoneyFormProps } from './ipay-send-money-form.interface';
import sendMoneyFormStyles from './ipay-send-money-form.styles';

const IPaySendMoneyForm: React.FC<IPaySendMoneyFormProps> = ({
  testID,
  amount,
  setAmount,
  openReason,
  selectedItem,
  showRemoveFormOption,
  addForm,
  formInstances,
  notes,
  setNotes,
  setSelectedItem,
}) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = sendMoneyFormStyles(colors);

  const renderItem = ({ item }: { item: FormInstanceType }) => (
    <IPayTransferInformation
      amount={amount}
      setAmount={setAmount}
      setSelectedItem={setSelectedItem}
      selectedItem={selectedItem}
      setNotes={setNotes}
      notes={notes}
      openReason={openReason}
      showRemoveFormOption={() => showRemoveFormOption(item.id)}
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
          btnText={localizationText.SEND_MONEY_FORM.ADD}
          hasLeftIcon
          leftIcon={<IPayIcon icon={icons.add} size={14} color={colors.secondary.secondary800} />}
          onPress={addForm}
        />
      )}
    />
  );
};

export default IPaySendMoneyForm;
