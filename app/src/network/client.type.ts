interface clientError {
  status: { code: string; description: string };
  trackingInformation: {
    requestId: string;
    trackingId: string;
  };
  authenticationInfo: string;
}

export default clientError;
