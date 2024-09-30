import { IPaySafeAreaView } from '@app/components/templates';
import { IPayHeader } from '@app/components/molecules';

import musanedPaySalary from './musaned-pay-salary.style';

const MusanedPaySalaryScreen = () => {
  const styles = musanedPaySalary();
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader testID="musaned-user-details-header" backBtn title="MUSANED.HEADER" applyFlex />
    </IPaySafeAreaView>
  );
};

export default MusanedPaySalaryScreen;
