import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {whitebg} from '../../assets/colors';
import NewChatImage from '../../assets/images/newChat.png';
import {Input, Icon, Button, Image} from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const AddChatScreen = () => {
  const navigation = useNavigation();
  const newChatRef = useRef(null);

  const [chatName, setChatName] = useState('');
  const [chatNameError, setChatNameError] = useState('');

  const submit = async () => {
    await firestore()
      .collection('chats')
      .add({
        chatName: chatName,
      })
      .then(() => navigation.goBack())
      .catch(error => console.log('error in send to firestore ==>', error));
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: whitebg,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={NewChatImage}
        style={{
          width: 200,
          height: 200,
          borderRadius: 200 / 2,
          marginBottom: 20,
        }}
      />
      <Input
        ref={newChatRef}
        placeholder="Enter a chat name"
        inputContainerStyle={styles.inputStyle}
        autoFocus
        value={chatName}
        errorMessage={chatNameError}
        onChangeText={text => {
          setChatNameError('');
          setChatName(text);
        }}
        leftIcon={
          <Icon name="chatbubble-ellipses-outline" type="ionicon" size={25} />
        }
      />
      <Button
        title="Create new chat"
        buttonStyle={styles.buttonStyle}
        type="outline"
        onPress={async () => {
          submit();
        }}
      />
    </SafeAreaView>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  inputStyle: {width: '80%', alignSelf: 'center', maxWidth: 300},
  buttonStyle: {alignSelf: 'stretch'},
});
