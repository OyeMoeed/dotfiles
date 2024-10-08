import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { navigate } from '@app/navigation/navigation-service.navigation';
import getNotificationCenterStyles from '../../notification-center.styles';
import { NoRequestComponentProps } from './ipay-no-request.interface';

/**
 * NoRequestComponent displays a message when there are no pending requests.
 * @param pendingRequests The list of pending requests.
 * @param previousRequests The list of previous requests.
 */
const NoRequestComponent: React.FC<NoRequestComponentProps> = ({ pendingRequests, previousRequests }) => {
  const { colors } = useTheme();
  const styles = getNotificationCenterStyles(colors);

  return (
    <IPayView style={styles.noRequestContainer}>
      <IPayIcon size={24} icon={icons.empty_box_icon} />
      <IPayCaption1Text style={styles.noRequestText} regular={false} text="NOTIFICATION_CENTER.ALL_CAUGHT_UP" />
      <IPayCaption1Text style={styles.noPendingRequestText} text="NOTIFICATION_CENTER.NO_PENDING_REQUESTS" />
      <IPayPressable
        onPress={() =>
          navigate(ScreenNames.REQUEST_LISTING_SCREEN, {
            pendingRequests,
            previousRequests,
          })
        }
      >
        <IPaySubHeadlineText color={colors.primary.primary500} regular text="NOTIFICATION_CENTER.SHOW_REQUESTS" />
      </IPayPressable>
    </IPayView>
  );
};

export default NoRequestComponent;
