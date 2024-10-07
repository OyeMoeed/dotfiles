import { BillDetailsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { VOILATOR_ID } from '@app/constants/constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getTrafficViolationData from '@app/network/services/core/traffic-violation/traffic-violation.service';
import { useEffect, useMemo, useState } from 'react';

const useTrafficViolation = () => {
  const [billsData, setBillsData] = useState<BillDetailsProps[]>();
  const [voilatorID] = useState<string>(VOILATOR_ID);
  const selectedBillsAmount = useMemo(
    () =>
      (billsData ?? [])
        .filter(({ selected }) => selected)
        .reduce((total, { amount }) => total + (amount ? parseFloat(amount) : 0), 0),
    [billsData],
  );

  const selectedBillsCount = useMemo(() => billsData?.filter(({ selected }) => selected).length ?? 0, [billsData]);

  const onSelectBill = (billId: string | number) => {
    setBillsData((prevBillsData) =>
      prevBillsData?.map((bill) => (bill.violation_no === billId ? { ...bill, selected: !bill.selected } : bill)),
    );
  };

  const selectAllBills = () => {
    setBillsData((prevBillsData) => prevBillsData?.map((bill) => ({ ...bill, selected: true })));
  };

  const deselectAllBills = () => {
    setBillsData((prevBillsData) => prevBillsData?.map((bill) => ({ ...bill, selected: false })));
  };

  const handlePayButton = () => {
    navigate(ScreenNames.TRAFFIC_VOILATION_PAYMENT, { variant: true });
  };

  const getTrafficVoilationData = async () => {
    const apiResponse: any = await getTrafficViolationData();
    const bills = apiResponse?.response?.trafficViolationList;
    setBillsData(bills.map((bill: BillDetailsProps) => ({ ...bill, selected: false })));
  };
  useEffect(() => {
    getTrafficVoilationData();
  }, []);
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
