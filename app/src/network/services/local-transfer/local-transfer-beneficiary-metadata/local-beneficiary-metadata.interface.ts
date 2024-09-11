import { MockAPIStatusProps } from '../../services.interface';

export interface LocalBank {
  code: string;
  desc: string;
  addtionalAttribute1?: string;
  addtionalAttribute2?: string;
  addtionalAttribute3?: string;
  addtionalAttribute4?: string;
}

interface Response {
  localBanks: LocalBank[];
}

interface LocalBeneficiaryMetaMockProps {
  status: MockAPIStatusProps;
  response: Response; // Contains the list of local banks
  successfulResponse: boolean;
}
export default LocalBeneficiaryMetaMockProps;
