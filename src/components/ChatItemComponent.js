import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {blackText, lightGray, whitebg} from '../../assets/colors';

const ChatItemComponent = props => {
  const imageDimension = 60;
  return (
    <TouchableOpacity
      style={{backgroundColor: whitebg, marginBottom: 2, flexDirection: 'row'}}>
      <Image
        source={{
          uri: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
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
          {props.data.chatName}
        </Text>
        <Text style={{color: lightGray, fontSize: 13}}>hello</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItemComponent;

const styles = StyleSheet.create({});
