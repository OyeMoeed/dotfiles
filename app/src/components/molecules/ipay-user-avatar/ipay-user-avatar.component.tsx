import { IPayImage, IPayTitle2Text } from '@app/components/atoms';
import IPayView from '@app/components/atoms/ipay-view/ipay-view.component';
import { IPayGradientTextMasked } from '@app/components/molecules';
import { useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import React, { useCallback } from 'react';
import UserProfileImageProps from './ipay-user-avatar.interface';
import userAvatarStyles from './ipay-user-avatar.styles';

const IPayUserAvatar: React.FC<UserProfileImageProps> = ({ image, name, style }) => {
  const getInitialLetterOfName = useCallback((name: string) => {
    const words = name.split(' ');
    return words ? `${words[0][0]}${words[1] ? words[1][0] : ''}` : '';
  }, []);
  const { profileImage, fullName } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const styles = userAvatarStyles(colors);

  return (
    <>
      {image || profileImage ? (
        <IPayImage
          image={{
            uri: image || profileImage,
          }}
          style={[styles.image, style]}
        />
      ) : (
        <IPayView style={[styles.image, style]}>
          <IPayGradientTextMasked colors={colors.gradientPrimary}>
            <IPayTitle2Text
              regular={false}
              text={getInitialLetterOfName(name || fullName || '')}
              style={styles.innerText}
            />
          </IPayGradientTextMasked>
        </IPayView>
      )}
    </>
  );
};

export default IPayUserAvatar;
