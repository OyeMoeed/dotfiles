import icons from '@app/assets/icons';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
import {
  IPayAmountInput,
  IPayAnimatedTextInput,
  IPayButton,
  IPayList
} from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import IPaySendMoneyFormStyles from './ipay-send-money-form.styles';
import { IPaySafeAreaView } from '@app/components/templates';

type FormProps = {
  id: number;
};

const IPaySendMoneyForm: React.FC<Props> = ({ }) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = IPaySendMoneyFormStyles(colors);

  const [formInstances, setFormInstances] = useState<FormProps[]>([
    { id: 1 }  // Initial form instance
  ]);

  const addForm = () => {
    const newId = formInstances.length ? formInstances[formInstances.length - 1].id + 1 : 1;
    setFormInstances([...formInstances, { id: newId }]);
  };

  const removeForm = (id: number) => {
    setFormInstances(formInstances.filter(form => form.id !== id));
  };

  return (
    <IPaySafeAreaView>
      <IPayScrollView style={styles.container}>
        {formInstances.map((form) => (
          <IPayView key={form.id} style={styles.gradientView}>
            <IPayView>
              <IPayList
                textStyle={styles.titleText}
                title={localizationText.RECIPIENT}
                subTextStyle={styles.subtitleText}
                isShowSubTitle
                subTitle={localizationText.ahmed_mohamed}
                isShowLeftIcon
                leftIcon={<IPayIcon icon={icons.user_filled} color={colors.primary.primary500} />}
                isShowIcon
              />
            </IPayView>
            <IPayView style={styles.inputContainer}>
              <IPayFootnoteText
                text={localizationText.enter_amount}
                regular
                color={colors.natural.natural700}
              />
              <IPayAmountInput
                inputStyles={styles.inputText}
                currencyStyle={styles.currencyStyle}
                containerStyles={styles.inputContainer}
                editable={true}
              />
            </IPayView>
            <IPayAnimatedTextInput
              containerStyle={styles.inputField}
              label={localizationText.TRANSACTION_HISTORY.TRANSFER_REASON}
              showRightIcon
              customIcon={<IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />}
            />
            <IPayAnimatedTextInput
              containerStyle={styles.inputField}
              label={localizationText.TRANSACTION_HISTORY.NOTE}
            />
            <IPayView>
              <IPayButton
                small
                textStyle={styles.btnText}
                btnText={localizationText.PROFILE.REMOVE}
                hasRightIcon
                rightIcon={<IPayIcon icon={icons.trash} color={colors.primary.primary500} size={14} />}
                btnType='link-button'
                onPress={() => removeForm(form.id)}
              />
            </IPayView>
          </IPayView>
        ))}
        <IPayButton
          small
          btnType='link-button'
          btnStyle={styles.chipContainer}
          textColor={colors.secondary.secondary800}
          btnText={localizationText.ADD_MORE_RECIPIENTS}
          hasLeftIcon
          leftIcon={<IPayIcon icon={icons.add} size={14} color={colors.secondary.secondary800} />}
          onPress={addForm}
        />
      </IPayScrollView>
    </IPaySafeAreaView >
  );
};

export default IPaySendMoneyForm;


