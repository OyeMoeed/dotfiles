import { IPayFootnoteText, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import { dateTimeFormat } from '@app/utilities/date.const';
import { dayPeriod, pickerVariant } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import { IPayPickerButtonProps } from './ipay-picker-button.interface';
import pickerStyles from './ipay-picker-button.style';

const IPayPickerButton: React.FC<IPayPickerButtonProps> = ({
  testID,
  variant,
  date,
  onPress,
  text,
  dateFormat = dateTimeFormat.ShortMonthYear,
  timeFormat = dateTimeFormat.HourMinute24,
}: IPayPickerButtonProps): JSX.Element => {
  useEffect(() => {
    if (date) {
      const initialTimePeriod = date?.getHours() < 12 ? dayPeriod.AM : dayPeriod.PM;
      setTimePeriod(initialTimePeriod);
    }
  }, []);

  const [timePeriod, setTimePeriod] = useState<dayPeriod>(dayPeriod.AM);
  const formattedDate = formatDateAndTime(date, dateFormat); // Formatted date string
  const formattedTime = formatDateAndTime(date, timeFormat); // Formatted time string
  const { colors } = useTheme();
  const styles = pickerStyles(colors);
  const handleTimePeriodChange = (newPeriod: dayPeriod) => {
    setTimePeriod(newPeriod);
  };

  const renderDateVariant = () => (
    <IPayPressable onPress={onPress} style={styles.variantContainer}>
      <IPaySubHeadlineText style={styles.timeText} regular text={formattedDate} />
    </IPayPressable>
  );

  const renderTextVariant = () => (
    <IPayPressable onPress={onPress} style={styles.variantContainer}>
      <IPaySubHeadlineText style={styles.timeText} regular text={text} />
    </IPayPressable>
  );

  const renderTimeVariant = () => (
    <IPayView style={styles.rowStyles}>
      <IPayPressable onPress={onPress} style={styles.variantContainer}>
        <IPaySubHeadlineText regular text={`${formattedTime} ${timePeriod}`} style={styles.timeText} />
      </IPayPressable>
      <IPayView style={styles.segment}>
        <IPayPressable
          style={[styles.timeButton, timePeriod === dayPeriod.AM && styles.activeButton]}
          onPress={() => handleTimePeriodChange(dayPeriod.AM)}
        >
          <IPayFootnoteText
            style={[styles.activeButtonText, timePeriod === dayPeriod.AM && styles.buttonText]}
            text={dayPeriod.AM}
          />
        </IPayPressable>
        <IPayPressable
          style={[styles.timeButton, timePeriod === dayPeriod.PM && styles.activeButton]}
          onPress={() => handleTimePeriodChange(dayPeriod.PM)}
        >
          <IPayFootnoteText
            style={[styles.activeButtonText, timePeriod === dayPeriod.PM && styles.buttonText]}
            text={dayPeriod.PM}
          />
        </IPayPressable>
      </IPayView>
    </IPayView>
  );

  const renderDateAndTimeVariant = () => (
    <IPayView style={styles.rowStyles}>
      <IPayPressable onPress={onPress} style={styles.variantContainer}>
        <IPaySubHeadlineText style={styles.timeText} regular text={formattedDate} />
      </IPayPressable>
      <IPayPressable onPress={onPress} style={styles.variantContainer}>
        <IPaySubHeadlineText style={styles.timeText} regular text={`${formattedTime} ${timePeriod}`} />
      </IPayPressable>
    </IPayView>
  );

  return (
    <IPayView testID={`${testID}-picker`}>
      {variant === pickerVariant.Date && renderDateVariant()}
      {variant === pickerVariant.Text && renderTextVariant()}
      {variant === pickerVariant.Time && renderTimeVariant()}
      {variant === pickerVariant.DateAndTime && renderDateAndTimeVariant()}
    </IPayView>
  );
};

export default IPayPickerButton;
