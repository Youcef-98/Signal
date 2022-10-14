import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Button, Icon} from 'react-native-elements';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {blackText, whitebg} from '../../assets/colors';
import ChatItemComponent from '../components/ChatItemComponent';

import firestore from '@react-native-firebase/firestore';

const data = [
  {id: 1, chatName: 'Hello Youtube'},
  {id: 2, chatName: 'Hello Facebook'},
  {id: 3, chatName: 'Hello instagram'},
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .onSnapshot(snapshot =>
        setChats(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
    return () => unsubscribe();
  }, []);

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
          <Avatar
            rounded
            size={44}
            source={{uri: auth()?.currentUser?.photoURL}}
          />
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
            onPress={() => {
              console.log(chats);
            }}
          />
          <Icon
            name="pencil"
            type="octicon"
            size={25}
            color={blackText}
            onPress={() => {
              navigation.navigate('AddChatScreen');
            }}
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
        data={chats}
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
