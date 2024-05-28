/**
 * Object containing translations for different languages.
 */

export const translations: Record<string, { translation: Record<string, string> }> = {
  en: {
    translation: {
      welcome: 'Welcome',
      redirect_to_profile: 'Click here to go to profile Page:',
      this_is_profile_screen: 'This is Profile Screen',
      this_is: 'this is',
      profile: 'PROFILE',
      screen: 'screen',
      by_handi_tv: 'by Handi.dev',
      home: 'Home',
      text: 'Text', // this is for testing purpose
      shortTittle: 'A Short Title Is Best',
      description: 'A message should be a short, complete sentence.',
      cancel: 'Cancel',
      action: 'Action',
      submit: 'Submit',
    },
  },
  ar: {
    translation: {
      welcome: 'مرحباً!',
      redirect_to_profile: 'اضغط هنا للانتقال إلى صفحة الملف الشخصي:',
      this_is_profile_screen: 'هذه هي شاشة الملف الشخصي',
      this_is: 'هذا هو',
      profile: 'حساب تعريفي',
      screen: 'شاشة',
      by_handi_tv: 'بواسطة Handi.dev',
      home: 'بيت',
      text: 'نص', // this is for testing purpose
      shortTitle: 'العنوان القصير هو الأفضل',
      description: 'يجب أن تكون الرسالة جملة قصيرة وكاملة.',
      cancel: 'إلغاء',
      action: 'تنفيذ',
      submit: 'Submit',
    },
  },
};

export const appText = translations;
