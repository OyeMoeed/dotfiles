// Import necessary interfaces
import { MockAPIDataProps, MockAPIOkProp } from 'network/services/services.interface';

// Define the AppConfigurationsMockResponseDetails interface
interface AppConfigurationsMockResponseDetails {
  name: string;
  description: string;
  type: string;
  category: string;
  value: string | number; // value can be either string or number
}

// Define the AppConfigurationsMockDataProps interface that extends MockAPIDataProps with specific response details
interface AppConfigurationsMockDataProps extends MockAPIDataProps {
  response: {
    parameters: AppConfigurationsMockResponseDetails[];
  };
}

// Extend the AppConfigurationsMockProps interface from AppConfigurationsMockDataProps and MockAPIOkProp
export interface AppConfigurationsMockProps extends MockAPIOkProp {
  data: AppConfigurationsMockDataProps;
}
