import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayIcon,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { ipayNearestAtmTabCompoenetProps } from './ipay-nearest-atm-filter.interface';
import nearestAtmTabCompStyles from './ipay-nearest-atm-filter.style';

const IPayNearestAtmFilterComponent: React.FC<ipayNearestAtmTabCompoenetProps> = ({
  testID,
  style,
  headingText,
  subHeadlinText,
  onPressDropdown,
  nearestAtmFilters,
  onSelectTab,
  selectedTab,
}) => {
  const { colors } = useTheme();
  const styles = nearestAtmTabCompStyles(colors);

  return (
    <IPayLinearGradientView
      gradientColors={colors.appGradient.gradientPrimary10}
      testID={`${testID}-nearest-atm-tab-comp`}
      style={[styles.container, style]}
    >
      <IPayPressable style={styles.dropDownView} testID={`${testID}-dropdown-view`} onPress={onPressDropdown}>
        <IPayView>
          <IPayCaption1Text text={headingText} style={styles.headingText} />
          <IPaySubHeadlineText regular text={subHeadlinText} color={colors.natural.natural900} />
        </IPayView>

        <IPayIcon icon={icons.arrow_circle_down} size={24} color={colors.primary.primary500} />
      </IPayPressable>
      <IPayTabs
        tabs={nearestAtmFilters}
        customStyles={styles.tabsView}
        scrollable
        onSelect={onSelectTab}
        preSelectedTab={selectedTab}
      />
    </IPayLinearGradientView>
  );
};

export default IPayNearestAtmFilterComponent;
