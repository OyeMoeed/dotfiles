import { IPayBottomSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import { FC, forwardRef, useImperativeHandle, useRef } from 'react';
import IPayView from '../../atoms/ipay-view/ipay-view.component';
import IPayCalendar from '../ipay-calendar/ipay-calendar.component';
import { IPayCalendarBottomSheetHandle, IPayCalendarBottomSheetProps } from './ipay-calendar-bottom-sheet.interface';

/**
 * @param {function} [props.onDateSelected] - Callback function invoked when the IPayCalendar date changes.
 * @param {function} [props.heading] - heading for the bottom sheet
 */

const IPayCalendarBottomSheet: FC<IPayCalendarBottomSheetProps> = forwardRef<
  IPayCalendarBottomSheetHandle,
  IPayCalendarBottomSheetProps
>(({ onDateSelected, heading }, ref) => {
  const localizationText = useLocalization();
  const calendarBottomSheetRef = useRef(null);

  useImperativeHandle(ref, () => ({
    present: () => {
      calendarBottomSheetRef.current?.present();
    },
    close: () => {
      calendarBottomSheetRef.current?.close();
    },
  }));

  return (
    <IPayBottomSheet
      heading={heading || localizationText.COMMON.SELECT_DATE}
      ref={calendarBottomSheetRef}
      customSnapPoint={['1%', '80%']}
      enablePanDownToClose
      cancelBnt
      doneBtn
    >
      <IPayView>
        <IPayCalendar onDateSelected={onDateSelected} />
      </IPayView>
    </IPayBottomSheet>
  );
});

export default IPayCalendarBottomSheet;
