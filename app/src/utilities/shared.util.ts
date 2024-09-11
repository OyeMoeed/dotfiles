import { Linking, Platform } from 'react-native';
import { openSettings } from 'react-native-permissions';
import { isAndroidOS } from './constants';

// Utility function to mask the first six characters of a string
const hideContactNumber = (input: string): string => `${'XXXXXX'}${input?.slice(6)}`;

const onGoToSetting = () => {
  if (isAndroidOS) {
    openSettings();
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
