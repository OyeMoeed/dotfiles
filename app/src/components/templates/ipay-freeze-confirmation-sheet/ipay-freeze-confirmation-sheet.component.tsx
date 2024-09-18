import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { useToastContext } from '@app/components/molecules';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { IPayActionSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import { CardStatusReq } from '@app/network/services/cards-management/card-status/card-status.interface';
import changeCardStatus from '@app/network/services/cards-management/card-status/card-status.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import { CardActiveStatus, CardStatusNumber, ToastTypes } from '@app/utilities';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { SheetVariants, ToastVariants } from '../ipay-card-details-section/ipay-card-details-section.interface';
import {
  IPayFreezeConfirmationSheetHandle,
  IPayFreezeConfirmationSheetProps,
} from './ipay-freeze-confirmation-sheet.interface';
import freezeConfirmationSheetStyles from './ipay-freeze-confirmation-sheet.styles';

const IPayFreezeConfirmationSheet = forwardRef<IPayFreezeConfirmationSheetHandle, IPayFreezeConfirmationSheetProps>(
  ({ currentCard, cards, setCards }, ref) => {
    const { showToast } = useToastContext();
    const localizationText = useLocalization();
    const styles = freezeConfirmationSheetStyles();

    const actionSheetRef = useRef<any>(null);
    const actionTypeRef = useRef(CardActiveStatus.FREEZE);

    useImperativeHandle(ref, () => ({
      show: () => {
        actionSheetRef.current?.show();
      },
      hide: () => {
        actionSheetRef.current?.hide();
      },
    }));

    const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

    const sheetVariant: SheetVariants = {
      freeze: {
        title: localizationText.CARDS.FREEZE_CARD,
        subtitle: localizationText.CARDS.CARD_FREEZE_INDICATION_MESSAGE,
        option: localizationText.CARDS.FREEZE,
        icon: icons.cardSlash1,
      },
      unfreeze: {
        title: localizationText.CARDS.UNFREEZE_CARD,
        subtitle: localizationText.CARDS.CARD_UNFREEZE_INDICATION_MESSAGE,
        option: localizationText.CARDS.UNFREEZE,
        icon: icons.card_tick11,
      },
    };

    useEffect(() => {
      if (currentCard?.frozen) {
        actionTypeRef.current = CardActiveStatus.UNFREEZE;
      } else {
        actionTypeRef.current = CardActiveStatus.FREEZE;
      }
    }, [currentCard]);

    const renderToast = (toastMsg: string, type: string) => {
      const toastVariant: ToastVariants = {
        freeze: {
          title: localizationText.CARDS.CARD_FREEZE_MESSAGE,
          toastType: ToastTypes.SUCCESS,
          icon: icons.snow_flake1,
        },
        unfreeze: {
          title: localizationText.CARDS.CARD_UNFREEZE_MESSAGE,
          toastType: ToastTypes.SUCCESS,
          icon: icons.snow_flake1,
        },
      };
      showToast({
        title: toastVariant[type as keyof ToastVariants].title,
        subTitle: toastMsg,
        containerStyle: styles.toast,
        isShowRightIcon: false,
        leftIcon: (
          <IPayIcon icon={toastVariant[type as keyof ToastVariants].icon} size={24} color={colors.natural.natural0} />
        ),
        toastType: toastVariant[type as keyof ToastVariants].toastType,
      });
    };

    const onFreezeCard = (type: string) => {
      // console.log('type', type);
      if (CardActiveStatus.FREEZE === type) {
        actionTypeRef.current = CardActiveStatus.UNFREEZE;
      } else {
        actionTypeRef.current = CardActiveStatus.FREEZE;
      }
    };

    const onFreeze = async (type: string) => {
      const cardStatusPayload: CardStatusReq = {
        status:
          type.toLowerCase() === CardActiveStatus.UNFREEZE
            ? CardStatusNumber.ActiveWithOnlinePurchase
            : CardStatusNumber.Freezed,
        cardIndex: currentCard?.cardIndex,
        deviceInfo: await getDeviceInfo(),
      };

      const apiResponse = await changeCardStatus(walletInfo.walletNumber, cardStatusPayload);
      if (apiResponse?.status?.type === 'SUCCESS') {
        actionSheetRef.current.hide();
        onFreezeCard(type.toLowerCase());
        const newCards = cards.map((card: CardInterface) => {
          if (card.cardIndex === currentCard?.cardIndex) {
            return { ...currentCard, frozen: apiResponse.response?.cardInfo.cardStatus === CardStatusNumber.Freezed };
          }
          return card;
        });

        setCards(newCards);

        actionTypeRef.current =
          apiResponse.response?.cardInfo.cardStatus === CardStatusNumber.Freezed
            ? CardActiveStatus.UNFREEZE
            : CardActiveStatus.FREEZE;
        setTimeout(() => {
          renderToast(`${currentCard?.cardHeaderText} - ${currentCard?.maskedCardNumber}`, type.toLowerCase());
        }, 500);
        return;
      }

      actionSheetRef.current.hide();
    };

    const hideActionSheet = () => {
      actionSheetRef.current.hide();
    };

    const handleFinalAction = useCallback((index: number, type: string) => {
      switch (index) {
        case 0:
          onFreeze(type);
          break;
        case 1:
          hideActionSheet();
          break;
        default:
          break;
      }
    }, []);

    return (
      <IPayActionSheet
        ref={actionSheetRef}
        bodyStyle={styles.actionSheetStyle}
        options={[sheetVariant[actionTypeRef.current as keyof SheetVariants].option, localizationText.COMMON.CANCEL]}
        cancelButtonIndex={1}
        onPress={(index) => handleFinalAction(index, sheetVariant[actionTypeRef.current as keyof SheetVariants].option)}
        showCancel
        testID="action-sheet"
        showIcon
        customImage={<IPayIcon size={48} icon={sheetVariant[actionTypeRef.current as keyof SheetVariants].icon} />}
        title={sheetVariant[actionTypeRef.current as keyof SheetVariants].title}
        message={sheetVariant[actionTypeRef.current as keyof SheetVariants].subtitle}
      />
    );
  },
);

export default IPayFreezeConfirmationSheet;
