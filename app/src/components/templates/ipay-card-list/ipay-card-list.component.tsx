import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayList } from '@app/components/molecules';
import { CARD_DATA, CARD_DATA_PHYSICAL_CARD } from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardDetailsSegment, CardOptions } from '@app/utilities/enums.util';
import React from 'react';
import cardSegmentStyles from '../ipay-card-segment/ipay-card-segment.styles';
import { IPayCardListProps } from './ipay-card-list.interface';

const IPayCardList: React.FC<IPayCardListProps> = ({ selectedCardType, segmentType, testID, cardOption }) => {
  const { colors } = useTheme();
  const styles = cardSegmentStyles(colors);
  // Determine the data based on the selected card type
  const cardData =
    cardOption === CardOptions.VIRTUAL ? CARD_DATA[selectedCardType] : CARD_DATA_PHYSICAL_CARD[selectedCardType];

  const renderItem = (item: any, index: number) => {
    const isDescriptionAvailable = !!item.description;
    return (
      <IPayList
        key={index}
        isShowLeftIcon
        title={isDescriptionAvailable ? item.description : item}
        textStyle={styles.textColor}
        detailText={item.fee}
        detailTextStyle={styles.detailTextColor}
        showDetail
        containerStyle={[styles.cardContainer, isDescriptionAvailable && styles.zeroPadding]}
        leftIcon={
          !isDescriptionAvailable ? (
            <IPayIcon icon={icons.tick_circle} color={colors.primary.primary900} size={24} />
          ) : undefined
        }
      />
    );
  };

  const data = segmentType === CardDetailsSegment.CARD_FEATURE ? cardData?.features : cardData?.fees;

  return (
    <IPayView style={styles.flatListContainer} testID={testID}>
      {data.map(renderItem)}
    </IPayView>
  );
};

export default IPayCardList;
