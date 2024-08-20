import React, { useState, useRef, useCallback } from 'react';
import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayChip, IPayDescriptiveCard, IPayHeader, IPayList, IPayTextInput } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import CardDetails from '@app/enums/card-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { States } from '@app/utilities/enums.util';
import playStationStyles from './playstation-store.styles';
import DataItem from './playstation-store.interface';

const PlayStationScreen: React.FC = () => {
  const { playStationPrices, sortingData } = useConstantData();
  const { colors } = useTheme();
  const styles = playStationStyles(colors);
  const localizationText = useLocalization();
  const sortRef = useRef<IPayBottomSheet>(null);

  const [search, setSearch] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // State for selected option
  const [sortedData, setSortedData] = useState(playStationPrices);

  const openRef = () => {
    if (sortRef.current) {
      sortRef.current.present();
    }
  };

  const handleSearch = (newText: string) => {
    setSearch(newText);
  };

  const handleSort = useCallback(
    (option: string) => {
      const sorted = [...playStationPrices].sort((a, b) =>
        option === localizationText.SHOP.HIGH_TO_LOW ? b.price - a.price : a.price - b.price,
      );
      setSortedData(sorted);
      if (sortRef.current) {
        sortRef.current.close();
      }
      setSelectedOption(option); // Update selected option state
    },
    [playStationPrices, localizationText.SHOP.HIGH_TO_LOW],
  );

  const renderItem = ({ item }: { item: DataItem }) => {
    const { id, text } = item;

    return (
      <IPayView key={id} style={styles.input}>
        <IPayList
          title={text}
          isShowIcon={selectedOption === text} // Show icon if selected
          icon={selectedOption === text ? <IPayIcon icon={icons.tick_check_mark_default} /> : null}
          onPress={() => handleSort(text)}
        />
      </IPayView>
    );
  };

  const renderChip = () => {
    if (selectedOption) {
      return (
        <IPayView style={styles.chipContainer}>
          <IPayChip
            containerStyle={styles.chip}
            variant={States.SEVERE}
            icon={<IPayIcon icon={icons.CLOSE_SQUARE} color={colors.secondary.secondary500} size={16} />}
            textValue={
              selectedOption === localizationText.SHOP.HIGH_TO_LOW
                ? localizationText.SHOP.HIGH_CHIP
                : localizationText.SHOP.LOW_CHIP
            }
          />
        </IPayView>
      );
    }
    return null;
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.SHOP.PLAYSTATION} applyFlex />
      <IPayView style={styles.container}>
        <IPayView style={styles.searchRow}>
          <IPayTextInput
            rightIcon={<IPayIcon icon={icons.search1} color={colors.primary.primary500} />}
            label={localizationText.COMMON.SEARCH}
            text={search}
            onChangeText={handleSearch}
            style={styles.back}
            containerStyle={styles.background}
            placeholderTextColor={colors.natural.natural500}
          />
          <IPayPressable onPress={openRef}>
            <IPayIcon
              icon={selectedOption === localizationText.SHOP.HIGH_TO_LOW ? icons.arrow_updown2 : icons.arrow_updown1}
            />
          </IPayPressable>
        </IPayView>
        {renderChip()}
        <IPayDescriptiveCard cardType={CardDetails.DESVRIPTIVE} data={sortedData} />
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '40%']}
        ref={sortRef}
      >
        <IPayFlatlist renderItem={renderItem} data={sortingData} />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default PlayStationScreen;