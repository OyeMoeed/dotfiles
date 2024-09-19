import { IPayIcon, IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';
import React from 'react';
import headerStyles from '../ipay-header.styles';

const LanguageHeader = () => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);

  return (
    <IPayPressable onPress={() => {}} style={styles.rightStyles}>
      <IPayIcon icon={icons.GLOBAL} size={14} />
      <IPaySubHeadlineText text="COMMON.LANGUAGE" regular style={styles.back} />
    </IPayPressable>
  );
};

export default React.memo(LanguageHeader);
