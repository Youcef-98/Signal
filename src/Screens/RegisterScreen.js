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

import storage from '@react-native-firebase/storage'; // 1

import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

const RegisterScreen = () => {
  const [profileUrl, setProfileUrl] = useState(
    'https://firebasestorage.googleapis.com/v0/b/signal-a1df7.appspot.com/o/default.png?alt=media&token=f33720d3-a833-4ba8-967f-3ce2160ec8b9',
  );
  const [photoName, setPhotoName] = useState(null);
  const [photoUri, setPhotoUri] = useState(profileUrl);

  const nameRef = useRef();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const passwordRef = useRef();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const register = async () => {
    console.log(profileUrl);
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async user => {
        user.user.updateProfile({
          displayName: name,
          photoURL: profileUrl,
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
        setPhotoName(response.assets[0].fileName);
        setPhotoUri(response.assets[0].uri);
        // if user upload an image
        let reference = storage().ref(response.assets[0].fileName);
        let task = reference.putFile(response.assets[0].uri);
        task
          .then(() => {
            const url = storage()
              .ref(response.assets[0].fileName)
              .getDownloadURL();
            url.then(response => setProfileUrl(response));
            console.log('updated');

            console.log('Image uploaded to the bucket!');
          })
          .catch(e => console.log('uploading image error => ', e));
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
        onPress={async () => {
          register();
          //uploadImageToStorage();
          // const url = await storage().ref('default.png').getDownloadURL();
          // console.log('url ==>', url);
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
