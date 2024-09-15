import { PaymentInfoProps } from '@app/network/services/bills-management/get-sadad-bills-by-status/get-sadad-bills-by-status.interface';
import { RouteProp } from '@react-navigation/native';

// Define your stack's parameter list type
type RootStackParamList = {
  SadadEditBillsScreen: {
    billData: PaymentInfoProps; // Replace 'any' with the actual type of billData
    setEditBillSuccessToast: (message: string) => void; // Replace this type if necessary
  };
  // Define other screens here
};

// Define the route prop type for SadadEditBillsScreen
type SadadEditBillsScreenRouteProp = RouteProp<RootStackParamList, 'SadadEditBillsScreen'>;

// Define props for the component
interface SadadEditBillsScreenProps {
  route: SadadEditBillsScreenRouteProp;
}

export { RootStackParamList, SadadEditBillsScreenProps, SadadEditBillsScreenRouteProp };
