import { IPayIcon } from '@app/components/atoms';

export const getBankIconByCode = (code: string, size?: number) => {
  return <IPayIcon icon={code} size={size || 30} />;
};
