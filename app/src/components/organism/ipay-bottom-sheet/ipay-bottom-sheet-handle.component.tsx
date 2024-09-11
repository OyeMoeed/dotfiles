import icons from '@app/assets/icons';
import { IPayIcon, IPayLinearGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
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
  const localizationText = useLocalization();
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
                btnType="link-button"
                medium
                textColor={colors.primary.primary500}
                btnIconsDisabled
                onPress={onPressCancel}
                btnText={'COMMON.CANCEL'}
              />
            )}
            {backBtn && (
              <IPayButton
                btnStyle={styles.backButtonStyle}
                small
                textColor={colors.primary.primary500}
                btnType="link-button"
                btnText={'COMMON.BACK'}
                onPress={onPressCancel}
                leftIcon={<IPayIcon icon={icons.backBtnIcon} size={14} color={colors.primary.primary500} />}
              />
            )}
          </IPayView>

          {heading && (
            <IPaySubHeadlineText style={[styles.titleText, bold && styles.boldStyle]} color={colors.primary.primary900}>
              {heading || localizationText.COMMON.TITTLE}
            </IPaySubHeadlineText>
          )}

          <IPayView style={[styles.doneBtnView, doneButtonStyle]}>
            {doneBtn && (
              <IPayButton
                btnType="link-button"
                medium
                btnIconsDisabled
                disabled={disabled}
                onPress={onPressDone}
                btnText={doneText || localizationText.COMMON.DONE}
              />
            )}
          </IPayView>
        </IPayView>
      </>
    </IPayLinearGradientView>
  );
};

export default IPayBottomSheetHandle;
