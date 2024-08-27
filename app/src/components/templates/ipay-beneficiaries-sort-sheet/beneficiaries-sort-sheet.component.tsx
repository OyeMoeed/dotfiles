import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon } from '@app/components/atoms';
import { IPayList } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { BeneficiaryTypes } from '@app/utilities/enums.util';
import { FC } from 'react';
import localTransferStyles from '../../../screens/local-transfer/local-transfer.style';
import { BeneficiariesSortSheetProps } from './beneficiaries-sort-sheet.interface';

/**
 * Properties for the TransferSortSheet component.
 * @param {function} props.setSortByActive - Function to update the sort order. Receives a boolean to set the sorting direction.
 * @param {string} props.sortByActive - Boolean indicating the current sort order (true for ascending, false for descending).
 * @param {Ref<bottomSheetTypes>} props.sortSheetRef - Reference to the bottom sheet component.
 */
const IPayBeneficiariesSortSheet: FC<BeneficiariesSortSheetProps> = ({
  setSortByActive,
  sortSheetRef,
  sortByActive = true,
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = localTransferStyles(colors);

  const sortTypes = [
    {
      type: localizationText.LOCAL_TRANSFER.ACTIVE_INACTIVE,
      isActiveToInactive: BeneficiaryTypes.ACTIVE,
    },
    {
      type: localizationText.LOCAL_TRANSFER.INACTIVE_ACTIVE,
      isActiveToInactive: BeneficiaryTypes.INACTIVE,
    },
  ];

  const onSelectSort = (sort: boolean) => {
    setSortByActive(sort);
    setTimeout(() => {
      sortSheetRef?.current?.close();
    }, 200);
  };

  return (
    <IPayBottomSheet
      heading={localizationText.COMMON.SORT_BY}
      enablePanDownToClose
      cancelBnt
      bold
      customSnapPoint={['1', isAndroidOS ? '30%' : '35%']}
      ref={sortSheetRef}
      headerContainerStyles={styles.sheetHeader}
      bgGradientColors={colors.sheetGradientPrimary10}
      bottomSheetBgStyles={styles.sheetBackground}
      doneBtn
      doneText={localizationText.COMMON.RESET}
      onDone={() => setSortByActive(BeneficiaryTypes.ACTIVE)}
    >
      <IPayFlatlist
        style={styles.sheetContainer}
        data={sortTypes}
        renderItem={({ item }) => (
          <IPayList
            title={item.type}
            isShowIcon={sortByActive === item.isActiveToInactive}
            containerStyle={styles.listStyle}
            onPress={() => onSelectSort(item.isActiveToInactive)}
            icon={<IPayIcon size={18} icon={icons.tick_mark_default} color={colors.primary.primary500} />}
          />
        )}
      />
    </IPayBottomSheet>
  );
};

export default IPayBeneficiariesSortSheet;
