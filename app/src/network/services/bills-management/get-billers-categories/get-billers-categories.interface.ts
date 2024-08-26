import { MockAPIStatusProps } from '@network/services/services.interface';

export interface BillersCategoryType {
  id: string;
  name: string;
}

export interface GetBillersCategoriesResponseTypes {
  status: MockAPIStatusProps;
  response: {
    categories: BillersCategoryType[];
  };
  successfulResponse: true;
}
