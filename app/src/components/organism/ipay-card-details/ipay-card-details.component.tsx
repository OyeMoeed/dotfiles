// IPayCardDetail.tsx
import { IPayFootnoteText, IPayHeadlineText, IPayView } from '@app/components/atoms';
import IPayCardChip from '@app/components/molecules/ipay-card-chip/ipay-card-chip.component';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayCardDetailProps } from './ipay-card-details.interface';
import cardDetailStyles from './ipay-card-details.styles';

const IPayCardDetail: React.FC<IPayCardDetailProps> = ({ type, description, cardChipData, testID, showChips }) => {
  const { colors } = useTheme();
  const styles = cardDetailStyles(colors);
  return (
    <IPayView testID={`${testID}-card-details`} style={styles.container}>
      <IPayHeadlineText text={type} regular={false} color={colors.primary.primary900} />
      {showChips && (
        <>
          <IPayFootnoteText text={description} color={colors.primary.primary900} />
          <IPayCardChip data={cardChipData} />
        </>
      )}
    </IPayView>
  );
};

export default IPayCardDetail;
