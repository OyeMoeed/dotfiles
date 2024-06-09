import constants from '@app/constants/constants';
import React from 'react';
import IPayLinkButton from '../ipay-link-button/ipay-link-button.component';
import IPayPrimaryButton from '../ipay-primary-button/ipay-primary-button.components';
import { IPayButtonProps } from './ipay-button.interface';
import IPayOutlineButton from '../ipay-outline-button/ipay-outline-button.component';

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
}: IPayButtonProps): JSX.Element => {
  const renderComponent = () => {
    const buttonTypes = constants.BUTTON_TYPES;
    switch (btnType) {
      case buttonTypes.PRIMARY:
        return (
          <IPayPrimaryButton
            testID={`${testID}-button-primary`}
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
          />
        );
      case buttonTypes.OUTLINE:
        return (
          <IPayOutlineButton
            testID={`${testID}-button-outline`}
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
          />
        );
      case buttonTypes.LINK_BUTTON:
        return (
          <IPayLinkButton
            testID={`${testID}-button-link`}
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
          />
        );
      default:
        return <></>;
    }
  };

  return <>{renderComponent()}</>;
};

export default IPayButton;
