import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayHeadlineText,
  IPayIcon,
  IPayPressable,
  IPayView
} from '@app/components/atoms/index';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayUserAvatar from '../ipay-user-avatar/ipay-user-avatar';
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
  return (
    <IPayView testID={`${testID}-topbar`} style={styles.topNavConStyle}>
      <IPayView style={styles.leftNavConStyle}>
        <IPayPressable
          onPress={() => {
            navigate(screenNames.PROFILE);
          }}
        >
          <IPayView style={styles.topNavCon}>
            <IPayUserAvatar style={styles.imageStyle} profileImage={userProfile} fullName={userName} />
          </IPayView>
        </IPayPressable>

        <IPayView>
          <IPayView style={styles.welcomeTextContainer}>
            <IPayCaption2Text style={styles.welcomeText}>{captionText}</IPayCaption2Text>
            <IPayCaption2Text style={styles.handWaveText}>{'  👋'}</IPayCaption2Text>
          </IPayView>
          <IPayHeadlineText style={styles.nameStyle}>{userName}</IPayHeadlineText>
        </IPayView>
      </IPayView>
      <IPayView>
        <IPayIcon icon={icons.bell_icon} size={24} color={colors.primary.primary600} />
      </IPayView>
    </IPayView>
  );
};

export default IPayTopbar;
