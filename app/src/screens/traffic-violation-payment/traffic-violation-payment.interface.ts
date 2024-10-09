import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import { ViolationDetails } from '../traffic-voilation/traffic-voilation-case/traffic-voilation-case.interface';

export interface TrafficViolationProps {
  variant?: string;
  payOnly?: boolean;
  violationDetails: ViolationDetails;
  isViolationID?: boolean;
  dynamicFields: DynamicField[];
}
