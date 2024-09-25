import icons from '@app/assets/icons'; // Replace with the actual path to icons
import { IdRenewalState } from '@app/utilities/enums.util'; // Replace with the actual path to enums
import { IPayIcon } from '@components/atoms';
import React from 'react';

// Custom Hook to determine sheet properties based on the current state
const useIdRenewal = (state: IdRenewalState, colors: any) => {
  // Define the properties based on the state
  const sheetProps = React.useMemo(() => {
    switch (state) {
      case IdRenewalState.EXPIRE_FLAG_REACHED:
        return {
          title: 'ID_RENEWAL.ID_EXPIRED',
          subtitle: 'ID_RENEWAL.ID_EXPIRED_FLAG_DES',
          primaryButtonText: 'ID_RENEWAL.RENEWED_ID',
          secondaryButtonText: 'ID_RENEWAL.NOT_YET',
          icon: <IPayIcon icon={icons.forbidden} size={64} color={colors.error.error500} />,
          buttonIcon: icons.rightArrow,
        };
      case IdRenewalState.ABOUT_TO_EXPIRE:
        return {
          title: 'ID_RENEWAL.ID_ABOUT_EXPIRE',
          secondaryButtonText: 'ID_RENEWAL.DONT_SHOW',
          subtitle: 'ID_RENEWAL.ID_UPDATION_DES',
          primaryButtonText: 'ID_RENEWAL.REMIND_ME_LATER',
          icon: <IPayIcon icon={icons.danger_light} size={64} />,
          buttonIcon: icons.clock_1,
        };
      case IdRenewalState.EXPIRE_FLAG_NOT_REACHED:
        return {
          title: 'ID_RENEWAL.ID_EXPIRED',
          subtitle: 'ID_RENEWAL.ID_EXPIRED_DISCRIPTION',
          primaryButtonText: 'ID_RENEWAL.REMIND_ME_LATER',
          secondaryButtonText: 'ID_RENEWAL.DONT_SHOW',
          icon: <IPayIcon icon={icons.forbidden} size={64} color={colors.error.error500} />,
          buttonIcon: icons.clock_1,
        };
      default:
        return {
          title: 'ID_RENEWAL.STATUS_UNKOWN',
          subtitle: 'ID_RENEWAL.STATUS_UNKOWN',
          primaryButtonText: 'ID_RENEWAL.STATUS_UNKOWN',
          secondaryButtonText: 'ID_RENEWAL.DONT_SHOW',
          icon: <IPayIcon icon={icons.forbidden} size={64} />,
          buttonIcon: icons.clock_1,
        };
    }
  }, [state, colors]);

  return sheetProps; // Return the computed sheet properties
};

// eslint-disable-next-line import/prefer-default-export
export { useIdRenewal };
