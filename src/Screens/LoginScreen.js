import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import React, {useState, useRef} from 'react';
import logo from '../../assets/images/logo.png';

import {Button, Image, Icon, Input} from 'react-native-elements';
import {blueColor, whitebg} from '../../assets/colors';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRef = useRef(null);

  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: whitebg,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={logo}
        style={{height: 200, width: 200, borderRadius: 10}}
      />
      <Input
        ref={emailRef}
        placeholder="Email"
        autoFocus
        value={email}
        errorMessage={emailError}
        onChangeText={text => {
          setEmailError('');
          setEmail(text);
        }}
        leftIcon={<Icon name="email" type="material-community" />}
      />
      <Input
        placeholder="Password"
        value={password}
        style={styles.inputStyle}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        leftIcon={<Icon name="lock" type="material-community" />}
      />
      <Button
        title="Login"
        style={styles.buttonStyle}
        onPress={() => {
          emailRef.current.shake();
          setEmailError('hehehe');
        }}
      />
      <Button
        title="Register"
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: ['red', 'pink'],
          start: {x: 0, y: 0.5},
          end: {x: 1, y: 0.5},
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonStyle: {width: 300, marginTop: 10},
  inputStyle: {width: 200},
});
