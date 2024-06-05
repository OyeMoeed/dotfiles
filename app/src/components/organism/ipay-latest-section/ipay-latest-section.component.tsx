import React, { forwardRef } from 'react';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView
} from '@app/components/atoms';
import { IPayLatestSectionProps } from './ipay-latest-section.interface';
import styles from './ipay-latest-section.style';
import { LeftSquareIcon, SendMoneyIcon } from '@app/assets/svgs/index';
import IPayBannerAnimation from '@app/components/molecules/ipay-banner-animation/ipay-banner-animation.component';
import IPaySuggestedSlider from '@app/components/molecules/suggested-slider/ipay-suggested-slider.component';
import IPayLatestListCard from '@app/components/molecules/ipay-latest-offers-card/ipay-latest-offers-card.component';
import { useTypedSelector } from '@app/store/store';
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';

const IPayLatestList = forwardRef<{}, IPayLatestSectionProps>(({ testID,openBottomSheet }) => {
  const sampleData = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' },
    { id: 5, name: 'Eve' }
  ];
  const histroyData = [1, 2, 3];
    // Get the current arrangement from the Redux store
    const arrangement  = useTypedSelector((state) => state.rearrangement.items);


    // Render the sections dynamically based on the current arrangement
    const renderSection = (section: string) => {
      switch (section) {
        case 'Action Section':
          return (
            <>
            <IPayView style={styles.headingsContainer}>
            <IPayView style={styles.commonContainerStyle}>
              <IPayFootnoteText style={[styles.footnoteTextStyle]}>Needs my action</IPayFootnoteText>
              <IPayCaption2Text style={styles.captionTextStyle}>(3 Pending)</IPayCaption2Text>
            </IPayView>
            <IPayView style={styles.commonContainerStyle}>
              <IPaySubHeadlineText style={styles.subheadingTextStyle}>View all</IPaySubHeadlineText>
              <IPayPressable>
                <LeftSquareIcon />
              </IPayPressable>
            </IPayView>
          </IPayView>
          <IPayBannerAnimation />
          </>
          );
        case 'Suggested for you':
          return (
          <>
          <IPayFootnoteText style={styles.footnoteTextStyle}>Suggested for you</IPayFootnoteText>
          <IPayFlatlist
            showsHorizontalScrollIndicator={false}
            horizontal
            data={sampleData}
            renderItem={() => {
              return <IPaySuggestedSlider />;
            }}
          />
          </>
          );
        case 'Transaction History':
          return (
            <>
            <IPayView style={styles.headingsContainer}>
            <IPayView style={styles.commonContainerStyle}>
              <IPayFootnoteText style={[styles.footnoteTextStyle]}>Transactions History</IPayFootnoteText>
            </IPayView>
            <IPayView style={styles.commonContainerStyle}>
              <IPaySubHeadlineText style={styles.subheadingTextStyle}>View all</IPaySubHeadlineText>
              <IPayPressable>
                <LeftSquareIcon />
              </IPayPressable>
            </IPayView>
          </IPayView>
          <IPayView style={styles.listContainer}>
          {histroyData.map(() => {
            return (
              <IPayPressable style={styles.historyContStyle}>
                <>
                  <IPayView style={styles.commonContainerStyle}>
                    <IPayView style={styles.iconStyle}>
                      <SendMoneyIcon />
                    </IPayView>
                    <IPayView>
                      <IPayFootnoteText style={styles.footnoteBoldTextStyle}>Ahmed Mohamed</IPayFootnoteText>
                      <IPayCaption1Text>Send money</IPayCaption1Text>
                    </IPayView>
                  </IPayView>
  
                  <IPayView style={styles.currencyStyle}>
                    <IPayFootnoteText style={[styles.footnoteBoldTextStyle, styles.footnoteRedTextStyle]}>
                      -250 SAR
                    </IPayFootnoteText>
                    <IPayCaption2Text>14/03/2024 - 15:30</IPayCaption2Text>
                  </IPayView>
                </>
              </IPayPressable>
            );
          })}
        </IPayView>
      </>
  
          );
        case 'Latest Offers':
          return (
            <>
            <IPayView style={styles.headingsContainer}>
            <IPayView style={styles.commonContainerStyle}>
              <IPayFootnoteText style={[styles.footnoteTextStyle]}>Latest Offers</IPayFootnoteText>
            </IPayView>
            <IPayView style={styles.commonContainerStyle}>
              <IPaySubHeadlineText style={styles.subheadingTextStyle}>View all</IPaySubHeadlineText>
              <IPayPressable>
                <LeftSquareIcon />
              </IPayPressable>
            </IPayView>
          </IPayView>
          <IPayFlatlist
            horizontal
            data={sampleData}
            renderItem={() => {
              return <IPayLatestListCard />;
            }}
          />
          </>
          );
        default:
          return null;
      }
    };
  return (
    <IPayScrollView>
      <IPayView testID={testID} style={styles.container}>
      {arrangement?.map((section) => renderSection(section))}
        <IPayView style={[styles.commonContainerStyle, styles.rearrangeContainerStyle]}>
          <IPaySubHeadlineText style={styles.subheadingTextStyle}>Rearrange sections</IPaySubHeadlineText>
          <IPayPressable onPress={openBottomSheet}>
            <LeftSquareIcon />
          </IPayPressable>
        </IPayView>
      </IPayView>
    </IPayScrollView>
  );
});

export default IPayLatestList;
