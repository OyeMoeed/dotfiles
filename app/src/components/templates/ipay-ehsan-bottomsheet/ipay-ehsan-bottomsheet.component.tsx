import { FC, useCallback } from 'react';
import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import checkUserAccess from '@app/utilities/check-user-access';
import { isIosOS } from '@app/utilities/constants';
import { buttonVariants, PayChannel } from '@app/utilities/enums.util';
import { useTranslation } from 'react-i18next';
import ehsanBottomSheetStyles from './ipay-ehsan-bottomsheet.styles';
import { EhsanIcon } from '@app/assets/svgs';
import { IPayButton } from '@app/components/molecules';
import { openBrowser } from '@swan-io/react-native-browser';

const IPayEhsanBottomSheet: FC = ({ closeBottomSheetEhsan }) => {
  const { colors } = useTheme();
  const styles = ehsanBottomSheetStyles();

  const handleOnPress = useCallback(() => {
    openBrowser('https://ehsan.sa/', {
      onClose: (url) => {},
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <IPayView style={styles.itemContainer}>
      <IPayView style={styles.iconContainer}>
        <EhsanIcon />
      </IPayView>
      <IPayButton
        btnColor={colors.primary.primary500}
        btnType={buttonVariants.PRIMARY}
        btnText="Go to Ehsan"
        medium
        width={345}
        rightIcon={<IPayIcon size={24} icon={icons.export_3} color="white" />}
        onPress={() => {
          closeBottomSheetEhsan();
          handleOnPress();
        }}
      />
    </IPayView>
  );
};

export default IPayEhsanBottomSheet;
