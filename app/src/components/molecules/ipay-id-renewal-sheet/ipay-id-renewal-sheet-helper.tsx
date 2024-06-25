import icons from '@app/assets/icons'; // Replace with the actual path to icons
import useLocalization from '@app/localization/hooks/localization.hook';
import { IdRenewalState } from '@app/utilities/enums.util'; // Replace with the actual path to enums
import { IPayIcon } from '@components/atoms';
import React from 'react';

// Custom Hook to determine sheet properties based on the current state
export const useIdRenewal = (state: IdRenewalState, colors: any) => {
  const localizationText = useLocalization(); // Fetch localization texts

  // Define the properties based on the state
  const sheetProps = React.useMemo(() => {
    switch (state) {
      case IdRenewalState.EXPIRE_FLAG_REACHED:
        return {
          title: localizationText.id_expired,
          subtitle: localizationText.id_expired_flag_des,
          primaryButtonText: localizationText.renewed_id,
          secondaryButtonText: localizationText.not_yet,
          icon: <IPayIcon icon={icons.forbidden} size={64} color={colors.error.error500} />,
          buttonIcon: icons.rightArrow,
        };
      case IdRenewalState.ABOUT_TO_EXPIRE:
        return {
          title: localizationText.id_about_expire,
          subtitle: localizationText.id_updation_des,
          primaryButtonText: localizationText.remind_me_later,
          secondaryButtonText: localizationText.dont_show,
          icon: <IPayIcon icon={icons.danger_light} size={64} />,
          buttonIcon: icons.clock_1,
        };
      case IdRenewalState.EXPIRE_FLAG_NOT_REACHED:
        return {
          title: localizationText.id_expired,
          subtitle: localizationText.id_expired_discription,
          primaryButtonText: localizationText.remind_me_later,
          secondaryButtonText: localizationText.dont_show,
          icon: <IPayIcon icon={icons.forbidden} size={64} color={colors.error.error500} />,
          buttonIcon: icons.clock_1,
        };
      default:
        return {
          title: localizationText.id_status_unknown,
          subtitle: localizationText.id_status_unknown,
          primaryButtonText: localizationText.action_unknown,
          secondaryButtonText: localizationText.dont_show,
          icon: <IPayIcon icon={icons.forbidden} size={64} />,
          buttonIcon: icons.clock_1,
        };
    }
  }, [state, localizationText, colors]);

  return sheetProps; // Return the computed sheet properties
};
