import { IPayButton } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
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
import React, { useEffect, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import getFAQ from '@app/network/services/core/faq/faq.service';
import { IPayHelpCenterProps } from './forget-passcode.interface';
import helpCenterStyles from './help-center.style';

const HelpCenterComponent: React.FC<IPayHelpCenterProps> = ({ testID, onPressContactUs, hideFAQError = false }) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const styles = helpCenterStyles(colors);
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const [faqsItems, setFaqsItems] = useState([]);

  const fetchFaqItems = async () => {
    const apiResponse: any = await getFAQ(hideFAQError);

    if (apiResponse?.status?.type === 'SUCCESS') {
      setFaqsItems(apiResponse?.response?.faqs);
    }
  };

  useEffect(() => {
    fetchFaqItems();
  }, []);

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
              key={answerIndex}
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
            <IPayTitle2Text text={localizationText.FORGOT_PASSCODE.FAQ} style={styles.title} />
            <IPayCaption1Text regular text={localizationText.FORGOT_PASSCODE.FAQ_DEFINITION} style={styles.subtitle} />
          </IPayView>
          <IPayFlatlist
            scrollEnabled={false}
            data={faqsItems}
            renderItem={renderFaqItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <IPayView style={styles.contactUsContainer}>
            <IPaySubHeadlineText regular style={styles.contactUsText}>
              {localizationText.COMMON.ASSISTANCE}
            </IPaySubHeadlineText>
            <IPayCaption1Text regular style={styles.contactUsSubText}>
              {localizationText.COMMON.CONTACT_SERVICE_TEAM}
            </IPayCaption1Text>
            <IPayButton
              btnType="primary"
              rightIcon={<IPayIcon icon={icons.phone} size={20} color={colors.secondary.secondary800} />}
              btnText={localizationText.COMMON.CONTACT_US}
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
