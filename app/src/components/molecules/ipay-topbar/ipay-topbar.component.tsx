import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayCaption2Text, IPayHeadlineText, IPayIcon, IPayImage, IPayView } from '@app/components/atoms/index';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { IPayTopbarProps } from './ipay-topbar.interface';
import styles from './ipay-topbar.style';

/**
 * A component consisting of a heading and an input field.
 * @param {IPayTopbarProps} props - The props for the Ipay component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayTopbar: React.FC<IPayTopbarProps> = ({ testID, captionText, userName, userProfile }) => {
  const { colors } = useTheme();
  return (
    <IPayView testID={testID} style={styles.topNavConStyle}>
      <IPayView style={styles.leftNavConStyle}>
        <IPayView>
          <IPayImage style={styles.imageStyle} image={userProfile ? userProfile : images.profile} />
        </IPayView>
        <IPayView>
          <IPayView>
            <IPayCaption2Text>{captionText}</IPayCaption2Text>
          </IPayView>
          <IPayHeadlineText style={styles.nameStyle}>{userName}</IPayHeadlineText>
        </IPayView>
      </IPayView>
      <IPayView>
        <IPayIcon icon={icons.bell_icon} size={scale(24)} color={colors.primary.primary600} />
      </IPayView>
    </IPayView>
  );
};

export default IPayTopbar;
