export interface Notification {
  messageId: string;
  messageHeader: string;
  messageBody: string;
  receivedDate: string;
  icon: any;
  read: boolean;
}

export interface ApiResponse {
  status: {
    type: string;
  };
}

export interface DeleteNotificationResponse {
  status: {
    type?: string;
  };
  response?: {
    message?: string;
  };
  error?: {
    message?: string;
  };
}

export interface ReadNotificationResponse {
  status: {
    type: string;
  };
  response?: {
    message: string;
  };
  error?: {
    message: string;
  };
}

export interface GetAllRetainedMessagesResponse {
  status: {
    type: string;
  };
  response?: {
    retainedMessages: Notification[];
  };
  error?: {
    message: string;
  };
}
