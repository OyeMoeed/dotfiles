import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayFlatlist, IPayIcon, IPayImage, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayAnimatedTextInput, IPayButton, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import IPaySendMoneyFormProps from './ipay-send-money-form.interface';
import IPaySendMoneyFormStyles from './ipay-send-money-form.styles';

const IPaySendMoneyForm: React.FC<IPaySendMoneyFormProps> = ({
  testID,
  amount,
  setAmount,
  openReason,
  selectedItem,
  showRemoveFormOption,
  addForm,
  formInstances,
}) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = IPaySendMoneyFormStyles(colors);

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
          onPress={() => showRemoveFormOption(item.id)}
        />
      </IPayView>
    </IPayView>
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
