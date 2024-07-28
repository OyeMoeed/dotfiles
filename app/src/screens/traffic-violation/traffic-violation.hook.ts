import { BillDetailsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { TRAFFIC_VIOLATIONS } from '@app/constants/constants';
import { useMemo, useState } from 'react';

const useTrafficViolation = () => {
  const [billsData, setBillsData] = useState<BillDetailsProps[]>(TRAFFIC_VIOLATIONS);

  const selectedBillsCount = useMemo(() => billsData.filter((bill) => bill.selected).length, [billsData]);

  const onSelectBill = (billId: string | number) => {
    const updatedBills = billsData.map((bill) => (bill.id === billId ? { ...bill, selected: !bill.selected } : bill));
    setBillsData(updatedBills);
  };

  const selectAllBills = () => {
    const updatedBills = billsData.map((bill) => ({ ...bill, selected: true }));
    setBillsData(updatedBills);
  };

  const deselectAllBills = () => {
    const updatedBills = billsData.map((bill) => ({ ...bill, selected: false }));
    setBillsData(updatedBills);
  };

  return {
    billsData,
    selectedBillsCount,
    onSelectBill,
    selectAllBills,
    deselectAllBills,
  };
};

export default useTrafficViolation;
