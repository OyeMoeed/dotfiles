import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayView } from '@app/components/atoms';
import { IPaySupportedCards } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { PayChannel } from '@app/utilities/enums.util';
import React from 'react';
import { IPayAmountHeaderProps } from './ipay-amount-header.interface';
import componentHeaderStyles from './ipay-amount-header.styles';

const IPayAmountHeader: React.FC<IPayAmountHeaderProps> = ({ testID, title, channel }) => {
  const { colors } = useTheme();
  const styles = componentHeaderStyles(colors);

  return (
    <IPayView testID={`${testID}-amount-header`} style={styles.cardHeader}>
      <IPayIcon
        icon={channel === PayChannel.APPLE ? icons.apple_pay : icons.cards}
        size={24}
        color={colors.primary.primary900}
      />
      <IPayView style={styles.textContainer}>
        {title && (
          <IPayCaption1Text
            text={channel === PayChannel.APPLE ? 'TOP_UP.APPLE_PAY' : 'TOP_UP.CARD_TITLE'}
            style={styles.headerText}
          />
        )}
      </IPayView>
      {channel === PayChannel.CARD && <IPaySupportedCards />}
    </IPayView>
  );
};

export default IPayAmountHeader;
