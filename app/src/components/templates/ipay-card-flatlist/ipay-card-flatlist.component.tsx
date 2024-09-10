import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon } from '@app/components/atoms';
import { IPayList } from '@app/components/molecules';
import { CARD_DATA, CARD_DATA_PHYSICAL_CARD } from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardDetailsSegment, CardOptions } from '@app/utilities/enums.util';
import React from 'react';
import { ListRenderItem } from 'react-native';
import cardSegmentStyles from '../ipay-card-segment/ipay-card-segment.styles';
import { IPayCardFlatListProps } from './ipay-card-flatlist.interface';

const IPayCardFlatList: React.FC<IPayCardFlatListProps> = ({ selectedCardType, segmentType, testID, cardOption }) => {
  const { colors } = useTheme();
  const styles = cardSegmentStyles(colors);
  // Determine the data based on the selected card type
  const cardData =
    cardOption === CardOptions.VIRTUAL ? CARD_DATA[selectedCardType] : CARD_DATA_PHYSICAL_CARD[selectedCardType];

  const renderItem: ListRenderItem<any> = ({ item }) => {
    const isDescriptionAvailable = !!item.description;
    return (
      <IPayList
        isShowLeftIcon
        title={isDescriptionAvailable ? item.description : item}
        textStyle={styles.textColor}
        detailText={item.fee}
        detailTextStyle={styles.detailTextColor}
        showDetail
        containerStyle={isDescriptionAvailable && styles.zeroPadding}
        leftIcon={
          !isDescriptionAvailable && <IPayIcon icon={icons.tick_circle} color={colors.primary.primary900} size={24} />
        }
      />
    );
  };

  const data = segmentType === CardDetailsSegment.CARD_FEATURE ? cardData?.features : cardData?.fees;

  return (
    <IPayFlatlist
      testID={`${testID}-card-flatlist`}
      data={data}
      renderItem={renderItem}
      style={styles.flatlist}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default IPayCardFlatList;
