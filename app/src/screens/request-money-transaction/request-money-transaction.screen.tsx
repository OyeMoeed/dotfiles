import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { IPayActionSheet, IPayBottomSheet } from '@app/components/organism';
import IPayMoneyRequestList from '@app/components/organism/ipay-money-request-list/ipay-money-request-list.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { IPayRequestMoneyProps } from '@app/components/templates/ipay-request-detail/iipay-request-detail.interface';
import IPayRequestDetails from '@app/components/templates/ipay-request-detail/ipay-request-detail.component';
import { heightMapping } from '@app/components/templates/ipay-request-detail/ipay-request-detail.constant';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useState } from 'react';
import requestMoneyStyles from './request-money-transaction.style';

const RequestMoneyTransactionScreen: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = requestMoneyStyles(colors);
  const { requestMoneyData } = useConstantData();
  const requestdetailRef = React.createRef<bottomSheetTypes>();
  const rejectRequestRef = React.createRef<bottomSheetTypes>();

  const {
    REQUEST_MONEY: { REQUEST_MONEY, SEND_REQUESTS, RECEIVED_REQUESTS, YOU_HAVE_NO, MONEY_REQUESTS, CREATE_REQUEST },
  } = localizationText;
  const SEND_REQUESTS_TABS = [SEND_REQUESTS, RECEIVED_REQUESTS];

  const [selectedTab, setSelectedTab] = useState<string>(SEND_REQUESTS_TABS[0]);
  const [isFilterApply, setIsFilterApply] = useState<boolean>(false);
  const [requestDetail, setRequestDetail] = useState<IPayRequestMoneyProps | null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '95%' : '100%']);

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const applyFilter = () => {
    setIsFilterApply(!isFilterApply);
  };

  const closeBottomSheet = () => {
    requestdetailRef.current?.forceClose();
  };

  const showActionSheet = () => {
    requestdetailRef.current?.forceClose();
    rejectRequestRef.current?.show();
  };

  const openBottomSheet = (item: IPayRequestMoneyProps) => {
    const calculatedSnapPoint = ['1%', heightMapping[item.status], isAndroidOS ? '95%' : '100%'];
    setSnapPoint(calculatedSnapPoint);
    setRequestDetail(item);
    requestdetailRef.current?.present();
  };

  const onPressActionSheet = () => {
    rejectRequestRef.current?.hide();
  };

  const renderItem = ({ item }: { item: IPayRequestMoneyProps }) => {
    const { dates, title, status, amount } = item;

    return (
      <IPayView style={styles.listView}>
        <IPayMoneyRequestList
          date={dates}
          titleText={title}
          status={status}
          amount={amount}
          onPress={() => openBottomSheet(item)}
        />
      </IPayView>
    );
  };

  const noResult = () => (
    <IPayView style={styles.noResult}>
      <IPayNoResult
        textColor={colors.primary.primary800}
        iconColor={colors.primary.primary800}
        message={`${YOU_HAVE_NO} ${selectedTab.split(' ')[0].toLowerCase()} ${MONEY_REQUESTS}`}
        showIcon
        containerStyle={styles.noResultContent}
        iconSize={40}
        icon={icons.money_time}
      />
    </IPayView>
  );

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="request-money-header"
        backBtn
        title={REQUEST_MONEY}
        applyFlex
        rightComponent={
          <IPayPressable onPress={applyFilter}>
            <IPayIcon
              icon={isFilterApply ? icons.filter_edit_purple : icons.filter}
              size={20}
              color={isFilterApply ? colors.secondary.secondary500 : colors.primary.primary500}
            />
          </IPayPressable>
        }
      />
      <IPaySegmentedControls
        onSelect={handleSelectedTab}
        selectedTab={selectedTab}
        tabs={SEND_REQUESTS_TABS}
        customStyles={styles.tabs}
        unselectedTabStyle={styles.unselectedTab}
      />
      <IPayView style={styles.listContainer}>
        <IPayFlatlist
          data={requestMoneyData}
          renderItem={renderItem}
          style={styles.flatlist}
          ListEmptyComponent={noResult}
        />
        {selectedTab === SEND_REQUESTS && (
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            medium
            btnText={CREATE_REQUEST}
            btnStyle={styles.requestButton}
            leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} />}
          />
        )}
      </IPayView>
      <IPayActionSheet
        ref={rejectRequestRef}
        testID="reject-card-action-sheet"
        options={[localizationText.COMMON.CANCEL, localizationText.REQUEST_MONEY.REJECT_THIS_REQUEST]}
        cancelButtonIndex={0}
        destructiveButtonIndex={1}
        showCancel
        onPress={onPressActionSheet}
      />
      <IPayBottomSheet
        heading={localizationText.REQUEST_MONEY.REQUEST_DETAILS}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={snapPoint}
        ref={requestdetailRef}
        simpleHeader
        simpleBar
        cancelBnt
        bold
      >
        <IPayRequestDetails
          transaction={requestDetail}
          onCloseBottomSheet={closeBottomSheet}
          showActionSheet={showActionSheet}
        />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default RequestMoneyTransactionScreen;
