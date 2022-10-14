import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {Icon, Image} from 'react-native-elements';
import {blueColor, graybg, whitebg, whiteText} from '../../assets/colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ShowMessage from '../components/ShowMessage';

const ChatScreen = ({navigation, route}) => {
  const imageDimension = 40;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'left',
      headerBackTitleVisible: false,
      headerBackVisible: false,
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri:
                messages[0]?.data.photoURL ||
                'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
            }}
            style={{
              height: imageDimension,
              width: imageDimension,
              borderRadius: imageDimension / 2,
              marginHorizontal: 10,
            }}
          />
          <Text style={{color: whiteText, fontWeight: '700', fontSize: 16}}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <Icon
          name="chevron-left"
          type="entypo"
          color={whiteText}
          size={30}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            width: 80,
            justifyContent: 'space-between',
            marginRight: 10,
          }}>
          <Icon
            name="md-videocam"
            type="ionicon"
            color={whiteText}
            size={25}
            onPress={() => console.log(route.params.id)}
          />
          <Icon
            name="ios-call-sharp"
            type="ionicon"
            color={whiteText}
            size={25}
            onPress={() => console.log(messages)}
          />
        </View>
      ),
    });
  }, [navigation, messages]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        );
      });
    return unsubscribe;
  }, []);

  const send = () => {
    if (message.length > 0) {
      // Keyboard.dismiss();
      firestore()
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add({
          timestamp: firestore.FieldValue.serverTimestamp(),
          message,
          displayName: auth().currentUser.displayName,
          email: auth().currentUser.email,
          photoURL: auth().currentUser.photoURL,
        })
        .then(response => console.log('message sent'))
        .catch(error => console.log('error =>', error));
      setMessage('');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: whitebg}}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        keyboardVerticalOffset={90}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={messages}
            inverted
            renderItem={({item}) => {
              return <ShowMessage id={item.id} message={item.data} />;
            }}
            key={item => item.id}
            contentContainerStyle={{paddingTop: 5}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
          }}>
          <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            placeholder="Signal Message"
            placeholderTextColor="grey"
            onSubmitEditing={send}
            style={styles.messageInput}
          />
          <Icon
            name="md-send"
            type="ionicon"
            color={blueColor}
            size={25}
            onPress={send}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  messageInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: graybg,
    paddingHorizontal: 20,
    fontSize: 15,
    color: 'grey',
    borderRadius: 30,
  },
});
