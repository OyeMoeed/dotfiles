import { BillDetailsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { TRAFFIC_VIOLATIONS } from '@app/constants/constants';
import { useMemo, useState } from 'react';

const useTrafficViolation = () => {
  const [billsData, setBillsData] = useState<BillDetailsProps[]>(TRAFFIC_VIOLATIONS);

  const selectedBillsAmount = useMemo(() => {
    return billsData
      .filter(({ selected }) => selected)
      .reduce((total, { billAmount }) => total + (billAmount ? parseFloat(billAmount) : 0), 0);
  }, [billsData]);

  const selectedBillsCount = useMemo(() => billsData.filter(({ selected }) => selected).length, [billsData]);

  const onSelectBill = (billId: string | number) => {
    setBillsData((prevBillsData) =>
      prevBillsData.map((bill) => (bill.id === billId ? { ...bill, selected: !bill.selected } : bill)),
    );
  };

  const selectAllBills = () => {
    setBillsData((prevBillsData) => prevBillsData.map((bill) => ({ ...bill, selected: true })));
  };

  const deselectAllBills = () => {
    setBillsData((prevBillsData) => prevBillsData.map((bill) => ({ ...bill, selected: false })));
  };

  return {
    billsData,
    selectedBillsCount,
    selectedBillsAmount,
    onSelectBill,
    selectAllBills,
    deselectAllBills,
  };
};

export default useTrafficViolation;
