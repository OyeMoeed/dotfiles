import { IPayScrollView, IPayView } from '@app/components/atoms';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import useVirtualCardData from '@app/screens/virtual-card/use-virtual-card-data';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardDetailsSegment } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import IPayCardList from '../ipay-card-list/ipay-card-list.component';
import IPayCardSegmentProps from './ipay-card-segment.interface';
import cardSegmentStyles from './ipay-card-segment.styles';

const IPayCardSegment: React.FC<IPayCardSegmentProps> = ({ testID, selectedCardType, cardOption }) => {
  const { colors } = useTheme();
  const styles = cardSegmentStyles(colors);
  const { SEGMENT_LABEL } = useVirtualCardData();
  const [selectedTab, setSelectedTab] = useState<CardDetailsSegment | string>(SEGMENT_LABEL[0]);
  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <IPayView style={styles.container} testID={`${testID}-card-flatlist`}>
      <IPaySegmentedControls
        tabs={SEGMENT_LABEL}
        selectedTab={selectedTab}
        customStyles={styles.segmentStyles}
        onSelect={handleSelectedTab}
      />

      <IPayScrollView style={styles.flatListContainer}>
        <IPayCardList segmentType={selectedTab} selectedCardType={selectedCardType} cardOption={cardOption} />
      </IPayScrollView>
    </IPayView>
  );
};

export default IPayCardSegment;
