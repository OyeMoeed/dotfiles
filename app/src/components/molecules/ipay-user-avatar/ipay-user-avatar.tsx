import { IPayImage } from '@app/components/atoms';
import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import IPayView from '@app/components/atoms/ipay-view/ipay-view.component';
import { IPayGradientText } from '@app/components/molecules';
import colors from '@app/styles/colors.const';
import React, { useCallback } from 'react';
import { View } from 'react-native';

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
    console.log('words', words);
    
    return words ? `${words[0][0]}${words[1] ? words[1][0] : ''}` : '';
  }, []);
  const styles = userAvatarStyles(colors);

  return (
    <View>
      {profileImage ? (
        <IPayImage
          image={{
            uri: `data:image/jpeg;base64,${profileImage}`,
          }}
          style={[styles.image, style]}
        />
      ) : (
        <IPayView style={[styles.image, style]}>
          <IPayGradientText
            yScale={22}
            fontSize={typography.FONT_VARIANTS.TITLE_LARGE.FONT_SIZE}
            text={getInitialLetterOfName(fullName || '')}
            gradientColors={colors.appGradient.gradientPrimary10}
          />
        </IPayView>
      )}
    </View>
  );
};

export default IPayUserAvatar;
