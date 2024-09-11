import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { TrashIcon } from '@app/assets/svgs';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayButton, IPayHeader, IPayList, IPayNoResult, IPayTextInput } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet, IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayBeneficiariesSortSheet from '@app/components/templates/ipay-beneficiaries-sort-sheet/beneficiaries-sort-sheet.component';
import { SNAP_POINTS } from '@app/constants/constants';
import { useKeyboardStatus } from '@app/hooks/use-keyboard-status';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import LocalTransferBeneficiariesMockProps from '@app/network/services/local-transfer/local-transfer-beneficiaries/local-transfer-beneficiaries.interface';
import getlocalTransferBeneficiaries from '@app/network/services/local-transfer/local-transfer-beneficiaries/local-transfer-beneficiaries.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { isIosOS } from '@app/utilities/constants';
import {
  ApiResponseStatusType,
  BeneficiaryTypes,
  alertType,
  alertVariant,
  buttonVariants,
  spinnerVariant,
  toastTypes,
} from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ViewStyle } from 'react-native';
import { BeneficiaryDetails, FooterStatus } from './local-transfer.interface';
import localTransferStyles from './local-transfer.style';

const LocalTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = localTransferStyles(colors);
  const localizationText = useLocalization();
  const beneficiariesToShow = 4;
  const [selectedBeneficiary, setselectedBeneficiary] = useState<BeneficiaryDetails>([]);
  const [nickName, setNickName] = useState('');
  const [search, setSearch] = useState<string>('');
  const [deleteBeneficiary, setDeleteBeneficiary] = useState<boolean>(false);
  const isKeyboardOpen = useKeyboardStatus();
  const { showToast } = useToastContext();
  const editNickNameSheetRef = useRef<bottomSheetTypes>(null);
  const editBeneficiaryRef = useRef<any>(null);
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const [apiError, setAPIError] = useState<string>('');
  const sortSheetRef = useRef<bottomSheetTypes>(null);
  const [filteredBeneficiaryData, setFilteredBeneficiaryData] = useState<BeneficiaryDetails[]>([]);
  const [beneficiaryData, setBeneficiaryData] = useState<BeneficiaryDetails[]>([]);
  const [viewAll, setViewAll] = useState({
    active: false,
    inactive: false,
  });
  const [sortBy, setSortBy] = useState<string>(BeneficiaryTypes.ACTIVE);

  const renderSpinner = useCallback((isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  }, []);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      isShowLeftIcon: true,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const getBeneficiariesData = async () => {
    renderSpinner(true);
    try {
      const apiResponse: LocalTransferBeneficiariesMockProps = await getlocalTransferBeneficiaries();
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setBeneficiaryData(apiResponse?.data?.beneficiaries);
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    getBeneficiariesData();
  }, []);

  const handleOnEditNickName = () => {
    editBeneficiaryRef.current.hide();
    editNickNameSheetRef?.current?.present();
  };

  const handleDelete = () => {
    setDeleteBeneficiary(true);
    editBeneficiaryRef.current.hide();
  };

  const onPressMenuOption = (item: BeneficiaryDetails) => {
    setNickName(item?.nickname ?? '');
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
      subTitle: `${nickName} | ${selectedBeneficiary?.beneficiaryBankDetail?.bankName}`,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.tick_circle} size={24} color={colors.natural.natural0} />,
      toastType: toastTypes.SUCCESS,
      titleStyle: styles.toastTitle,
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
      subTitle: `${nickName} | ${selectedBeneficiary?.beneficiaryBankDetail?.bankName}`,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      isShowLeftIcon: true,
      leftIcon: <TrashIcon style={styles.trashIcon} color={colors.natural.natural0} />,
      toastType: toastTypes.SUCCESS,
      titleStyle: styles.toastTitle,
    });
  };

  const onPressBtn = (beneficiaryStatus: string) => {
    if (beneficiaryStatus === BeneficiaryTypes.ACTIVE) navigate(ScreenNames.TRANSFER_INFORMATION);
  };

  const beneficiaryItem = ({ item }: { item: BeneficiaryDetails }) => {
    const { beneficiaryBankDetail, fullName, bankLogo, beneficiaryAccountNumber, beneficiaryStatus } = item;
    return (
      <IPayList
        style={styles.listContainer}
        textStyle={styles.textStyle}
        title={fullName}
        subTitle={beneficiaryAccountNumber}
        isShowSubTitle
        isShowLeftIcon
        subTitleLines={1}
        adjacentTitle={beneficiaryBankDetail?.bankName}
        centerContainerStyles={styles.listCenterContainer}
        leftIcon={<IPayImage style={styles.bankLogo} image={bankLogo ?? images.alinmaBankLogo} />}
        rightText={
          <IPayView style={styles.moreButton}>
            <IPayButton
              onPress={() => onPressBtn(beneficiaryStatus)}
              btnText={
                beneficiaryStatus === BeneficiaryTypes.ACTIVE
                  ? localizationText.LOCAL_TRANSFER.TRANSFER
                  : localizationText.BENEFICIARY_OPTIONS.ACTIVATE
              }
              btnType={buttonVariants.PRIMARY}
              small
              btnIconsDisabled
              btnStyle={styles.listButtonStyle}
              btnColor={
                beneficiaryStatus === BeneficiaryTypes.ACTIVE
                  ? colors.primary.primary500
                  : colors.secondary.secondary100
              }
              textColor={
                beneficiaryStatus === BeneficiaryTypes.ACTIVE ? colors.natural.natural0 : colors.secondary.secondary800
              }
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
    const filteredData = beneficiaryData?.filter((item) => {
      const {
        fullName,
        beneficiaryBankDetail: { bankName },
      } = item;
      return (
        bankName?.toLowerCase().includes(text.toLowerCase()) || fullName?.toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilteredBeneficiaryData(filteredData);
  };

  const getSortedData = (status: string) => {
    const data = search ? filteredBeneficiaryData : beneficiaryData;
    return data?.filter((item) => item?.beneficiaryStatus === status);
  };

  const renderHeader = (sortType: string, count: number, totalCount: number) =>
    totalCount ? (
      <IPayView style={styles.listHeader}>
        <IPayFootnoteText
          text={
            sortType === BeneficiaryTypes.ACTIVE ? localizationText.COMMON.ACTIVE : localizationText.COMMON.INACTIVE
          }
        />
        <IPayFootnoteText text={`(${count} ${localizationText.HOME.OF} ${totalCount})`} />
      </IPayView>
    ) : (
      <IPayView />
    );

  const renderFooter = (statusKey: FooterStatus, totalCount: number) =>
    totalCount > beneficiariesToShow ? (
      <IPayPressable
        style={styles.listFooter}
        onPress={() => setViewAll((prev) => ({ ...prev, [statusKey]: !prev[statusKey] }))}
      >
        <IPaySubHeadlineText
          style={styles.capitalizeTitle}
          color={colors.primary.primary500}
          regular
          text={viewAll[statusKey] ? localizationText.COMMON.CLOSE : localizationText.COMMON.VIEW_ALL}
        />
        <IPayIcon
          icon={viewAll[statusKey] ? icons.arrowUp : icons.arrowDown}
          size={14}
          color={colors.primary.primary500}
        />
      </IPayPressable>
    ) : (
      <IPayView />
    );

  const listData = (viewAllStatus: boolean, sort: string) =>
    viewAllStatus ? getSortedData(sort) : getSortedData(sort).slice(0, 3);

  const hasBeneficiariesData = () =>
    [...getSortedData(BeneficiaryTypes.ACTIVE), ...getSortedData(BeneficiaryTypes.INACTIVE)]?.length;

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
      <IPayView style={styles.contentContainer}>
        <IPayView style={styles.beneficiaryList}>
          <IPayView style={styles.listContentWrapper}>
            <IPayView style={styles.searchWrapper}>
              <IPayTextInput
                text={search}
                onChangeText={handleSearchChange}
                placeholder={localizationText.COMMON.SEARCH}
                rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
                simpleInput
                style={styles.inputStyle}
                containerStyle={styles.searchInputStyle}
                leftIcon={<IPayIcon icon={icons.crossIcon} size={20} color={colors.natural.natural500} />}
                showLeftIcon={!!search}
                onClearInput={() => setSearch('')}
              />
              <IPayPressable onPress={() => sortSheetRef?.current?.present()} style={styles.listMargin}>
                <IPayIcon icon={icons.arrow_updown1} size={24} />
              </IPayPressable>
            </IPayView>
            {hasBeneficiariesData() ? (
              <IPayView style={styles.listWrapper}>
                <IPayScrollView showsVerticalScrollIndicator={false}>
                  <IPayView
                    style={[
                      styles.activeInactiveListWrapper,
                      sortBy === BeneficiaryTypes.INACTIVE && styles.reverseList,
                    ]}
                  >
                    {!!getSortedData(BeneficiaryTypes.ACTIVE)?.length && (
                      <IPayFlatlist
                        data={listData(viewAll.active, BeneficiaryTypes.ACTIVE)}
                        renderItem={beneficiaryItem}
                        ListHeaderComponent={() =>
                          renderHeader(
                            BeneficiaryTypes.ACTIVE,
                            listData(viewAll.active, BeneficiaryTypes.ACTIVE)?.length,
                            getSortedData(BeneficiaryTypes.ACTIVE)?.length,
                          )
                        }
                        ListFooterComponent={() => renderFooter(BeneficiaryTypes.ACTIVE, getSortedData(sortBy)?.length)}
                      />
                    )}
                    {!!getSortedData(BeneficiaryTypes.INACTIVE)?.length && (
                      <IPayFlatlist
                        data={listData(viewAll.inactive, BeneficiaryTypes.INACTIVE)}
                        renderItem={beneficiaryItem}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={() =>
                          renderHeader(
                            BeneficiaryTypes.INACTIVE,
                            listData(viewAll.inactive, BeneficiaryTypes.INACTIVE)?.length,
                            getSortedData(BeneficiaryTypes.INACTIVE)?.length,
                          )
                        }
                        ListFooterComponent={() =>
                          renderFooter(BeneficiaryTypes.INACTIVE, getSortedData(BeneficiaryTypes.INACTIVE)?.length)
                        }
                      />
                    )}
                  </IPayView>
                </IPayScrollView>
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
                  btnType={buttonVariants.PRIMARY}
                  btnStyle={styles.btnStyle}
                  leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} size={18} />}
                />
              </IPayView>
            )}
          </IPayView>

          {hasBeneficiariesData() ? (
            <IPayButton
              btnText={localizationText.LOCAL_TRANSFER.ADD_NEW_BENEFICIARY}
              btnType={buttonVariants.OUTLINED}
              medium
              leftIcon={<IPayIcon icon={icons.add_bold} size={24} color={colors.primary.primary500} />}
              onPress={() => navigate(ScreenNames.NEW_BENEFICIARY, {})}
              btnStyle={styles.addBtn}
            />
          ) : (
            <IPayView />
          )}
        </IPayView>
      </IPayView>
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
        customSnapPoint={['1%', isIosOS && isKeyboardOpen ? '63%' : '35%']}
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
      <IPayBeneficiariesSortSheet sortSheetRef={sortSheetRef} setSortByActive={setSortBy} sortByActive={sortBy} />
    </IPaySafeAreaView>
  );
};

export default LocalTransferScreen;
