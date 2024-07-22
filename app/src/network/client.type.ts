interface clientError {
  status: { code: string; description: string };
  trackingInformation: {
    requestId: string;
    trackingId: string;
  };
  authenticationInfo: string;
}

export type { clientError };
