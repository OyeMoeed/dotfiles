import { IPayFlatlist, IPayFootnoteText, IPayPressable, IPayView } from '@app/components/atoms';
import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { IPayGradientText } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useCallback, useState } from 'react';
import { verticalScale } from 'react-native-size-matters';
import YouTubeIframe from 'react-native-youtube-iframe';
import { IPayAtmWithdrawalTurtorialsProps } from './ipay-atm-withdrawal-tutorial.interface';
import tutorialStyles from './ipay-atm-withdrawal-tutorial.style';

const IPayAtmWithdrawalTurtorials: React.FC<IPayAtmWithdrawalTurtorialsProps> = ({ testID, style }) => {
  const { colors } = useTheme();
  const styles = tutorialStyles(colors);
  const localizationText = useLocalization();
  const tutorials = constants.ATM_WITHDRAWAL_TUTORIALS;
  const [videoId, setVideoId] = useState<string>('CwFD_Eb_0Qo');
  const [playing, setPlaying] = useState<boolean>(false);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const onPressTutorial = (url: string) => {
    setVideoId(url);
  };

  const renderTutorials = ({ item }) => (
    <IPayPressable style={styles.tutorialView} onPress={() => onPressTutorial(item.url)}>
      <IPayView style={styles.index}>
        <IPayGradientText
          yScale={7}
          fontSize={typography.FONT_VARIANTS.CAPTION1.FONT_SIZE}
          text={`${item.id}`}
          gradientColors={colors.appGradient.gradientPrimary10}
        />
      </IPayView>

      <IPayFootnoteText text={item.title} style={styles.tutorialTitle} />
    </IPayPressable>
  );

  return (
    <IPayView style={[styles.container, style]} testID={`${testID}-atm-withdrawal-tutorials`}>
      <IPayView style={styles.videoPlayerView}>
        <YouTubeIframe height={verticalScale(171)} play={playing} videoId={videoId} onChangeState={onStateChange} />
      </IPayView>

      <IPayView style={styles.tutorialListView}>
        <IPayFlatlist
          data={tutorials}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTutorials}
          itemSeparatorStyle={styles.itemSeparatorStyle}
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayAtmWithdrawalTurtorials;
