import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Icon, Image} from 'react-native-elements';
import {blueColor, graybg, whitebg, whiteText} from '../../assets/colors';

const ChatScreen = ({navigation, route}) => {
  const imageDimension = 40;

  const [message, setMessage] = useState('');

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
              uri: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
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
            onPress={() => navigation.goBack()}
          />
          <Icon
            name="ios-call-sharp"
            type="ionicon"
            color={whiteText}
            size={25}
            onPress={() => navigation.goBack()}
          />
        </View>
      ),
    });
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: whitebg}}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
        style={{flex: 1}}>
        <ScrollView style={{flex: 1}}></ScrollView>
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
            style={styles.messageInput}
          />
          <Icon name="md-send" type="ionicon" color={blueColor} size={25} />
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
    borderColor: 'transparent',
    backgroundColor: graybg,
    borderWidth: 1,
    paddingHorizontal: 20,
    fontSize: 15,
    color: 'grey',
    borderRadius: 30,
  },
});
