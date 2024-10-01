import { IPayView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import IPayLaborerDetailsBanner from '@app/components/organism/ipay-laborer-details-banner/ipay-laborer-details-banner.component';
import { IPaySafeAreaView } from '@app/components/templates';
import musanedUserDetailsStyles from './musaned-user-details.style';

const MusanedUserDetails = () => {
  const styles = musanedUserDetailsStyles();
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader testID="musaned-user-details-header" backBtn title="MUSANED.LABORER_DETAILS" applyFlex />

      <IPayView style={styles.contentContainer}>
        <IPayLaborerDetailsBanner
          titleText="MUSANED.LABORER_DETAILS"
          amount={1000}
          testID="musaned-user-details-laborer-details-banner"
          shouldTranslateTitle={false}
          details="MUSANED.LABORER_DETAILS"
          isDetailsBanner
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default MusanedUserDetails;
