import icons from '@app/assets/icons';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate, resetNavigation } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import { buttonVariants, ToastTypes } from '@app/utilities/enums.util';
import React from 'react';
import { StyleSheet } from 'react-native';
import { formatTimeAndDate } from '@app/utilities/date-helper.util';
import { useTranslation } from 'react-i18next';
import { ATMWithdrawalSuccessScreenProps, ItemProps } from './atm-withdraw-successful.interface';
import atmWithdrawSuccessStyles from './atm-withdraw-successful.style';

const AtmWithdrawSuccessful: React.FC<ATMWithdrawalSuccessScreenProps> = ({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = atmWithdrawSuccessStyles(colors);
  const localizationText = useLocalization();

  const withdrawSuccessData = [
    {
      id: 1,
      title: t('ATM_WITHDRAWAL.SUCCESS_SCREEN.TRANSACTION_TYPE'),
      subTitle: t('ATM_WITHDRAWAL.SUCCESS_SCREEN.ATM_WITHDRAWAL'),
      icon: '',
    },
    {
      id: 2,
      title: t('ATM_WITHDRAWAL.SUCCESS_SCREEN.REF_NUMBER'),
      subTitle: route?.params?.referenceNumber,
      icon: icons.copy,
    },
    {
      id: 3,
      title: t('ATM_WITHDRAWAL.SUCCESS_SCREEN.TRANSACTION_DATE'),
      subTitle: formatTimeAndDate(new Date().toString()),
      icon: '',
    },
  ];

  const { showToast } = useToastContext();

  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title: title || t('passcode_error'),
        subTitle,
        toastType,
        isShowRightIcon: false,
        leftIcon: icon || <IPayIcon icon={icons.copy_success} size={18} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };

  const onPressHome = () => {
    resetNavigation(screenNames.HOME_BASE);
  };

  const onPressNewWithdarawal = () => {
    navigate(screenNames.ATM_WITHDRAWALS, { hideBalance: false });
  };

  const onPressCopy = (refNo: string) => {
    copyText(refNo);
    renderToast({ title: t('TOP_UP.REF_NUMBER_COPIED'), toastType: ToastTypes.INFORMATION });
  };

  const renderItem = ({ item }: ItemProps) => (
    <IPayView style={styles.dataCardView}>
      <IPayFootnoteText regular text={item.title} style={styles.detailFootText} color={colors.natural.natural900} />
      <IPayView style={styles.detailsView}>
        <IPaySubHeadlineText regular text={item.subTitle} color={colors.primary.primary800} />
        {item.icon && (
          <IPayPressable style={styles.icon} onPress={() => onPressCopy(item.subTitle)}>
            <IPayIcon icon={item.icon} size={18} color={colors.primary.primary500} />
          </IPayPressable>
        )}
      </IPayView>
    </IPayView>
  );

  return (
    <IPayPageWrapper>
      <IPayLinearGradientView
        style={styles.innerLinearGradientView}
        gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
      >
        <IPaySuccess
          style={styles.zeroFlex}
          headingText="ATM_WITHDRAWAL.WITHDRAW_SUCCESSFULLY"
          subHeadingText={`${route?.params?.amount} ${t('COMMON.SAR')}`}
          subHeadingTextStyle={styles.subHeadingTextStyle}
        />
        <IPayView style={styles.dataView}>
          <IPayFlatlist
            scrollEnabled={false}
            data={withdrawSuccessData}
            keyExtractor={(item, index) => index.toString()}
            itemSeparatorStyle={StyleSheet.flatten(styles.itemSeparatorStyle)}
            renderItem={renderItem}
          />
        </IPayView>
        <IPayView style={styles.buttonsView}>
          <IPayButton
            onPress={onPressNewWithdarawal}
            btnType={buttonVariants.LINK_BUTTON}
            large
            btnText="ATM_WITHDRAWAL.NEW_WITHDRAWAL"
            leftIcon={<IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />}
          />
          <IPayButton
            onPress={onPressHome}
            btnType={buttonVariants.PRIMARY}
            large
            btnText="COMMON.HOME"
            leftIcon={<IPayIcon icon={icons.HOME} size={20} color={colors.natural.natural0} />}
          />
        </IPayView>
      </IPayLinearGradientView>
    </IPayPageWrapper>
  );
};

export default AtmWithdrawSuccessful;
