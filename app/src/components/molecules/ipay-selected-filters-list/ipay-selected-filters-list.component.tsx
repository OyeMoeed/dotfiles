import React from 'react';
import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import IPayChip from '../ipay-chip/ipay-chip.component';
import { IPaySelectedFiltersProps } from './ipay-selected-filters-list.interface';
import getSelectedFilterListStyles from './ipay-selected-filters.styles';

const IPaySelectedFilters: React.FC<IPaySelectedFiltersProps> = ({ testID, filters, onRemoveFilter }) => {
  const { colors } = useTheme();
  const styles = getSelectedFilterListStyles(colors);

  const renderFilters = () => (
    <IPayView>
      {filters?.map((text, index) => (
        <IPayChip
          key={`${`${index}`}-ipay-chip`}
          containerStyle={styles.chipContainer}
          headingStyles={styles.chipHeading}
          textValue={text}
          icon={
            <IPayPressable onPress={() => onRemoveFilter(text)}>
              <IPayIcon icon={icons.CLOSE_SQUARE} size={16} color={styles.chipHeading.color} />
            </IPayPressable>
          }
        />
      ))}
    </IPayView>
  );

  return (
    <IPayView testID={`${testID}-selected-filters-list`} style={styles.filterWrapper}>
      <IPayScrollView horizontal showsHorizontalScrollIndicator={false}>
        {renderFilters()}
      </IPayScrollView>
    </IPayView>
  );
};

export default IPaySelectedFilters;
