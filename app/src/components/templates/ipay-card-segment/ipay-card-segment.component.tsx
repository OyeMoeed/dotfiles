import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayList } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardDetailsSegment } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { ListRenderItem } from 'react-native';
import IPayCardSegmentProps from './ipay-card-segment.interface';
import cardSegmentStyles from './ipay-card-segment.styles';

const IPayCardSegment: React.FC<IPayCardSegmentProps> = ({}) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = cardSegmentStyles(colors);
  const data = [
    'Instant card issuance through the App.',
    'Accepted by Visa & Mada network.',
    'Free for life Card.',
    'Added to Apple Pay & Mada Pay.',
  ];
  const CARD_FEE_DETAILS = [
    { description: 'Annual fee', fee: '0 SAR' },
    { description: 'Replacement Fee', fee: '0 SAR' },
    { description: 'International transaction Fee', fee: '0 SAR' },
    { description: 'Dispute fee', fee: '0 SAR' },
  ];

  const segmentLabel = ['Card Features', 'Card Fees'];
  const [selectedTab, setSelectedTab] = useState<string>(segmentLabel[0]);
  const renderFeatures: ListRenderItem<string> = ({ item }) => (
    <IPayList
      isShowLeftIcon
      title={item}
      textStyle={styles.textColor}
      leftIcon={<IPayIcon icon={icons.tick_circle} color={colors.primary.primary900} size={24} />}
    />
  );

  const renderFee = ({ item }) => {
    return (
      <IPayList
        isShowLeftIcon
        title={item.description}
        textStyle={styles.textColor}
        detailText={item.fee}
        detailTextStyle={styles.detailTextColor}
      />
    );
  };

  const handleSelectedTab = (tab: string, index: number) => {
    setSelectedTab(tab);
  };

  return (
    <IPayView>
      <IPaySegmentedControls
        tabs={segmentLabel}
        selectedTab={selectedTab}
        customStyles={styles.segmentStyles}
        onSelect={handleSelectedTab}
      />
      <IPayFlatlist
        data={selectedTab == CardDetailsSegment.CARD_FEATURE ? data : CARD_FEE_DETAILS}
        renderItem={selectedTab == CardDetailsSegment.CARD_FEATURE ? renderFeatures : renderFee}
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </IPayView>
  );
};

export default IPayCardSegment;
