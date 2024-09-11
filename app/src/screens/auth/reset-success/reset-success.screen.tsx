import { IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import logOut from '@app/network/services/core/logout/logout.service';
import clearSession from '@app/network/utilities/network-session-helper';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType } from '@app/utilities/enums.util';
import React from 'react';
import genratedStyles from './reset-success.style';

const ResetSuccessful: React.FC = () => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const localizationText = useLocalization();

  const logoutConfirm = async () => {
    const apiResponse: any = await logOut();
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      clearSession(false);
    }
  };

  return (
    <IPayPageWrapper>
      <IPayView style={styles.parentContainer}>
        <IPayView style={styles.childContainer}>
          <IPaySuccess
            style={styles.successContainer}
            iconsStyles={styles.successIcon}
            descriptionStyle={styles.descriptionStyle}
            headingText={'SETTINGS.PASSCODE_CHANGED_SUCCESSFULY'}
            descriptionText={'SETTINGS.SAVE_FOR_LATER'}
          />
          <IPayView style={styles.buttonContainer}>
            <IPayButton btnType="primary" btnText={'COMMON.DONE'} large btnIconsDisabled onPress={logoutConfirm} />
          </IPayView>
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};
export default ResetSuccessful;
