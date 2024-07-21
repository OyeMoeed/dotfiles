import icons from '@app/assets/icons';
import { CallIncoming } from '@app/assets/svgs';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayProgressBar,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientTextMasked, IPayList } from '@app/components/molecules';
import { DURATIONS, INITIAL_TIMER, PROGRESS_INCREMENT_FACTOR } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatCountdownTime } from '@app/utilities/date-helper.util';
import React, { useEffect, useState } from 'react';
import { GuideStep, IPayReceiveCallProps } from './ipay-receive-call.interface';
import receiveCallStyles from './ipay-receive-call.styles';

const IPayReceiveCall: React.FC<IPayReceiveCallProps> = ({ testID, guideToReceiveCall }) => {
  const { colors } = useTheme();
  const styles = receiveCallStyles(colors);
  const localizationText = useLocalization();
  const [expired, setExpired] = useState(false);
  const [gradientWidth, setGradientWidth] = useState('0%');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIMER);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!expired) {
      let width = 0;
      interval = setInterval(() => {
        width += PROGRESS_INCREMENT_FACTOR.MEDIUM;
        setGradientWidth(`${width}%`);
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          if (newTimeLeft <= 0) {
            clearInterval(interval);
            setExpired(true);
            setGradientWidth('0%');
            return 0;
          }
          return newTimeLeft;
        });
      }, DURATIONS.LONG);
    }

    return () => {
      clearInterval(interval);
    };
  }, [expired]);

  const renderGuideStepItem = ({ item: { title, pressNumber, stepNumber } }: { item: GuideStep }) => (
    <IPayList
      key={title}
      title={
        <IPayFootnoteText>
          {title}
          <IPayFootnoteText regular={false}> {pressNumber}</IPayFootnoteText>
        </IPayFootnoteText>
      }
      textStyle={styles.stepStyle}
      isShowLeftIcon
      containerStyle={styles.containerStyle}
      leftIcon={
        <IPayView style={styles.stepViewStyle}>
          <IPayGradientTextMasked colors={colors.gradientPrimary}>
            <IPayCaption1Text regular={false} text={stepNumber} />
          </IPayGradientTextMasked>
        </IPayView>
      }
    />
  );

  const handleRequestAgain = () => {
    setExpired(false);
    setGradientWidth('0%');
    setTimeLeft(INITIAL_TIMER);
  };

  return (
    <IPayView testID={`${testID}-receive-call`} style={styles.container}>
      <CallIncoming />
      <IPayTitle2Text text={localizationText.ACTIVATE_BENEFICIARY.RECEIVE_A_CALL_TO_ACTIVATE} />
      <IPayCaption1Text style={styles.desStyle} text={localizationText.ACTIVATE_BENEFICIARY.RECEIVE_CALL_STEPS} />

      <IPayProgressBar showExpired={expired} gradientWidth={gradientWidth} colors={colors.gradientSecondary} />
      <IPayCaption1Text
        style={expired ? styles.expiredTimerStyle : styles.timerStyle}
        text={
          expired
            ? localizationText.ACTIVATE_BENEFICIARY.REQUEST_EXPIRED
            : `${localizationText.ACTIVATE_BENEFICIARY.REQUEST_EXPIRE_IN} ${formatCountdownTime(timeLeft)}`
        }
      />
      {expired ? (
        <>
          <IPayCaption1Text
            style={styles.newCallStyles}
            text={localizationText.ACTIVATE_BENEFICIARY.STILL_NEED_NEW_CALL}
          />
          <IPayButton
            large
            btnType="primary"
            btnText={localizationText.ACTIVATE_BENEFICIARY.REQUEST_ANOTHER_CALL}
            onPress={handleRequestAgain}
            rightIcon={<IPayIcon icon={icons.refresh} color={colors.natural.natural0} />}
          />
        </>
      ) : (
        <IPayFlatlist
          data={guideToReceiveCall}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderGuideStepItem}
        />
      )}
    </IPayView>
  );
};

export default IPayReceiveCall;
