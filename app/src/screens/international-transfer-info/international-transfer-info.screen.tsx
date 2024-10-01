import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFlag,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
import IPaySectionList from '@app/components/atoms/ipay-section-list/ipay-section-list.component';
import {
  IPayAccountBalance,
  IPayAnimatedTextInput,
  IPayButton,
  IPayHeader,
  IPayList,
  IPayToggleButton,
} from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayCountryCurrencyBox, IPaySafeAreaView } from '@app/components/templates';
import useTransferMethodsData from '@app/components/templates/ipay-country-currency-box/ipay-country-currency-box.constant';
import { BeneficiariesDetails, LocalizationKeysMapping } from '@app/enums/international-beneficiary-status.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { WesternUnionBeneficiary } from '@app/network/services/international-transfer/western-union-beneficiary/western-union-beneficiary.interface';
import WUBeneficiaryDetailsMetaDataProps, {
  WUTransferReason,
} from '@app/network/services/international-transfer/wu-beneficiary-details-metadata/wu-beneficiary-details-metadata.interface';
import getWUBeneficiaryInfoMetaData from '@app/network/services/international-transfer/wu-beneficiary-details-metadata/wu-beneficiary-details-metadata.service';
import {
  FeesInquiryPayload,
  WuFeesInquiryProps,
  WuFeesInquiryResponse,
} from '@app/network/services/international-transfer/wu-fees-inquiry/wu-fees-inquiry.interface';
import westerUnionFeesInquiry from '@app/network/services/international-transfer/wu-fees-inquiry/wu-fees-inquiry.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import getBalancePercentage from '@app/utilities/calculate-balance-percentage.util';
import { isAndroidOS } from '@app/utilities/constants';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageStyle } from 'react-native';
import { OptionItem } from '../international-transfer-success/international-transfer-success.interface';
import beneficiaryKeysMapping from './international-transfer-info.constant';
import transferInfoStyles from './international-transfer-info.style';

