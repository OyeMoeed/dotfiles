import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import colors from '@app/styles/colors.const';
import { PayChannel, buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import cardManagementStyles from './cardManagement.style';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';

const CardManagementScreen: React.FC = () => {
  const styles = cardManagementStyles();
  const localizationText = useLocalization();

  const onAddCard = () => {
    navigate(ScreenNames.TOP_UP, {
      topupChannel: PayChannel.CARD,
    });
  };
  
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="card-management-header"
        backBtn
        title={localizationText.CARD_MANAGEMENT.CARD_MANAGEMENT}
        applyFlex
      />

      <IPayView style={styles.noResult}>
        <IPayNoResult
          textColor={colors.primary.primary800}
          message={localizationText.CARD_MANAGEMENT.YOU_DO_NOT_HAVE_ANY_CARDS}
          icon={icons.cardSlash}
          showIcon
          iconSize={60}
          iconViewStyles={styles.emptyRecordImage}
          iconColor={colors.primary.primary900}
        />
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          medium
          btnText={localizationText.MENU.ADD_CARD}
          hasRightIcon
          onPress={onAddCard}
          btnStyle={styles.sendButton}
          leftIcon={<IPayIcon icon={icons.add} color={colors.natural.natural0} />}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default CardManagementScreen;
