import icons from '@app/assets/icons'; // Replace with the actual path to icons
import { IdRenewalState } from '@app/utilities/enums.util'; // Replace with the actual path to enums
import { IPayIcon } from '@components/atoms';
import React from 'react';
import { useTranslation } from 'react-i18next';

// Custom Hook to determine sheet properties based on the current state
const useIdRenewal = (state: IdRenewalState, colors: any) => {
  const { t } = useTranslation();

  // Define the properties based on the state
  const sheetProps = React.useMemo(() => {
    switch (state) {
      case IdRenewalState.EXPIRE_FLAG_REACHED:
        return {
          title: t('ID_RENEWAL.ID_EXPIRED'),
          subtitle: t('ID_RENEWAL.ID_EXPIRED_FLAG_DES'),
          primaryButtonText: t('ID_RENEWAL.RENEWED_ID'),
          secondaryButtonText: t('ID_RENEWAL.NOT_YET'),
          icon: <IPayIcon icon={icons.forbidden} size={64} color={colors.error.error500} />,
          buttonIcon: icons.rightArrow,
        };
      case IdRenewalState.ABOUT_TO_EXPIRE:
        return {
          title: t('ID_RENEWAL.ID_ABOUT_EXPIRE'),
          subtitle: t('ID_RENEWAL.ID_UPDATION_DES'),
          primaryButtonText: t('ID_RENEWAL.REMIND_ME_LATER'),
          secondaryButtonText: t('ID_RENEWAL.DONT_SHOW'),
          icon: <IPayIcon icon={icons.danger_light} size={64} />,
          buttonIcon: icons.clock_1,
        };
      case IdRenewalState.EXPIRE_FLAG_NOT_REACHED:
        return {
          title: t('ID_RENEWAL.ID_EXPIRED'),
          subtitle: t('ID_RENEWAL.ID_EXPIRED_DISCRIPTION'),
          primaryButtonText: t('ID_RENEWAL.REMIND_ME_LATER'),
          secondaryButtonText: t('ID_RENEWAL.DONT_SHOW'),
          icon: <IPayIcon icon={icons.forbidden} size={64} color={colors.error.error500} />,
          buttonIcon: icons.clock_1,
        };
      default:
        return {
          title: t('ID_RENEWAL.STATUS_UNKOWN'),
          subtitle: t('ID_RENEWAL.STATUS_UNKOWN'),
          primaryButtonText: t('ID_RENEWAL.STATUS_UNKOWN'),
          secondaryButtonText: t('ID_RENEWAL.DONT_SHOW'),
          icon: <IPayIcon icon={icons.forbidden} size={64} />,
          buttonIcon: icons.clock_1,
        };
    }
  }, [state, t, colors]);

  return sheetProps; // Return the computed sheet properties
};

// eslint-disable-next-line import/prefer-default-export
export { useIdRenewal };
