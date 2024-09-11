import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import { IPayList, IPayNoResult, IPayTextInput } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import transactionDetailsCompStyles from './transaction-details-component.style';
import {
  BeneficiariesProps,
  IPayInternationalTransferBeneficiriesProps,
} from './transction-details-component.interface';

const IPayInternationalTransferBeneficiries: React.FC<IPayInternationalTransferBeneficiriesProps> = ({
  testID,
  beneficiaries,
  selectedListItem,
  onPressListItem,
}) => {
  const [search, setSearch] = useState<string>('');
  const [beneficiariesData, setBeneficiariesData] = useState<BeneficiariesProps[]>([]);
  const { colors } = useTheme();
  const styles = transactionDetailsCompStyles(colors);
  const localizationText = useLocalization();
  const selectedIcon = (text: string) => selectedListItem === text || false;
  const iconComponent = (text: string) =>
    selectedListItem && selectedListItem === text ? (
      <IPayIcon icon={icons.tick_mark_default} size={20} color={colors.primary.primary500} />
    ) : undefined;

  useEffect(() => {
    setBeneficiariesData(beneficiaries);
  }, [beneficiaries]);

  const onSearchTextChange = (text: string) => {
    if (text) {
      setSearch((prevQuery) => {
        if (prevQuery !== text) {
          const filtered = beneficiaries.filter((service) =>
            service.beneficiaryName.toLowerCase().includes(text.toLowerCase()),
          );
          setBeneficiariesData(filtered);
        }
        return text;
      });
    } else {
      setSearch(text);
      setBeneficiariesData(beneficiaries);
    }
  };

  const onPressItem = (beneficiaryName: string) => {
    onPressListItem?.(beneficiaryName);
  };

  return (
    <IPayView style={styles.beneficiariesContainer} testID={`${testID}-international-transfer`}>
      <IPayTextInput
        text={search}
        onChangeText={onSearchTextChange}
        style={styles.searchInput}
        placeholder={'INTERNATIONAL_TRANSFER.SEARCH_FOR_BENEFICIARY'}
        rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
        simpleInput
        containerStyle={styles.searchInputStyle}
      />
      {beneficiariesData && beneficiariesData.length > 0 ? (
        <IPayFlatlist
          data={beneficiariesData}
          renderItem={({ item: { beneficiaryName, country, icon } }) => (
            <IPayList
              style={styles.cardStyles}
              textStyle={styles.titleStyle}
              title={beneficiaryName}
              isShowSubTitle={country}
              subTitle={country}
              isShowIcon={selectedIcon(beneficiaryName)}
              icon={iconComponent(beneficiaryName)}
              isShowLeftIcon={icon}
              leftIcon={icon && <IPayImage image={icon} style={styles.listImg} />}
              onPress={() => onPressItem(beneficiaryName)}
            />
          )}
        />
      ) : (
        <IPayNoResult containerStyle={styles.noResultContainer} />
      )}
    </IPayView>
  );
};

export default IPayInternationalTransferBeneficiries;
