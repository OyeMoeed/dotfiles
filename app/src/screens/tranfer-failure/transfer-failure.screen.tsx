import icons from '@app/assets/icons';
import { IPayIcon, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayFailure } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import transferFailureStyles from './transfer-failure.style';

const TransferFailureScreen = () => {
  const { colors } = useTheme();
  const styles = transferFailureStyles();
  const localizationText = useLocalization();
  const gradientColors = [colors.primary.primary50, colors.secondary.secondary50];

  const onPresHome = () => {
    resetNavigation(ScreenNames.HOME_BASE);
  };

  return (
    <IPayPageWrapper>
      <IPayLinearGradientView style={styles.innerLinearGradientView} gradientColors={gradientColors}>
        <IPayFailure
          headingText={localizationText.LOCAL_TRANSFER.TRANSFER_FAILED}
          descriptionText={localizationText.LOCAL_TRANSFER.TRY_AGAIN_TO_COMPLETE_TRANSFER}
        />

        <IPayView style={styles.footerView}>
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            large
            leftIcon={<IPayIcon icon={icons.LeftArrow} size={20} color={colors.natural.natural0} />}
            btnText={'TOP_UP.START_OVER'}
          />
          <IPayButton
            onPress={onPresHome}
            btnType={buttonVariants.LINK_BUTTON}
            large
            leftIcon={<IPayIcon icon={icons.HOME_2} size={20} color={colors.primary.primary500} />}
            btnText={'COMMON.HOME'}
            btnStyle={styles.linkBtn}
          />
        </IPayView>
      </IPayLinearGradientView>
    </IPayPageWrapper>
  );
};

export default TransferFailureScreen;
