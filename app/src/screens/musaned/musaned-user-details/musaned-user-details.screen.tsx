import { IPaySafeAreaView } from '@app/components/templates';
import { IPayHeader } from '@app/components/molecules';
import musanedUserDetailsStyles from './musaned-user-details.style';

const MusanedUserDetails = () => {
  const styles = musanedUserDetailsStyles();
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader testID="musaned-user-details-header" backBtn title="MUSANED.HEADER" applyFlex />
    </IPaySafeAreaView>
  );
};

export default MusanedUserDetails;
