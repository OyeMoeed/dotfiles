import icons from '@app/assets/icons';
import { CallOutgoing } from '@app/assets/svgs';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayGradientTextMasked, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { ContactItem, GuideStep, IPayActivationCallProps } from './ipay-activation-call.interface';
import activationCallStyles from './ipay-activation-call.styles';

const IPayActivationCall: React.FC<IPayActivationCallProps> = ({ testID, contactList, guideStepsToCall }) => {
  const { colors } = useTheme();
  const styles = activationCallStyles(colors);
  const localizationText = useLocalization();
  const ContactItemComponent = ({ item }: ContactItem) => {
    const { title, phone_number } = item;
    return (
      <IPayList
        key={title}
        title={title}
        isShowSubTitle
        subTitle={phone_number}
        containerStyle={styles.listContainer}
        isShowIcon
        icon={
          <IPayPressable style={styles.iconWrapper}>
            <IPayIcon icon={icons.call_calling} size={18} color={colors.natural.natural0} />
          </IPayPressable>
        }
      />
    );
  };

  const ContactListOptions = () => {
    return (
      <IPayView style={styles.childrenStyles}>
        {contactList?.map((item: ContactItem) => <ContactItemComponent item={item} />)}
      </IPayView>
    );
  };

  const renderGuideStepItem = ({
    item: { title, pressNumber, extraText, stepNumber, isContactList },
  }: {
    item: GuideStep;
  }) => (
    <IPayList
      key={title}
      title={
        <IPayFootnoteText>
          {title}
          <IPayFootnoteText regular={false}> {pressNumber}</IPayFootnoteText>
          <IPayFootnoteText> {extraText}</IPayFootnoteText>
        </IPayFootnoteText>
      }
      textStyle={styles.stepStyle}
      isShowLeftIcon
      leftIcon={
        <IPayView style={styles.stepViewStyle}>
          <IPayGradientTextMasked colors={colors.gradientPrimary}>
            <IPayCaption1Text regular={false} text={stepNumber} />
          </IPayGradientTextMasked>
        </IPayView>
      }
      style={isContactList && styles.containerStyle}
      containerStyle={styles.curveStyle}
      children={isContactList && <ContactListOptions />}
    />
  );

  return (
    <IPayView testID={`${testID}-activation-call`} style={styles.container}>
      <CallOutgoing />
      <IPayTitle2Text text={localizationText.ACTIVATE_BENEFICIARY.CALL_ALINMA_TO_ACTIVATE} />
      <IPayCaption1Text style={styles.desStyle} text={localizationText.ACTIVATE_BENEFICIARY.ACTIVATION_STEPS} />
      <IPayFlatlist
        data={guideStepsToCall}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderGuideStepItem}
      />
    </IPayView>
  );
};

export default IPayActivationCall;
