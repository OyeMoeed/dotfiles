import screenNames from '@app/navigation/screen-names.navigation';
import ConfirmPasscodeScreen from '@app/screens/auth/confirm-passcode/confirm-passcode.screen';
import PasscodeRecreatedSuccessfuly from '@app/screens/auth/forgot-passcode/passcode-recreated.screen';
import LoginViaPasscode from '@app/screens/auth/login-via-passcode/login-via-passcode.screen';
import UserOnBoarding from '@app/screens/auth/onboarding/user-onboarding.screen';
import RegistrationSuccessful from '@app/screens/auth/registration-successful/registration-successful.screen';
import MobileAndIqamaVerification from '@app/screens/auth/registration/mobile-and-iqama-verification.screen';
import SetPasscode from '@app/screens/auth/set-passcode/set-passcode.component';
import SplashScreen from '@app/screens/auth/splash-screen/splash';
import DelinkSuccess from '@app/screens/delink/delink-success';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';

const AuthStack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  animationEnabled: true, // Disable animation for all screens in this stack
};

const screenOption: StackNavigationOptions = {
  animationEnabled: false, // Disable animation for all screens in this stack
};

const AuthStackNavigator: React.FC = () => (
  <AuthStack.Navigator screenOptions={screenOptions}>
    <AuthStack.Screen name={screenNames.SPLASH} component={SplashScreen} />
    <AuthStack.Screen name={screenNames.ONBOARDING} options={screenOption} component={UserOnBoarding} />
    <AuthStack.Screen name={screenNames.MOBILE_IQAMA_VERIFICATION} component={MobileAndIqamaVerification} />
    <AuthStack.Screen name={screenNames.SET_PASSCODE} component={SetPasscode} />
    <AuthStack.Screen name={screenNames.CONFIRM_PASSCODE} component={ConfirmPasscodeScreen} />
    <AuthStack.Screen name={screenNames.REGISTRATION_SUCCESSFUL} component={RegistrationSuccessful} />
    <AuthStack.Screen name={screenNames.LOGIN_VIA_PASSCODE} component={LoginViaPasscode} />
    <AuthStack.Screen name={screenNames.PASSCODE_RECREATED} component={PasscodeRecreatedSuccessfuly} />
    <AuthStack.Screen name={screenNames.DELINK_SUCCESS} component={DelinkSuccess} />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
