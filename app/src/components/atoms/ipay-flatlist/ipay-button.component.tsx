import constants from '@app/constants/constants';
import React from 'react';
import { IPayButtonProps } from './ipay-button.interface';
import { IPayLinkButton, IPayOutlineButton, IPayPrimaryButton } from '@app/components/molecules';

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
  textStyle,
  btnType,
  btnIconsDisabled,
  leftIcon,
  rightIcon,
  disabled,
  small,
  medium,
  large,
  width,
  textColor
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
        return <></>;
    }
  };

  return <>{renderComponent()}</>;
};

export default IPayButton;
