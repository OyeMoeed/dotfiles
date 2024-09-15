import { IssueCardFeesRes } from '../issue-card-fees/issue-card-fees.interface';

export interface IssueCardInquireRes {
  transactionType: string;
  lastInactiveNumber: string;
  cardIndex?: string;
  cardManageStatus?: string;
  cardInfo: {};
}

export type CardType = 'IPMC' | 'VPPC' | 'VSCC';

export interface ICardIssuanceDetails {
  cardType: CardType;
  transactionType: string;
  fees: IssueCardFeesRes;
  cardIndex?: string;
  cardManageStatus?: string;
}
