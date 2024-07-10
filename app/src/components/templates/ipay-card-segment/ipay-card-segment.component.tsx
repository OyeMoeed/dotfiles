import { IPayView } from '@app/components/atoms';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import useVirtualCardData from '@app/screens/virtual-card/use-virtual-card-data';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardDetailsSegment } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import IPayCardFlatList from '../ipay-card-flatlist/ipay-card-flatlist.component';
import IPayCardSegmentProps from './ipay-card-segment.interface';
import cardSegmentStyles from './ipay-card-segment.styles';

const IPayCardSegment: React.FC<IPayCardSegmentProps> = ({ testID, selectedCardType }) => {
  const { colors } = useTheme();
  const styles = cardSegmentStyles(colors);
  const { SEGMENT_LABEL } = useVirtualCardData();
  const [selectedTab, setSelectedTab] = useState<CardDetailsSegment | string>(SEGMENT_LABEL[0]);
  const handleSelectedTab = (tab: string, index: number) => {
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

      <IPayCardFlatList segmentType={selectedTab} selectedCardType={selectedCardType} />
    </IPayView>
  );
};

export default IPayCardSegment;
