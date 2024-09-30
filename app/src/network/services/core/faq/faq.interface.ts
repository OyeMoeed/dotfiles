interface Status {
  code: string;
  type: string;
  desc: string;
  sessionReference: string;
  requestReference: string;
}

interface Response {
  faqs: FAQ[];
}

interface ApiResponse {
  status: Status;
  response: Response;
  successfulResponse: boolean;
}
interface FAQ {
  order: number;
  question: string;
  answer: string[];
}

interface UseFaqPayload {
  hideError?: boolean;
  hideSpinner?: boolean;
}

interface UseFaqProps {
  payload?: UseFaqPayload;
  onSuccess?: ((data?: ApiResponse) => void) | undefined;
  onError?: (() => void) | undefined;
  refetchOnMount?: boolean;
}

export type { Status, Response, ApiResponse, FAQ, UseFaqPayload, UseFaqProps };
