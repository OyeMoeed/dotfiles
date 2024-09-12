import { IPayFootnoteText, IPayView } from '@app/components/atoms';
import { IPayRHFAnimatedTextInput as IPayAnimatedTextInput } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { Controller } from 'react-hook-form';
import IPayToggleButton from '../ipay-toggle-button/ipay-toggle-button.component';
import SadadSaveBillProps from './ipay-sadad-save-bill.interface';
import sadadSaveBillStyles from './ipay-sadad-save-bill.style';

/**
 * Props for the SadadSaveBill component.
 * @param {boolean} [props.saveBillToggle] - A boolean indicating if the save bill or not.
 * @param {function} [props.onSaveBillToggle] - A function to handle toggle related to the save bill.
 * @param {string} [props.billInputName] - The name to be used for the bill input.
 * @param {string} [props.toggleInputName] - The name to be used for the toggle input.
 * @param {Control<FormValues>} [props.toggleControl] - The control associated with the toggle input.
 * @returns {JSX.Element} - The rendered SadadSaveBill component.
 */

const IPaySadadSaveBill: React.FC<SadadSaveBillProps> = ({
  saveBillToggle,
  style,
  billInputName,
  toggleControl,
  toggleInputName,
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
        <Controller
          name={toggleInputName}
          control={toggleControl}
          render={({ field: { onChange } }) => (
            <IPayToggleButton onToggleChange={onChange} toggleState={saveBillToggle} />
          )}
        />
      </IPayView>
      {saveBillToggle && (
        <IPayAnimatedTextInput
          label={localizationText.NEW_SADAD_BILLS.BILL_NICK_NAME}
          editable
          name={billInputName}
          containerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputText}
        />
      )}
    </IPayView>
  );
};

export default IPaySadadSaveBill;
