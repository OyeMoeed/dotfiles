import iconSet from '@app/assets/icons/ipay-icons-collection.json';
import React, { JSX } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { Path, Svg } from 'react-native-svg';
import IPaySvgIcon from './ipay-svg-icon';
import { IpayIconProps } from './ipay-svg-icon.interface';
/**
 * IPayIcon
 *
 * A component that renders an icon using `Svg` and `Path` components from `react-native-svg`.
 * This component wraps the `IPaySvgIcon` component, providing a consistent interface for rendering icons
 * from the provided design system added in IconSet.
 *
 * @param {object} props - The component's props.
 * @param {string} props.icon - The name of the icon to render. This should match the `name` property in the icon set.
 * @param {string | number} [props.size] - The size of the icon. Can be a string (e.g., '24px') or a number (e.g., 24).
 * @param {boolean} [props.disableFill] - If true, disables the default fill color.
 * @param {boolean} [props.removeInlineStyle] - If true, removes the default inline styles applied to the SVG.
 * @param {boolean} [props.native] - Indicates if the component is being used in a React Native environment.
 * @param {JSX.ElementConstructor<any>} [props.SvgComponent] - The component to use for the SVG element, defaults to 'svg'.
 * @param {JSX.ElementConstructor<any>} [props.PathComponent] - The component to use for the path element, defaults to 'path'.
 *
 * @returns {JSX.Element} The rendered `IPaySvgIcon` component.
 */

const IPayIcon: React.FC<IpayIconProps> = ({
  icon,
  size = 18,
  disableFill = false,
  removeInlineStyle = false,
  color,
  testID,
  otherScale,
  disableStokeColor = false,
}: IpayIconProps): JSX.Element => (
  <IPaySvgIcon
    testID={`${testID}-ipay-icon`}
    icon={icon}
    native
    SvgComponent={Svg}
    PathComponent={Path}
    size={otherScale || moderateScale(size)}
    disableFill={disableFill}
    removeInlineStyle={removeInlineStyle}
    iconSet={iconSet}
    color={color}
    disableStokeColor={disableStokeColor}
  />
);

export default IPayIcon;
