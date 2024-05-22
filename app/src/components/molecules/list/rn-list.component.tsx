import React from 'react';
import { RNView, RNText, RNImage, RNPressable } from '@app/components/atoms/index';
import styles from './rn-list.style';
import { RNListProps } from './rn-list.interface';
import { getForegroundColor } from '@app/utilities/interfaceUtils';
import { variants } from '@app/utilities/enums';
import Right from '@app/assets/svgs/right-greater.icon';
import LeftListIcon from '@app/assets/svgs/left-list.icon';
import RNButton from '../button/rn-button.component';
import RNCounterButton from '../counter-button/rn-counter-button.comonent';
import ToggleButton from '../toggle-button/toggle-button.component';

/**
 * A component consisting of a heading and an input field.
 * @param {RNBannerProps} props - The props for the RNBanner component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNList: React.FC<RNListProps> = ({
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
  isShowToggleButton,
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
  const dynamicStyles = styles({bgColor});
  return (
    <RNPressable testID={testID} onPress={onPress} style={dynamicStyles.mainContiner}>
      <RNView style={[dynamicStyles.constainer]}>
        <RNView style={[dynamicStyles.commonContainer]}>
          <RNView style={dynamicStyles.leftIconContainer}>
            {isShowLeftIcon ? leftIcon || <LeftListIcon color={getForegroundColor(variants.COLORED)} /> : <></>}
          </RNView>
          <RNView>
            <RNText style={[dynamicStyles.font, textStyle]}>{title}</RNText>
            {isShowSubTitle ? <RNText style={dynamicStyles.subTitleStyle}>{subTitle}</RNText> : <></>}
          </RNView>
        </RNView>
        <RNView style={dynamicStyles.commonContainer}>
          <RNView>
            {isShowButton ? (
              <RNButton
                onPress={() => console.log('')}
                btnStyle={dynamicStyles.btnStyle}
                textStyle={dynamicStyles.btnTextStyle}
                btnText={btnText}
              />
            ) : (
              <></>
            )}
          </RNView>
          {isShowDetail ? (
            <RNText style={[dynamicStyles.rightIconContainer, dynamicStyles.detailTextStyle, detailTextStyle]}>
              {detailText}
            </RNText>
          ) : (
            <></>
          )}
          <RNView>
            {isShowIcon ? (
              <RNView style={dynamicStyles.rightIconContainer}>{icon}</RNView> || (
                <RNView style={dynamicStyles.rightIconContainer}>
                  <Right color={getForegroundColor(variants.COLORED)} />
                </RNView>
              )
            ) : (
              <></>
            )}
          </RNView>
          <RNView>
            {isShowDate ? (
              <RNButton
                onPress={() => console.log('')}
                btnStyle={[dynamicStyles.btnStyle, dynamicStyles.btnTimeContainer]}
                textStyle={[dynamicStyles.btnTextStyle, dynamicStyles.btnTimeTextStyle]}
                btnText={dateText}
              />
            ) : (
              <></>
            )}
          </RNView>
          <RNView>
            {isShowTime ? (
              <RNButton
                onPress={() => console.log('')}
                btnStyle={[dynamicStyles.btnStyle, dynamicStyles.btnTimeContainer]}
                textStyle={[dynamicStyles.btnTextStyle, dynamicStyles.btnTimeTextStyle]}
                btnText={timeText}
              />
            ) : (
              <></>
            )}
          </RNView>
          <RNView>
            {isShowToggleButton ? <ToggleButton toggleState={toggleState} onToggleChange={onToggleChange} /> : <></>}
          </RNView>
          <RNView>{isShowCounterButton ? <RNCounterButton onPressUp={onPressUp} onPressDown={onPressDown} /> : <></>}</RNView>
        </RNView>
      </RNView>
    </RNPressable>
  );
};

export default RNList;
