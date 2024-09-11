import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { MAX_CONTACTS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { buttonVariants } from '@app/utilities/enums.util';
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
  showReason = true,
}) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = sendMoneyFormStyles(colors);
  const MAX_LENGTH = 500;

  // eslint-disable-next-line react/no-unstable-nested-components
  const ListFooterComponent = () => (
    <IPayButton
      small
      btnType={buttonVariants.LINK_BUTTON}
      btnStyle={styles.chipContainer}
      textColor={colors.secondary.secondary800}
      btnText={localizationText.SEND_MONEY_FORM.ADD_MORE_RECIPIENTS}
      hasLeftIcon
      leftIcon={<IPayIcon icon={icons.add_bold} size={14} color={colors.secondary.secondary800} />}
      onPress={addForm}
      disabled={(formInstances || [])?.length >= MAX_CONTACTS}
    />
  );

  const renderItem = ({
    item: { subtitle, id, amount, selectedItem, notes, hasWallet },
  }: {
    item: FormInstanceType;
  }) => (
    <IPayTransferInformation
      showReason={showReason}
      amount={amount}
      subtitle={subtitle}
      setAmount={(value) => setAmount(id, value)}
      setSelectedItem={setSelectedItem}
      selectedItem={selectedItem?.text}
      setNotes={(value) => setNotes(id, value)}
      notes={notes}
      maxLength={MAX_LENGTH}
      openReason={() => openReason?.(id)}
      showRemoveFormOption={() => showRemoveFormOption(id)}
      showRemoveBtn
      hasWallet={hasWallet}
      showReason={showReason}
      currencyStyle={styles.currencyStyle}
    />
  );
  return (
    <IPayFlatlist
      showsVerticalScrollIndicator={false}
      testID={`${testID}-send-money-form`}
      data={formInstances}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

export default IPaySendMoneyForm;
