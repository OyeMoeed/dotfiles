import { BillsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { RouteProp } from '@react-navigation/core';

// Define your stack's type (replace 'RootStackParamList' with your stack's actual type)
type RootStackParamList = {
  SadadBillsScreen: {
    sadadBills: BillsProps[]; // Replace with your actual params
  };
};

// Define a type for the route prop
type SadadBillsScreenRouteProp = RouteProp<RootStackParamList, 'SadadBillsScreen'>;

// Define the props for the component
interface SadadBillsScreenProps {
  route: SadadBillsScreenRouteProp;
}

export { RootStackParamList, SadadBillsScreenProps, SadadBillsScreenRouteProp };
