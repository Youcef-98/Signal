import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App: () => Node = () => {
  return <SafeAreaView style={styles.backgroundStyle}></SafeAreaView>;
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'red',
  },
});

export default App;
