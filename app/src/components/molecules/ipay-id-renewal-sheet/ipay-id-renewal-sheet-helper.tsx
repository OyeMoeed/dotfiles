import icons from '@app/assets/icons'; // Replace with the actual path to icons
import useLocalization from '@app/localization/hooks/localization.hook';
import { IdRenewalState } from '@app/utilities/enums.util'; // Replace with the actual path to enums
import { IPayIcon } from '@components/atoms';
import React from 'react';

// Custom Hook to determine sheet properties based on the current state
const useIdRenewal = (state: IdRenewalState, colors: any) => {
  const localizationText = useLocalization(); // Fetch localization texts

  // Define the properties based on the state
  const sheetProps = React.useMemo(() => {
    switch (state) {
      case IdRenewalState.EXPIRE_FLAG_REACHED:
        return {
          title: localizationText.ID_RENEWAL.ID_EXPIRED,
          subtitle: localizationText.ID_RENEWAL.ID_EXPIRED_FLAG_DES,
          primaryButtonText: localizationText.ID_RENEWAL.RENEWED_ID,
          secondaryButtonText: localizationText.ID_RENEWAL.NOT_YET,
          icon: <IPayIcon icon={icons.forbidden} size={64} color={colors.error.error500} />,
          buttonIcon: icons.rightArrow,
        };
      case IdRenewalState.ABOUT_TO_EXPIRE:
        return {
          title: localizationText.ID_RENEWAL.ID_ABOUT_EXPIRE,
          subtitle: localizationText.ID_RENEWAL.ID_UPDATION_DES,
          primaryButtonText: localizationText.ID_RENEWAL.REMIND_ME_LATER,
          secondaryButtonText: localizationText.ID_RENEWAL.DONT_SHOW,
          icon: <IPayIcon icon={icons.danger_light} size={64} />,
          buttonIcon: icons.clock_1,
        };
      case IdRenewalState.EXPIRE_FLAG_NOT_REACHED:
        return {
          title: localizationText.ID_RENEWAL.ID_EXPIRED,
          subtitle: localizationText.ID_RENEWAL.ID_EXPIRED_DISCRIPTION,
          primaryButtonText: localizationText.ID_RENEWAL.REMIND_ME_LATER,
          secondaryButtonText: localizationText.ID_RENEWAL.DONT_SHOW,
          icon: <IPayIcon icon={icons.forbidden} size={64} color={colors.error.error500} />,
          buttonIcon: icons.clock_1,
        };
      default:
        return {
          title: localizationText.id_status_unknown,
          subtitle: localizationText.id_status_unknown,
          primaryButtonText: localizationText.action_unknown,
          secondaryButtonText: localizationText.ID_RENEWAL.DONT_SHOW,
          icon: <IPayIcon icon={icons.forbidden} size={64} />,
          buttonIcon: icons.clock_1,
        };
    }
  }, [state, localizationText, colors]);

  return sheetProps; // Return the computed sheet properties
};

// eslint-disable-next-line import/prefer-default-export
export { useIdRenewal };
