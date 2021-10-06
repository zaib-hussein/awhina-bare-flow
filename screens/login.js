import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, StatusBar, Keyboard, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import firebase from 'firebase';
import '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {db, auth} from '../firebase/firebaseconfig';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Login({navigation}) {
  const firebaseConfig = {
    apiKey: 'AIzaSyAwb_T1CUeLpkSMuZA_-WU1BQ1EaHQzcm8',
    authDomain: 'awhina-app.firebaseapp.com',
    projectId: 'awhina-app',
    storageBucket: 'awhina-app.appspot.com',
    messagingSenderId: '592015836706',
    appId: '1:592015836706:web:c1f2b1e1c05a3ed7bc6c7b',
    measurementId: 'G-64LH9LBBV3',
  };

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
    // activity spinner///////////////////////////////////


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


  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const textInputChange = (val) => {
    if ( val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };


  return (

    <View style={styles.container}>
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
      <View style={styles.header}>
        <Text style ={styles.text_header}>Awhina User Login</Text>
      </View>

      <Animatable.View animation = "zoomInUp" style={styles.footer}>

        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20}
          />
          <TextInput
            placeholder = "Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onChangeText={(text) => setEmail(text)}

          />
          {data.check_textInputChange ?
                     <Animatable.View
                       animation = "bounceIn"
                     >
                       <Feather
                         name="check-circle"
                         color="green"
                         size={20}
                       />
                     </Animatable.View> :
                    null}
        </View>


        <Text style={[styles.text_footer, {
          marginTop: 35,
        }]}>Password</Text>

        <View style={styles.action}>
          <Feather
            name="lock"
            color="#05375a"
            size={20}
          />
          <TextInput
            placeholder = "Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity
            onPress={updateSecureTextEntry}
          >
            {data.secureTextEntry ?
                            <Feather
                              name="eye-off"
                              color="salmon"
                              size={20}
                            /> :
                            <Feather
                              name="eye"
                              color="crimson"
                              size={20}
                            />
            }

          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              loginUser();
              startLoading(); // call spinner
            }}
            style={[styles.signIn, {
              bordercolor: '#009387',
              borderWidth: 1,
              backgroundColor: 'crimson',
              marginTop: 20,
            }]}
          >
            <Text style={[styles.textSign, {
              color: 'white',

            }]}>Log In</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => goToRegisterScreen()}
            style={[styles.signIn, {
              bordercolor: '#009387',
              borderWidth: 1,
              backgroundColor: 'indianred',
              marginTop: 20,
            }]}
          >

            <Text style={[styles.textSign, {
              color: 'white',

            }]}>Register</Text>
          </TouchableOpacity>
        </View>

      </Animatable.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: '#009387'
    backgroundColor: 'crimson',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  spinnerTextStyle: {
    color: 'crimson',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
