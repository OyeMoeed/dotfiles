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

//* ******************ReadNotification****************************//

// Define the ReadNotificationPayload interface
interface ReadNotificationPayload {
  deviceInfo: {
    platformVersion: string;
    deviceId: string;
    deviceName: string;
    platform: string;
  };
  messageIds: string[];
}

// Define the ReadNotificationResponse interface that extends MockAPIDataProps
interface ReadNotificationResponse extends MockAPIDataProps {
  response: {};
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the ReadNotificationMockProps interface from ReadNotificationResponse and MockAPIOkProp
interface ReadNotificationMockProps extends MockAPIOkProp {
  response: ReadNotificationResponse['response']; // Adjust to directly reference 'data' without nesting it again
  successfulResponse: ReadNotificationResponse['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

//* ******************DeleteNotification****************************//

// Define the DeleteNotificationResponse interface that extends MockAPIDataProps
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
  ReadNotificationPayload,
  ReadNotificationResponse,
  ReadNotificationMockProps,
  DeleteSingleNotificationResponse,
  DeleteSingleNotificationMockProps,
};
