import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayList, IPayTextInput } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { useState } from 'react';
import { internationalBeneficiaryData } from '../international-transfer/international-transfer.constent';
import { BeneficiaryDetailsProps } from '../international-transfer/international-transfer.interface';
import chooseBeneficiaryStyles from './choose-beneficiary.styles';
const ChooseBeneficiaryScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = chooseBeneficiaryStyles(colors);
  const localizationText = useLocalization();
  const handleBeneficiaryTransfer = () => {
    navigate(ScreenNames.INTERNATIONAL_TRANSFER_INFO, { beneficiaryDummyData: selectedBeneficiary });
  };
  const [search, setSearch] = useState<string>('');

  const onClearInput = () => {
    setSearch('');
  };
  const handleAddNewBeneficiray = () => {
    navigate(ScreenNames.ADD_INTERNATIONAL_BENEFICIARY);
  };
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryDetailsProps>();
  const renderBeneficiaryDetails = ({ item }: { item: BeneficiaryDetailsProps }) => {
    const { name, transferType, countryFlag, countryName } = item;
    const handlePress = () => {
      setSelectedBeneficiary(item);
    };
    const isSelected = selectedBeneficiary?.name === name;
    return (
      <IPayList
        key={name}
        style={styles.listItem}
        title={name}
        subTitle={countryName}
        isShowSubTitle
        isShowLeftIcon
        onPress={handlePress}
        centerContainerStyles={styles.listCenterContainer}
        adjacentSubTitle={transferType}
        regularTitle={false}
        leftIcon={<IPayImage style={styles.bankLogo} image={countryFlag} />}
        isShowIcon={isSelected}
        icon={
          isSelected && <IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />
        }
      />
    );
  };
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title={localizationText.COMMON.CHOOSE_BENEFICIARY} applyFlex />
      <IPayView style={styles.innerStyles}>
        <IPayTextInput
          text={search}
          onChangeText={setSearch}
          placeholder={localizationText.COMMON.SEARCH_BENEFICIARY}
          rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
          simpleInput
          style={styles.inputStyle}
          leftIcon={<IPayIcon icon={icons.crossIcon} color={colors.natural.natural700} size={20} />}
          containerStyle={styles.searchInputStyle}
          onClearInput={onClearInput}
        />
        <IPayFlatlist
          data={internationalBeneficiaryData}
          renderItem={renderBeneficiaryDetails}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.verticalStyles}
        />
        <IPayView style={styles.addBeneficiaryBtn}>
          <IPayButton
            onPress={handleAddNewBeneficiray}
            btnText={localizationText.LOCAL_TRANSFER.ADD_NEW_BENEFICIARY}
            btnType={buttonVariants.OUTLINED}
            medium
            leftIcon={<IPayIcon icon={icons.add} size={24} color={colors.primary.primary500} />}
          />
        </IPayView>
      </IPayView>
      <IPayButton
        btnIconsDisabled
        large
        disabled={!selectedBeneficiary}
        btnType={buttonVariants.PRIMARY}
        btnText={localizationText.COMMON.NEXT}
        btnStyle={styles.buttonStyles}
        onPress={handleBeneficiaryTransfer}
      />
    </IPaySafeAreaView>
  );
};
export default ChooseBeneficiaryScreen;
