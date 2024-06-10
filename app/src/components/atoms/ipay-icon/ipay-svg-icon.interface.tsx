import { SVGProps, JSXElementConstructor, CSSProperties } from "react";

type IconSetItem = {
  properties: {
    name: string;
  };
  icon?: {
    paths: string[];
    attrs?: Object[];
    width?: number | string;
  };
};

type IconSet = {
  icons?: IconSetItem[];
};

interface IpayIconProps extends SVGProps<SVGElement> {
  testID?:string;
  iconSet?: IconSet;
  icon?: string;
  size?: number;
  disableFill?: boolean;
  removeInlineStyle?: boolean;
  native?: boolean;
  SvgComponent?: JSXElementConstructor<any>;
  PathComponent?: JSXElementConstructor<any>;
  style?: CSSProperties;
  color?:string
}

export type { IconSetItem, IconSet, IpayIconProps };
