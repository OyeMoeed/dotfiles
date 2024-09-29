import Pushwoosh from 'pushwoosh-react-native-plugin';
import { DeviceEventEmitter } from 'react-native';
import Config from 'react-native-config';

const usePushNotifications = () => {
  const { PW_APP_ID, PW_PROJECT_NUMBER } = Config;

  const registerPushNotification = () =>
    Pushwoosh.register(
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      async (_token) => {
        // storage.set(storageKeys.notificationStatus, token);
      },
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      (_error) => {
        // storage.remove(storageKeys.notificationStatus);
      },
    );

  const unregisterPushNotification = () => {
    Pushwoosh.unregister();
    // storage.remove(storageKeys.notificationStatus);
  };

  // this event is fired when user clicks on notification
  DeviceEventEmitter.addListener('pushOpened', (e) => {
    // shows a user tapped the notification. Implement user interaction, such as showing push details

    if (e?.userdata?.redirection) {
      // handleLinking(e.userdata.redirection);
    }
  });

  if (true) {
    Pushwoosh.init(
      {
        pw_appid: PW_APP_ID,
        project_number: PW_PROJECT_NUMBER,
      },
      () => {},
      () => {},
    );

    registerPushNotification();
  }
  return {
    registerPushNotification,
    unregisterPushNotification,
  };
};

export default usePushNotifications;
