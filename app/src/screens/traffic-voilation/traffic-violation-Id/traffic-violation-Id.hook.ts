import { BillDetailsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { TRAFFIC_VIOLATIONS, VOILATOR_ID } from '@app/constants/constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useMemo, useState } from 'react';

const useTrafficViolation = () => {
  const [billsData, setBillsData] = useState<BillDetailsProps[]>(TRAFFIC_VIOLATIONS);
  const [voilatorID, setVoilatorID] = useState<string>(VOILATOR_ID);
  const selectedBillsAmount = useMemo(() => {
    return (billsData ?? [])
      .filter(({ selected }) => selected)
      .reduce((total, { billAmount }) => total + (billAmount ? parseFloat(billAmount) : 0), 0);
  }, [billsData]);

  const selectedBillsCount = useMemo(() => billsData?.filter(({ selected }) => selected).length ?? 0, [billsData]);

  const onSelectBill = (billId: string | number) => {
    setBillsData((prevBillsData) =>
      prevBillsData?.map((bill) => (bill.id === billId ? { ...bill, selected: !bill.selected } : bill)),
    );
  };

  const selectAllBills = () => {
    setBillsData((prevBillsData) => prevBillsData?.map((bill) => ({ ...bill, selected: true })));
  };

  const deselectAllBills = () => {
    setBillsData((prevBillsData) => prevBillsData?.map((bill) => ({ ...bill, selected: false })));
  };

  const handlePayButton = () => {
    navigate(ScreenNames.TRAFFIC_VOILATION_PAYMENT);
  };
  return {
    billsData,
    selectedBillsCount,
    selectedBillsAmount,
    onSelectBill,
    selectAllBills,
    deselectAllBills,
    handlePayButton,
    voilatorID,
  };
};

export default useTrafficViolation;
