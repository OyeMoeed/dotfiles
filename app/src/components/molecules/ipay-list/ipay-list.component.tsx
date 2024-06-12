import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayText, IPayView } from '@app/components/atoms/index';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { variants } from '@app/utilities/enums.util';
import { getForegroundColor } from '@app/utilities/interface-utils';
import React from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
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
  containerStyle,
  subTextStyle,
  isShowSubButton,
  onPressSave
}) => {
  const dynamicStyles = styles({ bgColor });
  const localizationText = useLocalization();
  const { colors } = useTheme();
  return (
    <IPayPressable testID={testID} onPress={onPress} style={dynamicStyles.mainContiner}>
      <IPayView style={[dynamicStyles.constainer, containerStyle]}>
        <IPayView style={[dynamicStyles.commonContainer]}>
          <IPayView style={dynamicStyles.leftIconContainer}>
            {(isShowLeftIcon && leftIcon) || <IPayIcon icon={icons.CHECKED} />}
          </IPayView>
          <IPayView>
            <IPayText style={[dynamicStyles.font, textStyle]}>{title}</IPayText>
            {isShowSubTitle ? (
              <IPayText style={[dynamicStyles.subTitleStyle, subTextStyle]}>{subTitle}</IPayText>
            ) : (
              <></>
            )}
            {isShowSubButton ? (
              <IPayButton
                onPress={onPressSave}
                textStyle={dynamicStyles.saveTextStyle}
                rightIcon={<IPayIcon icon={icons.save} size={18} color={colors.secondary.secondary800} />}
                btnStyle={[dynamicStyles.btnStyle, dynamicStyles.sveBtnStyle]}
                btnType="primary"
                btnText={localizationText.save}
              />
            ) : (
              <></>
            )}
          </IPayView>
        </IPayView>
        <IPayView style={dynamicStyles.commonContainer}>
          <IPayView>
            {isShowButton ? (
              <IPayButton
                onPress={() => {}}
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
                  <IPayIcon icon={icons.ARROW_RIGHT} size={18} color={getForegroundColor(variants.COLORED, colors)} />
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
        </IPayView>
      </IPayView>
    </IPayPressable>
  );
};

export default IPayList;
