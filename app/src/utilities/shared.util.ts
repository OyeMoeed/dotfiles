import { Linking, Platform } from 'react-native';
import { isAndroidOS } from './constants';

// Utility function to mask the first six characters of a string
const hideContactNumber = (input: string): string => `${'XXXXXX'}${input?.slice(6)}`;

const onGoToSetting = async () => {
  if (isAndroidOS) {
    await Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
  } else {
    Linking.openURL('App-Prefs:Privacy&path=LOCATION');
  }
};

const shareOptions = (title: string, otherOptions: object) =>
  Platform.select({
    ios: {
      activityItemSources: [
        {
          linkMetadata: {
            title,
          },
        },
      ],
      ...otherOptions,
    },
    default: otherOptions,
  });

export { hideContactNumber, onGoToSetting, shareOptions };
