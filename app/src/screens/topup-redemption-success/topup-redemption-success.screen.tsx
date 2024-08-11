/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import IPayTopupRedemptionSuccess from '@app/components/organism/ipay-topup-redemption-successful/ipay-topup-redemption-successful.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useTheme from '@app/styles/hooks/theme.hook';
import { TopupStatus } from '@app/utilities/enums.util';
import { genratedStyles } from './topup-redemption-success.styles';

const TopUpRedemptionSuccess = ({ route }) => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  return (
    <IPaySafeAreaView styles={styles.container} linearGradientColors={colors.appGradient.gradientSecondary40}>
      <IPayTopupRedemptionSuccess params={route.params} variants={route.params.topupStatus} />
    </IPaySafeAreaView>
  );
};

export default TopUpRedemptionSuccess;