import { useCustomQuery } from '@app/network/hooks';
import { useCallback, useMemo } from 'react';
import icons from '@app/assets/icons';
import { DisabledModulesInterface, showDisabledModules } from '@app/store/slices/disabled-module-slice';
import { useTypedDispatch } from '@app/store/store';
import appConfigurations from './app-configurations.service';
import APP_CONFIGURATIONS_QUERY_KEYS from './app-configurations.query-keys';
import { AppConfigurationsMockProps, AppConfigurationsMockResponseDetails } from './app-configurations.interface';

export enum ModulesNameEnum {
  PHYSICAL_CARD_ENABLED = 'PHYSICAL_CARD_ENABLED',
  AGE_YEARS_MINOR_ACCOUNT_LIMIT = 'AGE_YEARS_MINOR_ACCOUNT_LIMIT',
  AGE_YEARS_REGISTER_LIMIT = 'AGE_YEARS_REGISTER_LIMIT',
  MAZAYA_IS_ACTIVE = 'MAZAYA_IS_ACTIVE',
  ONECARD_IS_ACTIVE = 'ONECARD_IS_ACTIVE',
  ACTIVE_THEME = 'ACTIVE_THEME',
  MUSANED_IS_NEW = 'MUSANED_IS_NEW',
}

const mapper: { [key: string]: { icon: string; title: string } } = {
  PHYSICAL_CARD_ENABLED: { icon: icons.card, title: 'CARD_OPTIONS.PHYSICAL_CARD' },
  MAZAYA_IS_ACTIVE: { icon: icons.shopping_cart, title: 'SHOP.TITLE_SHOP' },
  MUSANED_IS_NEW: { icon: icons.shopping_cart, title: 'TRANSACTION_HISTORY.MUSANED' },
  ACTIVE_THEME: { icon: icons.shopping_cart, title: '' },
  AGE_YEARS_REGISTER_LIMIT: { icon: icons.shopping_cart, title: '' },
  ONECARD_IS_ACTIVE: { icon: icons.shopping_cart, title: '' },
  AGE_YEARS_MINOR_ACCOUNT_LIMIT: { icon: icons.shopping_cart, title: '' },
};

const useGetAppConfigurations = ({ modules }: { modules: ModulesNameEnum[] }) => {
  const dispatch = useTypedDispatch();
  const { res, isLoading, error } = useCustomQuery({
    queryKey: [APP_CONFIGURATIONS_QUERY_KEYS.GET_APP_CONFIGURATIONS],
    queryFn: () => appConfigurations(),
  });

  const memoizedData: { [key: string]: DisabledModulesInterface } = useMemo(
    () =>
      (res as AppConfigurationsMockProps)?.response?.parameters?.reduce(
        (acc, curr: AppConfigurationsMockResponseDetails) => {
          if (modules?.some((val) => val === curr?.name)) {
            return {
              ...acc,
              [curr?.name]: {
                isEnabled: curr?.value === 'Y',
                title: mapper?.[curr?.name]?.title || '',
                icon: mapper?.[curr?.name]?.icon,
              },
            };
          }
          return acc;
        },
        {},
      ),
    [res, modules],
  );

  const triggerDisabledSheet = useCallback(
    (relatedModule: ModulesNameEnum) => {
      if (!memoizedData?.[relatedModule]?.isEnabled && !!memoizedData?.[relatedModule]?.title) {
        dispatch(showDisabledModules(memoizedData?.[relatedModule]));
      }
    },
    [dispatch, memoizedData],
  );

  return {
    configData: memoizedData,
    isLoadingConfig: isLoading,
    errorConfig: error,
    triggerDisabledSheet,
  };
};

export default useGetAppConfigurations;
