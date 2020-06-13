import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './screen/MainPage';
import OTPPage from './screen/OTPPage';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='MainPage'>
      <Stack.Screen
        name='MainPage'
        component={MainPage}
        options={{ header: () => null }}
      />
      <Stack.Screen name='OTPPage' component={OTPPage} />
    </Stack.Navigator>
  );
}