import { IPayHeader } from '@app/components/molecules'
import { IPayBottomSheet } from '@app/components/organism'
import IPayAmount from '@app/components/organism/ipay-amount-component/ipay-amount-component'
import { IPayCvvBottomSheet, IPaySafeAreaView } from '@app/components/templates'
import IPayExpBottomSheet from '@app/components/templates/ipay-cvv-bottomsheet/ipay-exp-bottomsheet.component'
import useLocalization from '@app/localization/hooks/localization.hook'
import screenNames from '@app/navigation/screen-names.navigation'
import { useRoute } from '@react-navigation/native'
import React from 'react'

const TopUp = () => {
  const route = useRoute();
  const { variant } = route.params;
  const localizationText = useLocalization()
  const expirationRef = React.createRef<any>()
  const cvvRef = React.createRef<any>()
  const closeExpirationBottomSheet = () => {
    expirationRef.current.close()
  }
  const openExpirationBottomSheet = () => {
    expirationRef.current.present()
  }
  const closeCvvBottomSheet = () => {
    cvvRef.current.close()
  }
  const openCvvBottomSheet = () => {
    cvvRef.current.present()
  }

  const buttons = [
    { value: 50, text: '50' },
    { value: 100, text: '100' },
    { value: 1000, text: '1000' },
  ];

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={screenNames.TOP_UP} applyFlex />
      <IPayAmount variant={variant} buttons={buttons} expiryOnPress={openExpirationBottomSheet} cvvPress={openCvvBottomSheet} />
      <IPayBottomSheet
        heading={localizationText.date}
        onCloseBottomSheet={closeExpirationBottomSheet}
        customSnapPoint={['10%', '40%']}
        enableDynamicSizing
        ref={expirationRef}
        simpleHeader
        simpleBar
        bold
        ipay>
        <IPayExpBottomSheet />
      </IPayBottomSheet>

      <IPayBottomSheet
        heading={localizationText.date}
        onCloseBottomSheet={closeCvvBottomSheet}
        customSnapPoint={['10%', '40%']}
        enableDynamicSizing
        ref={cvvRef}
        simpleHeader
        simpleBar
        bold
      >
        <IPayCvvBottomSheet />
      </IPayBottomSheet>


    </IPaySafeAreaView>

  )
}

export default TopUp
