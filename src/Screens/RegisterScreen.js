import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Text, Icon, Input, Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const nameRef = useRef();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const passwordRef = useRef();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text h3 style={{marginBottom: 50}}>
        Create new account
      </Text>
      <Input
        ref={nameRef}
        placeholder="Full Name"
        inputContainerStyle={styles.inputStyle}
        autoFocus
        value={name}
        errorMessage={nameError}
        onChangeText={text => {
          setNameError('');
          setName(text);
        }}
        leftIcon={<Icon name="user" type="antdesign" size={25} />}
      />
      <Input
        ref={emailRef}
        placeholder="Email"
        inputContainerStyle={styles.inputStyle}
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
        ref={passwordRef}
        placeholder="Password"
        inputContainerStyle={styles.inputStyle}
        secureTextEntry
        value={password}
        errorMessage={passwordError}
        onChangeText={text => {
          setPasswordError('');
          setPassword(text);
        }}
        leftIcon={
          <Icon name="lock-outline" type="material-community" size={25} />
        }
      />
      <Button
        title="Sign up"
        buttonStyle={styles.buttonStyle}
        type="outline"
        onPress={() => {
          navigation.navigate('RegisterScreen');
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  inputStyle: {width: 300, alignSelf: 'center'},
  buttonStyle: {width: 200, marginBottom: 20},
});
