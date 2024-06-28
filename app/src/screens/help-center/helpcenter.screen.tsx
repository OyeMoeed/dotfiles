import icons from '@app/assets/icons';
import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules/index';
import { IPayActionSheet, IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates/index';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import helpCenterStyles from './helpcenter.styles';

const HelpCenter: React.FC = () => {
  const { colors } = useTheme();
  const contactUsRef = useRef<any>(null);
  const actionSheetRef = useRef<any>(null);
  const [faqItems, setFaqItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const styles = helpCenterStyles(colors);
  const localizationText = useLocalization();
  const [selectedNumber, setSelectedNumber] = useState<string>('');
  const inside_sa_phone = '(+966)8004339000'; // need to replace with API
  const outside_sa_phone = '(+966)90000670'; // need to replace with API

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

  const contactList = [
    { title: localizationText.call_within_sa, phone_number: inside_sa_phone },
    { title: localizationText.call_outside_sa, phone_number: outside_sa_phone },
  ];

  const openBottomSheet = () => {
    contactUsRef.current.present();
  };
  const closeBottomSheet = () => {
    contactUsRef.current.close();
  };

  const showActionSheet = (phoneNumber: string) => {
    setSelectedNumber(phoneNumber);
    closeBottomSheet();
    setTimeout(() => {
      actionSheetRef.current.show();
    }, 500); // Delay for closing sheet
  };

  const hideContactUs = () => {
    setTimeout(() => {
      actionSheetRef.current.hide();
    }, 500); // Delay for closing sheet
  };

  const onPressCall = () => {};

  const handleFinalAction = useCallback((index: number) => {
    switch (index) {
      case 1:
        onPressCall();
        break;
      case 2:
        hideContactUs();
        break;
      default:
        break;
    }
  }, []);

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
    <>
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
              onPress={openBottomSheet}
            />
          </IPayView>
        </IPayView>
        <IPayActionSheet
          ref={actionSheetRef}
          options={[`${localizationText.call} ${selectedNumber}`, localizationText.cancel]}
          cancelButtonIndex={1}
          showCancel
          onPress={handleFinalAction}
          bodyStyle={styles.bodyStyle}
        />
      </IPaySafeAreaView>
      <IPayBottomSheet
        heading={localizationText.contact_us}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['1%', isAndroidOS ? '30%' : '40%']}
        ref={contactUsRef}
        simpleHeader
        simpleBar
        bold
        cancelBnt
      >
        <IPayView style={styles.contactWrapper}>
          <IPayFootnoteText
            style={styles.headerStyle}
            text={localizationText.are_you_still_in_need_of_assistance}
            color={colors.primary.primary900}
          />
          <IPayCaption1Text text={localizationText.contact_service_team} color={colors.natural.natural700} />
        </IPayView>
        <IPayView style={styles.contentContainer}>
          {contactList.map((item) => (
            <IPayList
              key={item.title}
              title={item.title}
              textStyle={styles.contentHeading}
              isShowSubTitle
              subTitle={item.phone_number}
              isShowIcon
              subTextStyle={styles.contentSubTitle}
              icon={
                <IPayPressable style={styles.iconWrapper} onPress={() => showActionSheet(item.phone_number)}>
                  <IPayIcon icon={icons.call_calling} size={18} color={colors.natural.natural0} />
                </IPayPressable>
              }
            />
          ))}
        </IPayView>
      </IPayBottomSheet>
    </>
  );
};

export default HelpCenter;
