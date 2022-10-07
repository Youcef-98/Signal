import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
import React, {useLayoutEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {blackText, whitebg} from '../../assets/colors';

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {backgroundColor: whitebg},
      headerTitleStyle: {color: blackText},
      headerTintColor: blackText,
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 5}}
          onPress={signOut}
          activeOpacity={0.5}>
          <Avatar rounded source={{uri: auth()?.currentUser?.photoURL}} />
        </TouchableOpacity>
      ),
    });
  }, []);
  console.log(auth.currentUser);
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
