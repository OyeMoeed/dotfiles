import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms/index';
import { IPayButton, IPayCounterButton, IPayToggleButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayListProps } from './ipay-list.interface';
import styles from './ipay-list.style';

/**
 * A component consisting of a heading and an input field.
 * @param {IPayListProps} props - The props for the IPayList component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayList: React.FC<IPayListProps> = ({
  testID,
  title,
  textStyle,
  isShowIcon,
  icon,
  isShowLeftIcon,
  leftIcon,
  isShowTime,
  timeText,
  isShowDate,
  dateText,
  isShowIPayToggleButton,
  toggleState,
  isShowCounterButton,
  detailText,
  detailTextStyle,
  onToggleChange,
  isShowSubTitle,
  subTitle,
  onPress,
  onPressUp,
  onPressDown,
  onPressIcon,
  style,
  containerStyle,
  isShowSaveQRButton,
  subTextStyle,
  onPressSaveQR,
  centerContainerStyles,
  leftIconContainerStyles,
  rightContainerStyles,
  rightText,
  onDatePress,
  onTimePress,
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const dynamicStyles = styles(colors);

  const hasRightComponent = () =>
    isShowIcon || isShowDate || isShowTime || isShowIPayToggleButton || isShowCounterButton;

  return (
    <IPayPressable testID={testID} onPress={onPress} style={[dynamicStyles.mainContiner, style]}>
      <IPayView style={[dynamicStyles.container, containerStyle]}>
        <IPayView
          style={[isShowLeftIcon && dynamicStyles.leftIconContainerMargin, isShowLeftIcon && leftIconContainerStyles]}
        >
          {isShowLeftIcon ? leftIcon || <IPayIcon icon={icons.CHECKED} /> : <></>}
        </IPayView>
        <IPayView style={[dynamicStyles.centerContainer, centerContainerStyles]}>
          {title && <IPayFootnoteText style={[dynamicStyles.font, textStyle]}>{title}</IPayFootnoteText>}
          {isShowSubTitle && (
            <IPayCaption1Text style={[dynamicStyles.subTitleStyle, subTextStyle]}>{subTitle}</IPayCaption1Text>
          )}
          {isShowSaveQRButton && (
            <IPayButton
              btnStyle={dynamicStyles.buttonStyle}
              onPress={onPressSaveQR}
              btnType="primary"
              btnText={localizationText.COMMON.SAVE}
              textColor={colors.secondary.secondary800}
              rightIcon={<IPayIcon icon={icons.save} color={colors.secondary.secondary800} />}
            />
          )}
        </IPayView>
        <IPayView
          style={[
            dynamicStyles.commonContainer,
            rightContainerStyles,
            hasRightComponent() && dynamicStyles.rightIconContainerMargin,
          ]}
        >
          <IPayView>
            {isShowIcon ? (
              (icon && (
                <IPayButton
                  btnType="link-button"
                  btnText={detailText}
                  onPress={onPressIcon}
                  rightIcon={icon}
                  textStyle={[dynamicStyles.copyText, detailTextStyle]}
                  btnStyle={dynamicStyles.rightIconContainer}
                />
              )) || (
                <IPayView>
                  <IPayIcon icon={icons.ARROW_RIGHT_DEFAULT} color={colors.primary.primary500} />
                </IPayView>
              )
            ) : (
              <></>
            )}
            {rightText && rightText}
            {detailText && (
              <IPaySubHeadlineText regular style={[dynamicStyles.copyText, detailTextStyle]} text={detailText} />
            )}
          </IPayView>
          <IPayView>
            {isShowDate ? (
              <IPayButton
                onPress={() => onDatePress?.()}
                btnStyle={[dynamicStyles.btnStyle, dynamicStyles.btnTimeContainer]}
                textStyle={[dynamicStyles.btnTextStyle, dynamicStyles.btnTimeTextStyle]}
                btnText={dateText}
              />
            ) : (
              <></>
            )}
          </IPayView>
          <IPayView>
            {isShowTime ? (
              <IPayButton
                onPress={() => onTimePress?.()}
                btnStyle={[dynamicStyles.btnStyle, dynamicStyles.btnTimeContainer]}
                textStyle={[dynamicStyles.btnTextStyle, dynamicStyles.btnTimeTextStyle]}
                btnText={timeText}
              />
            ) : (
              <></>
            )}
          </IPayView>
          <IPayView>
            {isShowIPayToggleButton ? (
              <IPayToggleButton toggleState={toggleState} onToggleChange={onToggleChange} />
            ) : (
              <></>
            )}
          </IPayView>
          <IPayView>
            {isShowCounterButton ? <IPayCounterButton onPressUp={onPressUp} onPressDown={onPressDown} /> : <></>}
          </IPayView>
        </IPayView>
      </IPayView>
    </IPayPressable>
  );
};

export default IPayList;
