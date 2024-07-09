import { IPayLinearGradientView } from '@app/components/atoms';
import { IPayDropdownView } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { ipayNearestAtmTabCompoenetProps } from './ipay-nearest-atm-tab-component.interface';
import nearestAtmTabCompStyles from './ipay-nearest-atm-tab-component.style';

const IPayNearestAtmTabComponent: React.FC<ipayNearestAtmTabCompoenetProps> = ({
  testID,
  style,
  nearestAtmFilters,
}) => {
  const { colors } = useTheme();
  const styles = nearestAtmTabCompStyles(colors);

  return (
    <IPayLinearGradientView
      gradientColors={colors.appGradient.gradientPrimary10}
      testID={`${testID}-nearest-atm-tab-comp`}
      style={[styles.container, style]}
    >
      <IPayDropdownView headingText="Select City" onPressDropdown={() => {}} />
      <IPayTabs tabs={nearestAtmFilters} customStyles={styles.tabsView} scrollable />
    </IPayLinearGradientView>
  );
};

export default IPayNearestAtmTabComponent;
