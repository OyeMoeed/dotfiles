import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayText, IPayView } from '@app/components/atoms/index';
import { IPayButton, IPayCounterButton, IPayToggleButton } from '@app/components/molecules';
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
  bgColor,
  textStyle,
  isShowIcon,
  icon,
  isShowLeftIcon,
  leftIcon,
  isShowButton,
  isShowTime,
  timeText,
  isShowDate,
  dateText,
  isShowIPayToggleButton,
  toggleState,
  isShowCounterButton,
  detailText,
  isShowDetail,
  detailTextStyle,
  onToggleChange,
  isShowSubTitle,
  subTitle,
  btnText,
  onPress,
  onPressUp,
  onPressDown,
  onPressIcon,
  style,
  containerStyle,
  isShowSaveQRButton,
}) => {
  const { colors } = useTheme();
  const dynamicStyles = styles(colors);

  return (
    <IPayPressable testID={testID} onPress={onPress} style={[dynamicStyles.mainContiner, style]}>
      <IPayView style={[dynamicStyles.container, containerStyle]}>
        <IPayView style={[dynamicStyles.commonContainer]}>
          <IPayView style={dynamicStyles.leftIconContainer}>
            {isShowLeftIcon ? leftIcon || <IPayIcon icon={icons.CHECKED} /> : <></>}
          </IPayView>
          <IPayView>
            {title && <IPayText style={[dynamicStyles.font, textStyle]}>{title}</IPayText>}
            {isShowSubTitle ? <IPayText style={dynamicStyles.subTitleStyle}>{subTitle}</IPayText> : <></>}
            {isShowSaveQRButton && (
              <IPayButton
                btnStyle={dynamicStyles.buttonStyle}
                onPress={() => {}}
                btnType="primary"
                btnText="Save"
                textColor={colors.secondary.secondary800}
                rightIcon={<IPayIcon icon={icons.save} color={colors.secondary.secondary800} />}
              />
            )}
          </IPayView>
        </IPayView>
        <IPayView style={dynamicStyles.commonContainer}>
          <IPayView>
            {isShowIcon ? (
              (icon && (
                <IPayButton 
                btnType='link-button'
                btnText={ detailText}
                onPress={onPressIcon}
                rightIcon={icon}
                textStyle={[dynamicStyles.copyText, detailTextStyle]}
                btnStyle={dynamicStyles.rightIconContainer}
                />

              )) || (
                <IPayView style={dynamicStyles.rightIconContainer}>
                  <IPayIcon icon={icons.ARROW_RIGHT_DEFAULT} />
                </IPayView>
              )
            ) : (
              <></>
            )}
          </IPayView>
          <IPayView>
            {isShowDate ? (
              <IPayButton
                onPress={() => {}}
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
                onPress={() => {}}
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
