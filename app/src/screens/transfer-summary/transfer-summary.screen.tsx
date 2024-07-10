import icons from "@app/assets/icons";
import { IPayView, IPayFlatlist, IPayFootnoteText, IPayIcon, IPayPressable, IPayImage } from "@app/components/atoms";
import { IPaySafeAreaView } from "@app/components/templates";
import useLocalization from "@app/localization/hooks/localization.hook";
import useTheme from "@app/styles/hooks/theme.hook";
import { scaleSize } from "@app/styles/mixins";
import TransferScreenStyle from "./transfer-summary.styles";
import { IPayButton, IPayChip, IPayHeader } from "@app/components/molecules";
import images from "@app/assets/images";

const TransferScreenSummary: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = TransferScreenStyle(colors);

  const alinmaDetails = [
    {
      id: '1', label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO, value: localizationText.TRANSFER_SUMMARY.ADAM_AHMAD, leftIcon: images.logoTab, isAlinma: true
    },
    { id: '2', label: localizationText.TRANSFER_SUMMARY.AMOUNT, value: localizationText.TRANSFER_SUMMARY.MONEY },
    { id: '3', label: localizationText.TRANSFER_SUMMARY.REASON, value: localizationText.TRANSFER_SUMMARY.REASON_TRANSFER },
    { id: '4', label: localizationText.TRANSFER_SUMMARY.NOTE, value: localizationText.TRANSFER_SUMMARY.NOTE_DETAIL },
  ];

  const nonAlinmaDetails = [
    {
      id: '1', label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO, value: localizationText.TRANSFER_SUMMARY.ERSA_ALTURK, leftIcon: icons.user_square, color: colors.primary.primary900, isAlinma: false
    },
    { id: '2', label: localizationText.TRANSFER_SUMMARY.AMOUNT, value: localizationText.TRANSFER_SUMMARY.AMOUNT_2 },
    { id: '3', label: localizationText.TRANSFER_SUMMARY.REASON, value: localizationText.TRANSFER_SUMMARY.REASON_TRANSFER },
  ];

  const renderWalletPayItem = ({ item }) => (
    <IPayView style={styles.listContainer}>
      <IPayView style={styles.walletListBackground}>
        <IPayView style={styles.iconLabel}>
          {item.leftIcon && item.isAlinma ? (
            <IPayView style={styles.leftIcon}>
              <IPayImage image={item.leftIcon} style={styles.alinmaLogo} resizeMode="contain" />
            </IPayView>
          ) : item.leftIcon ? (
            <IPayPressable style={styles.appleIcon} onPress={item.onPress}>
              <IPayIcon icon={item.leftIcon} style={styles.appleIcon} color={item.color} size={scaleSize(18)} />
            </IPayPressable>
          ) : null}
          <IPayFootnoteText text={item.label} style={styles.label} />
        </IPayView>
        <IPayView style={styles.listDetails}>
          <IPayFootnoteText text={item.value} style={styles.detailsText} />
          {item.icon && (
            <IPayPressable style={styles.appleIcon} onPress={item.onPress}>
              <IPayIcon icon={item.icon} style={styles.appleIcon} color={item.color} size={scaleSize(18)} />
            </IPayPressable>
          )}
        </IPayView>
      </IPayView>
    </IPayView>
  );

  const renderNonAlinmaPayItem = ({ item, index }) => (
    <>
      {index === 0 && (<IPayView style={styles.chipContainer}>< IPayChip containerStyle={styles.chipColors} icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} size={18} />} textValue={localizationText.TRANSFER_SUMMARY.CHIP_TITLE} headingStyles={styles.chipColors} /></IPayView>)}
      {renderWalletPayItem({ item })}
    </>
  );

  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientPrimary50}>
      <IPayHeader backBtn title={localizationText.TRANSFER_SUMMARY.TITLE} applyFlex />
      <IPayView style={styles.container}>
        <IPayView>
          <IPayView style={styles.walletBackground}>
            <IPayFlatlist
              style={styles.detailesFlex}
              scrollEnabled={false}
              data={alinmaDetails}
              renderItem={renderWalletPayItem}
            />
          </IPayView>
          <IPayView style={styles.walletBackground}>
            <IPayFlatlist
              style={styles.detailesFlex}
              scrollEnabled={false}
              data={nonAlinmaDetails}
              renderItem={renderNonAlinmaPayItem}
            />
          </IPayView>
        </IPayView>
        <IPayView>
          <IPayButton btnType="primary" btnIconsDisabled btnText={localizationText.COMMON.CONFIRM} btnColor={colors.primary.primary500} medium />
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default TransferScreenSummary;


