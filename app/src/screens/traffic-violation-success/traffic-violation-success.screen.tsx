import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import useTrafficViolationSuccess from './traffic-violation-success.hook';
import trafficViolationSuccessStyles from './traffic-violation-success.style';

const TrafficViolationSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = trafficViolationSuccessStyles(colors);
  const localizationText = useLocalization();
  const { goToHome } = useTrafficViolationSuccess();
  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          headingText={localizationText.TRAFFIC_VIOLATION.VIOLATION_PAID_SUCCESS}
          descriptionText={localizationText.COMMON.SAR}
        />

        <IPayButton
          onPress={goToHome}
          large
          btnType={buttonVariants.PRIMARY}
          leftIcon={<IPayIcon icon={icons.HOME} color={colors.natural.natural0} />}
          btnText={localizationText.COMMON.HOME}
        />
      </IPayView>
    </IPayPageWrapper>
  );
};

export default TrafficViolationSuccessScreen;
