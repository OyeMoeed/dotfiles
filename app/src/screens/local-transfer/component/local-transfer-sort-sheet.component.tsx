import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon } from '@app/components/atoms';
import { IPayList } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { BeneficiaryTypes } from '@app/utilities/enums.util';
import { FC } from 'react';
import localTransferStyles from '../local-transfer.style';
import { LocalTransferSortSheetProps } from './local-transfer-sort-sheet.interface';

/**
 * Properties for the LocalTransferSortSheet component.
 * @param {function} props.setSortBy - Function to update the sort order. Receives a string to set the sorting direction.
 * @param {string} props.sortBy - Current sort order (active for ascending, inactive for descending).
 * @param {Ref<bottomSheetTypes>} props.sortSheetRef - Reference to the bottom sheet component.
 */
const IPayLocalTransferSortSheet: FC<LocalTransferSortSheetProps> = ({ setSortBy, sortSheetRef, sortBy = true }) => {
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

  const onSelectSort = (sort: string) => {
    setSortBy(sort);
    setTimeout(() => {
      sortSheetRef?.current?.close();
    }, 200);
  };

  return (
    <IPayBottomSheet
      heading="COMMON.SORT_BY"
      enablePanDownToClose
      cancelBnt
      bold
      customSnapPoint={['1', isAndroidOS ? '30%' : '35%']}
      ref={sortSheetRef}
      headerContainerStyles={styles.sheetHeader}
      bgGradientColors={colors.sheetGradientPrimary10}
      bottomSheetBgStyles={styles.sheetBackground}
      doneBtn
      doneText="COMMON.RESET"
      onDone={() => setSortBy(BeneficiaryTypes.ACTIVE)}
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

export default IPayLocalTransferSortSheet;
