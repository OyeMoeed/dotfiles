import React from 'react';

import { buttonVariants } from '@app/utilities';
import icons from '@app/assets/icons';
import { IPayIcon, IPayLinearGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';

import { IPayBottomSheetHandleProps } from './ipay-bottom-sheet.interface';
import bottonSheetStyles from './ipay-bottom-sheet.style';

const IPayBottomSheetHandle: React.FC<IPayBottomSheetHandleProps> = ({
  backBtn,
  disabled,
  heading,
  simpleBar,
  gradientBar,
  cancelBnt,
  doneBtn,
  onPressCancel,
  onPressDone,
  doneText,
  bold,
  doneButtonStyle,
  cancelButtonStyle,
  bgGradientColors,
  headerContainerStyles,
}) => {
  const { colors } = useTheme();
  const styles = bottonSheetStyles(colors);
  const gradient = bgGradientColors || colors.bottomsheetGradient;

  return (
    <IPayLinearGradientView style={[styles.headerContainer, headerContainerStyles]} gradientColors={gradient}>
      <>
        {gradientBar && (
          <IPayLinearGradientView
            locations={[0.1, 0.9]}
            style={styles.headerBar}
            gradientColors={colors.gradientPrimary}
          />
        )}
        {simpleBar && <IPayView style={styles.simpleHeaderBar} />}

        <IPayView style={styles.headerTitlesView}>
          <IPayView style={[styles.cancelBtnView, cancelButtonStyle]}>
            {cancelBnt && (
              <IPayButton
                btnType={buttonVariants.LINK_BUTTON}
                medium
                textColor={colors.primary.primary500}
                btnIconsDisabled
                onPress={onPressCancel}
                btnText="COMMON.CANCEL"
              />
            )}
            {backBtn && (
              <IPayButton
                btnStyle={styles.backButtonStyle}
                small
                textColor={colors.primary.primary500}
                btnType={buttonVariants.LINK_BUTTON}
                btnText="COMMON.BACK"
                onPress={onPressCancel}
                leftIcon={<IPayIcon icon={icons.backBtnIcon} size={14} color={colors.primary.primary500} />}
              />
            )}
          </IPayView>

          {heading && (
            <IPaySubHeadlineText
              style={[styles.titleText, bold && styles.boldStyle]}
              color={colors.primary.primary900}
              text={heading || 'COMMON.TITTLE'}
            />
          )}

          <IPayView style={[styles.doneBtnView, doneButtonStyle]}>
            {doneBtn && (
              <IPayButton
                btnType={buttonVariants.LINK_BUTTON}
                medium
                btnIconsDisabled
                disabled={disabled}
                onPress={onPressDone}
                btnText={doneText || 'COMMON.DONE'}
              />
            )}
          </IPayView>
        </IPayView>
      </>
    </IPayLinearGradientView>
  );
};

export default IPayBottomSheetHandle;
