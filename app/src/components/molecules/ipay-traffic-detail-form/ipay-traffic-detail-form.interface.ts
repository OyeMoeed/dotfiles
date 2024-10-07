import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import { TrafficFormValues } from '@app/screens/traffic-voilation/traffic-voilation-case/traffic-voilation-case.interface';
import React from 'react';
import { FieldErrors } from 'react-hook-form';

export interface FormValues {
  companyName: string;
  serviceType: string;
  accountNumber: string;
}

export interface IPayTrafficDetailFormProps {
  /**
   * test id to test element
   * */
  testID?: string;
  /**
   * Boolean indicating if the company value is valid or present
   * */
  isServiceProviderValue?: boolean;
  /**
   * Boolean indicating if the service value is valid or present
   * */
  isServiceTypeValue?: boolean;
  /**
   * Function to handle service provider action
   * */
  onServiceProviderAction?: () => void;
  /**
   * Function to handle service type action
   * */
  onServiceTypeAction?: () => void;
  /**
   * Function to handle checkbox action
   * */
  onCheckboxAction?: () => void;
  /**
   * Function to handle beneficiary ID action
   * */
  onBeneficiaryIdAction?: () => void;
  clearVoilationNumber?: () => void;
  /**
   * Function to handle ID type action
   * */
  onIdTypeAction?: () => void;
  /**
   * Function to handle duration action
   * */
  onDurationAction?: () => void;
  /**
   * left image for animated text input.
   */
  companyLeftImage?: React.ReactElement<any> | undefined;
  /**
   * name of service provider input to use
   */
  serviceProvider?: string;
  /**
   * name of service type input to use
   */
  serviceType?: string;
  /**
   * my ID check to use
   */
  myIdCheck?: boolean;
  /**
   * name of beneficiary ID input to use
   */
  beneficiaryId?: string;
  /**
   * name of ID type input to use
   */
  idType?: string;
  /**
   * name of Duration to use
   */
  duration?: string;
  /**
   * name of my id to use
   */
  myId?: string;

  control?: any;
  onChangeText?: (text: string) => void;
  errorMessage?: string;
  formSelectedTab: string;
  handleFormTabSelect: (text: string) => void;
  fields: DynamicField[];
  errors: FieldErrors<TrafficFormValues>;
  myIdValue?: string;
}
