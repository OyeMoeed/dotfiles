import { useRef, useState } from 'react';
import { IPayDatePicker, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import moment from 'moment';
import IPayDatePickerSheetStyle from './ipay-date-picker.style.style';
import IPayAnimatedTextInput from '../ipay-animated-input-text/ipay-animated-input-text.component';
import IDatePickerSheetInterface from './ipay-date-picker-sheet.type';

const IPayDatePickerSheet = ({
  label,
  value,
  errorMessage,
  isError,
  maximumDate,
  minimumDate,
  onChange,
}: IDatePickerSheetInterface) => {
  const { colors } = useTheme();
  const styles = IPayDatePickerSheetStyle(colors);
  const ref = useRef<BottomSheetModal>(null);
  const [dateValue, setDateValue] = useState<string | undefined>(value);

  const onDone = () => {
    if (dateValue) {
      onChange(dateValue);
    }
  };

  return (
    <IPayView>
      <IPayAnimatedTextInput
        testID={`${label}-date-picker`}
        label={label}
        editable={false}
        containerStyle={styles.inputStyle}
        value={moment(value).format('yyyy-MM-DD')}
        assistiveText={errorMessage}
        isError={!!errorMessage}
        placeholderTextColor={colors.natural.natural500}
        onPress={() => ref?.current?.present()}
      />

      <IPayPortalBottomSheet
        isVisible
        ref={ref}
        simpleHeader
        simpleBar
        enableDynamicSizing
        overrideContainerStyle={styles.sheetContainerStyle}
        doneBtn
        closeBottomSheetOnDone
        onDone={onDone}
        defaultIndex={-1}
        onCloseBottomSheet={() => {}}
        cancelBnt
        heading="COMMON.SELECT_DATE"
      >
        <IPayDatePicker
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          value={moment(dateValue).toDate()}
          isError={isError}
          onDateChange={setDateValue}
          assistiveText={errorMessage as string}
        />
      </IPayPortalBottomSheet>
    </IPayView>
  );
};

export default IPayDatePickerSheet;
