import icons from '@app/assets/icons';
import { helpCenterMockData } from '@app/assets/mocks/help-center.mock';
import IPaySectionList from '@app/components/atoms/ipay-section-list/ipay-section-list.component';
import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules/index';
import { IPayActionSheet, IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates/index';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayInput,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@components/atoms/index';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, ScrollView, SectionList } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import getFAQ from '@app/network/services/core/faq/faq.service';
import helpCenterStyles from './helpcenter.styles';

const HelpCenter: React.FC = () => {
  const { colors } = useTheme();
  const contactUsRef = useRef<any>(null);
  const actionSheetRef = useRef<any>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState<number | null>(null);
  const styles = helpCenterStyles(colors);
  const localizationText = useLocalization();
  const [selectedNumber, setSelectedNumber] = useState<string>('');
  const inside_sa_phone = '(+966)8004339000'; // need to replace with API
  const outside_sa_phone = '(+966)90000670'; // need to replace with API
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionListRef = useRef<SectionList<any>>(null);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const [allFaqItems, setAllFaqItems] = useState([]);
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const checkDeviceType = () => {
      const tablet = DeviceInfo.isTablet();
      setIsTablet(tablet);
    };

    checkDeviceType();
  }, []);
  // Fetch data from the mock API
  useEffect(() => {
    fetchFaqItems();
  }, []);

  const fetchFaqItems = async () => {
    try {
      const apiResponse: any = await getFAQ();

      if (apiResponse?.status?.type === 'SUCCESS') {
        const itemsWithCategories = [
          {
            id: 1,
            title: '',
            data: apiResponse?.response?.faqs.map((question) => ({
              id: 1,
              question: question.question,
              answer: question.answer,
            })),
          },
        ];
        setAllFaqItems(itemsWithCategories);
        setFaqData(itemsWithCategories);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setAPIError(apiResponse?.error);
      }
    } catch (error: any) {
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const toggleExpand = (index: number, sectionID: number) => {
    setCurrentSection(sectionID);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (!searchText) {
      setFaqData(allFaqItems);
    } else {
      const filteredData = [];
      for (let i = 0; i < allFaqItems.length; i++) {
        const filteredQuestions = allFaqItems[i].data.filter((el) =>
          el.question.toUpperCase().includes(searchText.toUpperCase()),
        );
        if (filteredQuestions.length > 0) {
          filteredData.push({
            ...allFaqItems[i],
            data: filteredQuestions,
          });
        }
      }
      setFaqData(filteredData);
    }
  }, [searchText]);

  const handleScrollViewScroll = useCallback(
    (event: any) => {
      if (!event.nativeEvent) {
        return;
      }

      event.persist(); // Persist the event to avoid it being nullified

      const { contentOffset } = event.nativeEvent;
      if (!contentOffset) {
        return;
      }
      const offsetY = contentOffset.y;

      let tab = currentTab; // Start with the current tab state
      let accumulatedHeight = 0; // Initialize accumulatedHeight

      for (let i = 0; i < helpCenterMockData.length; i++) {
        const sectionHeight =
          helpCenterMockData[i].data.length * (isTablet ? moderateScale(87, 0.4) : verticalScale(55)); // Calculate section height
        // Check if offsetY is within the bounds of the current section
        if (offsetY < accumulatedHeight + sectionHeight) {
          tab = i; // Update tab index if offsetY is within the current section
          break;
        }
        accumulatedHeight += sectionHeight; // Accumulate section height for next iteration
      }
      setCurrentTab(tab); // Update the current tab state
    },
    [currentTab],
  ); // Ensure to include currentTab in the dependency array for useCallback

  const onPressHeaderTab = (sectionIndex: number) => {
    setCurrentTab(sectionIndex);

    if (sectionListRef.current && scrollViewRef.current) {
      // Step 1: Scroll SectionList to the section
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        viewPosition: 0.5, // Position at the top of the screen
        animated: true,
      });

      // Step 2: Calculate ScrollView scroll position based on section position
      let yOffset = 0;
      for (let i = 0; i < sectionIndex; i++) {
        const sectionHeight =
          helpCenterMockData[i].data.length * (isTablet ? moderateScale(87, 0.4) : verticalScale(55)); // Adjust according to your item heights and section header height
        yOffset += sectionHeight;
      }
      scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
    }
  };

  const onSearchChangeText = (text: string) => {
    setSearchText(text);
  };

  const renderHelpCenterHeader = ({ item, index }: { item: string; index: number }) => (
    <IPayPressable
      onPress={() => onPressHeaderTab(index)}
      style={currentTab === index ? styles.headerTabSelected : styles.headerTabUnSelected}
    >
      <IPayFootnoteText
        regular={currentTab !== index}
        text={item}
        color={currentTab === index ? colors.natural.natural0 : colors.natural.natural500}
      />
    </IPayPressable>
  );

  const contactList = [
    { title: localizationText.MENU.CALL_WITHIN_SA, phone_number: inside_sa_phone },
    { title: localizationText.MENU.CALL_OUTSIDE_SA, phone_number: outside_sa_phone },
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

  const onPressCall = (value: string) => {
    Linking.openURL(`tel: ${value}`);
  };

  const handleFinalAction = useCallback((index: number, value: string) => {
    switch (index) {
      case 0:
        onPressCall(value);
        break;
      case 1:
        hideContactUs();
        break;
      default:
        break;
    }
  }, []);

  const isOpen = (index: number, section: number) => {
    if (index === expandedIndex && section === currentSection) return true;
    return false;
  };

  const renderFaqItem = ({ section, item, index }: { item: any; index: number }) => (
    <IPayView style={styles.faqItemContainer}>
      <IPayPressable
        onPress={() => {
          toggleExpand(index, section.id);
        }}
        style={styles.faqItemHeader}
      >
        <IPayView style={styles.listView}>
          <IPayFootnoteText regular style={styles.faqItemText}>
            {item.question}
          </IPayFootnoteText>
          <IPayIcon
            icon={isOpen(index, section.id) ? icons.arrowUp : icons.ARROW_DOWN}
            size={18}
            style={isOpen(index, section.id) ? styles.faqItemIconExpanded : styles.faqItemIcon}
          />
        </IPayView>
      </IPayPressable>
      {isOpen(index, section.id) && (
        <>
          {item.answer.map((ques, index) => (
            <IPayCaption1Text
              key={index}
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

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <IPayView style={styles.header}>
      <IPayFootnoteText regular text={title} color={colors.natural.natural500} />
    </IPayView>
  );

  const onClearInput = () => {
    if (searchText) {
      setSearchText('');
    }
  };

  return (
    <>
      <IPaySafeAreaView style={styles.safeAreaView}>
        <IPayHeader
          title={localizationText.MENU.SUPPORT_AND_HELP}
          backBtn
          onPress={openBottomSheet}
          applyFlex
          contactUs
        />
        <IPayView style={styles.container}>
          {/* TODO: remove categories untill implement it from back end */}
          {/* <IPayView style={styles.headerTabView}>
            <IPayFlatlist
              horizontal
              data={constants.HELP_CENTER_TABS}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderHelpCenterHeader}
              ItemSeparatorComponent={<IPayView style={styles.itemSeparator} />}
              showsHorizontalScrollIndicator={false}
            />
          </IPayView> */}

          <IPayView style={styles.searchBarView}>
            <IPayIcon icon={icons.search1} size={20} color={colors.primary.primary500} />
            <IPayInput
              onChangeText={onSearchChangeText}
              text={searchText}
              placeholder={localizationText.COMMON.SEARCH}
              style={styles.searchInputText}
            />
            <IPayPressable onPress={onClearInput}>
              <IPayIcon
                icon={searchText === '' ? icons.microphone : icons.CLOSE_SQUARE}
                size={20}
                color={colors.natural.natural500}
              />
            </IPayPressable>
          </IPayView>

          <IPayScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            onMomentumScrollEnd={handleScrollViewScroll}
            scrollEventThrottle={16}
          >
            <IPaySectionList
              scrollEnabled={false}
              ref={sectionListRef}
              sections={faqData} // Corrected to `sections` from `data`
              renderItem={renderFaqItem}
              renderSectionHeader={renderSectionHeader}
              showsVerticalScrollIndicator={false}
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
                rightIcon={<IPayIcon icon={icons.PHONE} color={colors.secondary.secondary800} size={20} />}
                btnText={localizationText.COMMON.CONTACT_US}
                textColor={colors.secondary.secondary800}
                textStyle={styles.buttonText}
                btnStyle={styles.buttonBg}
                large
                onPress={openBottomSheet}
              />
            </IPayView>
          </IPayScrollView>
        </IPayView>
        <IPayActionSheet
          ref={actionSheetRef}
          options={[`${localizationText.MENU.CALL} ${selectedNumber}`, localizationText.COMMON.CANCEL]}
          cancelButtonIndex={1}
          showCancel
          onPress={(index) => handleFinalAction(index, selectedNumber)}
          bodyStyle={styles.bodyStyle}
        />
      </IPaySafeAreaView>
      <IPayBottomSheet
        heading={localizationText.COMMON.CONTACT_US}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['1%', '40%']}
        ref={contactUsRef}
        simpleHeader
        simpleBar
        bold
        cancelBnt
      >
        <IPayView style={styles.contactWrapper}>
          <IPayFootnoteText
            style={styles.headerStyle}
            text={localizationText.COMMON.ASSISTANCE}
            color={colors.primary.primary900}
          />
          <IPayCaption1Text text={localizationText.COMMON.CONTACT_SERVICE_TEAM} color={colors.natural.natural700} />
        </IPayView>
        <IPayView style={styles.contentContainer}>
          {contactList.map((item) => (
            <IPayList
              key={item.title}
              title={item.title}
              isShowSubTitle
              subTitle={item.phone_number}
              isShowIcon
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
