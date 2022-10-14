import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {blackText, lightGray, whitebg} from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const ChatItemComponent = props => {
  const navigation = useNavigation();
  const imageDimension = 50;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(props.data.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({
            data: doc.data(),
          })),
        );
      });
    return unsubscribe;
  }, []);

  return (
    <TouchableOpacity
      key={props.data.id}
      style={{
        backgroundColor: whitebg,
        marginBottom: 2,
        flexDirection: 'row',
        padding: 5,
      }}
      onPress={() =>
        navigation.navigate('ChatScreen', {
          id: props.data.id,
          chatName: props.data.data.chatName,
        })
      }>
      <Image
        source={{
          uri:
            messages[0]?.data?.photoURL ||
            'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        }}
        style={{
          height: imageDimension,
          width: imageDimension,
          borderRadius: imageDimension / 2,
          margin: 5,
        }}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: blackText, fontSize: 15, fontWeight: '800'}}>
          {props.data.data.chatName}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.chatMessage}>
            {messages[0]?.data?.displayName}
          </Text>
          {messages[0]?.data && <Text style={styles.chatMessage}>:</Text>}
          <Text style={styles.chatMessage}>{messages[0]?.data?.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItemComponent;

const styles = StyleSheet.create({
  chatMessage: {color: lightGray, fontSize: 13},
});
