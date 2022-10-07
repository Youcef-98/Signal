import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Text, Icon, Input, Button} from 'react-native-elements';
import {lightGray, whitebg} from '../../assets/colors';

import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

const RegisterScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [photoUri, setPhotoUri] = useState(
    'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
  );

  const nameRef = useRef();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const passwordRef = useRef();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.user.updateProfile({
          displayName: name,
        });
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      console.log(response);
      if (response.didCancel != true) {
        setPhoto(response.assets[0]);
        setPhotoUri(response.assets[0].uri);
      }
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text h3 style={{marginBottom: 20}}>
        Create new account
      </Text>
      <View>
        <Image
          source={{
            uri: photoUri,
          }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 200 / 2,
            marginBottom: 20,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            handleChoosePhoto();
          }}
          style={{
            position: 'absolute',
            zIndex: 5,
            bottom: 20,
            right: 0,
          }}>
          <Icon name="edit" color={lightGray} type="material" size={40} />
        </TouchableOpacity>
      </View>
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
          register();
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whitebg,
  },
  inputStyle: {width: 300, alignSelf: 'center'},
  buttonStyle: {width: 200, marginBottom: 20},
});
