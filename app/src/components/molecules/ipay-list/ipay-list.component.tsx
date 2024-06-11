import React from 'react';
import { IPayView, IPayText, IPayImage, IPayPressable } from '@app/components/atoms/index';
import styles from './ipay-list.style';
import { IPayListProps } from './ipay-list.interface';
import { getForegroundColor } from '@app/utilities/interfaceUtils';
import { DefaultRightIcon } from '@app/assets/svgs/svg';
import RNCounterButton from '../counter-button/ipay-counter-button.comonent';
import { LeftListIcon } from '@app/assets/svgs/svg';
import { variants } from '@app/utilities/enums.util';
import IPayButton from '../button/ipay-button.component';
import IPayToggleButton from '../toggle-button/ipay-toggle-button.component';

/**
 * A component consisting of a heading and an input field.
 * @param {RNBannerProps} props - The props for the RNBanner component.
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
}) => {
  const { colors } = useTheme();
  const dynamicStyles = styles({ bgColor });
  return (
    <IPayPressable testID={`${testID}-list`} onPress={onPress} style={dynamicStyles.mainContiner}>
      <IPayView style={[dynamicStyles.constainer]}>
        <IPayView style={[dynamicStyles.commonContainer]}>
          <IPayView style={dynamicStyles.leftIconContainer}>
            {(isShowLeftIcon && leftIcon) || <LeftListIcon color={getForegroundColor(variants.COLORED, colors)} />}
          </IPayView>
          <IPayView>
            <IPayText style={[dynamicStyles.font, textStyle]}>{title}</IPayText>
            {isShowSubTitle && <IPayText style={dynamicStyles.subTitleStyle}>{subTitle}</IPayText>}
          </IPayView>
        </IPayView>
        <IPayView style={dynamicStyles.commonContainer}>
          <IPayView>
            {isShowButton && (
              <IPayButton
                onPress={onPress}
                btnStyle={dynamicStyles.btnStyle}
                textStyle={dynamicStyles.btnTextStyle}
                btnText={btnText}
              />
            )}
          </IPayView>
          {isShowDetail && (
            <IPayText style={[dynamicStyles.rightIconContainer, dynamicStyles.detailTextStyle, detailTextStyle]}>
              {detailText}
            </IPayText>
          )}
          <IPayView>
            {isShowIcon &&
              ((icon && <IPayView style={dynamicStyles.rightIconContainer}>{icon}</IPayView>) || (
                <IPayView style={dynamicStyles.rightIconContainer}>
                  <IPayIcon
                    icon={icons.ARROW_RIGHT}
                    size={18}
                    color={getForegroundColor(variants.COLORED, colors)}
                  />
                </IPayView>
              ))}
          </IPayView>
          <IPayView>
            {isShowDate && (
              <IPayButton
                onPress={onPress}
                btnStyle={[dynamicStyles.btnStyle, dynamicStyles.btnTimeContainer]}
                textStyle={[dynamicStyles.btnTextStyle, dynamicStyles.btnTimeTextStyle]}
                btnText={dateText}
              />
            )}
          </IPayView>
          <IPayView>
            {isShowTime && (
              <IPayButton
                onPress={onPress}
                btnStyle={[dynamicStyles.btnStyle, dynamicStyles.btnTimeContainer]}
                cona
                textStyle={[dynamicStyles.btnTextStyle, dynamicStyles.btnTimeTextStyle]}
                btnText={timeText}
              />
            )}
          </IPayView>
          <IPayView>
            {isShowIPayToggleButton && <IPayToggleButton toggleState={toggleState} onToggleChange={onToggleChange} />}
          </IPayView>
          <IPayView>
            {isShowCounterButton ? <RNCounterButton onPressUp={onPressUp} onPressDown={onPressDown} /> : <></>}
          </IPayView>
        </IPayView>
      </IPayView>
    </IPayPressable>
  );
};

export default IPayList;
