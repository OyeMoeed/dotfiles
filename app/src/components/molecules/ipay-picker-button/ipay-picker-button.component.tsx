import React, { JSX, useEffect, useState } from 'react';
import { IPayFootnoteText, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import { dateTimeFormat } from '@app/utilities';
import { DayPeriod, PickerVariant } from '@app/utilities/enums.util';

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
  const [timePeriod, setTimePeriod] = useState<DayPeriod>(DayPeriod.AM);
  const formattedDate = formatDateAndTime(date, dateFormat); // Formatted date string
  const formattedTime = formatDateAndTime(date, timeFormat); // Formatted time string
  const { colors } = useTheme();
  const styles = pickerStyles(colors);

  useEffect(() => {
    if (date) {
      const initialTimePeriod = date?.getHours() < 12 ? DayPeriod.AM : DayPeriod.PM;
      setTimePeriod(initialTimePeriod);
    }
  }, []);

  const handleTimePeriodChange = (newPeriod: DayPeriod) => {
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
          style={[styles.timeButton, timePeriod === DayPeriod.AM && styles.activeButton]}
          onPress={() => handleTimePeriodChange(DayPeriod.AM)}
        >
          <IPayFootnoteText
            style={[styles.activeButtonText, timePeriod === DayPeriod.AM && styles.buttonText]}
            text={DayPeriod.AM}
          />
        </IPayPressable>
        <IPayPressable
          style={[styles.timeButton, timePeriod === DayPeriod.PM && styles.activeButton]}
          onPress={() => handleTimePeriodChange(DayPeriod.PM)}
        >
          <IPayFootnoteText
            style={[styles.activeButtonText, timePeriod === DayPeriod.PM && styles.buttonText]}
            text={DayPeriod.PM}
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
      {variant === PickerVariant.Date && renderDateVariant()}
      {variant === PickerVariant.Text && renderTextVariant()}
      {variant === PickerVariant.Time && renderTimeVariant()}
      {variant === PickerVariant.DateAndTime && renderDateAndTimeVariant()}
    </IPayView>
  );
};

export default IPayPickerButton;
