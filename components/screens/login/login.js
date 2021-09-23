import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Keyboard,
} from 'react-native';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import '@react-native-firebase/app';
import '@react-native-firebase/auth';
<<<<<<< HEAD
import {db, auth} from '../../../firebase/firebaseconfig';
import Spinner from 'react-native-loading-spinner-overlay';

const firebaseConfig = {
  apiKey: 'AIzaSyAwb_T1CUeLpkSMuZA_-WU1BQ1EaHQzcm8',
  authDomain: 'awhina-app.firebaseapp.com',
  projectId: 'awhina-app',
  storageBucket: 'awhina-app.appspot.com',
  messagingSenderId: '592015836706',
  appId: '1:592015836706:web:c1f2b1e1c05a3ed7bc6c7b',
  measurementId: 'G-64LH9LBBV3',
};

// firebase.initializeApp(firebaseConfig);
=======
import firestore from '@react-native-firebase/firestore';
>>>>>>> parent of f1b6e88 (UI update)

export default function Login({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  // activity spinner///////////////////////////////////
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  };
  // //////////////////////////////////////////////////

  // function createNewUser() {
  // 	firebase
  // 		.auth()
  // 		.createUserWithEmailAndPassword(email, password)
  // 		.then((userCredential) => {
  // 			//Logged In
  // 			var user = userCredential.user;
  // 		})
  // 		.catch((error) => {
  // 			//Not Logged In
  // 			var errorCode = error.code;
  // 			var errorMessage = error.message;
  // 			console.log(`${error.code}: ${error.message}`);
  // 		});
  // }

  function loginUser() {
    if (email && password) {
      auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Logged in
            goToHomeScreen();
            // setLoading(false); //set spinner to flase to stop loading
          })
          .catch((error) => {
            // Not Logged In
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginErrorMessage(errorMessage);
          });
    }
  }

  const goToRegisterScreen = () => {
    navigation.navigate('Register');
    console.log(firebase);
  };

  const goToHomeScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.login}>
      <View>
        <Spinner
          color='crimson'
          animation='fade'
          // set visibility of Spinner
          visible={loading}
          // text shown the Spinner
          textContent={'Fetching data...'} // shown on overlay
          // style of the Spinner text
          textStyle={styles.spinnerTextStyle}
        />

        <Text>Enter your Username or Email:</Text>
        <TextInput
          placeholder='Email'
          style={styles.textbox}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>Enter your password:</Text>
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          style={styles.textbox}
          onChangeText={(text) => setPassword(text)}
        />
        {loginErrorMessage !== '' ? null : (
					<Animatable.View animation='fadeInLeft' duration={500}>
					  <Text style={styles.errorText}>
					    {loginErrorMessage}
					  </Text>
					</Animatable.View>
				)}
        <Button
          style={styles.loginButton}
          title='Login'
          onPress={() => {
            Keyboard.dismiss();
            loginUser();
            startLoading(); // call spinner
          }}
        />
        <Text></Text>
        <Button
          style={styles.regisButton}
          title='Register'
          onPress={() => goToRegisterScreen()}
        />
      </View>
      <View></View>
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
    borderColor: 'crimson',
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
  spinnerTextStyle: {
    color: 'crimson',
  },
});
