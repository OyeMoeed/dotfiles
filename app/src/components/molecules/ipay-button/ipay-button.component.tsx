import constants from '@app/constants/constants';
import React from 'react';
import IPayPrimaryButton from '../primary-button/ipay-primary-button.components';
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
  textStyle,
  btnType,
  btnIconsDisabled,
  leftIcon,
  rightIcon,
  disabled,
  small,
  medium,
  large,
  width
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
          />
        );
      case buttonTypes.OUTLINE:
        return <></>;
      case buttonTypes.LINK_BUTTON:
        return <></>;
      default:
        return <></>;
    }
  };

  return <>{renderComponent()}</>;
};

export default IPayButton;