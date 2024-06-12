import { IPayView } from '@app/components/atoms';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const AuthStack = createStackNavigator();

const Login = ({}) => {
  return <IPayView></IPayView>;
};

const AuthStackNavigator: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" options={{ headerShown: false }} component={Login} />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
