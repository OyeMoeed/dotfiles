// Import necessary interfaces
import { MockAPIDataProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

interface WalletNumberProp {
  walletNumber: string;
}

//* ******************GetAllRetainedMessages****************************//

// Define the GetAllRetainedMessagesItem interface
interface GetAllRetainedMessagesItem {
  messageId: string;
  notificationMethod: string;
  messageHeader: string;
  messageBody: string;
  receivedDate: string;
  eventCode: string;
  read: boolean;
  deleted: boolean;
}

// Define the GetAllRetainedMessagesDetails interface that extends MockAPIDataProps with a specific response
interface GetAllRetainedMessagesDetails extends MockAPIDataProps {
  response: {
    retainedMessages: GetAllRetainedMessagesItem[]; // Define 'RetainedMessages' here
  };
  paginationInfo: {
    matchedRecords: string;
    sentRecords: string;
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the GetAllRetainedMessagesMockProps interface from GetAllRetainedMessagesDetails and MockAPIOkProp
interface GetAllRetainedMessagesMockProps extends MockAPIOkProp {
  response: GetAllRetainedMessagesDetails['response']; // Adjust to directly reference 'data' without nesting it again
  paginationInfo: GetAllRetainedMessagesDetails['paginationInfo']; // Include paginationInfo directly
  successfulResponse: GetAllRetainedMessagesDetails['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

//* ******************ReadSingleNotification****************************//

// Define the ReadSingleNotificationPayload interface
interface ReadSingleNotificationPayload {
  deviceInfo: {
    platformVersion: string;
    deviceId: string;
    deviceName: string;
    platform: string;
  };
  messageIds: string[];
}

// Define the ReadSingleNotificationResponse interface that extends MockAPIDataProps
interface ReadSingleNotificationResponse extends MockAPIDataProps {
  response: {};
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the ReadSingleNotificationMockProps interface from ReadSingleNotificationResponse and MockAPIOkProp
interface ReadSingleNotificationMockProps extends MockAPIOkProp {
  response: ReadSingleNotificationResponse['response']; // Adjust to directly reference 'data' without nesting it again
  successfulResponse: ReadSingleNotificationResponse['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

//* ******************DeleteSingleNotification****************************//

// Define the DeleteSingleNotificationResponse interface that extends MockAPIDataProps
interface DeleteSingleNotificationResponse extends MockAPIDataProps {
  response: {};
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the DeleteSingleNotificationMockProps interface from DeleteSingleNotificationResponse and MockAPIOkProp
interface DeleteSingleNotificationMockProps extends MockAPIOkProp {
  response: DeleteSingleNotificationResponse['response']; // Adjust to directly reference 'data' without nesting it again
  successfulResponse: DeleteSingleNotificationResponse['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

export {
  GetAllRetainedMessagesMockProps,
  WalletNumberProp,
  GetAllRetainedMessagesDetails,
  GetAllRetainedMessagesItem,
  ReadSingleNotificationPayload,
  ReadSingleNotificationResponse,
  ReadSingleNotificationMockProps,
  DeleteSingleNotificationResponse,
  DeleteSingleNotificationMockProps,
};
