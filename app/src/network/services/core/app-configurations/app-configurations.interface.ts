// Import necessary interfaces
import { MockAPIDataProps } from 'network/services/services.interface';

// Define the AppConfigurationsMockResponseDetails interface
export interface AppConfigurationsMockResponseDetails {
  name: string;
  description: string;
  type: string;
  category: string;
  value: string | number; // value can be either string or number
}

// Define the AppConfigurationsMockDataProps interface that extends MockAPIDataProps with specific response details
export interface AppConfigurationsMockProps extends MockAPIDataProps {
  response: {
    parameters: AppConfigurationsMockResponseDetails[];
  };
}
