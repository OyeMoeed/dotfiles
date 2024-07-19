import { CallOutgoing } from '@app/assets/svgs';
import { IPayCaption1Text, IPayFlatlist, IPayFootnoteText, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayGradientTextMasked, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { GuideStep, IPayReceiveCallProps } from './ipay-receive-call.interface';
import receiveCallStyles from './ipay-receive-call.styles';

const IPayReceiveCall: React.FC<IPayReceiveCallProps> = ({ testID, guideToReceiveCall }) => {
  const { colors } = useTheme();
  const styles = receiveCallStyles(colors);
  const localizationText = useLocalization();
  const renderGuideStepItem = ({ item }: { item: GuideStep }) => (
    <IPayList
      key={item.title}
      title={
        <IPayFootnoteText>
          {item.title}
          <IPayFootnoteText regular={false}> {item.pressNumber}</IPayFootnoteText>
        </IPayFootnoteText>
      }
      textStyle={styles.stepStyle}
      isShowLeftIcon
      containerStyle={styles.containerStyle}
      leftIcon={
        <IPayView style={styles.stepViewStyle}>
          <IPayGradientTextMasked colors={colors.gradientPrimary}>
            <IPayCaption1Text regular={false} text={item.stepNumber} />
          </IPayGradientTextMasked>
        </IPayView>
      }
    />
  );
  return (
    <IPayView testID={`${testID}-receive-call`} style={styles.container}>
      <CallOutgoing />
      <IPayTitle2Text text={localizationText.ACTIVATE_BENEFICIARY.RECEIVE_A_CALL_TO_ACTIVATE} />
      <IPayCaption1Text style={styles.desStyle} text={localizationText.ACTIVATE_BENEFICIARY.RECEIVE_CALL_STEPS} />
      <IPayFlatlist
        data={guideToReceiveCall}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderGuideStepItem}
      />
    </IPayView>
  );
};

export default IPayReceiveCall;
