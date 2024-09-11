import React from 'react';
import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';

import { IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { buttonVariants } from '@app/utilities/enums.util';
import cardManagementStyles from './card-management.style';

const IPayNoCardIndicatorComponenent: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();

  const styles = cardManagementStyles(colors);

  return (
    <IPayView style={styles.noCardContainer}>
      <IPayIcon icon={icons.cardSlash} size={64} color={colors.primary.primary900} />
      <IPayView style={styles.noCardDesContainer}>
        <IPayFootnoteText regular color={colors.primary.primary800} text={'CARD_MANAGEMENT.YOU_DONT_HAVE_CARD'} />
        <IPayFootnoteText regular color={colors.primary.primary800} text={'CARD_MANAGEMENT.YOU_CAN_ADD_NEW_CARD'} />
      </IPayView>
      <IPayButton
        btnStyle={styles.btnStyle}
        btnType={buttonVariants.PRIMARY}
        large
        btnText={localizationText.MENU.ADD_CARD}
        leftIcon={<IPayIcon icon={icons.add_bold} size={20} color={colors.natural.natural0} />}
      />
    </IPayView>
  );
};

export default IPayNoCardIndicatorComponenent;
