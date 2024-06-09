import { DefaultRightIcon, LeftListIcon } from '@app/assets/svgs';
import { IPayPressable, IPayText, IPayView } from '@app/components/atoms/index';
import { variants } from '@app/utilities/enums.util';
import { getForegroundColor } from '@app/utilities/interfaceUtils';
import React from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayCounterButton from '../ipay-counter-button/ipay-counter-button.comonent';
import IPayToggleButton from '../ipay-toggle-button/ipay-toggle-button.component';
import { IPayListProps } from './ipay-list.interface';
import styles from './ipay-list.style';

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
  const dynamicStyles = styles({ bgColor });
  return (
    <IPayPressable testID={testID} onPress={onPress} style={dynamicStyles.mainContiner}>
      <IPayView style={[dynamicStyles.constainer]}>
        <IPayView style={[dynamicStyles.commonContainer]}>
          <IPayView style={dynamicStyles.leftIconContainer}>
            {isShowLeftIcon ? leftIcon || <LeftListIcon color={getForegroundColor(variants.COLORED)} /> : <></>}
          </IPayView>
          <IPayView>
            <IPayText style={[dynamicStyles.font, textStyle]}>{title}</IPayText>
            {isShowSubTitle ? <IPayText style={dynamicStyles.subTitleStyle}>{subTitle}</IPayText> : <></>}
          </IPayView>
        </IPayView>
        <IPayView style={dynamicStyles.commonContainer}>
          <IPayView>
            {isShowButton ? (
              <IPayButton
                onPress
                btnStyle={dynamicStyles.btnStyle}
                textStyle={dynamicStyles.btnTextStyle}
                btnText={btnText}
              />
            ) : (
              <></>
            )}
          </IPayView>
          {isShowDetail ? (
            <IPayText style={[dynamicStyles.rightIconContainer, dynamicStyles.detailTextStyle, detailTextStyle]}>
              {detailText}
            </IPayText>
          ) : (
            <></>
          )}
          <IPayView>
            {isShowIcon ? (
              (icon && <IPayView style={dynamicStyles.rightIconContainer}>{icon}</IPayView>) || (
                <IPayView style={dynamicStyles.rightIconContainer}>
                  <DefaultRightIcon color={getForegroundColor(variants.COLORED)} />
                </IPayView>
              )
            ) : (
              <></>
            )}
          </IPayView>
          <IPayView>
            {isShowDate ? (
              <IPayButton
                onPress
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
                onPress
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
