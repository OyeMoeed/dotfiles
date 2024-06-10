import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { scale } from 'react-native-size-matters';
import IPayButton from '../ipay-button/ipay-button.component';
import { IPayBannerAnimationProps } from './ipay-banner-animation.interface';
import styles from './ipay-banner-animation.style';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the IPayText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayBannerAnimation: React.FC<IPayBannerAnimationProps> = ({
  testID,
  onPressUp,
  onPressDown,
}: IPayBannerAnimationProps): JSX.Element => {
  const { colors } = useTheme();

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayView style={styles.subContainerStyle}>
        <IPayView style={styles.bannerContainer}>
          <IPayView>
            <IPayView style={styles.commonContainer}>
              <IPayImage style={styles.imageStyle} image={images.nifaz} />
              <IPayFootnoteText style={styles.footnoteTextStyle}>Identity Verification</IPayFootnoteText>
            </IPayView>
            <IPayView>
              <IPayCaption2Text style={styles.captionStyle}>
                you need to verify your Identity {'\n'} to use the app
              </IPayCaption2Text>
            </IPayView>
          </IPayView>
          <IPayButton
            btnStyle={styles.buttonStyle}
            onPress={() => console.log('press')}
            btnType="primary"
            btnText="Verify"
            rightIcon={<IPayIcon icon={icons.ARROW_RIGHT} size={18} color={colors.lightColorPalette.white} />}
          />
        </IPayView>
      </IPayView>
    </IPayView>
  );
};

export default IPayBannerAnimation;
