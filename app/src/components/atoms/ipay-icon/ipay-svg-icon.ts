import {
    createElement,
    CSSProperties,
  } from "react";
import { IconSet, IpayIconProps } from "./ipay-svg-icon.interface";

  const IPaySvgIcon = ({
    iconSet,
    icon,
    size,
    disableFill,
    removeInlineStyle,
    native,
    SvgComponent,
    PathComponent
  }: IpayIconProps) => {
    if (!iconSet || !icon) return null;

    const currentIcon = iconSet.icons.find(
      (item) => item.properties.name === icon
    );

    if (!currentIcon) return null;

    const initialStyle: CSSProperties = {
      display: "inline-block",
      stroke: "currentColor",
      fill: "currentColor",
    };

    if (native) {
      initialStyle.display = "flex";
      initialStyle.flexDirection = "row";
      initialStyle.flexWrap = "wrap";
    }

    const comptuedStyle = {
      ...(removeInlineStyle ? {} : initialStyle),
      ...(size ? { width: size, height: size } : {})
    };

    const { width = "1024" } = currentIcon.icon;

    const viewBox = `0 0 ${width} 1024`;

    const children = currentIcon.icon.paths.map((path, index) => {
      const attrs = currentIcon.icon.attrs?.[index];

      const pathProps = {
        d: path,
        key: icon + index,
        ...(!disableFill && attrs ? attrs : {}),
      };

      return createElement(PathComponent || "path", pathProps);
    });



    return createElement(
      SvgComponent || "svg",
      { viewBox, style: comptuedStyle },
      children
    );
  };

  export const iconList = (iconSet: IconSet) => {
    if (!iconSet || !Array.isArray(iconSet.icons)) return null;

    return iconSet.icons.map((icon) => icon.properties.name);
  };

  export default IPaySvgIcon;