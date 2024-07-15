import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayFlatlist, IPayIcon, IPayImage, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayAnimatedTextInput, IPayButton, IPayList } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { useCallback, useRef, useState } from 'react';
import IPayActionSheet from '../ipay-actionsheet/ipay-actionsheet.component';
import IPaySendMoneyFormProps from './ipay-send-money-form.interface';
import IPaySendMoneyFormStyles from './ipay-send-money-form.styles';

type FormProps = {
  id: number;
};

const IPaySendMoneyForm: React.FC<IPaySendMoneyFormProps> = ({
  testID,
  amount,
  setAmount,
  openReason,
  selectedItem,
}) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = IPaySendMoneyFormStyles(colors);

  const actionSheetRef = useRef<any>(null);

  const [formInstances, setFormInstances] = useState<FormProps[]>([{ id: 1 }]);

  const addForm = () => {
    const newId = formInstances.length ? formInstances[formInstances.length - 1].id + 1 : 1;
    setFormInstances([...formInstances, { id: newId }]);
  };

  const removeForm = (id: number) => {
    setFormInstances(formInstances.filter((form) => form.id !== id));
  };

  const showActionSheet = useCallback((id: number) => {
    if (actionSheetRef.current) {
      actionSheetRef.current.formId = id;
      actionSheetRef.current.show();
    }
  }, []);

  const handleActionSheetPress = (index: number) => {
    if (index === 0) {
      removeForm(actionSheetRef.current.formId);
    }
  };

  const actionSheetOptions = {
    title: localizationText.SEND_MONEY_FORM.REMOVE,
    showIcon: true,
    customImage: <IPayIcon icon={icons.TRASH} size={42} />,
    message: localizationText.SEND_MONEY_FORM.REMOVE_DETAIL,
    options: [localizationText.PROFILE.REMOVE, localizationText.COMMON.CANCEL],
    cancelButtonIndex: 1,
    showCancel: true,
    destructiveButtonIndex: 0,
    onPress: handleActionSheetPress,
  };

  const renderItem = ({ item }) => (
    <IPayView key={item.id} style={styles.gradientView}>
      <IPayView>
        <IPayList
          textStyle={styles.titleText}
          title={localizationText.SEND_MONEY_FORM.RECIPIENT}
          subTextStyle={styles.subtitleText}
          isShowSubTitle
          subTitle={localizationText.ahmed_mohamed}
          isShowLeftIcon
          leftIcon={<IPayIcon icon={icons.user_filled} color={colors.primary.primary500} />}
          isShowIcon
          containerStyle={styles.headerContainer}
          icon={<IPayImage image={images.alinmaP} style={styles.alinmaLogo} resizeMode="contain" />}
        />
      </IPayView>
      <IPayView style={styles.inputContainer}>
        <IPayAmountInput
          inputStyles={styles.inputText}
          currencyStyle={styles.currencyStyle}
          amount={amount}
          onAmountChange={setAmount}
          editable={true}
        />
      </IPayView>
      <IPayPressable onPress={openReason}>
        <IPayAnimatedTextInput
          containerStyle={styles.inputField}
          label={localizationText.TRANSACTION_HISTORY.TRANSFER_REASON}
          value={selectedItem ? selectedItem.text : ''}
          editable={false}
          showRightIcon
          customIcon={<IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />}
        />
      </IPayPressable>
      <IPayAnimatedTextInput containerStyle={styles.inputField} label={localizationText.TRANSACTION_HISTORY.NOTE} />
      <IPayView>
        <IPayButton
          small
          textStyle={styles.btnText}
          btnText={localizationText.PROFILE.REMOVE}
          hasRightIcon
          rightIcon={<IPayIcon icon={icons.trash} color={colors.primary.primary500} size={14} />}
          btnType="link-button"
          onPress={() => showActionSheet(item.id)}
        />
      </IPayView>
    </IPayView>
  );
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayFlatlist
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
      <IPayActionSheet ref={actionSheetRef} {...actionSheetOptions} />
    </IPaySafeAreaView>
  );
};

export default IPaySendMoneyForm;
