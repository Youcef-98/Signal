import {View, Text} from 'react-native';
import React from 'react';
import RNBootSplash from 'react-native-bootsplash';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/Screens/LoginScreen';
import {blueColor, whiteText} from './assets/colors';
import RegisterScreen from './src/Screens/RegisterScreen';

const RootApp = () => {
  const Stack = createNativeStackNavigator();
  const globalHeaderStyle = {
    headerTintColor: whiteText,
    headerStyle: {backgroundColor: blueColor},
    headerTitleAlign: 'center',
    headerTitleStyle: {color: whiteText},
  };
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator screenOptions={globalHeaderStyle}>
        <Stack.Screen
          name="LoginScreen"
          options={{title: 'Login'}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="RegisterScreen"
          options={{title: 'Register'}}
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootApp;
