import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as Animatable from 'react-native-animatable';

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
				<Text>Enter your First Name:</Text>
				<TextInput
					placeholder="First Name"
					style={styles.textbox}
					onChangeText={(firstName_Val) => textFirstNameChange(firstName_Val)}
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
					onChangeText={(lastName_Val) => textLastNamechange(lastName_Val)}
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
					onChangeText={(email_Val) => textEmailChange(email_Val)}
					onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
				/>
			</View>

			{data.isValidEmail ? null : (
				<Animatable.View animation="fadeInLeft" duration={500}>
					<Text style={styles.errorText}>
						Please input your email!
					</Text>
				</Animatable.View>
			)}

			<View>
				<Text>Enter your phone number:</Text>
				<TextInput
					placeholder="Phone Number"
					style={styles.textbox}
					maxLength={12}
					keyboardType='numeric'
					onChangeText={(phone_Val) => textPhoneChange(phone_Val)}
					onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)}
				/>
			</View>

			{data.isValidPhone ? null : (
				<Animatable.View animation="fadeInLeft" duration={500}>
					<Text style={styles.errorText}>
						Please input your phone number!
					</Text>
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
					onChangeText={(password_Val) => textPasswordChange(password_Val)}
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
					onChangeText={(confirmPassword_Val) =>
						textPasswordConfirmChange(confirmPassword_Val)
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
				<Button title="Sign Up" onPress={console.log('You have signed up!', data.firstName)} />
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
		borderColor: 'black',
		borderWidth: 1,
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
