import { CallIncoming, RefreshIcon } from '@app/assets/svgs';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayProgressBar,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientTextMasked, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatCountdownTime } from '@app/utilities/date-helper.util';
import React, { useEffect } from 'react';
import useCallReceiverTimer from './ipay-receive-call.hook';
import { GuideStep, IPayReceiveCallProps } from './ipay-receive-call.interface';
import receiveCallStyles from './ipay-receive-call.styles';

const IPayReceiveCall: React.FC<IPayReceiveCallProps> = ({
  testID,
  guideToReceiveCall,
  activateInternationalBeneficiary,
}) => {
  const { colors } = useTheme();
  const styles = receiveCallStyles(colors);
  const localizationText = useLocalization();
  let interval: NodeJS.Timeout;

  const { gradientWidth, timeLeft, expired, startTimer, handleRequestAgain } = useCallReceiverTimer(
    activateInternationalBeneficiary,
  );
  useEffect(() => {
    if (!expired) {
      startTimer();
    }
    return () => {
      clearInterval(interval);
    };
  }, [expired]);

  const renderGuideStepItem = ({ item: { title, extraText, pressNumber, stepNumber } }: { item: GuideStep }) => (
    <IPayList
      key={title}
      title={
        <IPayFootnoteText color={colors.primary.primary800}>
          {title}
          <IPayFootnoteText color={colors.primary.primary800} regular={false}>
            {pressNumber}{' '}
          </IPayFootnoteText>
          <IPayFootnoteText color={colors.primary.primary800}>{extraText}</IPayFootnoteText>
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

  return (
    <IPayView testID={`${testID}-receive-call`} style={styles.container}>
      <CallIncoming />
      <IPayTitle2Text text={localizationText.ACTIVATE_BENEFICIARY.RECEIVE_A_CALL_TO_ACTIVATE} />
      <IPayCaption1Text style={styles.desStyle} text={localizationText.ACTIVATE_BENEFICIARY.RECEIVE_CALL_STEPS} />

      <IPayProgressBar
        showExpired={expired}
        style={styles.progressBar}
        gradientWidth={gradientWidth}
        colors={colors.gradientSecondary}
      />
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
            rightIcon={<RefreshIcon style={styles.refreshIcon} color={colors.natural.natural0} />}
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
