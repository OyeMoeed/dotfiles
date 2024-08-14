import { IPayImage, IPayTitle2Text } from '@app/components/atoms';
import IPayView from '@app/components/atoms/ipay-view/ipay-view.component';
import { IPayGradientTextMasked } from '@app/components/molecules';
import colors from '@app/styles/colors.const';
import React, { useCallback } from 'react';

import userAvatarStyles from './ipay-user-avatar.styles';
interface UserProfileImageProps {
  selectedImage?: string;
  profileImage?: string;
  fullName?: string;
  style?: object;
}

const IPayUserAvatar: React.FC<UserProfileImageProps> = ({ profileImage, fullName, style }) => {
  const getInitialLetterOfName = useCallback((name: string) => {
    const words = name.split(' ');
    return words ? `${words[0][0]}${words[1] ? words[1][0] : ''}` : '';
  }, []);
  const styles = userAvatarStyles(colors);

  return (
    <>
      {profileImage ? (
        <IPayImage
          image={{
            uri: `data:image/jpeg;base64,${profileImage}`,
          }}
          style={[styles.image, style]}
        />
      ) : (
        <IPayView style={[styles.image, style]}>
          <IPayGradientTextMasked colors={colors.gradientPrimary}>
            <IPayTitle2Text regular={false} text={getInitialLetterOfName(fullName || '')} style={styles.innerText} />
          </IPayGradientTextMasked>
        </IPayView>
      )}
    </>
  );
};

export default IPayUserAvatar;
