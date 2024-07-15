import icons from '@app/assets/icons';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPaySuccessComponent } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ItemProps } from './atm-withdraw-successful.interface';
import atmWithdrawSuccessStyles from './atm-withdraw-successful.style';

const AtmWithdrawSuccessful: React.FC = () => {
  const { colors } = useTheme();
  const styles = atmWithdrawSuccessStyles(colors);
  const localizationText = useLocalization();
  const withdrawSuccessData = constants.ATM_WITHDRAW_SUCCESS_DATA;
  const transactionsAmount = 5000;

  const onPressHome = () => {
    resetNavigation(screenNames.HOME_BASE);
  };

  const onPressNewWithdarawal = () => {};

  const renderItem = ({ item }: ItemProps) => (
    <IPayView style={styles.dataCardView}>
      <IPayFootnoteText regular text={item.title} color={colors.natural.natural900} />
      <IPayView style={styles.detailsView}>
        <IPaySubHeadlineText regular text={item.subTitle} color={colors.primary.primary800} />
        {item.icon && (
          <IPayView style={styles.icon}>
            <IPayIcon icon={item.icon} size={18} color={colors.primary.primary500} />
          </IPayView>
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
        <IPaySuccessComponent
          headingText={localizationText.ATM_WITHDRAWAL.WITHDRAW_SUCCESSFULLY}
          subHeadingText={`${transactionsAmount} ${localizationText.COMMON.SAR}`}
        />
        <IPayView style={styles.dataView}>
          <IPayFlatlist
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
            btnText={localizationText.ATM_WITHDRAWAL.NEW_WITHDRAWAL}
            leftIcon={<IPayIcon icon={icons.refresh} size={14} color={colors.primary.primary500} />}
          />
          <IPayButton
            onPress={onPressHome}
            btnType={buttonVariants.PRIMARY}
            large
            btnText={localizationText.COMMON.HOME}
            leftIcon={<IPayIcon icon={icons.HOME} size={20} color={colors.natural.natural0} />}
          />
        </IPayView>
      </IPayLinearGradientView>
    </IPayPageWrapper>
  );
};

export default AtmWithdrawSuccessful;
