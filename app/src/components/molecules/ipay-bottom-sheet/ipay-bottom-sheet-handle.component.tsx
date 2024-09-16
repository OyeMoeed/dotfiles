import { IPayLinearGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { buttonVariants } from '@app/utilities';
import { IPayBottomSheetHandleProps } from './ipay-bottom-sheet.interface';
import bottonSheetStyles from './ipay-bottom-sheet.style';

const IPayBottomSheetHandle: React.FC<IPayBottomSheetHandleProps> = ({
  simpleHeader,
  heading,
  onPressCancel,
  onPressDone,
  simpleHeaderBar,
  simpleTitleStyle,
}) => {
  const { colors } = useTheme();
  const styles = bottonSheetStyles(colors);

  return (
    <IPayView style={styles.headerContainer}>
      {simpleHeader ? (
        <IPayView style={styles.simpleHeaderTitleView}>
          <IPayView style={styles.simpleHeaderBar} />

          <IPaySubHeadlineText style={[styles.simpleTitleText, simpleTitleStyle]}>{heading}</IPaySubHeadlineText>
        </IPayView>
      ) : (
        <>
          {simpleHeaderBar ? (
            <IPayView style={styles.simpleHeaderBar} />
          ) : (
            <IPayLinearGradientView
              locations={[0.1, 0.9]}
              style={styles.headerBar}
              gradientColors={colors.gradientPrimary}
            />
          )}
          <IPayView style={styles.headerTitlesView}>
            <IPayButton
              btnType={buttonVariants.LINK_BUTTON}
              medium
              btnIconsDisabled
              onPress={onPressCancel}
              btnText="COMMON.CANCEL"
            />

            <IPaySubHeadlineText style={styles.titleText} text={heading || 'COMMON.TITTLE'} />

            <IPayButton
              btnType={buttonVariants.LINK_BUTTON}
              medium
              btnIconsDisabled
              onPress={onPressDone}
              btnText="COMMON.DONE"
            />
          </IPayView>
        </>
      )}
    </IPayView>
  );
};

export default IPayBottomSheetHandle;
