import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { IPayIcon, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IPayGradientIconProps } from './ipay-gradient-icon.interface';
import { scaleSize } from '@app/styles/mixins';

const IpayGradientIcon: React.FC<IPayGradientIconProps> = ({
  icon,
  size = 18,
  disableFill,
  removeInlineStyle = false,
  gradientColors = ['#00BAFE', '#CAA7FF'],
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
  gradientLocations = [0.0, 1.0], // Gradient spans across the icon
  style,
}) => {

  const scaledSize = scaleSize(size);

  return (
    <IPayView style={[{ width: scaledSize, height: scaledSize, overflow: 'visible'}, style]}>
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <IPayView style={{ width: scaledSize, height: scaledSize, justifyContent: 'center', alignItems: 'center' }}>
            <IPayIcon
              size={size-1}
              icon={icon}
              removeInlineStyle={removeInlineStyle}
              disableFill={disableFill}
            />
          </IPayView>
        }
      >
        <IPayLinearGradientView
          start={gradientStart}
          end={gradientEnd}
          gradientColors={gradientColors}
          locations={gradientLocations}
          style={{ width: scaledSize, height: scaledSize }}
        />
      </MaskedView>
    </IPayView>
  );
};

export default IpayGradientIcon;
