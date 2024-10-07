import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { IPayListView } from '@app/components/molecules';
import { SelectedValue } from '@app/screens/add-new-sadad-bill/add-new-sadad-bill.interface';
import useConstantData from '@app/constants/use-constants';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';

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
    const [isVisible, setIsVisible] = useState(false);

    const { salaryTypes } = useConstantData();

    const onCloseSalaryTypesSheet = () => {
      setIsVisible(false);
      salaryTypeBottomSheetRef?.current?.close();
    };

    const onPressSelectReason = () => {
      setIsVisible(true);
      salaryTypeBottomSheetRef?.current?.present();
    };

    useImperativeHandle(ref, () => ({
      onShowSalaryType: onPressSelectReason,
      onHideSalaryType: onCloseSalaryTypesSheet,
    }));

    return (
      <IPayPortalBottomSheet
        heading={header || 'MUSANED.SALARY_TYPE'}
        onCloseBottomSheet={onCloseSalaryTypesSheet}
        isVisible={isVisible}
        customSnapPoint={['50%']}
        simpleHeader
        simpleBar
        cancelBnt
        bold
        onCancel={onCloseSalaryTypesSheet}
        ref={salaryTypeBottomSheetRef}
      >
        <IPayListView
          list={[isFilter && { id: 'All', text: 'All' }, ...(anotherArray || salaryTypes)].filter((value) => !!value)}
          onPressListItem={onPressSelectSalaryTypeItem}
          selectedListItem={salaryType?.text}
        />
      </IPayPortalBottomSheet>
    );
  },
);

export default IPayMusnaedSalaryTypeBottomSheet;
