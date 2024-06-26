import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef } from 'react';
import { SectionList } from 'react-native';
import IPaySectionListProps from './ipay-section-list.interface';
import sectionListStyles from './ipay-section-list.style';

const IPaySectionList = forwardRef<SectionList<any>, IPaySectionListProps>(
  (
    { testID, data, style, refreshControl, renderItem, renderSectionHeader, showsVerticalScrollIndicator, ...rest },
    ref
  ) => {
    const { colors } = useTheme();
    const styles = sectionListStyles(colors);

    return (
      <SectionList
        ref={ref}
        testID={`${testID}-section-list`}
        style={style}
        sections={data}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        {...rest}
      />
    );
  }
);

export default IPaySectionList;
