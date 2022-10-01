import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import React, {useState, useRef} from 'react';
import logo from '../../assets/images/logo.png';

import {Button, Image, Icon, Input} from 'react-native-elements';
import {blueColor, whitebg} from '../../assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRef = useRef(null);

  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: whitebg,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={logo}
        style={{
          height: 200,
          width: 200,
          borderRadius: 10,
          marginBottom: 50,
        }}
      />
      <Input
        ref={emailRef}
        placeholder="Email"
        inputContainerStyle={styles.inputStyle}
        autoFocus
        keyboardType="email-address"
        value={email}
        errorMessage={emailError}
        onChangeText={text => {
          setEmailError('');
          setEmail(text);
        }}
        leftIcon={<Icon name="mail-outline" type="ionicon" size={25} />}
      />
      <Input
        placeholder="Password"
        value={password}
        inputContainerStyle={styles.inputStyle}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        leftIcon={
          <Icon name="lock-outline" type="material-community" size={25} />
        }
      />
      <Button
        title="Login"
        buttonStyle={styles.buttonStyle}
        onPress={() => {
          emailRef.current.shake();
          setEmailError('hehehe');
        }}
      />
      <Button
        title="Register"
        buttonStyle={styles.buttonStyle}
        type="outline"
        onPress={() => {
          navigation.navigate('RegisterScreen');
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonStyle: {width: 200, marginBottom: 10},
  inputStyle: {width: 300, alignSelf: 'center'},
});
