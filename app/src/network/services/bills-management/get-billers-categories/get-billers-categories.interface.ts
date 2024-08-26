import { MockAPIStatusProps } from '@network/services/services.interface';

export interface BillersCategoryType {
  code: string;
  addtionalAttribute1: string;
  desc: string;
}

export interface GetBillersCategoriesResponseTypes {
  status: MockAPIStatusProps;
  response: {
    billerCategoryList: BillersCategoryType[];
  };
  successfulResponse: true;
}
