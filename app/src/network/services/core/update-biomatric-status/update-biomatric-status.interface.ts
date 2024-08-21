import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface UpdateBiomatricStatusProps {
  deviceInfo: DeviceInfoProps;
  bioRecognition: boolean;
}

// Define the UpdateBiomatricStatusMockResponse interface (empty object)
interface UpdateBiomatricStatusMockResponse {}

// Define the UpdateBiomatricStatusMockDataProps interface that extends MockAPIDataProps with specific response details
interface UpdateBiomatricStatusMockDataProps extends MockAPIDataProps {
  response: UpdateBiomatricStatusMockResponse;
}

// Extend the UpdateBiomatricStatusMockProps interface from UpdateBiomatricStatusMockDataProps and MockAPIOkProp
interface UpdateBiomatricStatusMockProps extends MockAPIOkProp {
  data: UpdateBiomatricStatusMockDataProps;
}

export { UpdateBiomatricStatusMockProps, UpdateBiomatricStatusProps };
