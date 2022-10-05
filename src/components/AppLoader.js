import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {blueColor} from '../../assets/colors';

function AppLoader() {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <ActivityIndicator size="100%" color={blueColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1,
  },
});

export default AppLoader;
