import {View, Text} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/Screens/LoginScreen';
import {blueColor, whiteText} from './assets/colors';

const RootApp = () => {
  const Stack = createNativeStackNavigator();
  const globalHeaderStyle = {
    headerTintColor: whiteText,
    headerStyle: {backgroundColor: blueColor},
    headerTitleAlign: 'center',
    headerTitleStyle: {color: whiteText},
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalHeaderStyle}>
        <Stack.Screen
          name="LoginScreen"
          options={{title: 'Login'}}
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootApp;
