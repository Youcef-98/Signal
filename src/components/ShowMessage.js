import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {blackText, blueColor, graybg, whiteText} from '../../assets/colors';

const ShowMessage = props => {
  const isSender = auth().currentUser.email !== props.message.email;
  return (
    <View style={{flex: 1}}>
      <View
        key={props.id}
        style={[
          isSender ? styles.containerSender : styles.containerReceiver,
          {
            maxWidth: '60%',
            margin: 10,
            padding: 16,
            borderRadius: 20,
          },
        ]}>
        <Text
          style={
            isSender ? styles.messageTextSender : styles.messageTextReceiver
          }>
          {props.message.message}
        </Text>
        <Image
          source={{uri: props.message.photoURL}}
          style={[
            isSender ? styles.avatarSender : styles.avatarReceiver,
            {
              height: 30,
              width: 30,
              borderRadius: 15,
              position: 'absolute',
              bottom: -15,
            },
          ]}
        />
        {!isSender && <Text style={{}}>{props.message.displayName}</Text>}
      </View>
    </View>
  );
};

export default ShowMessage;

const styles = StyleSheet.create({
  containerSender: {backgroundColor: graybg, alignSelf: 'flex-end'},
  containerReceiver: {backgroundColor: blueColor, alignSelf: 'flex-start'},
  avatarSender: {right: -5},
  avatarReceiver: {left: -5},
  messageTextSender: {color: blackText},
  messageTextReceiver: {color: whiteText},
});
