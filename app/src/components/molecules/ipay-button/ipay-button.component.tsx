import constants from '@app/constants/constants';
// eslint-disable-next-line import/no-cycle
import { IPayLinkButton, IPayOutlineButton, IPayPrimaryButton } from '@components/molecules/index';
import React, { JSX } from 'react';
import { IPayButtonProps } from './ipay-button.interface';

/**
 * A customizable button component.
 * @param {IPayButtonProps} props - The props for the RNButton component.
 * @returns {JSX.Element} - The rendered component.
 */

const IPayButton: React.FC<IPayButtonProps> = ({
  testID,
  onPress,
  btnText,
  btnStyle,
  btnColor,
  btnType,
  btnIconsDisabled,
  leftIcon,
  rightIcon,
  disabled,
  small,
  medium,
  large,
  width,
  textColor,
  textStyle,
}: IPayButtonProps): JSX.Element => {
  const renderComponent = () => {
    const buttonTypes = constants.BUTTON_TYPES;
    switch (btnType) {
      case buttonTypes.PRIMARY:
        return (
          <IPayPrimaryButton
            testID={testID}
            disabled={disabled}
            onPress={onPress}
            btnText={btnText}
            textStyle={textStyle}
            buttonColor={btnColor}
            style={btnStyle}
            btnIconsDisabled={btnIconsDisabled}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            small={small}
            medium={medium}
            large={large}
            width={width}
            textColor={textColor}
          />
        );
      case buttonTypes.OUTLINE:
        return (
          <IPayOutlineButton
            testID={testID}
            disabled={disabled}
            onPress={onPress}
            btnText={btnText}
            textStyle={textStyle}
            buttonColor={btnColor}
            style={btnStyle}
            btnIconsDisabled={btnIconsDisabled}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            small={small}
            medium={medium}
            large={large}
            width={width}
            textColor={textColor}
          />
        );
      case buttonTypes.LINK_BUTTON:
        return (
          <IPayLinkButton
            testID={testID}
            disabled={disabled}
            onPress={onPress}
            btnText={btnText}
            textStyle={textStyle}
            buttonColor={btnColor}
            style={btnStyle}
            btnIconsDisabled={btnIconsDisabled}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            small={small}
            medium={medium}
            large={large}
            width={width}
            textColor={textColor}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
};

export default IPayButton;
