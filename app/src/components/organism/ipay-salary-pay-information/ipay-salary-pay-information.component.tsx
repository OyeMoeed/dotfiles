import React from 'react';
import icons from '@app/assets/icons';
import { IPayCheckbox, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayList } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { StyleSheet } from 'react-native';
import IPaySalaryPayInformationProps from './ipay-salary-pay-information.interface';
import transferInfoStyles from './ipay-salary-pay-information.style';

const IPaySalaryPayInformation: React.FC<IPaySalaryPayInformationProps> = ({
  testID,
  style,
  openReason,
  selectedItem,
  subtitle,
  inputFieldStyle,
  fullName,
  onPressDatePicker,
}) => {
  const { colors } = useTheme();
  const styles = transferInfoStyles(colors);

  return (
    <IPayView testID={`${testID}-transfer-information`} style={[styles.gradientView, style]}>
      <IPayView>
        <IPayList
          textStyle={styles.titleText}
          title={fullName}
          subTextStyle={StyleSheet.flatten(styles.subtitleText)}
          isShowSubTitle
          subTitle={subtitle}
          isShowLeftIcon
          leftIcon={<IPayIcon icon={icons.user_filled} color={colors.primary.primary500} />}
          containerStyle={StyleSheet.flatten(styles.headerContainer)}
        />
      </IPayView>

      <IPayPressable onPress={openReason} style={styles.reasonsView}>
        <IPayAnimatedTextInput
          pointerEvents="none"
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.SALARY_TYPE"
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
      <IPayPressable onPress={onPressDatePicker} style={styles.reasonsView}>
        <IPayAnimatedTextInput
          pointerEvents="none"
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.SELECT_MONTH"
          value={selectedItem}
          editable={false}
          showRightIcon
          customIcon={
            <IPayPressable onPress={onPressDatePicker}>
              <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />
            </IPayPressable>
          }
          rightIcon={<IPayIcon fill="currentColor" icon={icons.calendar} size={22} color={colors.primary.primary500} />}
        />
      </IPayPressable>

      <IPayPressable onPress={onPressDatePicker} style={styles.reasonsView}>
        <IPayAnimatedTextInput
          pointerEvents="none"
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.DEDUCT_FROM_AMOUNT"
          value={selectedItem}
          editable={false}
          showRightIcon
          customIcon={<IPayCheckbox isCheck />}
        />
      </IPayPressable>
      <IPayPressable onPress={onPressDatePicker} style={styles.reasonsView}>
        <IPayAnimatedTextInput
          pointerEvents="none"
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.PAY_EXTRA"
          value={selectedItem}
          editable={false}
          showRightIcon
          customIcon={<IPayCheckbox isCheck />}
        />
      </IPayPressable>
    </IPayView>
  );
};

export default IPaySalaryPayInformation;
