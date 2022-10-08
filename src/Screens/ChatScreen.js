import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Icon, Image} from 'react-native-elements';
import {whiteText} from '../../assets/colors';

const ChatScreen = ({navigation, route}) => {
  const imageDimension = 40;

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
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
