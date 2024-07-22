import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayFlatlist, IPayIcon, IPayImage, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayAnimatedTextInput, IPayButton, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { ViewStyle } from 'react-native';
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
  subtitle,
}) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = sendMoneyFormStyles(colors);

  const renderItem = ({ item }: { item: FormInstanceType }) => (
    <IPayView key={item.id} style={styles.gradientView}>
      <IPayView>
        <IPayList
          textStyle={styles.titleText}
          title={localizationText.SEND_MONEY_FORM.RECIPIENT}
          subTextStyle={styles.subtitleText as ViewStyle}
          isShowSubTitle
          subTitle={subtitle}
          isShowLeftIcon
          leftIcon={<IPayIcon icon={icons.user_filled} color={colors.primary.primary500} />}
          isShowIcon
          containerStyle={styles.headerContainer as ViewStyle}
          icon={<IPayImage image={images.alinmaP} style={styles.alinmaLogo} resizeMode="contain" />}
        />
      </IPayView>
      <IPayView style={styles.inputContainer}>
        <IPayAmountInput
          inputStyles={styles.inputText}
          currencyStyle={styles.currencyStyle}
          amount={amount}
          onAmountChange={setAmount}
          isEditable={true}
        />
      </IPayView>
      <IPayPressable onPress={openReason}>
        <IPayAnimatedTextInput
          onChangeText={setSelectedItem}
          containerStyle={styles.inputField as ViewStyle}
          label={localizationText.TRANSACTION_HISTORY.TRANSFER_REASON}
          value={selectedItem}
          editable={false}
          showRightIcon
          customIcon={
            <IPayPressable onPress={openReason}>
              <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />
            </IPayPressable>
          }
        />
      </IPayPressable>
      <IPayAnimatedTextInput
        containerStyle={styles.inputField as ViewStyle}
        label={localizationText.TRANSACTION_HISTORY.NOTE}
        value={notes}
        onChangeText={setNotes}
      />
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
