import { IPayButton, IPayHeader } from '@app/components/molecules/index';
import { IPaySafeAreaView } from '@app/components/templates/index';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayTitle2Text,
  IPayView,
} from '@components/atoms/index';
import React, { useState, useEffect } from 'react';
import icons from '@app/assets/icons';
import helpCenterStyles from './helpcenter.styles';

const HelpCenter: React.FC = () => {
  const { colors } = useTheme();
  const [faqItems, setFaqItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const styles = helpCenterStyles(colors);
  const localizationText = useLocalization();

  // Fetch data from the mock API
  useEffect(() => {
    const fetchFaqItems = async () => {
      const response = await fetch('https://mocki.io/v1/034027a4-18a6-4325-b772-7bcc4bfceaab');
      const data = await response.json();
      setFaqItems(data.faqItems);
    };

    fetchFaqItems();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderFaqItem = ({ item, index }) => (
    <IPayView style={styles.faqItemContainer}>
      <IPayPressable onPress={() => toggleExpand(index)} style={styles.faqItemHeader}>
        <IPayView style={styles.listView}>
          <IPayFootnoteText regular style={styles.faqItemText}>
            {item.question}
          </IPayFootnoteText>
          <IPayIcon
            icon={icons.ARROW_DOWN}
            size={18}
            style={expandedIndex === index ? styles.faqItemIconExpanded : styles.faqItemIcon}
          />
        </IPayView>
      </IPayPressable>
      {expandedIndex === index && (
        <IPayCaption1Text regular style={styles.faqItemAnswer}>
          {item.answer}
        </IPayCaption1Text>
      )}
    </IPayView>
  );

  return (
    <IPaySafeAreaView style={styles.safeAreaView}>
      <IPayHeader title={localizationText.help_center} backHeader />
      <IPayView style={styles.container}>
        <IPayView style={styles.titleContainer}>
          <IPayIcon icon={icons.MESSAGE_QUESTION} size={40} />
          <IPayTitle2Text text={localizationText.faq} style={styles.title} />
          <IPayCaption1Text regular text={localizationText.faq_definition} style={styles.subtitle} />
        </IPayView>
        <IPayFlatlist data={faqItems} renderItem={renderFaqItem} keyExtractor={(item, index) => index.toString()} />
        <IPayView style={styles.contactUsContainer}>
          <IPaySubHeadlineText regular style={styles.contactUsText}>
            {localizationText.assistance}
          </IPaySubHeadlineText>
          <IPayCaption1Text regular style={styles.contactUsSubText}>
            {localizationText.contact_service_team}
          </IPayCaption1Text>
          <IPayButton
            btnType="primary"
            rightIcon={<IPayIcon icon={icons.PHONE} color={colors.secondary.secondary800} size={20} />}
            btnText={localizationText.contact_us}
            textColor={colors.secondary.secondary800}
            textStyle={styles.buttonText}
            btnStyle={styles.buttonBg}
            large
          />
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default HelpCenter;
