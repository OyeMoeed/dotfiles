/**
 * Object containing translations for different languages.
 */

export const translations: Record<string, { translation: Record<string, string> }> = {
  en: {
    translation: {
      welcome: 'Welcome!',
      redirect_to_profile: 'Click here to go to profile Page:',
      this_is_profile_screen: 'This is Profile Screen',
      this_is: 'this is',
      profile: 'PROFILE',
      screen: 'screen',
      by_handi_tv: 'by Handi.dev',
      home: 'Home',
    }
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
    }
  }
};

export const appText = translations;
