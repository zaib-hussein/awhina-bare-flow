//Imports
import React, {useState} from 'react';
import {
  // ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as Animatable from 'react-native-animatable';
/* Firebase Imports */
import '@react-native-firebase/app';
import '@react-native-firebase/auth';
import firebase from '../../../firebase/firebaseconfig';
import firestore from '@react-native-firebase/firestore';
/* Styles */
import {styles} from './register-styles';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function Register() {
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    dateofbirth: '',
    phone: 0,
    password: '',
    confirmPassword: '',
    check_textInputChange: false,
    isValidFirstName: true,
    isValidLastName: true,
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  });

  const [checkDate, setDate] = useState(false);

  function checkUserExistsInFirestore(inputEmail) {
    let userExists = false;
    let usersRef = firestore().collection('users');
    usersRef
      .where('email', '==', inputEmail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //doc.data is never undefined for query doc snapshots
          userExists = true;
        });
      })
      .catch((error) => {
        alert('Error getting documents: ' + error);
      });
    if (userExists) {
      createUserOnFirestore();
    } else {
      alert('Email used is already registered. Please use another.');
    }
  }

  function createUserOnFirestore() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        //Logged In
        let user = userCredential.user;
      })
      .catch((error) => {
        //Not Logged In
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(
          'There was an error registering your account to our system. Contact the support team awhina-support@gmail.com.'
        );
      });

    let usersRef = firestore().collection('users');
    usersRef.doc(`${data.firstName}`);
  }

  const attemptFirebaseSignUp = () => {
    checkUserExistsInFirestore(data.email);
  };

  //Check whether the username has more than equal to 4 characters long.
  //Also store the 'val' into the 'username' value
  const textFirstNameChange = (firstName) => {
    if (firstName.trim().length >= 4) {
      setData({
        ...data,
        firstName: firstName,
        check_textInputChange: true,
        isValidFirstName: true,
      });
    } else {
      setData({
        ...data,
        firstName: firstName,
        check_textInputChange: false,
        isValidFirstName: false,
      });
    }
  };

  //Check if the 'username' is null. If the 'username' is null, then it will display an error.
  const handleValidFirstName = (firstName) => {
    if (firstName.trim().length >= 4) {
      setData({
        ...data,
        isValidFirstName: true,
      });
    } else {
      setData({
        ...data,
        isValidFirstName: false,
      });
    }
  };

  const textLastNamechange = (lastName) => {
    if (lastName.trim().length >= 4) {
      setData({
        ...data,
        lastName: lastName,
        check_textInputChange: true,
        isValidLastName: true,
      });
    } else {
      setData({
        ...data,
        check_textInputChange: false,
        isValidLastName: false,
      });
    }
  };

  const handleValidLastName = (lastName) => {
    if (lastName.trim().length >= 4) {
      setData({
        ...data,
        isValidLastName: true,
      });
    } else {
      setData({
        ...data,
        isValidLastName: false,
      });
    }
  };

  const textEmailChange = (email) => {
    if (email.trim().length > 0) {
      setData({
        ...data,
        email: email,
        check_textInputChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        check_textInputChange: false,
        isValidEmail: false,
      });
    }
  };

  const handleValidEmail = (email) => {
    if (email.trim().length > 0) {
      setData({
        ...data,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        isValidEmail: false,
      });
    }
  };

  const textPhoneChange = (phone) => {
    if (phone > 0) {
      setData({
        ...data,
        phone: phone,
        check_textInputChange: true,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        check_textInputChange: false,
        isValidPhone: false,
      });
    }
  };

  const handleValidPhone = (phone) => {
    if (phone > 0) {
      setData({
        ...data,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        isValidPhone: false,
      });
    }
  };

  //Check whether the 'password' has more than equal to 8 characters long.
  //Also store the 'val1' into the 'password' value
  const textPasswordChange = (password) => {
    if (password.trim().length >= 8) {
      setData({
        ...data,
        password: password,
        check_textInputChange: true,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        check_textInputChange: false,
        isValidPassword: false,
      });
    }
  };

  //Check if the 'password' is null. If the 'password' is null, then it will display an error.
  const handleValidPassword = (password) => {
    if (password.trim().length >= 8) {
      setData({
        ...data,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
  };

  //Check whether the 'confirmPassword' is equal to 'password'.
  //Also store the 'val2' into the 'confirmPassword' value
  const textPasswordConfirmChange = (confirmPassword) => {
    if (confirmPassword === data.password) {
      setData({
        ...data,
        confirmPassword: confirmPassword,
        check_textInputChange: true,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        check_textInputChange: false,
        isValidConfirmPassword: false,
      });
    }
  };

  //Check if the 'confirmPassword' is null. If the 'confirmPassword' is null, then it will display an error.
  const handleValidConfirmPassword = (confirmPassword) => {
    if (confirmPassword === data.password) {
      setData({
        ...data,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidConfirmPassword: false,
      });
    }
  };

  //confirm button  when the calender is open
  const showDatePicker = () => {
    setDate(true);
  };

  //Cancel button when the calender is open
  const hideDatePicker = () => {
    setDate(false);
  };

  //Show the date of the user chosen
  const handleConfirm = (date) => {
    setData({
      ...data,
      dateofbirth: date,
    });
    hideDatePicker();
  };

  return (
    <View style={styles.login}>
      <View>
        <Text>Enter your First Name:</Text>
        <TextInput
          placeholder="First Name"
          style={styles.textbox}
          onChangeText={(firstName) => textFirstNameChange(firstName)}
          onEndEditing={(e) => handleValidFirstName(e.nativeEvent.text)}
        />
      </View>

      {data.isValidFirstName ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorText}>
            Your first name must be 4 characters long!
          </Text>
        </Animatable.View>
      )}

      <View>
        <Text>Enter your Last Name</Text>
        <TextInput
          placeholder="Last Name"
          style={styles.textbox}
          onChangeText={(lastName) => textLastNamechange(lastName)}
          onEndEditing={(e) => handleValidLastName(e.nativeEvent.text)}
        />
      </View>

      {data.isValidLastName ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorText}>
            Your last name must be 4 characters long!
          </Text>
        </Animatable.View>
      )}

      <View>
        <Text>Enter your Email:</Text>
        <TextInput
          placeholder="Example@gmail.com"
          style={styles.textbox}
          onChangeText={(email) => textEmailChange(email)}
          onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
        />
      </View>

      {data.isValidEmail ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorText}>Please input your email!</Text>
        </Animatable.View>
      )}

      <View>
        <Text>Enter your phone number:</Text>
        <TextInput
          placeholder="Phone Number"
          style={styles.textbox}
          maxLength={12}
          keyboardType="numeric"
          onChangeText={(phone) => textPhoneChange(phone)}
          onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)}
        />
      </View>

      {data.isValidPhone ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorText}>Please input your phone number!</Text>
        </Animatable.View>
      )}

      <View>
        <Text>Enter your Date of Birth:</Text>
        <Button title="Date" onPress={showDatePicker} />
        <DateTimePicker
          isVisible={checkDate}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View>
        <Text>Enter your Password:</Text>
        <TextInput
          placeholder="Password"
          style={styles.textbox}
          secureTextEntry={true}
          onChangeText={(password) => textPasswordChange(password)}
          onEndEditing={(e) => {
            handleValidPassword(e.nativeEvent.text);
            console.log('on edit');
          }}
        />
      </View>

      {data.isValidPassword ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorText}>
            Your password must be 8 or more characters long!
          </Text>
        </Animatable.View>
      )}

      <View>
        <Text>Confirm the Password:</Text>
        <TextInput
          placeholder="Confirm Password"
          style={styles.textbox}
          secureTextEntry={true}
          onChangeText={(confirmPassword) =>
            textPasswordConfirmChange(confirmPassword)
          }
          onEndEditing={(e) => handleValidConfirmPassword(e.nativeEvent.text)}
        />
      </View>

      {data.isValidConfirmPassword ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorText}>Your passwords do not match!</Text>
        </Animatable.View>
      )}

      <View>
        <Button
          title="Sign Up"
          onPress={() => {
            if (data) {
              attemptFirebaseSignUp();
            }
          }}
        />
      </View>
    </View>
  );
}
