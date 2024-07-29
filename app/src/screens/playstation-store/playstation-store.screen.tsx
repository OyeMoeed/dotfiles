import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayDescriptiveCard, IPayHeader, IPayTextInput } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import CardDetails from '@app/enums/card-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import playStationStyles from './playstation-store.styles';

const PlayStationScreen: React.FC = () => {
  const { playStationScreenData } = useConstantData();
  const { colors } = useTheme();
  const styles = playStationStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.SHOP.PLAYSTATION} applyFlex />
      <IPayView style={styles.container}>
        <IPayView style={styles.searchRow}>
          <IPayTextInput
            rightIcon={<IPayIcon icon={icons.search1} color={colors.primary.primary500} />}
            label={localizationText.COMMON.SEARCH}
            text={''}
            containerStyle={styles.background}
            placeholderTextColor={colors.natural.natural500}
          />
          <IPayIcon icon={icons.arrow_updown} />
        </IPayView>
        <IPayDescriptiveCard cardType={CardDetails.DESVRIPTIVE} data={playStationScreenData} />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default PlayStationScreen;
