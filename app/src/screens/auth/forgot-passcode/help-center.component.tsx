import { IPayButton } from '@app/components/molecules';
import IPaySkeletonBuilder from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.component';
import { IPaySkeletonEnums } from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.interface';
import useGetFaq from '@app/network/services/core/faq/get-faq.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities';
import icons from '@assets/icons';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayTitle2Text,
  IPayView,
} from '@components/atoms';
import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { IPayHelpCenterProps } from './forget-passcode.interface';
import helpCenterStyles from './help-center.style';

const HelpCenterComponent: React.FC<IPayHelpCenterProps> = ({ testID, onPressContactUs, hideFAQError = false }) => {
  const { colors } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const styles = helpCenterStyles(colors);
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const { isLoading: isFAQLoading, data: faqsItems } = useGetFaq({
    payload: { hideError: hideFAQError, hideSpinner: true },
  });

  const renderFaqItem = ({ item, index }: { item: { question: string; answer: [] }; index: number }) => (
    <IPayView style={styles.faqItemContainer} testID={testID}>
      <IPayPressable onPress={() => toggleExpand(index)} style={styles.faqItemHeader}>
        <IPayView style={styles.listView}>
          <IPayFootnoteText regular style={styles.faqItemText}>
            {item.question}
          </IPayFootnoteText>
          <IPayIcon
            icon={expandedIndex === index ? icons.arrowUp : icons.arrowDown}
            size={18}
            color={expandedIndex === index ? colors.primary.primary500 : colors.primary.primary900}
          />
        </IPayView>
      </IPayPressable>
      {expandedIndex === index && (
        <>
          {item.answer.map((ques, answerIndex) => (
            <IPayCaption1Text
              key={`${`${answerIndex}IPayCaption1Text`}`}
              regular
              style={[
                styles.faqItemAnswer,
                index === 0 ? styles.faqItemAnswerFirstItem : styles.faqItemAnswerListItem,
                index === item.answer.length - 1 ? styles.faqItemAnswerLastItem : styles.faqItemAnswerListItem,
              ]}
            >
              {ques}
            </IPayCaption1Text>
          ))}
        </>
      )}
    </IPayView>
  );

  return (
    <IPayView style={styles.container}>
      <IPayScrollView showsVerticalScrollIndicator={false}>
        <>
          <IPayView style={styles.titleContainer}>
            <icons.question width={scale(40)} height={verticalScale(40)} />
            <IPayTitle2Text text="FORGOT_PASSCODE.FAQ" style={styles.title} />
            <IPayCaption1Text regular text="FORGOT_PASSCODE.FAQ_DEFINITION" style={styles.subtitle} />
          </IPayView>
          {isFAQLoading ? (
            <IPaySkeletonBuilder isLoading={isFAQLoading} variation={IPaySkeletonEnums.TRANSACTION_LIST} />
          ) : (
            <IPayFlatlist
              scrollEnabled={false}
              data={faqsItems}
              renderItem={renderFaqItem}
              keyExtractor={(_, index) => index.toString()}
            />
          )}

          <IPayView style={styles.contactUsContainer}>
            <IPaySubHeadlineText regular style={styles.contactUsText} text="COMMON.ASSISTANCE" />
            <IPayCaption1Text regular style={styles.contactUsSubText} text="COMMON.CONTACT_SERVICE_TEAM" />
            <IPayButton
              btnType={buttonVariants.PRIMARY}
              rightIcon={<IPayIcon icon={icons.phone} size={20} color={colors.secondary.secondary800} />}
              btnText="COMMON.CONTACT_US"
              textColor={colors.secondary.secondary800}
              btnStyle={styles.buttonBg}
              large
              onPress={onPressContactUs}
            />
          </IPayView>
        </>
      </IPayScrollView>
    </IPayView>
  );
};

export default HelpCenterComponent;
