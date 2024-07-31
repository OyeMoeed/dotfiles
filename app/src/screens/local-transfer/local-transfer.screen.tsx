import icons from '@app/assets/icons';
import {
  IPayFlatlist,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayButton, IPayHeader, IPayList, IPayNoResult, IPayTextInput } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet, IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { alertType, alertVariant, BeneficiaryTypes, buttonVariants, toastTypes } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useRef, useState } from 'react';
import { ViewStyle } from 'react-native';
import { defaultDummyBeneficiaryData, dummyBeneficiaryData, inactiveBeneficiaryData } from './local-transfer.constant';
import { BeneficiaryItem } from './local-transfer.interface';
import localTransferStyles from './local-transfer.style';

const LocalTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = localTransferStyles(colors);
  const localizationText = useLocalization();
  const tabs = [localizationText.COMMON.ACTIVE, localizationText.COMMON.INACTIVE];
  const [beneficirayData, setBeneficirayData] = useState<BeneficiaryItem[]>(defaultDummyBeneficiaryData);
  const [selectedBeneficiary, setselectedBeneficiary] = useState<BeneficiaryItem>();
  const [nickName, setNickName] = useState('');
  const [search, setSearch] = useState<string>('');
  const [deleteBeneficiary, setDeleteBeneficiary] = useState<boolean>(false);
  const { showToast } = useToastContext();
  const editNickNameSheetRef = useRef<bottomSheetTypes>(null);
  const editBeneficiaryRef = useRef<any>(null);
  const [selectedTab, setSelectedTab] = useState('');

  const isBeneficiary = true;

  const handleOnEditNickName = () => {
    editBeneficiaryRef.current.hide();
    editNickNameSheetRef?.current?.present();
  };

  const handleDelete = () => {
    setDeleteBeneficiary(true);
    editBeneficiaryRef.current.hide();
  };

  const [filteredBeneficiaryData, setFilteredBeneficiaryData] =
    useState<BeneficiaryItem[]>(defaultDummyBeneficiaryData);

  const onPressMenuOption = (item: BeneficiaryItem) => {
    setNickName(item.name);
    setselectedBeneficiary(item);
    setTimeout(() => {
      editBeneficiaryRef?.current?.show();
    }, 0);
  };
  const onDeleteCancel = () => {
    setDeleteBeneficiary(false);
  };

  const handleBeneficiaryActions = useCallback((index: number) => {
    switch (index) {
      case 1:
        handleOnEditNickName();
        break;
      case 2:
        handleDelete();
        break;
      default:
        editBeneficiaryRef.current.hide();
        break;
    }
  }, []);

  const showUpdateBeneficiaryToast = () => {
    showToast({
      title: localizationText.BENEFICIARY_OPTIONS.NAME_CHANGED,
      subTitle: `${nickName} | ${selectedBeneficiary?.bankName}`,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.tick_circle} size={24} color={colors.natural.natural0} />,
      toastType: toastTypes.SUCCESS,
    });
  };

  const handleChangeBeneficiaryName = () => {
    showUpdateBeneficiaryToast();
    editNickNameSheetRef?.current?.close();
  };

  const showDeleteBeneficiaryToast = () => {
    setDeleteBeneficiary(false);
    showToast({
      title: localizationText.BENEFICIARY_OPTIONS.BENEFICIARY_DELETED,
      subTitle: `${nickName} | ${selectedBeneficiary?.bankName}`,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.trashtransparent} size={24} color={colors.natural.natural0} />,
      toastType: toastTypes.SUCCESS,
    });
  };

  const handleTabSelect = useCallback(
    (tab: BeneficiaryTypes) => {
      const currentTab = tab.toLowerCase();
      if (currentTab === BeneficiaryTypes.ACTIVE) {
        setSearch('');
        setBeneficirayData(dummyBeneficiaryData);
        setFilteredBeneficiaryData(dummyBeneficiaryData);
      } else {
        setSearch('');
        setBeneficirayData(inactiveBeneficiaryData);
        setFilteredBeneficiaryData(inactiveBeneficiaryData);
      }

      setSelectedTab(currentTab);
    },
    [selectedTab],
  );

  const beneficiaryItem = ({ item }: { item: BeneficiaryItem }) => {
    const { name, bankName, bankLogo, accountNo } = item;
    return (
      <IPayList
        textStyle={styles.textStyle}
        title={name}
        subTitle={accountNo}
        isShowSubTitle
        isShowLeftIcon
        subTitleLines={1}
        adjacentTitle={bankName}
        leftIcon={<IPayImage style={styles.bankLogo} image={bankLogo} />}
        rightText={
          <IPayView style={styles.moreButton}>
            <IPayButton
              btnText={
                selectedTab === BeneficiaryTypes.ACTIVE
                  ? localizationText.LOCAL_TRANSFER.TRANSFER
                  : localizationText.BENEFICIARY_OPTIONS.ACTIVATE
              }
              btnType="primary"
              small
              btnIconsDisabled
            />
            <IPayPressable onPress={() => onPressMenuOption(item)}>
              <IPayIcon icon={icons.more_option} size={20} color={colors.natural.natural500} />
            </IPayPressable>
          </IPayView>
        }
      />
    );
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    const filteredData = beneficirayData.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredBeneficiaryData(filteredData);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="local-transfer-ipay-header"
        backBtn
        title={localizationText.HOME.LOCAL_TRANSFER}
        applyFlex
        titleStyle={styles.capitalizeTitle}
        rightComponent={
          <IPayPressable onPress={() => navigate(ScreenNames.BENEFICIARY_TRANSACTION_HISTORY)}>
            <IPayView style={styles.headerRightContent}>
              <IPayIcon icon={icons.clock_1} size={20} color={colors.primary.primary500} />
              <IPaySubHeadlineText regular color={colors.primary.primary500} text={localizationText.COMMON.HISTORY} />
            </IPayView>
          </IPayPressable>
        }
      />
      {isBeneficiary ? (
        <IPayView style={styles.contentContainer}>
          <IPayTabs customStyles={styles.tabWrapper} tabs={tabs} onSelect={handleTabSelect} />
          <IPayView style={styles.beneficiaryList}>
            <IPayView style={styles.listContentWrapper}>
              <IPayTextInput
                text={search}
                onChangeText={handleSearchChange}
                placeholder={localizationText.LOCAL_TRANSFER.SEARCH_FOR_NAME}
                rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
                simpleInput
                style={styles.inputStyle}
                containerStyle={styles.searchInputStyle}
              />
              <IPayView style={styles.listWrapper}>
                <IPayScrollView showsVerticalScrollIndicator={false}>
                  <IPayView>
                    <IPayFlatlist
                      data={filteredBeneficiaryData}
                      renderItem={beneficiaryItem}
                      keyExtractor={(item) => item.id}
                    />
                  </IPayView>
                </IPayScrollView>
              </IPayView>
            </IPayView>
            <IPayButton
              btnText={localizationText.LOCAL_TRANSFER.ADD_NEW_BENEFICIARY}
              btnType="primary"
              large
              leftIcon={<IPayIcon icon={icons.add} size={24} color={colors.natural.natural0} />}
              onPress={() => navigate(ScreenNames.NEW_BENEFICIARY, {})}
            />
          </IPayView>
        </IPayView>
      ) : (
        <IPayView style={styles.noResultContainer}>
          <IPayNoResult
            showIcon
            icon={icons.user_search}
            iconColor={colors.primary.primary800}
            iconSize={40}
            message={localizationText.LOCAL_TRANSFER.NO_BENEFICIARIES}
            containerStyle={styles.noResult as ViewStyle}
            testID="no-result"
          />
          <IPayButton
            btnText={localizationText.LOCAL_TRANSFER.ADD_NEW_BENEFICIARY}
            medium
            onPress={() => navigate(ScreenNames.NEW_BENEFICIARY, {})}
            btnType="primary"
            btnStyle={styles.btnStyle}
            leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} size={18} />}
          />
        </IPayView>
      )}
      <IPayAlert
        visible={deleteBeneficiary}
        onClose={onDeleteCancel}
        title={localizationText.BENEFICIARY_OPTIONS.DELETE_BENFICIARY}
        message={localizationText.BENEFICIARY_OPTIONS.DELETION_CONFIRMATION}
        type={alertType.SIDE_BY_SIDE}
        closeOnTouchOutside
        variant={alertVariant.DESTRUCTIVE}
        icon={<IPayIcon icon={icons.TRASH} size={64} />}
        showIcon={false}
        primaryAction={{
          text: localizationText.COMMON.CANCEL,
          onPress: onDeleteCancel,
        }}
        secondaryAction={{
          text: localizationText.COMMON.DELETE,
          onPress: showDeleteBeneficiaryToast,
        }}
      />
      <IPayActionSheet
        ref={editBeneficiaryRef}
        options={[
          localizationText.COMMON.CANCEL,
          localizationText.BENEFICIARY_OPTIONS.EDIT_NICK_NAME,
          localizationText.BENEFICIARY_OPTIONS.DELETE_BENFICIARY,
        ]}
        cancelButtonIndex={0}
        destructiveButtonIndex={2}
        showIcon={false}
        showCancel
        bodyStyle={styles.actionSheetStyle}
        onPress={(index) => handleBeneficiaryActions(index)}
      />
      <IPayBottomSheet
        heading={localizationText.BENEFICIARY_OPTIONS.EDIT_NICK_NAME}
        enablePanDownToClose
        cancelBnt
        bold
        customSnapPoint={SNAP_POINTS.X_SMALL}
        ref={editNickNameSheetRef}
      >
        <IPayView style={styles.editStyles}>
          <IPayTextInput
            containerStyle={styles.inputStyles}
            onChangeText={setNickName}
            label={localizationText.BENEFICIARY_OPTIONS.BENEFICIARY_NICK_NAME}
            text={nickName}
          />
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            large
            btnText={localizationText.COMMON.DONE}
            btnIconsDisabled
            onPress={handleChangeBeneficiaryName}
          />
        </IPayView>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default LocalTransferScreen;
