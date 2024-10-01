import icons from '@app/assets/icons';
import { TrashIcon } from '@app/assets/svgs';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayButton, IPayHeader, IPayList, IPayNoResult, IPayTextInput } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import {
  IPayActionSheet,
  IPayActivateBeneficiary,
  IPayActivationCall,
  IPayReceiveCall,
} from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayBeneficiariesSortSheet from '@app/components/templates/ipay-beneficiaries-sort-sheet/beneficiaries-sort-sheet.component';
import { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { useKeyboardStatus } from '@app/hooks';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import deleteLocalTransferBeneficiary from '@app/network/services/local-transfer/delete-beneficiary/delete-beneficiary.service';
import editLocalTransferBeneficiary from '@app/network/services/local-transfer/edit-beneficiary/edit-beneficiary.service';
import { ActivationMethods } from '@app/network/services/local-transfer/local-transfer-activate-beneficiary/local-transfer-activate-beneficiary.interface';
import activateLocalBeneficiary from '@app/network/services/local-transfer/local-transfer-activate-beneficiary/local-transfer-activate-beneficiary.service';
import LocalTransferBeneficiariesMockProps from '@app/network/services/local-transfer/local-transfer-beneficiaries/local-transfer-beneficiaries.interface';
import getlocalTransferBeneficiaries from '@app/network/services/local-transfer/local-transfer-beneficiaries/local-transfer-beneficiaries.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { isIosOS } from '@app/utilities/constants';
import {
  ApiResponseStatusType,
  BeneficiaryTypes,
  ToastTypes,
  alertType,
  alertVariant,
  buttonVariants,
} from '@app/utilities/enums.util';
import openPhoneNumber from '@app/utilities/open-phone-number.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, ViewStyle } from 'react-native';
import ActivateViewTypes from '../add-beneficiary-success-message/add-beneficiary-success-message.enum';
import { BeneficiaryDetails } from './local-transfer.interface';
import localTransferStyles from './local-transfer.style';

const LocalTransferScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { isKeyboardOpen, isKeyboardWillOpen } = useKeyboardStatus();
  const styles = localTransferStyles(colors);
  const beneficiariesToShow = 4;
  const [selectedBeneficiary, setselectedBeneficiary] = useState<BeneficiaryDetails>();
  const [nickName, setNickName] = useState('');
  const [currentOption, setCurrentOption] = useState<ActivateViewTypes>(ActivateViewTypes.ACTIVATE_OPTIONS);
  const [activateHeight, setActivateHeight] = useState(SNAP_POINT.SMALL);
  const [search, setSearch] = useState<string>('');
  const [deleteBeneficiary, setDeleteBeneficiary] = useState<boolean>(false);
  const { showToast } = useToastContext();
  const editBeneficiaryRef = useRef<any>(null);
  const selectedBeneficiaryRef = useRef<BeneficiaryDetails | null>(null);
  const [apiError, setAPIError] = useState<string>('');
  const sortSheetRef = useRef<bottomSheetTypes>(null);
  const actionSheetRef = useRef<any>(null);
  const [filteredBeneficiaryData, setFilteredBeneficiaryData] = useState<BeneficiaryDetails[]>([]);
  const [beneficiaryData, setBeneficiaryData] = useState<BeneficiaryDetails[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<string>('');
  const { contactList, guideStepsToCall, guideToReceiveCall } = useConstantData();
  const [viewAll, setViewAll] = useState({
    ACTIVATE: false,
    NEW_BENEFICIARY: false,
  });
  const [sortBy, setSortBy] = useState<string>(BeneficiaryTypes.ACTIVE);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [showEditSheet, setShowEditSheet] = useState<boolean>(false);
  const [showActivationSheet, setShowActivationSheet] = useState<boolean>(false);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      isShowLeftIcon: true,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const getBeneficiariesData = async () => {
    setIsLoadingData(true);
    try {
      const apiResponse: LocalTransferBeneficiariesMockProps = await getlocalTransferBeneficiaries();
      if (apiResponse?.successfulResponse) {
        setBeneficiaryData(apiResponse?.response?.beneficiaries);
      }
    } catch (error: any) {
      setAPIError(error?.message || 'ERROR.SOMETHING_WENT_WRONG');
      renderToast(error?.message || 'ERROR.SOMETHING_WENT_WRONG');
    }
    setIsLoadingData(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getBeneficiariesData();

      return () => {};
    }, []),
  );

  const handleOnEditNickName = () => {
    editBeneficiaryRef.current.hide();
    setShowEditSheet(true);
  };

  const handleDelete = () => {
    setDeleteBeneficiary(true);
    editBeneficiaryRef.current.hide();
  };

  const onPressMenuOption = (item: BeneficiaryDetails) => {
    selectedBeneficiaryRef.current = item;
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
      title: 'BENEFICIARY_OPTIONS.NAME_CHANGED',
      subTitle: `${nickName} | ${selectedBeneficiary?.beneficiaryBankDetail?.bankName}`,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.tick_circle} size={24} color={colors.natural.natural0} />,
      toastType: ToastTypes.SUCCESS,
      titleStyle: styles.toastTitle,
    });
  };

  const handleChangeBeneficiaryName = async () => {
    const activateBeneficiaryPayload = {
      nickname: nickName,
    };
    try {
      await editLocalTransferBeneficiary(
        selectedBeneficiaryRef?.current?.beneficiaryCode || '',
        activateBeneficiaryPayload,
      );
      setShowEditSheet(false);
      showUpdateBeneficiaryToast();
      getBeneficiariesData();
    } catch (error: any) {
      setAPIError(error?.message || 'ERROR.SOMETHING_WENT_WRONG');
    }
    setShowEditSheet(false);
  };

  const showDeleteBeneficiaryToast = () => {
    setDeleteBeneficiary(false);
    showToast({
      title: 'BENEFICIARY_OPTIONS.BENEFICIARY_DELETED',
      subTitle: `${selectedBeneficiary?.fullName} | ${selectedBeneficiary?.beneficiaryBankDetail?.bankName}`,
      isShowRightIcon: false,
      isShowLeftIcon: true,
      leftIcon: <TrashIcon style={styles.trashIcon} color={colors.natural.natural0} />,
      toastType: ToastTypes.SUCCESS,
      titleStyle: styles.toastTitle,
    });
  };

  const beneficiaryItem = ({ item }: { item: BeneficiaryDetails }) => {
    const { beneficiaryBankDetail, fullName, beneficiaryAccountNumber, beneficiaryStatus } = item;
    return (
      <IPayList
        shouldTranslateTitle={false}
        containerStyle={styles.listContainer}
        textStyle={styles.textStyle}
        title={fullName}
        subTitle={beneficiaryAccountNumber}
        isShowSubTitle
        isShowLeftIcon
        subTitleLines={1}
        adjacentTitle={beneficiaryBankDetail?.bankName}
        centerContainerStyles={styles.listCenterContainer}
        leftIcon={<IPayIcon icon={item?.beneficiaryBankDetail?.bankCode} size={30} />}
        rightText={
          <IPayView style={styles.moreButton}>
            <IPayButton
              onPress={() => {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                onPressBtn(item);
              }}
              btnText={
                beneficiaryStatus === BeneficiaryTypes.ACTIVE
                  ? 'LOCAL_TRANSFER.TRANSFER'
                  : 'BENEFICIARY_OPTIONS.ACTIVATE'
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
        <IPayFootnoteText text={sortType === BeneficiaryTypes.ACTIVE ? 'COMMON.ACTIVE' : 'COMMON.INACTIVE'} />
        <IPayFootnoteText text={`(${count} ${t('HOME.OF')} ${totalCount})`} />
      </IPayView>
    ) : (
      <IPayView />
    );

  const renderFooter = (statusKey: BeneficiaryTypes, totalCount: number) =>
    totalCount > beneficiariesToShow ? (
      <IPayPressable
        style={styles.listFooter}
        onPress={() => setViewAll((prev) => ({ ...prev, [statusKey]: !prev[statusKey] }))}
      >
        <IPaySubHeadlineText
          style={styles.capitalizeTitle}
          color={colors.primary.primary500}
          regular
          text={viewAll[statusKey] ? 'COMMON.CLOSE' : 'COMMON.VIEW_ALL'}
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
    viewAllStatus ? getSortedData(sort) : getSortedData(sort).slice(0, 4);

  const hasBeneficiariesData = () =>
    [...getSortedData(BeneficiaryTypes.ACTIVE), ...getSortedData(BeneficiaryTypes.INACTIVE)]?.length;

  // IVR
  const currentOptionText =
    currentOption === ActivateViewTypes.ACTIVATE_OPTIONS
      ? 'ACTIVATE_BENEFICIARY.ACTIVATE_OPTIONS'
      : 'ACTIVATE_BENEFICIARY.CALL_TO_ACTIVATE';

  const showActionSheet = (phoneNumber: string) => {
    setSelectedNumber(phoneNumber);
    setShowActivationSheet(false);
    setTimeout(() => {
      actionSheetRef.current.show();
    }, 500);
  };
  const closeActivateBeneficiary = useCallback(() => {
    setShowActivationSheet(false);
  }, []);

  const handleCallAlinma = useCallback(() => {
    setActivateHeight(SNAP_POINT.MEDIUM_LARGE);
    setCurrentOption(ActivateViewTypes.CALL_ALINMA);
  }, []);

  const onPressActivateBeneficiary = async () => {
    const activateBeneficiaryPayload = {
      beneficiaryCode: selectedBeneficiaryRef.current?.beneficiaryCode,
      activationMethod: ActivationMethods.IVR,
    };

    try {
      const apiResponse = await activateLocalBeneficiary(activateBeneficiaryPayload);

      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          return apiResponse?.status?.type || '';
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          return null;
        default:
          return null;
      }
    } catch (error: any) {
      setAPIError(error?.message || 'ERROR.SOMETHING_WENT_WRONG');
      renderToast(error?.message || 'ERROR.SOMETHING_WENT_WRONG');
      return null;
    }
  };

  const handleReceiveCall = useCallback(async () => {
    const repsonse = await onPressActivateBeneficiary();
    if (repsonse === ApiResponseStatusType.SUCCESS) {
      setActivateHeight(SNAP_POINT.MEDIUM_LARGE);
      setCurrentOption(ActivateViewTypes.RECEIVE_CALL);
    }
  }, []);

  const handleActivateBeneficiary = useCallback(() => {
    setShowActivationSheet(true);
    setActivateHeight(SNAP_POINT.X_SMALL);
    setCurrentOption(ActivateViewTypes.ACTIVATE_OPTIONS);
  }, []);

  const onPressBtn = (beneficiary: BeneficiaryDetails) => {
    selectedBeneficiaryRef.current = beneficiary;
    if (beneficiary.beneficiaryStatus === BeneficiaryTypes.ACTIVE)
      navigate(ScreenNames.TRANSFER_INFORMATION, { beneficiaryDetails: beneficiary });
    else handleActivateBeneficiary();
  };

  const makeTransfer = () => {
    setShowActivationSheet(false);
    getBeneficiariesData();
  };

  const renderCurrentOption = useMemo(() => {
    switch (currentOption) {
      case ActivateViewTypes.RECEIVE_CALL:
        return (
          <IPayReceiveCall
            hanldePageNavigation={makeTransfer}
            activateInternationalBeneficiary={onPressActivateBeneficiary}
            guideToReceiveCall={guideToReceiveCall}
            makeTransfer={false}
          />
        );
      case ActivateViewTypes.CALL_ALINMA:
        return (
          <IPayActivationCall contactList={contactList} guideStepsToCall={guideStepsToCall} close={showActionSheet} />
        );
      default:
        return <IPayActivateBeneficiary handleReceiveCall={handleReceiveCall} handleCallAlinma={handleCallAlinma} />;
    }
  }, [currentOption]);

  const hideContactUs = () => {
    actionSheetRef.current.hide();
  };

  const onPressCall = (value: string) => {
    openPhoneNumber({ phoneNumber: value, colors, showToast });
    hideContactUs();
  };
  const handleFinalAction = useCallback((index: number, value: string) => {
    switch (index) {
      case 0:
        onPressCall(value);
        break;
      case 1:
        hideContactUs();
        break;
      default:
        break;
    }
  }, []);

  const onDeleteBeneficiary = async () => {
    setDeleteBeneficiary(false);
    try {
      const apiResponse = await deleteLocalTransferBeneficiary(selectedBeneficiaryRef.current?.beneficiaryCode);

      if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
        getBeneficiariesData();
        showDeleteBeneficiaryToast();
      } else {
        renderToast('ERROR.SOMETHING_WENT_WRONG');
      }
    } catch (error: any) {
      setAPIError('ERROR.SOMETHING_WENT_WRONG');
      renderToast('ERROR.SOMETHING_WENT_WRONG');
    }
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="local-transfer-ipay-header"
        backBtn
        title="HOME.LOCAL_TRANSFER"
        applyFlex
        titleStyle={styles.capitalizeTitle}
        rightComponent={
          <IPayPressable onPress={() => navigate(ScreenNames.BENEFICIARY_TRANSACTION_HISTORY)}>
            <IPayView style={styles.headerRightContent}>
              <IPayIcon icon={icons.clock_1} size={20} color={colors.primary.primary500} />
              <IPaySubHeadlineText regular color={colors.primary.primary500} text="COMMON.HISTORY" />
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
                placeholder="COMMON.SEARCH"
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
                <IPayScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                  <IPayView
                    style={[
                      styles.activeInactiveListWrapper,
                      sortBy === BeneficiaryTypes.INACTIVE && styles.reverseList,
                    ]}
                  >
                    {!!getSortedData(BeneficiaryTypes.ACTIVE)?.length && (
                      <IPayFlatlist
                        scrollEnabled={false}
                        keyExtractor={(item, index) => `${item.fullName}-active-status-${index}`}
                        data={listData(viewAll.ACTIVATE, BeneficiaryTypes.ACTIVE)}
                        renderItem={beneficiaryItem}
                        ListHeaderComponent={() =>
                          renderHeader(
                            BeneficiaryTypes.ACTIVE,
                            listData(viewAll.ACTIVATE, BeneficiaryTypes.ACTIVE)?.length,
                            getSortedData(BeneficiaryTypes.ACTIVE)?.length,
                          )
                        }
                        ListFooterComponent={() => renderFooter(BeneficiaryTypes.ACTIVE, getSortedData(sortBy)?.length)}
                      />
                    )}
                    {!!getSortedData(BeneficiaryTypes.INACTIVE)?.length && (
                      <IPayFlatlist
                        scrollEnabled={false}
                        keyExtractor={(item, index) => `${item.fullName}-inactive-status-${index}`}
                        data={listData(viewAll.NEW_BENEFICIARY, BeneficiaryTypes.INACTIVE)}
                        renderItem={beneficiaryItem}
                        ListHeaderComponent={() =>
                          renderHeader(
                            BeneficiaryTypes.INACTIVE,
                            listData(viewAll.NEW_BENEFICIARY, BeneficiaryTypes.INACTIVE)?.length,
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
                {!isLoadingData && (
                  <>
                    <IPayNoResult
                      showIcon
                      icon={icons.user_search}
                      iconColor={colors.primary.primary800}
                      iconSize={40}
                      message="LOCAL_TRANSFER.NO_BENEFICIARIES"
                      containerStyle={styles.noResult as ViewStyle}
                      testID="no-result"
                    />
                    <IPayButton
                      btnText="LOCAL_TRANSFER.ADD_NEW_BENEFICIARY"
                      medium
                      onPress={() => navigate(ScreenNames.NEW_BENEFICIARY, {})}
                      btnType={buttonVariants.PRIMARY}
                      btnStyle={styles.btnStyle}
                      leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} size={18} />}
                    />
                  </>
                )}
              </IPayView>
            )}
          </IPayView>

          {hasBeneficiariesData() ? (
            <IPayButton
              btnText="LOCAL_TRANSFER.ADD_NEW_BENEFICIARY"
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
        title="BENEFICIARY_OPTIONS.DELETE_BENFICIARY"
        message="BENEFICIARY_OPTIONS.DELETION_CONFIRMATION"
        type={alertType.SIDE_BY_SIDE}
        closeOnTouchOutside
        variant={alertVariant.DESTRUCTIVE}
        icon={<IPayIcon icon={icons.TRASH} size={64} />}
        showIcon={false}
        primaryAction={{
          text: 'COMMON.CANCEL',
          onPress: onDeleteCancel,
        }}
        secondaryAction={{
          text: 'COMMON.DELETE',
          onPress: onDeleteBeneficiary,
        }}
      />
      <IPayActionSheet
        ref={editBeneficiaryRef}
        options={['COMMON.CANCEL', 'BENEFICIARY_OPTIONS.EDIT_NICK_NAME', 'BENEFICIARY_OPTIONS.DELETE_BENFICIARY']}
        cancelButtonIndex={0}
        destructiveButtonIndex={2}
        showIcon={false}
        showCancel
        bodyStyle={styles.actionSheetStyle}
        onPress={(index) => handleBeneficiaryActions(index)}
      />

      <IPayPortalBottomSheet
        onCloseBottomSheet={() => setShowEditSheet(false)}
        heading="BENEFICIARY_OPTIONS.EDIT_NICK_NAME"
        enablePanDownToClose
        cancelBnt
        bold
        customSnapPoint={(isIosOS ? isKeyboardWillOpen : isKeyboardOpen) ? SNAP_POINT.SMALL : SNAP_POINT.XX_SMALL}
        isVisible={showEditSheet}
      >
        <IPayView style={styles.editStyles}>
          <IPayTextInput
            maxLength={50}
            containerStyle={styles.inputStyles}
            onChangeText={setNickName}
            label="BENEFICIARY_OPTIONS.BENEFICIARY_NICK_NAME"
            text={nickName}
          />
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            large
            btnText="COMMON.DONE"
            disabled={!nickName}
            btnIconsDisabled
            onPress={() => {
              Keyboard.dismiss();
              handleChangeBeneficiaryName();
            }}
          />
        </IPayView>
      </IPayPortalBottomSheet>
      <IPayPortalBottomSheet
        heading={currentOptionText}
        onCloseBottomSheet={closeActivateBeneficiary}
        customSnapPoint={activateHeight}
        simpleHeader
        simpleBar
        bold
        cancelBnt
        isVisible={showActivationSheet}
        enablePanDownToClose
      >
        <IPayView style={styles.sheetContainerStyles}>{renderCurrentOption}</IPayView>
      </IPayPortalBottomSheet>
      <IPayBeneficiariesSortSheet sortSheetRef={sortSheetRef} setSortByActive={setSortBy} sortByActive={sortBy} />
      <IPayActionSheet
        ref={actionSheetRef}
        options={[`${t('MENU.CALL')} ${selectedNumber}`, t('COMMON.CANCEL')]}
        cancelButtonIndex={1}
        showCancel
        onPress={(index) => handleFinalAction(index, selectedNumber)}
        bodyStyle={styles.bodyStyle}
      />
    </IPaySafeAreaView>
  );
};

export default LocalTransferScreen;
