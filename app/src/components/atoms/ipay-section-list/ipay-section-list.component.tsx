import { forwardRef, useCallback } from 'react';
import { SectionList } from 'react-native';
import IPayItemSeparator from '../ipay-item-separator/ipay-item-separator.component';
import IPaySectionListProps from './ipay-section-list.interface';

const IPaySectionList = forwardRef<SectionList<any>, IPaySectionListProps>(
  (
    {
      testID,
      data,
      style,
      refreshControl,
      renderItem,
      renderSectionHeader,
      itemSeparatorStyle,
      showsVerticalScrollIndicator,
      ...rest
    },
    ref,
  ) => {
    const itemSeparator = useCallback(
      () => <IPayItemSeparator itemSeparatorStyle={itemSeparatorStyle} />,
      [itemSeparatorStyle],
    );
    return (
      <SectionList
        ref={ref}
        testID={`${testID}-section-list`}
        style={style}
        sections={data}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        ItemSeparatorComponent={() => itemSeparator()}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        {...rest}
      />
    );
  },
);

export default IPaySectionList;
