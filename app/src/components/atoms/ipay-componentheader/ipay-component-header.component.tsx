import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayView } from '@app/components/atoms';
import { IPaySupportedCards } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { payChannel } from '@app/utilities/enums.util';
import React from 'react';
import { IPayComponentHeaderProps } from './ipay-component-header.interface';
import componentHeaderStyles from './ipay-component-header.styles';

const IPayComponentHeader: React.FC<IPayComponentHeaderProps> = ({ title, channel }) => {
  const { colors } = useTheme();
  const styles = componentHeaderStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayView style={[styles.cardHeader]}>
      <IPayIcon
        icon={channel === payChannel.APPLE ? icons.apple_pay : icons.cards}
        size={24}
        color={colors.primary.primary900}
      />
      <IPayView style={styles.textContainer}>
        {title && (
          <IPayCaption1Text
            text={channel === payChannel.APPLE ? localizationText.apple_pay : localizationText.card_title}
            style={[styles.headerText]}
          />
        )}
      </IPayView>
      {channel === payChannel.CARD && <IPaySupportedCards />}
    </IPayView>
  );
};

export default IPayComponentHeader;
