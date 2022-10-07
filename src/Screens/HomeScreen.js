import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      });
  };
  return (
    <View style={{flex: 1}}>
      <Text>HomeScreen</Text>
      <Button title="Sign up" buttonStyle={styles.button} onPress={signOut} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({button: {height: 50}});
