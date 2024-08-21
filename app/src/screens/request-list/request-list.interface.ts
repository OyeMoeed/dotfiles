import { StatusType } from "@app/components/molecules/ipay-request-card/ipay-request-card.interface";

export interface Request {
    isPending: boolean;
    status?: StatusType;
    description: string;
    dateTime: string;
  }
  