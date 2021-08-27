import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Keyboard,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import firebase from '../../../firebase/firebaseconfig';
import '@react-native-firebase/app';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const firestore = firebase.firestore();

  const loginUser = () => {
    if (email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Logged in
          const user = userCredential.user;
          goToHomeScreen();
        })
        .catch((error) => {
          // Not Logged In
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoginErrorMessage(errorMessage);
        });
    }
  };

  const goToRegisterScreen = () => {
    navigation.navigate('Register');
    console.log(firebase);
  };

  const goToHomeScreen = () => {
    navigation.navigate('Home');
  };

  // state={isLoading: false};
  // <ActivityIndicator size="large" color="black" animating={this.state.isLoading} />

  return (
    <View style={styles.login}>
      <View>
        <Text>Enter your Username or Email:</Text>
        <TextInput
          placeholder="Email"
          style={styles.textbox}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>Enter your password:</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.textbox}
          onChangeText={(text) => setPassword(text)}
        />

        {loginErrorMessage !== '' ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorText}>{loginErrorMessage}</Text>
          </Animatable.View>
        )}

        <Button
          style={styles.loginButton}
          title="Login"
          onPress={() => {
            Keyboard.dismiss();
            loginUser();
          }}
        />

        <Text></Text>

        <Button
          style={styles.regisButton}
          title="Register"
          onPress={() => goToRegisterScreen()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
  },
  textbox: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 15,
  },
  loginButton: {
    padding: 8,
    margin: 10,
  },
  regisButton: {
    paddingTop: 40,
    marginTop: 20,
    margin: 40,
  },
});
