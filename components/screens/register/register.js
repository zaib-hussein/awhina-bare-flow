import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as Animatable from 'react-native-animatable';

export default function Register() {
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    check_textInputChange: false,
    isValidUser: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  });
  const [checkDate, setDate] = useState(false);

  //Check whether the username has more than equal to 4 characters long.
  //Also store the 'val' into the 'username' value
  const textUserChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  //Check if the 'username' is null. If the 'username' is null, then it will display an error.
  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  //Check whether the 'password' has more than equal to 8 characters long.
  //Also store the 'val1' into the 'password' value
  const textPasswordChange = (val1) => {
    if (val1.trim().length >= 8) {
      setData({
        ...data,
        password: val1,
        check_textInputChange: true,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        username: val1,
        check_textInputChange: false,
        isValidPassword: false,
      });
    }
  };

  //Check if the 'password' is null. If the 'password' is null, then it will display an error.
  const handleValidPassword = (val1) => {
    if (val1.trim().length >= 8) {
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
  const textPasswordConfirmChange = (val2, password) => {
    if (val2 == password) {
      setData({
        ...data,
        confirmPassword: val2,
        check_textInputChange: true,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        confirmPassword: val2,
        check_textInputChange: false,
        isValidConfirmPassword: false,
      });
    }
  };

  //Check if the 'confirmPassword' is null. If the 'confirmPassword' is null, then it will display an error.
  const handleValidConfirmPassword = (confirmPassword) => {
    if (confirmPassword == data.password) {
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
    console.log('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <View style={styles.login}>
      <View>
        <Text>Enter your Username:</Text>
        <TextInput
          placeholder="Username"
          style={styles.textbox}
          onChangeText={(val) => textUserChange(val)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
        />
      </View>

      {data.isValidUser ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorText}>
            Your username must be 4 characters long!
          </Text>
        </Animatable.View>
      )}

      <View>
        <Text>Enter your First Name:</Text>
        <TextInput placeholder="First Name" style={styles.textbox} />
      </View>

      <View>
        <Text>Enter your Last Name</Text>
        <TextInput placeholder="Last Name" style={styles.textbox} />
      </View>

      <View>
        <Text>Enter your Email:</Text>
        <TextInput placeholder="Example@gmail.com" style={styles.textbox} />
      </View>

      <View>
        <Text>Enter your phone number:</Text>
        <TextInput
          placeholder="Phone Number"
          style={styles.textbox}
          maxLength={12}
        />
      </View>

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
          onChangeText={(val1) => textPasswordChange(val1)}
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
        <Button title="Sign Up" onPress={console.log('You have signed up!')} />
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
  textbox: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 15,
    padding: 8,
    margin: 10,
    width: 200,
  },
  loginButton: {
    padding: 8,
    margin: 10,
  },
  errorText: {
    color: 'red',
  },
  regisButton: {
    paddingTop: 40,
    marginTop: 20,
    margin: 40,
  },
});
