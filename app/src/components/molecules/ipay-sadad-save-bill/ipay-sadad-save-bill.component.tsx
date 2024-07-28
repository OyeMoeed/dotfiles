import { IPayFootnoteText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayAnimatedTextInput from '../ipay-animated-input-text/ipay-animated-input-text.component';
import IPayToggleButton from '../ipay-toggle-button/ipay-toggle-button.component';
import SadadSaveBillProps from './ipay-sadad-save-bill.interface';
import sadadSaveBillStyles from './ipay-sadad-save-bill.style';

/**
 * Props for the SadadSaveBill component.
 *
 * @param {string} [props.billNameValue] - The value representing the bill nick name.
 * @param {boolean} [props.saveBillToggle] - A boolean indicating if the save bill or not.
 * @param {function} [props.onSaveBillToggle] - A function to handle toggle related to the save bill.
 * @param {function} [props.onBillNameChange] - A function to handle change value related to the bill nick name.
 *
 * @returns {JSX.Element} - The rendered SadadSaveBill component.
 */

const IPaySadadSaveBill: React.FC<SadadSaveBillProps> = ({
  saveBillToggle,
  onSaveBillToggle,
  billNameValue,
  onBillNameChange,
  style,
}): React.JSX.Element => {
  const { colors } = useTheme();
  const styles = sadadSaveBillStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayView style={[styles.saveBillContainer, style]}>
      <IPayView style={styles.saveBillStyle}>
        <IPayFootnoteText color={colors.natural.natural900}>
          {localizationText.NEW_SADAD_BILLS.SAVE_BILL_FUTURE}
        </IPayFootnoteText>
        <IPayToggleButton toggleState={saveBillToggle} onToggleChange={onSaveBillToggle} />
      </IPayView>
      {saveBillToggle && (
        <IPayAnimatedTextInput
          label={localizationText.NEW_SADAD_BILLS.BILL_NICK_NAME}
          editable
          value={billNameValue}
          containerStyle={styles.inputContainerStyle}
          onChangeText={onBillNameChange}
        />
      )}
    </IPayView>
  );
};

export default IPaySadadSaveBill;
