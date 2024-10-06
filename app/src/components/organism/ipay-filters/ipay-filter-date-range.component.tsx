import { IPayCaption1Text, IPayDatePicker, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayTextInput } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { Controller } from 'react-hook-form';
import icons from '@app/assets/icons';
import { FiltersType, FORMAT_1 } from '@app/utilities';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import moment from 'moment';
import IPayFilterStyles from './ipay-filter.styles';
import { IPayFilterDateRangeProps } from './ipay-filter-date-range.interface';

const IPayFilterDateRange = ({
  title,
  control,
  fromLabel,
  toLabel,
  errors,
  required,
  scrollToBottom,
  onSelectDateFilter,
  setValue,
  dateError,
  hideDatePicKer,
}: IPayFilterDateRangeProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = IPayFilterStyles(colors);
  const listCheckIcon = () => <IPayIcon icon={icons.arrow_circle_down} size={24} color={colors.primary.primary500} />;
  const [showToDatePicker, setShowToDatePicker] = useState<boolean>(false);
  const [showFromDatePicker, setShowFromDatePicker] = useState<boolean>(false);

  const onToDateChange = (date: string) => {
    setValue(FiltersType.DATE_TO, moment(date).format(FORMAT_1));
  };
  const onFromDateChange = (date: string) => {
    setValue(FiltersType.DATE_FROM, moment(date).format(FORMAT_1));
  };

  useEffect(() => {
    setShowToDatePicker(false);
    setShowFromDatePicker(false);
  }, [hideDatePicKer]);

  return (
    <IPayView style={styles.dateHeading}>
      <IPayView style={styles.rowInputHeading}>
        <IPayIcon icon={icons.calendar} />
        <IPayCaption1Text text={title} style={styles.rowInputHeadingText} />
      </IPayView>

      <IPayView style={styles.rowInput}>
        <Controller
          control={control}
          name={FiltersType.DATE_FROM}
          rules={{ required }}
          render={({ field: { onChange, value } }) => (
            <IPayTextInput
              label={fromLabel}
              editable={false}
              text={value}
              showLeftIcon
              leftIcon={listCheckIcon()}
              onClearInput={() => {
                setShowToDatePicker(false);
                setShowFromDatePicker(!showFromDatePicker);
                if (scrollToBottom) scrollToBottom();
                if (onSelectDateFilter) onSelectDateFilter(FiltersType.DATE_FROM);
              }}
              caretHidden
              closeIconStyle={styles.dropdownIcon}
              containerStyle={styles.date}
              isError={!!errors?.dateFrom}
              assistiveText={errors?.dateFrom ? t('COMMON.REQUIRED_FIELD') : ''}
              onChangeText={onChange}
              showFocusStyle={showFromDatePicker && !showToDatePicker}
            />
          )}
        />
        <Controller
          control={control}
          name={FiltersType.DATE_TO}
          rules={{ required }}
          render={({ field: { onChange, value } }) => (
            <IPayTextInput
              label={toLabel}
              editable={false}
              text={value}
              showLeftIcon
              leftIcon={listCheckIcon()}
              onClearInput={() => {
                setShowToDatePicker(!showToDatePicker);
                setShowFromDatePicker(false);
                if (scrollToBottom) scrollToBottom();
                if (onSelectDateFilter) onSelectDateFilter(FiltersType.DATE_TO);
              }}
              caretHidden
              closeIconStyle={styles.dropdownIcon}
              containerStyle={styles.date}
              isError={!!errors?.dateTo}
              assistiveText={errors?.dateTo ? dateError || t('COMMON.REQUIRED_FIELD') : ''}
              onChangeText={onChange}
              showFocusStyle={showToDatePicker && showFromDatePicker}
            />
          )}
        />
      </IPayView>
      <IPayView style={styles.datePickerContainer}>
        {showToDatePicker && (
          <IPayDatePicker
            onDateChange={onToDateChange}
            style={styles.datePicker}
            androidStyle={styles.datePickerAndroidStyle}
          />
        )}
        {showFromDatePicker && (
          <IPayDatePicker
            onDateChange={onFromDateChange}
            style={styles.datePicker}
            androidStyle={styles.datePickerAndroidStyle}
          />
        )}
      </IPayView>
    </IPayView>
  );
};
export default IPayFilterDateRange;
