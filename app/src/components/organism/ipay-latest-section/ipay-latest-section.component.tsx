import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';
import IPayBannerAnimation from '@app/components/molecules/ipay-banner-animation/ipay-banner-animation.component';
import IPayLatestListCard from '@app/components/molecules/ipay-latest-offers-card/ipay-latest-offers-card.component';
import IPaySuggestedSlider from '@app/components/molecules/ipay-suggested-slider/ipay-suggested-slider.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { forwardRef } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { histroyData, sampleData } from './ipay-latest-section.constant';
import { IPayLatestSectionProps } from './ipay-latest-section.interface';
import styles from './ipay-latest-section.style';

const IPayLatestList: React.FC = forwardRef<{}, IPayLatestSectionProps>(
  ({ testID, openBottomSheet, openProfileBottomSheet }, ref) => {
    const { colors } = useTheme();
    const localizationText = useLocalization();
    // Get the current arrangement from the Redux store
    const arrangement = useTypedSelector((state) => state.rearrangement.items);

    // Render the sections dynamically based on the current arrangement
    const renderSection = (section: string) => {
      switch (section) {
        case localizationText.action_section:
          return (
            <>
              <IPayView style={[styles.headingsContainer]}>
                <IPayView style={[styles.commonContainerStyle]}>
                  <IPayFootnoteText style={[styles.footnoteTextStyle]}>
                    {localizationText.Needs_my_action}
                  </IPayFootnoteText>
                  <IPayCaption2Text style={[styles.captionTextStyle]}>(3 {localizationText.Pending})</IPayCaption2Text>
                </IPayView>
                <IPayView style={[styles.commonContainerStyle]}>
                  <IPaySubHeadlineText style={[styles.subheadingTextStyle]}>
                    {localizationText.view_all}
                  </IPaySubHeadlineText>
                  <IPayPressable>
                    <IPayIcon icon="arrow-square-right" size={moderateScale(14)} />
                  </IPayPressable>
                </IPayView>
              </IPayView>
              <IPayBannerAnimation onVerify={openProfileBottomSheet} />
            </>
          );
        case localizationText.suggested_for_you:
          return (
            <>
              <IPayFootnoteText style={[styles.footnoteTextStyle]}>
                {localizationText.suggested_for_you}
              </IPayFootnoteText>
              <IPayFlatlist
                showsHorizontalScrollIndicator={false}
                horizontal
                data={sampleData}
                renderItem={() => <IPaySuggestedSlider />}
              />
            </>
          );
        case localizationText.transcation_history:
          return (
            <>
              <IPayView style={[styles.headingsContainer]}>
                <IPayView style={[styles.commonContainerStyle]}>
                  <IPayFootnoteText style={[styles.footnoteTextStyle]}>
                    {localizationText.transcation_history}
                  </IPayFootnoteText>
                </IPayView>
                <IPayView style={[styles.commonContainerStyle]}>
                  <IPaySubHeadlineText style={[styles.subheadingTextStyle]}>
                    {localizationText.view_all}
                  </IPaySubHeadlineText>
                  <IPayPressable>
                    <IPayIcon icon="arrow-square-right" size={moderateScale(14)} />
                  </IPayPressable>
                </IPayView>
              </IPayView>
              <IPayView style={[styles.listContainer]}>
                {histroyData.map((item, index) => (
                  <IPayPressable key={index} style={styles.historyContStyle}>
                    <>
                      <IPayView style={[styles.commonContainerStyle]}>
                        <IPayView style={[styles.iconStyle]}>
                          <IPayIcon icon={icons.send_money} size={18} color={colors.primary.primary800} />
                        </IPayView>
                        <IPayView>
                          <IPayFootnoteText style={[styles.footnoteBoldTextStyle]}>Ahmed Mohamed</IPayFootnoteText>
                          <IPayCaption1Text style={[styles.captionTextStyle, styles.captionStyleText]}>
                            {localizationText.send_money}
                          </IPayCaption1Text>
                        </IPayView>
                      </IPayView>

                      <IPayView style={styles.currencyStyle}>
                        <IPayFootnoteText style={[styles.footnoteBoldTextStyle, styles.footnoteRedTextStyle]}>
                          -250 {localizationText.sar}
                        </IPayFootnoteText>
                        <IPayCaption2Text style={[styles.captionTextStyle, styles.captionStyleTwoText]}>
                          14/03/2024 - 15:30
                        </IPayCaption2Text>
                      </IPayView>
                    </>
                  </IPayPressable>
                ))}
              </IPayView>
            </>
          );
        case localizationText.latest_offers:
          return (
            <>
              <IPayView style={[styles.headingsContainer]}>
                <IPayView style={[styles.commonContainerStyle]}>
                  <IPayFootnoteText style={[styles.footnoteTextStyle]}>
                    {localizationText.latest_offers}
                  </IPayFootnoteText>
                </IPayView>
                <IPayView style={[styles.commonContainerStyle]}>
                  <IPaySubHeadlineText style={[styles.subheadingTextStyle]}>
                    {localizationText.view_all}
                  </IPaySubHeadlineText>
                  <IPayPressable>
                    <IPayIcon icon="arrow-square-right" size={moderateScale(14)} />
                  </IPayPressable>
                </IPayView>
              </IPayView>
              <IPayFlatlist horizontal data={sampleData} renderItem={() => <IPayLatestListCard />} />
            </>
          );
        default:
          return null;
      }
    };
    return (
      <IPayScrollView>
        <IPayView testID={`${testID}-latest-section`} style={[styles.container]}>
          {arrangement?.map((section) => renderSection(section))}
          <IPayView style={[styles.commonContainerStyle, styles.rearrangeContainerStyle]}>
            <IPaySubHeadlineText style={[styles.subheadingTextStyle]}>
              {localizationText.rearrange_sections}
            </IPaySubHeadlineText>
            <IPayPressable onPress={openBottomSheet}>
              <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
            </IPayPressable>
          </IPayView>
        </IPayView>
      </IPayScrollView>
    );
  },
);

export default IPayLatestList;
