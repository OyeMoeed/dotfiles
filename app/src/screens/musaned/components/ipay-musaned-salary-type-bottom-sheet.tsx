import { forwardRef, useImperativeHandle, useRef } from 'react';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayListView } from '@app/components/molecules';
import { SelectedValue } from '@app/screens/add-new-sadad-bill/add-new-sadad-bill.interface';
import useConstantData from '@app/constants/use-constants';

interface IPayMusnaedSalaryTypeBottomSheetProps {
  salaryType?: SelectedValue | null;
  onPressSelectSalaryTypeItem: (item: SelectedValue) => void;
  isFilter?: boolean;
  anotherArray?: Array<SelectedValue>;
  header?: string;
}

const IPayMusnaedSalaryTypeBottomSheet = forwardRef<{}, IPayMusnaedSalaryTypeBottomSheetProps>(
  ({ isFilter, salaryType, onPressSelectSalaryTypeItem, anotherArray, header }, ref) => {
    const salaryTypeBottomSheetRef = useRef<any>(null);

    const { salaryTypes } = useConstantData();

    const onCloseSalaryTypesSheet = () => {
      salaryTypeBottomSheetRef?.current?.close();
    };

    const onPressSelectReason = () => {
      salaryTypeBottomSheetRef?.current?.present();
    };

    useImperativeHandle(ref, () => ({
      onShowSalaryType: onPressSelectReason,
      onHideSalaryType: onCloseSalaryTypesSheet,
    }));

    return (
      <IPayBottomSheet
        heading={header || 'MUSANED.SALARY_TYPE'}
        onCloseBottomSheet={onCloseSalaryTypesSheet}
        customSnapPoint={['1%', '45%']}
        ref={salaryTypeBottomSheetRef}
        simpleHeader
        simpleBar
        cancelBnt
        bold
      >
        <IPayListView
          list={[isFilter && { id: 'All', text: 'All' }, ...(anotherArray || salaryTypes)].filter((value) => !!value)}
          onPressListItem={onPressSelectSalaryTypeItem}
          selectedListItem={salaryType?.text}
        />
      </IPayBottomSheet>
    );
  },
);

export default IPayMusnaedSalaryTypeBottomSheet;
