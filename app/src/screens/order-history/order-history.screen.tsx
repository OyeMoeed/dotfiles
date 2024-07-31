import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayNoResult, IPayOrdersCard } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import colors from '@app/styles/colors.const';
import React from 'react';
import allOrdersStyle from './all-orders.style';

const AllOrdersScreen: React.FC = () => {
  const { allOrders } = useConstantData();
  const styles = allOrdersStyle();
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        title={localizationText.SHOP.TITLE}
        applyFlex
        rightComponent={
          <IPayPressable>
            <IPayIcon icon={icons.filter} size={20} color={colors.primary.primary500} />
          </IPayPressable>
        }
      />
      <IPayView style={styles.container}>
        {allOrders && allOrders.length > 0 ? (
          <IPayOrdersCard data={allOrders} />
        ) : (
          <IPayNoResult showEmptyBox message={localizationText.SHOP.NO_ORDER} />
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default AllOrdersScreen;
