import { IPayIcon } from '@app/components/atoms';

const getBankIconByCode = (code: string, size?: number) => <IPayIcon icon={code} size={size || 30} />;

export default getBankIconByCode;
