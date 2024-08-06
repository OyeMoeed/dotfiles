import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon } from '@app/components/atoms';
import { IPayList } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { FC } from 'react';
import localTransferStyles from '../local-transfer.style';
import { TransferSortSheetProps } from './transfer-sort-sheet.interface';

/**
 * Properties for the TransferSortSheet component.
 * @param {function} props.setSortBy - Function to update the sort order. Receives a boolean to set the sorting direction.
 * @param {boolean} props.sortBy - Boolean indicating the current sort order (true for ascending, false for descending).
 * @param {Ref<bottomSheetTypes>} props.sortSheetRef - Reference to the bottom sheet component.
 */
const IPayTransferSortSheet: FC<TransferSortSheetProps> = ({ setSortBy, sortSheetRef, sortBy = true }) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = localTransferStyles(colors);

  const sortTypes = [
    {
      type: localizationText.LOCAL_TRANSFER.ACTIVE_INACTIVE,
      isActiveToInactive: true,
    },
    {
      type: localizationText.LOCAL_TRANSFER.INACTIVE_ACTIVE,
      isActiveToInactive: false,
    },
  ];

  const onSelectSort = (sort: boolean) => {
    setSortBy(sort);
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
      onDone={() => setSortBy(true)}
    >
      <IPayFlatlist
        style={styles.sheetContainer}
        data={sortTypes}
        renderItem={({ item }) => (
          <IPayList
            title={item.type}
            isShowIcon={sortBy === item.isActiveToInactive}
            containerStyle={styles.listStyle}
            onPress={() => onSelectSort(item.isActiveToInactive)}
            icon={<IPayIcon size={18} icon={icons.tick_mark_default} color={colors.primary.primary500} />}
          />
        )}
      />
    </IPayBottomSheet>
  );
};

export default IPayTransferSortSheet;
