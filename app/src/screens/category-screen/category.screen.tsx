import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayChip, IPayDescriptiveCard, IPayHeader, IPayList, IPayTextInput } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import CardDetails from '@app/enums/card-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { PayloadMerchantsCategoryProps } from '@app/network/services/market/get-products-by-category-id/get-products-by-category-id.interface';
import getProductsByCategoryId from '@app/network/services/market/get-products-by-category-id/get-products-by-category-id.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType, LanguageCode, States } from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DataItem from './category-screen.interface';
import CategoryStyles from './category-screen.styles';

const CategoryScreen: React.FC = ({ route }) => {
  const { category } = route.params;
  const { playStationPrices, sortingData } = useConstantData();
  const { colors } = useTheme();
  const styles = CategoryStyles(colors);
  const localizationText = useLocalization();
  const sortRef = useRef<IPayBottomSheet>(null);

  const [search, setSearch] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // State for selected option
  const [categoryProductsData, setCategoryProductsData] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { selectedLanguage } = useTypedSelector((state) => state.languageReducer);
  const { showToast } = useToastContext();

  const renderToast = (apiError?: string) => {
    showToast({
      title: localizationText.ERROR.API_ERROR_RESPONSE,
      subTitle: apiError,
      borderColor: colors.error.error25,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const openRef = () => {
    if (sortRef.current) {
      sortRef.current.present();
    }
  };

  const getProducts = async (categoryId: string) => {
    try {
      const payload: PayloadMerchantsCategoryProps = {
        categoryId,
      };

      const apiResponse: any = await getProductsByCategoryId(payload);
      if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
        setCategoryProductsData(apiResponse?.response?.merchants);
        setCategoryProducts(apiResponse?.response?.merchants);
      } else if (apiResponse?.apiResponseNotOk) {
        renderToast();
      } else {
        renderToast(apiResponse?.error);
      }
    } catch (error: any) {
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    if (category) getProducts(category?.code);
  }, []);

  const getHeadingText = useMemo(() => {
    switch (selectedLanguage) {
      case LanguageCode.AR:
        return category?.addtionalAttribute1;
      default:
        return category?.desc;
    }
  }, [category]);

  const handleSort = useCallback(
    (option: string) => {
      const sorted = [...playStationPrices].sort((a, b) =>
        option === localizationText.SHOP.HIGH_TO_LOW ? b.price - a.price : a.price - b.price,
      );
      setCategoryProducts(sorted);
      if (sortRef.current) {
        sortRef.current.close();
      }
      setSelectedOption(option); // Update selected option state
    },
    [playStationPrices, localizationText.SHOP.HIGH_TO_LOW],
  );

  const renderItem = ({ item }: { item: DataItem }) => {
    const { id, text } = item;

    return (
      <IPayView key={id} style={styles.input}>
        <IPayList
          title={text}
          isShowIcon={selectedOption === text} // Show icon if selected
          icon={selectedOption === text ? <IPayIcon icon={icons.tick_check_mark_default} /> : null}
          onPress={() => handleSort(text)}
        />
      </IPayView>
    );
  };

  const renderChip = () => {
    if (selectedOption) {
      return (
        <IPayView style={styles.chipContainer}>
          <IPayChip
            containerStyle={styles.chip}
            variant={States.SEVERE}
            icon={<IPayIcon icon={icons.CLOSE_SQUARE} color={colors.secondary.secondary500} size={16} />}
            textValue={
              selectedOption === localizationText.SHOP.HIGH_TO_LOW
                ? localizationText.SHOP.HIGH_CHIP
                : localizationText.SHOP.LOW_CHIP
            }
          />
        </IPayView>
      );
    }
    return null;
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={getHeadingText} applyFlex />
      <IPayView style={styles.container}>
        <IPayView style={styles.searchRow}>
          <IPayTextInput
            text={search}
            onChangeText={setSearch}
            placeholder={localizationText.COMMON.SEARCH}
            rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
            simpleInput
            containerStyle={styles.background}
          />

          <IPayPressable onPress={openRef}>
            <IPayIcon
              icon={selectedOption === localizationText.SHOP.HIGH_TO_LOW ? icons.arrow_updown2 : icons.arrow_updown1}
            />
          </IPayPressable>
        </IPayView>
        {renderChip()}
        <IPayDescriptiveCard cardType={CardDetails.DESVRIPTIVE} data={categoryProducts} />
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '40%']}
        ref={sortRef}
      >
        <IPayFlatlist renderItem={renderItem} data={sortingData} />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default CategoryScreen;
