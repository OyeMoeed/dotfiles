import { IPayView } from '@app/components/atoms';
import IPayQRCodeScannerComponent from './ipay-qrcode-scanner.component';
import { StyleSheet } from 'react-native';

export default {
  title: 'components/IPayQRCodeScannerComponent',
  component: IPayQRCodeScannerComponent,
};

const Template = () => (
  <IPayView style={styles.fill}>
    <IPayQRCodeScannerComponent onRead={(data) => {}} />
  </IPayView>
);

export const Default = Template.bind({});

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
