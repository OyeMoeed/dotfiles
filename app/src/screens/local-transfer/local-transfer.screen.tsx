import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import localTransferStyles from './local-transfer.style';

const LocalTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = localTransferStyles();
  const localizationText = useLocalization();
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="local-transfer-ipay-header"
        backBtn
        title={localizationText.HOME.LOCAL_TRANSFER}
        applyFlex
        titleStyle={styles.capitalizeTitle as TextStyle}
        rightComponent={
          <IPayPressable>
            <IPayView style={styles.headerRightContent}>
              <IPayIcon icon={icons.clock_1} size={20} color={colors.primary.primary500} />
              <IPaySubHeadlineText regular color={colors.primary.primary500} text={localizationText.COMMON.HISTORY} />
            </IPayView>
          </IPayPressable>
        }
      />
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
          btnType="primary"
          onPress={() => navigate(ScreenNames.TRANSFER_FAILURE_SCREEN)}
          btnStyle={styles.btnStyle}
          leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} size={18} />}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default LocalTransferScreen;
