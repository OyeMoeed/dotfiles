import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon } from '@app/components/atoms';
import { IPayList } from '@app/components/molecules';
import { CARD_FEATURES, CARD_FEE_DETAILS } from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardDetailsSegment } from '@app/utilities/enums.util';
import React from 'react';
import { ListRenderItem } from 'react-native';
import IPayCardSegmentProps from '../ipay-card-segment/ipay-card-segment.interface';
import cardSegmentStyles from '../ipay-card-segment/ipay-card-segment.styles';

const IPayCardFlatList: React.FC<IPayCardSegmentProps> = ({ type }) => {
  const { colors } = useTheme();
  const styles = cardSegmentStyles(colors);

  const renderItem: ListRenderItem<any> = ({ item }) => {
    const isDescriptionAvailable = !!item.description;
    return (
      <IPayList
        isShowLeftIcon
        title={isDescriptionAvailable ? item.description : item}
        textStyle={styles.textColor}
        detailText={isDescriptionAvailable && item.fee}
        detailTextStyle={isDescriptionAvailable ? styles.detailTextColor : undefined}
        leftIcon={
          isDescriptionAvailable ? undefined : (
            <IPayIcon icon={icons.tick_circle} color={colors.primary.primary900} size={24} />
          )
        }
      />
    );
  };

  const data = type === CardDetailsSegment.CARD_FEATURE ? CARD_FEATURES : CARD_FEE_DETAILS;

  return (
    <IPayFlatlist data={data} renderItem={renderItem} style={styles.flatlist} showsVerticalScrollIndicator={false} />
  );
};

export default IPayCardFlatList;
