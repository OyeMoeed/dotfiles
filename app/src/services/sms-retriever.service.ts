import { osTypes } from '@app/enums/os-types.enum';
import { Platform } from 'react-native';
import RnSmsRetriever from 'rn-sms-retriever';

export default class SmsRetrieverService {
  static async getAppHash() {
    let hash;
    if (Platform.OS === osTypes.ANDROID) {
      hash = await RnSmsRetriever?.getAppHash();
    } else {
      hash = '';
    }
    return hash;
  }
}
