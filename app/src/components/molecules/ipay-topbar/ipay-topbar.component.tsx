import React from 'react';
import {
  IPayView,
  IPayText,
  IPayPressable,
  IPayImage,
  IPayCaption2Text,
  IPayHeadlineText
} from '@app/components/atoms/index';
import styles from './ipay-topbar.style';
import { IPayTopbarProps } from './ipay-topbar.interface';
import { getForegroundColor } from '@app/utilities/interfaceUtils';
import { BellIcon, LeftListIcon } from '@app/assets/svgs/index';
import { variants } from '@app/utilities/enums.util';
import images from '@app/assets/images';

/**
 * A component consisting of a heading and an input field.
 * @param {IPayTopbarProps} props - The props for the Ipay component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayTopbar: React.FC<IPayTopbarProps> = ({ testID, captionText, userName, userProfile }) => {
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
        <BellIcon />
      </IPayView>
    </IPayView>
  );
};

export default IPayTopbar;
