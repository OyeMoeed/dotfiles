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
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities';
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
  subTitleContainerStyle,
  onPressSaveQR,
  centerContainerStyles,
  leftIconContainerStyles,
  rightContainerStyles,
  rightText,
  onDatePress,
  onTimePress,
  showDetail,
  adjacentTitle,
  adjacentSubTitle,
  children,
  titleLines,
  subTitleLines,
  regularTitle = true,
  shouldTranslateTitle = true,
  shouldTranslateSubTitle = true,
  shouldDetailsTranslate = true,
  showTextInNextLine = false,
  detailIconDisabled,
  detailsTruncation = true,
}) => {
  const { colors } = useTheme();
  const dynamicStyles = styles(colors);

  const hasRightComponent = () =>
    isShowIcon || isShowDate || isShowTime || isShowIPayToggleButton || isShowCounterButton;

  const isDetailsMoreThan30 = detailText && detailText.length > 30;
  return (
    <IPayPressable testID={testID} onPress={onPress} style={[dynamicStyles.mainContiner, style]}>
      <IPayView style={[dynamicStyles.container, containerStyle]}>
        <IPayView
          style={[isShowLeftIcon && dynamicStyles.leftIconContainerMargin, isShowLeftIcon && leftIconContainerStyles]}
        >
          {isShowLeftIcon ? leftIcon || <IPayIcon icon={icons.CHECKED} /> : <IPayView />}
        </IPayView>
        <IPayView style={[dynamicStyles.centerContainer, centerContainerStyles, dynamicStyles.leftTitle]}>
          {title && (
            <IPayView style={dynamicStyles.flexRow}>
              <IPayFootnoteText
                numberOfLines={titleLines}
                style={[dynamicStyles.font, textStyle]}
                regular={regularTitle}
                text={title}
                shouldTranslate={shouldTranslateTitle}
              />
              {adjacentTitle && (
                <IPayFootnoteText numberOfLines={1} style={dynamicStyles.adjacentTitleStyle} regular>
                  {` | ${adjacentTitle}`}
                </IPayFootnoteText>
              )}
            </IPayView>
          )}
          {isShowSubTitle && (
            <IPayView style={[dynamicStyles.flexRow, subTitleContainerStyle]}>
              <IPayCaption1Text
                numberOfLines={subTitleLines}
                style={[dynamicStyles.subTitleStyle, subTextStyle]}
                shouldTranslate={shouldTranslateSubTitle}
              >
                {subTitle}
              </IPayCaption1Text>
              {adjacentSubTitle && (
                <IPayFootnoteText numberOfLines={1} style={dynamicStyles.adjacentSubTitleStyle} regular>
                  {` | ${adjacentSubTitle}`}
                </IPayFootnoteText>
              )}
            </IPayView>
          )}
          {isShowSaveQRButton && (
            <IPayButton
              btnStyle={dynamicStyles.buttonStyle}
              onPress={onPressSaveQR}
              btnType={buttonVariants.PRIMARY}
              btnText="COMMON.SAVE"
              textColor={colors.secondary.secondary800}
              rightIcon={<IPayIcon icon={icons.save2} color={colors.secondary.secondary800} />}
            />
          )}
        </IPayView>
        <IPayView
          style={[
            dynamicStyles.commonContainer,
            rightContainerStyles,
            hasRightComponent() && !showTextInNextLine && dynamicStyles.rightIconContainerMargin,
          ]}
        >
          <IPayView style={dynamicStyles.rightIconWrapper}>
            {isShowIcon ? (
              ((icon || detailText) && (
                <IPayButton
                  btnType={buttonVariants.LINK_BUTTON}
                  btnText={detailText}
                  onPress={onPressIcon}
                  rightIcon={icon}
                  btnIconsDisabled={detailIconDisabled}
                  textStyle={[dynamicStyles.copyText, detailTextStyle]}
                  btnStyle={dynamicStyles.rightIconContainer}
                />
              )) || (
                <IPayView>
                  <IPayIcon icon={icons.ARROW_RIGHT_DEFAULT} color={colors.primary.primary500} />
                </IPayView>
              )
            ) : (
              <IPayView />
            )}
            {rightText && rightText}
            {showDetail && (
              <IPaySubHeadlineText
                regular
                style={[dynamicStyles.copyText, detailTextStyle]}
                text={detailText}
                numberOfLines={detailsTruncation && isDetailsMoreThan30 ? 1 : 2}
                shouldTranslate={shouldDetailsTranslate}
              />
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
              <IPayView />
            )}
          </IPayView>
          <IPayView>
            {isShowTime && (
              <IPayButton
                onPress={() => onTimePress?.()}
                btnStyle={[dynamicStyles.btnStyle, dynamicStyles.btnTimeContainer]}
                textStyle={[dynamicStyles.btnTextStyle, dynamicStyles.btnTimeTextStyle]}
                btnText={timeText}
              />
            )}
          </IPayView>
          <IPayView>
            {isShowIPayToggleButton && <IPayToggleButton toggleState={toggleState} onToggleChange={onToggleChange} />}
          </IPayView>
          <IPayView>
            {isShowCounterButton ? <IPayCounterButton onPressUp={onPressUp} onPressDown={onPressDown} /> : <IPayView />}
          </IPayView>
        </IPayView>
      </IPayView>
      {children}
    </IPayPressable>
  );
};

export default IPayList;
