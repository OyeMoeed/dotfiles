// GradientIcon.tsx
import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { IPayIcon, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IpayGradientIconProps } from './ipay-gradient-icon.interface';

const IpayGradientIcon: React.FC<IpayGradientIconProps> = ({
  icon,
  size = 25,
  disableFill,
  removeInlineStyle = false,
  gradientColors = ['#00BAFE', '#CAA7FF'],
  gradientStart,
  gradientEnd,
  gradientLocations = [0.5, 0.5],
  style
}) => {
  return (
    <MaskedView
      style={{ height: size, width: size, ...style }}
      maskElement={
        <IPayView >
          <IPayIcon icon={icon} size={size} removeInlineStyle={removeInlineStyle} disableFill={disableFill} />
        </IPayView>
      }
    >
      <IPayLinearGradientView
        start={gradientStart}
        end={gradientEnd}
        gradientColors={gradientColors}
        locations={gradientLocations}
        style={{ height: size, width: size }}
      />
    </MaskedView>
  );
};

export default IpayGradientIcon;
