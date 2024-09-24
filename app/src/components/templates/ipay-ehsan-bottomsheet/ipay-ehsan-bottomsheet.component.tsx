import { FC } from 'react';
import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import checkUserAccess from '@app/utilities/check-user-access';
import { isIosOS } from '@app/utilities/constants';
import { PayChannel } from '@app/utilities/enums.util';
import { useTranslation } from 'react-i18next';
import ehsanBottomSheetStyles from './ipay-ehsan-bottomsheet.styles';
import { EhsanIcon } from '@app/assets/svgs';

const IPayEhsanBottomSheet: FC = () => {
  const { colors } = useTheme();
  const styles = ehsanBottomSheetStyles();

  // Function to handle navigation
  const handleNavigation = () => {};

  return (
    <IPayView>
      <IPayView style={styles.itemContainer}>
        <EhsanIcon />
        <IPayPressable onPress={() => handleNavigation()} style={styles.cardContainer}>
          <IPayView style={styles.itemContent}>
            <IPayFootnoteText text={'text'} style={styles.itemText} color={colors.natural.natural900} />
          </IPayView>
        </IPayPressable>
      </IPayView>
    </IPayView>
  );
};

export default IPayEhsanBottomSheet;
