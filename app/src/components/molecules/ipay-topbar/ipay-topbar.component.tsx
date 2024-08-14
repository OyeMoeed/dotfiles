import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption2Text,
  IPayHeadlineText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayView
} from '@app/components/atoms/index';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayTopbarProps } from './ipay-topbar.interface';
import topBarStyles from './ipay-topbar.style';

/**
 * A component consisting of a heading and an input field.
 * @param {IPayTopbarProps} props - The props for the Ipay component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayTopbar: React.FC<IPayTopbarProps> = ({ testID, captionText, userName, userProfile }) => {
  const { colors } = useTheme();
  const styles = topBarStyles(colors);

  const onBellIconPress = () => {
    navigate(screenNames.NOTIFICATION_CENTER);
  };

  return (
    <IPayView testID={`${testID}-topbar`} style={styles.topNavConStyle}>
      <IPayView style={styles.leftNavConStyle}>
        <IPayPressable
          onPress={() => {
            navigate(screenNames.PROFILE);
          }}
        >
          <IPayView style={styles.topNavCon}>
            <IPayImage style={styles.imageStyle} image={userProfile ? { uri: userProfile } : images.profile} />
          </IPayView>
        </IPayPressable>
        {/* <IPayView>
          <IPayImage style={styles.imageStyle} image={userProfile ? userProfile : images.profile} />
        </IPayView> */}
        <IPayView>
          <IPayView style={styles.welcomeTextContainer}>
            <IPayCaption2Text style={styles.welcomeText}>{captionText}</IPayCaption2Text>
            <IPayCaption2Text style={styles.handWaveText}>{'  👋'}</IPayCaption2Text>
          </IPayView>
          <IPayHeadlineText style={styles.nameStyle}>{userName}</IPayHeadlineText>
        </IPayView>
      </IPayView>
      <IPayPressable onPress={onBellIconPress}>
        <IPayIcon icon={icons.bell_icon} size={24} color={colors.primary.primary600} />
      </IPayPressable>
    </IPayView>
  );
};

export default IPayTopbar;
