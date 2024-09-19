import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayNoResult } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { IPayLoadFailedProps } from './ipay-load-failed.interface';
import loadFailedStyles from './ipay-load-failed.style';

const IPayLoadFailed: React.FC<IPayLoadFailedProps> = ({ onPressLoad }) => {
  const { colors } = useTheme();

  const styles = loadFailedStyles(colors);

  return (
    <IPayView style={styles.container}>
      <IPayNoResult
        textColor={colors.primary.primary800}
        iconColor={colors.primary.primary800}
        iconSize={40}
        message="COMMON.FAILED_TO_LOAD"
        showIcon
        textStyle={styles.messageText}
        icon={icons.danger}
      />
      <IPayFootnoteText text="COMMON.PAGE_NOT_LOAD" color={colors.primary.primary800} />
      <IPayButton
        btnType={buttonVariants.PRIMARY}
        medium
        onPress={onPressLoad}
        btnText="COMMON.REFRESH"
        hasRightIcon
        btnStyle={styles.refresh}
        rightIcon={<IPayIcon icon={icons.refresh} color={colors.natural.natural0} />}
      />
    </IPayView>
  );
};

export default IPayLoadFailed;