const InternationalTransferInfoScreen: React.FC = ({ route }: any) => {
  const { t } = useTranslation();
  const { transferData } = route.params;
  const { colors } = useTheme();
  const styles = transferInfoStyles(colors);
  const reasonOfTransferSheet = useRef<any>(null);
  const sectionListRef = useRef<any>(null);
  const beneficiaryDetailsRef = useRef<any>(null);
  const { transferMethods } = useTransferMethodsData();
  const [isIncludeFees, setIsIncludeFees] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<WUTransferReason>();
  const [remitterCurrencyAmount, setRemitterCurrencyAmount] = useState<string>('');
  const [beneficiaryCurrencyAmount, setBeneficiaryCurrencyAmount] = useState<string>('');
  const [transferGateway, setTransferGateway] = useState<{ transferMethod: string; index: number } | null>(null);
  const [beneficiaryDetailsData, setBeneficiaryDetailsData] = useState<WUTransferReason[]>([]);
  const [wuFeesInquiryData, setWUFeesInquiryData] = useState<WuFeesInquiryResponse>();
  const amountCurrency = 'SAR';
  const amount = 1;

  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const renderOption = ({ item }: { item: OptionItem }) => {
    const { label, value, icon, image } = item;
    const localizationKey = LocalizationKeysMapping[label as keyof typeof LocalizationKeysMapping];
    const localization = localizationKey ? t(`INTERNATIONAL_TRANSFER.${localizationKey}`) : label;

    return (
      <IPayList
        containerStyle={styles.heightStyles}
        title={localization}
        detailText={value}
        detailTextStyle={styles.detailsText}
        isShowIcon
        icon={<IPayIcon icon={icon} color={colors.primary.primary500} />}
        rightText={image ? <IPayImage image={image} style={styles.listImage as ImageStyle} /> : <IPayView />}
      />
    );
  };

  const renderListHeader = (heading: string) => (
    <IPayView style={styles.sheetListHeader}>
      <IPayFootnoteText color={colors.natural.natural500} text={heading} />
    </IPayView>
  );

  const flattenBeneficiaryDetails = (details: WesternUnionBeneficiary) => {
    const { beneficiaryBankDetail, ...rest } = details;
    return {
      ...rest,
      ...beneficiaryBankDetail,
    };
  };

  const getGeneratedBeneficiary = (includesKeys: string[]) =>
    Object.keys(flattenBeneficiaryDetails(transferData))
      ?.map((key) => ({ label: key, value: transferData[key] }))
      ?.filter((key) => includesKeys.includes(key?.label));

  const onPressNext = () =>
    navigate(ScreenNames.INTERNATIONAL_TRANSFER_CONFIRMATION, {
      beneficiaryData: {
        ...flattenBeneficiaryDetails(transferData),
        selectedReason,
        transferGateway: transferGateway?.transferMethod,
      },
      feesInquiryData: { beneficiaryCurrencyAmount, remitterCurrencyAmount, isIncludeFees, ...wuFeesInquiryData },
    });

  const getBeneficiariesDetailsData = async () => {
    const apiResponse: WUBeneficiaryDetailsMetaDataProps = await getWUBeneficiaryInfoMetaData(
      transferData?.beneficiaryCode,
    );
    if (apiResponse?.response?.transferReasonList) {
      setBeneficiaryDetailsData(apiResponse?.response?.transferReasonList);
    }
  };

  const wuFeesInquiry = async () => {
    const payload: FeesInquiryPayload = {
      amount: amount.toString(),
      amountCurrency,
      promoCode: null,
    };
    const apiResponse: WuFeesInquiryProps = await westerUnionFeesInquiry(payload, transferData?.beneficiaryCode);
    if (apiResponse?.response) {
      setWUFeesInquiryData(apiResponse?.response);
    }
  };

  useEffect(() => {
    getBeneficiariesDetailsData();
  }, []);

  useEffect(() => {
    wuFeesInquiry();
  }, []);

  const handleAmountInputChange = (text: string) => {
    const exchangeRate = Number(wuFeesInquiryData?.exchangeRate);
    setRemitterCurrencyAmount(text);
    const foreignAmount = Number(text) * exchangeRate;
    setBeneficiaryCurrencyAmount(foreignAmount?.toFixed(2));
  };

  const transferFees = t('LOCAL_TRANSFER.FEES');
  const feeAmount = `${wuFeesInquiryData?.bankFeeAmount ?? ''} ${t('COMMON.SAR')}`;
  const transferVat = t('COMMON.AND_VAT');
  const vatAmount = `${wuFeesInquiryData?.bankVatAmount ?? ''} ${t('COMMON.SAR')}`;

  const onTransferGateway = (methodName: string, index: number) => {
    setTransferGateway({ transferMethod: methodName, index });
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title="TRANSFER.TRANSFER_INFRORMATION" applyFlex />
      <IPayView style={styles.contentContainer}>
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayView>
            <IPayAccountBalance
              accountBalanceTextStyle={styles.darkStyle}
              currentBalanceTextStyle={styles.darkStyle}
              currencyTextStyle={styles.darkStyle}
              remainingAmountTextStyle={styles.remainingText}
              gradientWidth={`${getBalancePercentage(walletInfo?.currentBalance, walletInfo?.availableBalance)}%`}
              currentAvailableTextStyle={styles.currencyTextStyle}
              balance={walletInfo?.currentBalance}
              availableBalance={walletInfo?.availableBalance}
              showRemainingAmount
              onPressTopup={() => {}}
              monthlyIncomingLimit=""
            />
            <IPayView>
              <IPayList
                shouldTranslateTitle={false}
                regularTitle={false}
                title={transferData?.fullName}
                subTitle={transferData?.countryDesc}
                adjacentSubTitle={transferData?.remittanceTypeDesc}
                isShowSubTitle
                isShowLeftIcon
                leftIcon={<IPayFlag countryCode={transferData?.countryCode} />}
                rightText={
                  <IPayButton
                    btnIconsDisabled
                    btnType={buttonVariants.LINK_BUTTON}
                    btnText="COMMON.VIEW_DETAILS"
                    onPress={() => beneficiaryDetailsRef.current.present()}
                  />
                }
              />
            </IPayView>
            <IPayView>
              <IPaySectionList
                ref={sectionListRef}
                data={transferMethods}
                renderItem={({ item: transferMethod, index }) => {
                  const isCheck = transferGateway?.index === index;
                  return (
                    <IPayCountryCurrencyBox
                      transferMethod={{
                        ...transferMethod,
                        beneficiaryAmount: wuFeesInquiryData?.exchangeRate ?? '',
                        beneficiaryCurrency: wuFeesInquiryData?.principleCurrency ?? '',
                        fee: wuFeesInquiryData?.bankFeeAmount ?? '',
                      }}
                      isChecked={isCheck}
                      onRemitterAmountChange={handleAmountInputChange}
                      remitterCurrencyAmount={remitterCurrencyAmount}
                      beneficiaryCurrencyAmount={beneficiaryCurrencyAmount}
                      onTransferMethodChange={() => onTransferGateway(transferMethod?.transferMethodName, index)}
                    />
                  );
                }}
                showsVerticalScrollIndicator={false}
              />
            </IPayView>
            <IPayView>
              <IPayView style={styles.feeContainer}>
                <IPayView style={styles.feeText}>
                  <IPayView>
                    <IPayFootnoteText color={colors.natural.natural900} text="COMMON.INCLUDE_FEES" />
                    <IPayCaption1Text
                      color={colors.natural.natural500}
                    >{`${transferFees} ${feeAmount} ${transferVat} ${vatAmount}`}</IPayCaption1Text>
                  </IPayView>
                </IPayView>
                <IPayToggleButton toggleState={isIncludeFees} onToggleChange={() => setIsIncludeFees(!isIncludeFees)} />
              </IPayView>
              <IPayView>
                <IPayAnimatedTextInput
                  label="COMMON.REASON_OF_TRANSFER"
                  editable={false}
                  value={selectedReason?.desc}
                  containerStyle={styles.inputContainerStyle}
                  customIcon={<IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />}
                  showRightIcon
                  onChangeText={() => {}}
                  onClearInput={() => reasonOfTransferSheet.current.present()}
                />
              </IPayView>
            </IPayView>
          </IPayView>
        </IPayScrollView>
        <IPayButton
          btnText="COMMON.NEXT"
          btnType={buttonVariants.PRIMARY}
          large
          disabled={!selectedReason?.desc}
          btnIconsDisabled
          btnStyle={styles.nextBtn}
          onPress={onPressNext}
        />
      </IPayView>
      <IPayBottomSheet
        heading="COMMON.REASON_OF_TRANSFER"
        customSnapPoint={['1%', '60%']}
        onCloseBottomSheet={() => reasonOfTransferSheet.current.close()}
        ref={reasonOfTransferSheet}
        simpleBar
        cancelBnt
        bold
        noGradient
      >
        <IPayView style={[styles.reasonContainer, isAndroidOS ? {} : styles.iosContainerPadding]}>
          <IPayFlatlist
            style={styles.reasonList}
            showsVerticalScrollIndicator={false}
            data={beneficiaryDetailsData}
            renderItem={({ item }) => (
              <IPayList
                key={item}
                style={styles.listItem}
                title={item?.desc}
                isShowIcon={selectedReason?.desc === item?.desc}
                icon={<IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />}
                onPress={() => {
                  setSelectedReason(item);
                  reasonOfTransferSheet.current.close();
                }}
              />
            )}
          />
        </IPayView>
      </IPayBottomSheet>
      <IPayBottomSheet
        heading="INTERNATIONAL_TRANSFER.BENEFECIARY_DETAILS"
        customSnapPoint={['1%', '90%']}
        onCloseBottomSheet={() => beneficiaryDetailsRef.current.close()}
        ref={beneficiaryDetailsRef}
        simpleBar
        cancelBnt
        bold
        noGradient
      >
        <IPayView style={styles.sheetContentContainer}>
          <IPayFlatlist
            testID="beneficiaries-info"
            data={getGeneratedBeneficiary(beneficiaryKeysMapping[BeneficiariesDetails.INFORMATIONS])}
            showsVerticalScrollIndicator={false}
            renderItem={renderOption}
            ListHeaderComponent={renderListHeader(t('INTERNATIONAL_TRANSFER.BENEFECIARY_INFORMATION'))}
          />
          <IPayFlatlist
            testID="beneficiaries-details"
            data={getGeneratedBeneficiary(beneficiaryKeysMapping[BeneficiariesDetails.DETAILS])}
            showsVerticalScrollIndicator={false}
            renderItem={renderOption}
            ListHeaderComponent={renderListHeader(t('INTERNATIONAL_TRANSFER.BENEFECIARY_DETAILS'))}
          />
        </IPayView>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default InternationalTransferInfoScreen;
