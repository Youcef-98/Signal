import {View, Text} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {blueColor, whiteText} from './assets/colors';

import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import HomeScreen from './src/Screens/HomeScreen';
import AddChatScreen from './src/Screens/AddChatScreen';
import ChatScreen from './src/Screens/ChatScreen';

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
        <Stack.Screen
          name="RegisterScreen"
          options={{title: 'Register'}}
          component={RegisterScreen}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen
          name="AddChatScreen"
          options={{title: 'Add a new chat', headerBackTitle: 'Home'}}
          component={AddChatScreen}
        />

        <Stack.Screen
          name="ChatScreen"
          options={{headerBackTitle: 'Home'}}
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootApp;
