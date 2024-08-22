import { IPayIcon, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { IPayGradientIconProps } from './ipay-gradient-icon.interface';

const IPayGradientIcon: React.FC<IPayGradientIconProps> = ({
  icon,
  size = 18,
  disableFill,
  removeInlineStyle = false,
  gradientColors,
  gradientStart,
  gradientEnd,
  gradientLocations = [0, 0.9], // Gradient spans across the icon
  style,
}) => {
  const { colors } = useTheme();
  const scaledSize = moderateScale(size);

  const defaultGradient = [colors.primary.primary500, colors.secondary.secondary300];

  return (
    <IPayView style={[{ width: scaledSize, height: scaledSize, overflow: 'visible' }, style]}>
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <IPayView style={{ width: scaledSize, height: scaledSize, justifyContent: 'center', alignItems: 'center' }}>
            <IPayIcon
              size={size - 1}
              icon={icon}
              color={colors.natural.natural0}
              removeInlineStyle={removeInlineStyle}
              disableFill={disableFill}
            />
          </IPayView>
        }
      >
        <IPayLinearGradientView
          start={gradientStart}
          end={gradientEnd}
          gradientColors={gradientColors || defaultGradient}
          locations={gradientLocations}
          style={{ width: scaledSize, height: scaledSize }}
        />
      </MaskedView>
    </IPayView>
  );
};

export default IPayGradientIcon;
