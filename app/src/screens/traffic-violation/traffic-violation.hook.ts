import { BillDetailsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getTrafficViolationData from '@app/network/services/core/traffic-violation/traffic-violation.service';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import { useEffect, useMemo, useState } from 'react';

const useTrafficViolation = () => {
  const [billsData, setBillsData] = useState<BillDetailsProps[]>();
  const [, setAPIError] = useState<string>('');
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
    deselectAllBills();
    navigate(ScreenNames.TRAFFIC_VOILATION_PAYMENT);
  };
  const handleInquire = () => {
    deselectAllBills();
    navigate(ScreenNames.TRAFFIC_VOILATION_CASES_SCREEN);
  };

  const localizationText = useLocalization();

  const getTrafficVoilationData = async () => {
    try {
      const apiResponse: any = await getTrafficViolationData();
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS: {
          const bills = apiResponse?.response?.trafficViolationList;
          setBillsData(bills.map((bill: BillDetailsProps) => ({ ...bill, selected: false })));
          break;
        }
        case apiResponse?.apiResponseNotOk:
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
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
    handleInquire,
  };
};

export default useTrafficViolation;
