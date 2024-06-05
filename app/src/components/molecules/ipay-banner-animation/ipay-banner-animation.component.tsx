import React from 'react';
import { IPayBannerAnimationProps } from './ipay-banner-animation.interface';
import styles from './ipay-banner-animation.style';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayImage,
  IPayView
} from '@app/components/atoms';
import images from '@app/assets/images';
import IPayButton from '../ipay-button/ipay-button.component';
import { ArrowRight } from '@app/assets/svgs';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the IPayText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayBannerAnimation: React.FC<IPayBannerAnimationProps> = ({
  testID,
  onPressUp,
  onPressDown
}: IPayBannerAnimationProps): JSX.Element => {
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
            rightIcon={<ArrowRight />}
          />
        </IPayView>
      </IPayView>
    </IPayView>
  );
};

export default IPayBannerAnimation;
