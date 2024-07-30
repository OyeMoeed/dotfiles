import React from 'react';
import icons from '@app/assets/icons';
import IPayChip from '../ipay-chip/ipay-chip.component';
import { IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import styles from './ipay-selected-filters.styles';
import { IPaySelectedFiltersProps } from './ipay-selected-filters-list.interface';




const IPaySelectedFilters: React.FC<IPaySelectedFiltersProps> = ({ testID,filters, onRemoveFilter }) => {
  return (
    <IPayView testID={`${testID}-selected-filters-list`} style={styles.filterWrapper}>
      <IPayScrollView horizontal showsHorizontalScrollIndicator={false}>
        <>
          {filters.map((text) => (
            <IPayChip
              key={text}
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
        </>
      </IPayScrollView>
    </IPayView>
  );
};

export default IPaySelectedFilters;
