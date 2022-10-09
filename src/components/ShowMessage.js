import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ShowMessage = props => {
  return (
    <View key={props.id}>
      <Text style={{color: 'red'}}>{props.message.message}</Text>
    </View>
  );
};

export default ShowMessage;

const styles = StyleSheet.create({});
