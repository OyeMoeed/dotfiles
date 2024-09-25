import { IPayImage, IPayTitle2Text } from '@app/components/atoms';
import IPayView from '@app/components/atoms/ipay-view/ipay-view.component';
import { useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import React, { useCallback } from 'react';
import UserProfileImageProps from './ipay-user-avatar.interface';
import userAvatarStyles from './ipay-user-avatar.styles';
import { IPayGradientTextMasked } from '..';

const IPayUserAvatar: React.FC<UserProfileImageProps> = ({ image, name, style }) => {
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { profileImage, fullName } = walletInfo;

  const styles = userAvatarStyles(colors);

  const getInitialLetterOfName = useCallback(() => {
    const mainText = name || fullName || '';
    const words = mainText.split(' ');
    return words ? `${words[0][0]}${words[1] ? words[1][0] : ''}` : '';
  }, [name, fullName]);

  return image || profileImage ? (
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
          text={getInitialLetterOfName()}
          style={styles.innerText}
          shouldTranslate={false}
        />
      </IPayGradientTextMasked>
    </IPayView>
  );
};

export default IPayUserAvatar;
