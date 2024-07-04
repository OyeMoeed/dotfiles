import { IPayMonthYearPicker, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef, useState } from 'react';
import { IPayExpiryDateSheetProps } from './ipay-expirydate-sheet.interface';
import IPayExpiryDateStyles from './ipay-expirydate-sheet.styles';
const IPayExpiryDateSheet = forwardRef<any, IPayExpiryDateSheetProps>(
  ({ testID, selectedDate, closeExpiredBottomSheet, setSelectedDate }, ref) => {
    const localizationText = useLocalization();
    const { colors } = useTheme();
    const styles = IPayExpiryDateStyles(colors);
    const [expiryDate, setExpiryDate] = useState('');
    const handleDateChanges = () => {
      setSelectedDate(expiryDate);
      ref.current.close();
    };
    return (
      <IPayBottomSheet
        heading={localizationText.date}
        onCloseBottomSheet={closeExpiredBottomSheet}
        customSnapPoint={['10%', '55%', '85%']}
        enableDynamicSizing
        ref={ref}
        simpleHeader
        simpleBar
        bold
        cancelBnt
        doneBtn
        onDone={handleDateChanges}
      >
        <IPayView style={styles.sheetContainer}>
          <IPayMonthYearPicker onDateChange={setExpiryDate} value={selectedDate} minimumDate={new Date()} />
          <IPayView style={styles.innerContainer}>
            <IPayButton
              large
              btnType="primary"
              btnIconsDisabled={true}
              btnText={localizationText.save}
              onPress={handleDateChanges}
              btnStyle={styles.buttonStyles}
            />
          </IPayView>
        </IPayView>
      </IPayBottomSheet>
    );
  },
);
export default IPayExpiryDateSheet;
