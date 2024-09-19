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
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { ContactItem, GuideStep, IPayActivationCallProps } from './ipay-activation-call.interface';
import activationCallStyles from './ipay-activation-call.styles';

const IPayActivationCall: React.FC<IPayActivationCallProps> = ({ testID, contactList, guideStepsToCall, close }) => {
  const { colors } = useTheme();
  const styles = activationCallStyles(colors);

  // TODO: Fix nested components
  // eslint-disable-next-line react/no-unstable-nested-components
  const ContactItemComponent = ({ item }: { item: ContactItem }) => {
    const { title, phone_number: phoneNumber } = item;
    return (
      <IPayList
        key={title}
        title={title}
        isShowSubTitle
        subTitle={phoneNumber}
        containerStyle={styles.listContainer}
        isShowIcon
        icon={
          <IPayPressable style={styles.iconWrapper} onPress={() => close(phoneNumber)}>
            <IPayIcon icon={icons.call_calling} size={18} color={colors.natural.natural0} />
          </IPayPressable>
        }
      />
    );
  };

  // TODO: Fix nested components
  // eslint-disable-next-line react/no-unstable-nested-components
  const ContactListOptions = () => (
    <IPayView style={styles.childrenStyles}>
      {contactList?.map((item: ContactItem) => <ContactItemComponent key={`${item.title}`} item={item} />)}
    </IPayView>
  );

  const renderGuideStepItem = ({
    item: { title, pressNumber, extraText, stepNumber, isContactList },
  }: {
    item: GuideStep;
  }) => (
    <IPayList
      key={title}
      title={
        <IPayFootnoteText color={colors.primary.primary800}>
          {title}
          <IPayFootnoteText color={colors.primary.primary800} regular={false}>
            {pressNumber}
          </IPayFootnoteText>
          <IPayFootnoteText color={colors.primary.primary800}> {extraText}</IPayFootnoteText>
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
    >
      {isContactList ? <ContactListOptions /> : <IPayView />}
    </IPayList>
  );

  return (
    <IPayView testID={`${testID}-activation-call`} style={styles.container}>
      <CallOutgoing />
      <IPayTitle2Text text="ACTIVATE_BENEFICIARY.CALL_ALINMA_TO_ACTIVATE" />
      <IPayCaption1Text style={styles.desStyle} text="ACTIVATE_BENEFICIARY.ACTIVATION_STEPS" />
      <IPayFlatlist
        data={guideStepsToCall}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderGuideStepItem}
      />
    </IPayView>
  );
};

export default IPayActivationCall;
