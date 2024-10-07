import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayChip, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import { IW2WResRequest } from '@app/network/services/cards-management/wallet-to-wallet-fees/wallet-to-wallet-fees.interface';

import { TransactionTypes } from '@app/enums/transaction-types.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  CreateMoneyRequestPayloadTypes,
  CreateMoneyRequestResponseTypes,
} from '@app/network/services/request-management/sent-requests/sent-requests.interface';
import { createMoneyRequestService } from '@app/network/services/request-management/sent-requests/sent-requests.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import getDeviceInfo from '@app/network/utilities/device-info-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { ApiResponseStatusType, buttonVariants } from '@app/utilities/enums.util';
import getTotalAmount from '@app/utilities/total-amount-utils';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IW2WTransferSummaryItem, ParamsProps } from './create-money-request-summary.interface';
import createMoneyRequestSummaryStyles from './create-money-request-summary.styles';

const CreateMoneyRequestSummaryScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const route = useRoute<
    RouteProp<{
      params: ParamsProps;
      key: {};
      name: {};
    }>
  >();
  const { transfersDetails } = (route.params as ParamsProps).data;

  const styles = createMoneyRequestSummaryStyles(colors);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const isItemHasWallet = (item: IW2WResRequest): boolean => {
    const walletNumber = transfersDetails.activeFriends?.filter(
      (activeFriend) => activeFriend?.mobileNumber === item?.mobileNumber,
    )[0]?.walletNumber;

    if (walletNumber == null || !walletNumber) {
      return false;
    }
    return true;
  };

  const transfersRequestsList: any[] = transfersDetails.formInstances?.map((item, index) => {
    const hasWallet = isItemHasWallet(item);
    const summeryArray = [];
    const titleObject = () => {
      if (!hasWallet) {
        return {
          id: '1',
          label: t('REQUEST_SUMMARY.FROM'),
          value: transfersDetails.formInstances[index]?.subtitle,
          leftIcon: icons.user_square,
          color: colors.primary.primary900,
          isAlinma: false,
        };
      }
      return {
        id: '1',
        label: t('REQUEST_SUMMARY.FROM'),
        value: transfersDetails.formInstances[index]?.subtitle,
        leftIcon: images.alinmaP,
        isAlinma: true,
      };
    };

    summeryArray.push(titleObject());
    summeryArray.push({
      id: '2',
      label: t('TRANSFER_SUMMARY.AMOUNT'),
      value: `${item?.amount || 0} ${t('COMMON.SAR')}`,
    });
    if (transfersDetails.formInstances[index]?.selectedItem) {
      summeryArray.push({
        id: '3',
        value: transfersDetails.formInstances[index]?.selectedItem?.text,
      });
    }
    if (item.notes) {
      summeryArray.push({ id: '4', label: t('TRANSFER_SUMMARY.NOTE'), value: item.notes });
    }
    return summeryArray;
  });

  const renderWalletPayItem = ({ item }) => {
    const renderLeftIcon = () => {
      if (item?.leftIcon) {
        if (item.isAlinma) {
          return (
            <IPayView style={styles.leftIcon}>
              <IPayImage image={item.leftIcon} style={styles.alinmaLogo} resizeMode="contain" />
            </IPayView>
          );
        }
        return (
          <IPayPressable style={styles.appleIcon} onPress={item.onPress}>
            <IPayIcon icon={item.leftIcon} style={styles.appleIcon} color={item.color} size={18} />
          </IPayPressable>
        );
      }
      return null;
    };

    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.walletListBackground}>
          <IPayView style={styles.iconLabel}>
            {renderLeftIcon()}
            <IPayFootnoteText text={item?.label} style={styles.label} numberOfLines={2} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            <IPayFootnoteText text={item?.value} style={styles.detailsText} numberOfLines={2} />
            {item?.icon && (
              <IPayPressable style={styles.appleIcon} onPress={item?.onPress}>
                <IPayIcon icon={item?.icon} style={styles.appleIcon} color={item?.color} size={scaleSize(18)} />
              </IPayPressable>
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  const renderNonAlinmaPayItem = ({ item, index }: { item: IW2WTransferSummaryItem; index: number }) => {
    const isFirstItem = index === 0;

    return (
      <IPayView key={item.id}>
        {isFirstItem && (
          <IPayView style={styles.chipContainer}>
            <IPayChip
              containerStyle={styles.chipColors}
              icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} size={18} />}
              textValue="TRANSFER_SUMMARY.CHIP_TITLE"
              headingStyles={styles.chipColors}
            />
          </IPayView>
        )}
        {renderWalletPayItem({ item })}
      </IPayView>
    );
  };

  const isNumeric = (str: string): boolean => /^\d+$/.test(str);

  const requestObject = transfersDetails.formInstances.map((formDetails) => ({
    mobileNumber: formDetails.mobileNumber,
    amount: formDetails.amount,
    note: formDetails.notes,
    inContactList: isNumeric(formDetails.subtitle) !== true, // TODO: need clearity how can get this value
  }));

  const onSendRequest = async () => {
    const payload: CreateMoneyRequestPayloadTypes = {
      requests: requestObject,
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
    };

    const apiResponse: CreateMoneyRequestResponseTypes = await createMoneyRequestService(
      walletInfo.walletNumber,
      payload,
    );

    if (apiResponse.status.type === ApiResponseStatusType.SUCCESS) {
      navigate(ScreenNames.W2W_TRANSFER_SUCCESS, {
        variant: TransactionTypes.PAYMENT_REQUEST,
        transferDetails: {
          formData: transfersDetails.formInstances,
          apiData: apiResponse?.response.moneyRequestsResult,
        },
        totalAmount: getTotalAmount(transfersDetails.formInstances),
      });
    }
  };

  const onConfirm = () => {
    onSendRequest();
  };

  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientPrimary50}>
      <IPayHeader backBtn title="REQUEST_SUMMARY.SUMMARY" applyFlex />
      <IPayView style={styles.container}>
        <IPayView style={styles.scrollViewContainer}>
          <IPayScrollView>
            {transfersRequestsList?.map((item) =>
              item[0].isAlinma ? (
                <IPayView style={styles.walletBackground} key={item[0].value}>
                  <IPayFlatlist
                    style={styles.detailesFlex}
                    scrollEnabled={false}
                    data={item}
                    renderItem={renderWalletPayItem}
                  />
                </IPayView>
              ) : (
                <IPayView style={styles.walletBackground} key={item[0].value}>
                  <IPayFlatlist
                    style={styles.detailesFlex}
                    scrollEnabled={false}
                    data={item}
                    renderItem={renderNonAlinmaPayItem}
                  />
                </IPayView>
              ),
            )}
          </IPayScrollView>
        </IPayView>
        <IPayView style={styles.buttonContainer}>
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            btnIconsDisabled
            btnText="COMMON.CONFIRM"
            btnColor={colors.primary.primary500}
            large
            onPress={onConfirm}
          />
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default CreateMoneyRequestSummaryScreen;
