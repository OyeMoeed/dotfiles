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
