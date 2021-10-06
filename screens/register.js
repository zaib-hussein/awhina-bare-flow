import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet ,StatusBar, Keyboard, Dimensions, Button} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import firebase from 'firebase';
import '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {db, auth} from '../firebase/firebaseconfig';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Register() {
	const [data, setData] = React.useState({
		firstName: '',
		lastName: '',
		email: '',
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
        secureTextEntry: true

	});
	const [checkDate, setDate] = useState(false);

	//Check whether the username has more than equal to 4 characters long.
	//Also store the 'val' into the 'username' value
	const textFirstNameChange = (firstName_Val) => {
		if (firstName_Val.trim().length >= 4) {
			setData({
				...data,
				firstName: firstName_Val,
				check_textInputChange: true,
				isValidFirstName: true,
			});
		} else {
			setData({
				...data,
				check_textInputChange: false,
				isValidFirstName: false,
			});
		}
	};

	//Check if the 'username' is null. If the 'username' is null, then it will display an error.
	const handleValidFirstName = (firstName_Val) => {
		if (firstName_Val.trim().length >= 4) {
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

	const textLastNamechange = (lastName_Val) => {
		if (lastName_Val.trim().length >= 4) {
			setData({
				...data,
				lastName: lastName_Val,
				check_textInputChange: true,
				isValidLastName: true,
			});
		} else {
			setData({
				...data,
				lastName: lastName_Val,
				check_textInputChange: false,
				isValidLastName: false,
			});
		}
	};

	const handleValidLastName = (lastName_Val) => {
		if (lastName_Val.trim().length >= 4) {
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

	const textEmailChange = (email_Val) => {
		if (email_Val.trim().length > 0) {
			setData({
				...data,
				email: email_Val,
				check_textInputChange: true,
				isValidEmail: true,
			});
		} else {
			setData({
				...data,
				email: email_Val,
				check_textInputChange: false,
				isValidEmail: false,
			});
		}
	};

	const handleValidEmail = (email_Val) => {
		if (email_Val.trim().length > 0) {
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

	const textPhoneChange = (phone_Val) => {
		if (phone_Val > 0) {
			setData({
				...data,
				phone: phone_Val,
				check_textInputChange: true,
				isValidPhone: true,
			});
		} else {
			setData({
				...data,
				phone: phone_Val,
				check_textInputChange: false,
				isValidPhone: false,
			});
		}
	};

	const handleValidPhone = (phone_Val) => {
		if (phone_Val > 0) {
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
	const textPasswordChange = (password_Val) => {
		if (password_Val.trim().length >= 8) {
			setData({
				...data,
				password: password_Val,
				check_textInputChange: true,
				isValidPassword: true,
			});
		} else {
			setData({
				...data,
				username: password_Val,
				check_textInputChange: false,
				isValidPassword: false,
			});
		}
	};

	//Check if the 'password' is null. If the 'password' is null, then it will display an error.
	const handleValidPassword = (password_Val) => {
		if (password_Val.trim().length >= 8) {
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
	const textPasswordConfirmChange = (confirmPassword_Val) => {
		if (confirmPassword_Val == data.password) {
			setData({
				...data,
				confirmPassword: confirmPassword_Val,
				check_textInputChange: true,
				isValidConfirmPassword: true,
			});
		} else {
			setData({
				...data,
				confirmPassword: confirmPassword_Val,
				check_textInputChange: false,
				isValidConfirmPassword: false,
			});
		}
	};

	//Check if the 'confirmPassword' is null. If the 'confirmPassword' is null, then it will display an error.
	const handleValidConfirmPassword = (confirmPassword_Val) => {
		if (confirmPassword_Val == data.password) {
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
    
    // activity spinner///////////////////////////////////
      const [loading, setLoading] = useState(false);
      const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1800);
      };
    // activity spinner///////////////////////////////////

    //datetime
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

    //secure text entry EmergencyScreen   
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }


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
                <Text style ={styles.text_header}>User Registeration</Text>
            </View>

            <Animatable.View animation = "zoomInUp" style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name="envelope"
                    color="#05375a"
                    size={20}
                    />
                    <TextInput
                        placeholder = "example@email.com"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(email_Val) => textEmailChange(email_Val)}
                        onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}

                    />
                    {data.isValidEmail ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorText}>
                                Please input your email!
                            </Text>
                        </Animatable.View>
			        )}
                </View>

                    <Text style={styles.text_footer}>Date of Birth</Text>
                     <View style={styles.action}>
                        <FontAwesome
                            name="calendar"
                            color="#05375a"
                            size={20}
                        />
                             <Button title="select date of birth" onPress={showDatePicker} />
                                 <DateTimePicker
                                    isVisible={checkDate}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                    </View>

                <Text style={styles.text_footer}>First Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder = "First Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(firstName_Val) => textFirstNameChange(firstName_Val)}
                        onEndEditing={(e) => handleValidFirstName(e.nativeEvent.text)}
                    />

                        {data.isValidFirstName ? null : (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorText}>
                                    Your first name must be 4 characters long!
                                </Text>
                            </Animatable.View>
                        )}
                  </View>

                <Text style={styles.text_footer}>Last Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user"
                        color="#05375a"
                        size={24}
                    />
                    <TextInput
                        placeholder = "Last Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(lastName_Val) => textLastNamechange(lastName_Val)}
                        onEndEditing={(e) => handleValidLastName(e.nativeEvent.text)}

                    />
                     {data.isValidLastName ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorText}>
                                Your last name must be 4 characters long!
                            </Text>
                        </Animatable.View>
			        )}
                </View>

                <Text style={styles.text_footer}>Phone Number</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="phone"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder = "02x xxx xxxx"
                        style={styles.textInput}
                        maxLength={12}
                        keyboardType='numeric'
                        onChangeText={(phone_Val) => textPhoneChange(phone_Val)}
                        onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)}
                    />
                  	{data.isValidPhone ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorText}>
                                Please input your phone number!
                            </Text>
                        </Animatable.View>
                    )}
                </View>
            

                <Text style={[styles.text_footer, {marginTop:35}]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="key"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder = " Enter Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(password_Val) => textPasswordChange(password_Val)}
                        onEndEditing={(e) => {
                            handleValidPassword(e.nativeEvent.text);
                            console.log('on edit');
                        }}
                    />

                    {data.isValidPassword ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorText}>
                                Your password must be 8 or more characters long!
                            </Text>
                        </Animatable.View>
                    )}
                </View>

                 <Text style={[styles.text_footer, {marginTop:35}]}>Confirm Password</Text>
                 <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20}
                        />
                    <TextInput
                        placeholder = "Confirm your Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(confirmPassword_Val) =>
                            textPasswordConfirmChange(confirmPassword_Val)
                        }
                        onEndEditing={(e) => handleValidConfirmPassword(e.nativeEvent.text)}
                    />
                    {data.isValidConfirmPassword ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorText}>Your passwords do not match!</Text>
                        </Animatable.View>
			        )}

                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="salmon"
                                size={20}
                            />
                            : 
                            <Feather
                                name="eye"
                                color="red"
                                size={20}
                            />
                        }           

                    </TouchableOpacity>
                </View>
               
                <View style={styles.button}>
                    <TouchableOpacity
                            onPress={console.log('You have signed up!', data.firstName)}
                            style={[styles.signIn, {
                            bordercolor: '#009387',
                            borderWidth: 1,
                            backgroundColor: 'crimson',
                            marginTop: 20
                            }]}
                        >
                        <Text style={[styles.textSign , {color: 'white'}]}>Register</Text> 
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
      backgroundColor: 'crimson'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 35
    },
    footer: {
        flex: 13,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 25
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
    text_footer: {
        color: '#05375a',
        fontSize: 17,
        fontWeight: 'bold'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
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
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    spinnerTextStyle: {
        color: 'crimson',
      },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    errorText: {
		color: 'red',
	}
  });
