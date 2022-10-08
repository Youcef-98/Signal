import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Button, Icon} from 'react-native-elements';
import React, {useLayoutEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {blackText, whitebg} from '../../assets/colors';
import ChatItemComponent from '../components/ChatItemComponent';

const data = [
  {id: 1, chatName: 'Hello Youtube'},
  {id: 2, chatName: 'Hello Facebook'},
  {id: 3, chatName: 'Hello instagram'},
];

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
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 100,
            height: 40,
            paddingHorizontal: 10,
          }}>
          <Icon
            name="camera"
            type="entypo"
            size={25}
            color={blackText}
            onPress={() => {}}
          />
          <Icon
            name="pencil"
            type="octicon"
            size={25}
            color={blackText}
            onPress={() => {}}
          />
        </View>
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
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => {
          return <ChatItemComponent data={item} />;
        }}
        key={item => item.id}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({button: {height: 50}});
