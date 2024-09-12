import { OsTypes } from '@app/enums';
import { Platform } from 'react-native';
import RnSmsRetriever from 'rn-sms-retriever';

export default class SmsRetrieverService {
  static async getAppHash() {
    let hash;
    if (Platform.OS === OsTypes.ANDROID) {
      hash = await RnSmsRetriever?.getAppHash();
    } else {
      hash = '';
    }
    return hash;
  }
}
