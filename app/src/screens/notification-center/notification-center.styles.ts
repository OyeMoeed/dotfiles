import { moderateScale } from 'react-native-size-matters';
import { Colors } from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const getNotificationCenterStyles  = (colors: Colors) => createStyleSheet({
  safeArea: {
    flex: 1,
  },
  bannerContainer: {
    paddingHorizontal: moderateScale(30),
    marginVertical: moderateScale(24),
  },
  mainContainer: {
    backgroundColor: colors.natural.natural0,
    flex: 1,
    borderTopLeftRadius: moderateScale(48),
    borderTopRightRadius: moderateScale(48),
    paddingTop: moderateScale(30),
  },
  headerContainer: {
    paddingHorizontal: moderateScale(30),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: moderateScale(13),
    marginRight: moderateScale(8),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
  },
  dotView: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: colors.warning.warning500,
    marginRight: moderateScale(4),
    borderWidth:1,borderColor:'red'
  },
  noRequestContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(10),

  },
  emptyBox: {
    marginBottom: moderateScale(8),
    borderWidth:1,borderColor:'red'
  },
  noRequestText: {
    fontSize: moderateScale(12),
    marginBottom: moderateScale(4),
    marginTop: moderateScale(8),
   
  },
  noPendingRequestText: {
    fontSize: moderateScale(11),
    marginBottom: moderateScale(8),
  },
  notificationListContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(24),
    marginBottom: moderateScale(30),
  },
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unSelectedTabStyle:{
    backgroundColor:colors.primary.primary10
  }
});

export default getNotificationCenterStyles;
