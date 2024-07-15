import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayList, IPayTopUpBox } from '@app/components/molecules';
import { IPayBottomSheet, IPaySendMoneyForm } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import React, { useRef, useState } from 'react';
import sendMoneyFormStyles from './send-money-form.styles';

const SendMoneyFormScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = sendMoneyFormStyles(colors);
  const localizationText = useLocalization();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { currentBalance } = walletInfo; //TODO replace with orignal data

  const [amount, setAmount] = useState('');
  const reasonBottomRef = useRef<any>(null);
  const openReason = () => {
    reasonBottomRef.current.present();
  };

  const closeReason = () => {
    reasonBottomRef.current.close();
  };
  const { transferReasonData } = useConstantData();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const renderItemList = () => (
    <IPayFlatlist
      data={transferReasonData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <IPayView style={styles.container}>
          <IPayList
            textStyle={styles.titleStyle}
            title={item.text}
            isShowIcon={selectedItem && selectedItem.id === item.id}
            icon={
              selectedItem &&
              selectedItem.id === item.id && (
                <IPayIcon icon={icons.tick_mark_default} size={20} color={colors.primary.primary500} />
              )
            }
            onPress={() => {
              setSelectedItem(item); // Set selected item
            }}
          />
        </IPayView>
      )}
    />
  );
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayTopUpBox
        availableBalance={formatNumberWithCommas(currentBalance)}
        isShowTopup
        isShowRemaining
        isShowProgressBar
        currentBalance={formatNumberWithCommas(currentBalance)}
        monthlyRemainingOutgoingBalance={formatNumberWithCommas(currentBalance)}
      />
      <IPaySendMoneyForm amount={amount} openReason={openReason} setAmount={setAmount} />
      <IPayBottomSheet
        heading={localizationText.TRANSACTION_HISTORY.TRANSACTION_DETAILS}
        onCloseBottomSheet={closeReason}
        customSnapPoint={['20%', '75%']}
        ref={reasonBottomRef}
        simpleHeader
        simpleBar
        cancelBnt
        doneBtn
        bold
      >
        {renderItemList()}
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default SendMoneyFormScreen;
