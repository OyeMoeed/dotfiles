import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayCheckbox,
  IPayFootnoteText,
  IPayHeadlineText,
  IPayImage,
  IPayInput,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPaySectionList from '@app/components/atoms/ipay-section-list/ipay-section-list.component';
import { IPayChip } from '@app/components/molecules';
import IPayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useRef, useState } from 'react';
import { SectionList } from 'react-native';
import useConverterData from './ipay-country-currency-box.constant';
import ConverterItemProps from './ipay-country-currency-box.interface';
import countryCurrencyStyles from './ipay-country-currency-box.style';

const IPayCountryCurrencyBox: React.FC = () => {
  const { colors } = useTheme();
  const styles = countryCurrencyStyles(colors);
  const localizationText = useLocalization();
  const sectionListRef = useRef<SectionList>(null);
  const { converterData } = useConverterData();
  const [senderValue, setSenderValue] = useState<string>('0');
  const [receiverValue, setReceiverValue] = useState<string>('0');

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderConvertCurrencyItem = ({ item, index }: { item: ConverterItemProps; index: number }) => {
    const { bankName, bankImage, sar, egp, fee, balance, senderCurrency, converterCurrency } = item;
    return (
      <IPayView style={styles.conversionContainer}>
        <IPayView style={styles.converterMainWrapper}>
          <IPayView style={styles.converterBalanceWrapper}>
            <IPayView>
              <IPayView style={styles.bankNameWrapper}>
                <IPayImage image={bankImage} style={styles.bankImg} />
                <IPayFootnoteText color={colors.natural.natural900} regular={false} text={bankName} />
              </IPayView>
            </IPayView>
            <IPayView style={styles.checkIconBalanceWrapper}>
              {expandedIndex !== index && (
                <IPayView style={styles.rightBalanceWrapper}>
                  <IPaySubHeadlineText color={colors.primary.primary900} text={balance} regular={false} />
                  <IPayCaption1Text text={converterCurrency} style={styles.balance} color={colors.primary.primary900} />
                </IPayView>
              )}
              <IPayCheckbox isCheck={expandedIndex === index} onPress={() => toggleExpand(index)} />
            </IPayView>
          </IPayView>
          <IPayView style={styles.chipWrapper}>
            <IPayChip
              containerStyle={styles.chipStyle}
              isShowIcon={false}
              textElement={
                <IPayCaption2Text
                  color={colors.natural.natural700}
                  text={`${sar} ${senderCurrency} = ${egp} ${converterCurrency}`}
                />
              }
            />
            <IPayChip
              containerStyle={styles.chipStyle}
              isShowIcon={false}
              textElement={
                <IPayCaption2Text
                  color={colors.natural.natural700}
                  text={`${localizationText.LOCAL_TRANSFER.FEES}: ${fee} ${senderCurrency}`}
                />
              }
            />
          </IPayView>
        </IPayView>
        {expandedIndex === index && (
          <>
            <IPayLinearGradientView
              style={styles.gradientDivider}
              locations={[0, 0.3, 0.6, 1]}
              gradientColors={colors.appGradient.gradientSecondary50}
            />
            <IPayView style={styles.pointsAmountConversion}>
              <IPayView>
                <IPayFootnoteText
                  color={colors.natural.natural700}
                  text={localizationText.COMMON.YOU_SEND}
                  style={styles.amountInputLabel}
                />
                <IPayView style={styles.amountInput}>
                  <IPayInput
                    testID="sender-input"
                    text={senderValue}
                    placeholder="0"
                    placeholderTextColor={colors.natural.natural300}
                    style={[styles.inputTextAmount, senderValue ? styles.darkStyle : {}]}
                    keyboardType="numeric"
                    editable
                    onChangeText={setSenderValue}
                  />
                  <IPayHeadlineText style={[styles.currencyText, senderValue ? styles.darkStyle : {}]}>
                    {senderCurrency}
                  </IPayHeadlineText>
                </IPayView>
              </IPayView>
              <IPayView>
                <IPayLinearGradientView
                  style={styles.gradientLine}
                  locations={[0, 0.3, 0.6, 1]}
                  gradientColors={colors.appGradient.gradientSecondary50}
                />
                <IPayPressable style={styles.revertCycleIcon}>
                  <IPayGradientIcon icon={icons.repeat} />
                </IPayPressable>
              </IPayView>
              <IPayView>
                <IPayFootnoteText
                  color={colors.natural.natural700}
                  text={localizationText.COMMON.THEY_RECEIVE}
                  style={styles.amountInputLabel}
                />
                <IPayView style={styles.amountInput}>
                  <IPayInput
                    testID="receiver-input"
                    text={receiverValue}
                    placeholder="0"
                    placeholderTextColor={colors.natural.natural300}
                    style={[styles.inputTextAmount, receiverValue ? styles.darkStyle : {}]}
                    keyboardType="numeric"
                    editable
                    onChangeText={setReceiverValue}
                  />
                  <IPayHeadlineText style={[styles.currencyText, receiverValue ? styles.darkStyle : {}]}>
                    {localizationText.COMMON.EGP}
                  </IPayHeadlineText>
                </IPayView>
              </IPayView>
            </IPayView>
          </>
        )}
      </IPayView>
    );
  };

  return (
    <IPaySectionList
      ref={sectionListRef}
      sections={converterData}
      renderItem={renderConvertCurrencyItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default IPayCountryCurrencyBox;
