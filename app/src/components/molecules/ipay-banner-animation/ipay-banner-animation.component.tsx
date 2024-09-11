import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import { IPayBannerAnimationProps } from './ipay-banner-animation.interface';
import bannerAnimationStyles from './ipay-banner-animation.style';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the IPayText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayBannerAnimation: React.FC<IPayBannerAnimationProps> = ({
  testID,
  onVerify,
}: IPayBannerAnimationProps): JSX.Element => {
  const { colors } = useTheme();
  const styles = bannerAnimationStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayView style={styles.subContainerStyle}>
        <IPayView style={styles.bannerContainer}>
          <IPayView>
            <IPayView style={styles.commonContainer}>
              <IPayImage style={styles.imageStyle} image={images.nafathLogo} />
              <IPayFootnoteText style={styles.footnoteTextStyle}>
                {localizationText.COMMON.INDENTITY_VERIFICATION}
              </IPayFootnoteText>
            </IPayView>
            <IPayView>
              <IPayCaption2Text style={styles.captionStyle}>
                {localizationText.HOME.DENTITY_DISCRIPTION}
              </IPayCaption2Text>
            </IPayView>
          </IPayView>
          <IPayButton
            btnStyle={styles.buttonStyle}
            onPress={onVerify}
            btnType="primary"
            btnText={'COMMON.VERIFY'}
            rightIcon={<IPayIcon icon={icons.ARROW_RIGHT} size={16} color={colors.natural.natural0} />}
          />
        </IPayView>
      </IPayView>
    </IPayView>
  );
};

export default IPayBannerAnimation;
