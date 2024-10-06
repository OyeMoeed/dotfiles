import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon } from '@app/components/atoms';
import { IPayList } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { InternationalBeneficiaryStatus } from '@app/enums/international-beneficiary-status.enum';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BeneficiaryTypes } from '@app/utilities';
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
  isLocalTransfer,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = localTransferStyles(colors);

  const sortTypes = [
    {
      type: t('LOCAL_TRANSFER.ACTIVE_INACTIVE'),
      isActiveToInactive: isLocalTransfer ? BeneficiaryTypes.ACTIVE : InternationalBeneficiaryStatus.ACTIVE,
    },
    {
      type: t('LOCAL_TRANSFER.INACTIVE_ACTIVE'),
      isActiveToInactive: isLocalTransfer ? BeneficiaryTypes.ACTIVE : InternationalBeneficiaryStatus.INACTIVE,
    },
  ];

  const onSelectSort = (sort: string) => {
    setSortByActive(sort);
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
      onDone={() => setSortByActive(isLocalTransfer ? BeneficiaryTypes.ACTIVE : InternationalBeneficiaryStatus.ACTIVE)}
    >
      <IPayFlatlist
        style={styles.sheetContainer}
        data={sortTypes}
        renderItem={({ item }) => (
          <IPayList
            title={item.type}
            isShowIcon={sortByActive === item.isActiveToInactive}
            containerStyle={styles.listStyle}
            onPress={() => onSelectSort(item?.isActiveToInactive)}
            icon={<IPayIcon size={18} icon={icons.tick_mark_default} color={colors.primary.primary500} />}
          />
        )}
      />
    </IPayBottomSheet>
  );
};

export default IPayBeneficiariesSortSheet;
