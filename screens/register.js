import React, {useState} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Platform,
	StyleSheet,
	StatusBar,
	Keyboard,
	Dimensions,
	Button,
	ToastAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {db, auth} from '../firebase/firebaseconfig';
import Spinner from 'react-native-loading-spinner-overlay';
import validator from 'validator';

export default function Register() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('+64');
	const [DOB, setDOB] = useState('');
	const [isFirstName, setIsFirstName] = useState(true);
	const [isLastName, setIsLastName] = useState(true);
	const [isPassword, setIsPassword] = useState(true);
	const [isEmail, setIsEmail] = useState(true);
	const [isPhone, setIsPhone] = useState(true);
	const [isDOB, setIsDOB] = useState(true);
	const [hideDOBPicker, setHideDOBPicker] = useState(true);
	const [hidePassword, setHidePassword] = useState(true);

	//Uses the validator to validate user inputs
	function validateInput() {
		if (
			validator.isEmail(email) &&
			password.length >= 6 &&
			validator.isMobilePhone(phone) &&
			validator.isAlpha(firstName) &&
			validator.isAlpha(lastName)
		) {
			return true;
		} else if (!isEmail) {
			ToastAndroid.show('Must use a valid email.', ToastAndroid.LONG);
			return false;
		} else if (!isFirstName) {
			ToastAndroid.show('First name must be only letters.', ToastAndroid.LONG);
			return false;
		} else if (!isLastName) {
			ToastAndroid.show('Last name must be only letters.', ToastAndroid.LONG);
			return false;
		} else if (!isPassword) {
			ToastAndroid.show('Password must be six characters long.', ToastAndroid.LONG);
			return false;
		} else {
			ToastAndroid.show('Make sure to fix your details.', ToastAndroid.LONG);
		}
	}

	//Show activity spinner
	const [loading, setLoading] = useState(false);
	const startLoading = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1800);
	};

	const convertDOBToString = date => {
		return date.toString().slice(3, 15);
	};

	//Sign up user to firebase auth
	function signUpNewUser() {
		auth.createUserWithEmailAndPassword(email, password)
			.then(user => {
				console.log('User account created & signed in!');
				writeUserData(user.user.uid);
			})
			.catch(error => {
				if (error.code === 'auth/email-already-in-use') {
					console.log('That email address is already in use!');
				}
				if (error.code === 'auth/invalid-email') {
					console.log('That email address is invalid!');
				}
				console.error(error + ' ' + email + ' ' + firstName + ' ' + lastName);
			});
	}

	//Save user details to firebase db
	function writeUserData(userId) {
		db.collection('chats')
			.orderBy('createdAt', 'desc')
			.get()
			.then(snapshot => {
				if (snapshot.exists) {
					setMessage(snapshot.data());
				} else {
					console.log('No data found!');
				}
			});
		db.collection('users/' + userId)
			.set({
				firstName: firstName,
				lastName: lastName,
				email: email,
				phone: phone,
				dob: DOB,
			})
			.then(() => {
				// Data saved successfully!
				console.log(`User ${userId} added to users collection successfully!`);
			})
			.catch(error => {
				// The write failed...
				console.log(`User ${userId} could not be added to users collection.` + error.message());
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
				<Text style={styles.text_header}>User Registeration</Text>
			</View>

			<Animatable.View animation='slideInUp' style={styles.footer}>
				<Text style={styles.text_footer}>First Name</Text>
				<View style={styles.action}>
					<FontAwesome name='user-o' color='#05375a' size={20} />
					<TextInput
						placeholder='First Name'
						style={styles.textInput}
						autoCapitalize='none'
						onChangeText={text => setFirstName(text)}
					/>

					{isFirstName ? null : (
						<Animatable.View animation='fadeInLeft' duration={500}>
							<Text style={styles.errorText}>
								Your first name must be 4 characters long!
							</Text>
						</Animatable.View>
					)}
				</View>

				<Text style={styles.text_footer}>Last Name</Text>
				<View style={styles.action}>
					<FontAwesome name='user' color='#05375a' size={24} />
					<TextInput
						placeholder='Last Name'
						style={styles.textInput}
						autoCapitalize='none'
						onChangeText={text => setLastName(text)}
					/>
					{isLastName ? null : (
						<Animatable.View animation='fadeInLeft' duration={500}>
							<Text style={styles.errorText}>
								Your last name must be 4 characters long!
							</Text>
						</Animatable.View>
					)}
				</View>

				<Text style={styles.text_footer}>Email</Text>
				<View style={styles.action}>
					<FontAwesome name='envelope' color='#05375a' size={20} />
					<TextInput
						placeholder='example@email.com'
						style={styles.textInput}
						autoCapitalize='none'
						onChangeText={text => setEmail(text)}
					/>
					{isEmail ? null : (
						<Animatable.View animation='fadeInLeft' duration={500}>
							<Text style={styles.errorText}>Please input your email!</Text>
						</Animatable.View>
					)}
				</View>

				<Text style={styles.text_footer}>Date of Birth</Text>
				<View style={styles.action}>
					<FontAwesome name='calendar' color='#05375a' size={20} />
					<TextInput
						placeholder='Enter Date of Birth'
						value={DOB.toString()}
						style={styles.textInput}
						onFocus={() => {
							Keyboard.dismiss();
							setHideDOBPicker(prevHideDOBPicker => !prevHideDOBPicker);
						}}
					/>
					<DateTimePicker
						isVisible={!hideDOBPicker}
						mode='date'
						color='crimson'
						onConfirm={date => {
							setDOB(convertDOBToString(date));
							setHideDOBPicker(true);
						}}
						onCancel={() => setHideDOBPicker(true)}
					/>
				</View>

				<Text style={styles.text_footer}>Phone Number</Text>
				<View style={styles.action}>
					<FontAwesome name='phone' color='#05375a' size={20} />
					<TextInput
						placeholder='xxx xxx xxxx'
						style={styles.textInput}
						maxLength={12}
						keyboardType='numeric'
						onChangeText={text => setPhone(text)}
					/>
					{isPhone ? null : (
						<Animatable.View animation='fadeInLeft' duration={500}>
							<Text style={styles.errorText}>
								Please input your phone number!
							</Text>
						</Animatable.View>
					)}
				</View>

				<Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
				<View style={styles.action}>
					<Feather name='key' color='#05375a' size={20} />
					<TextInput
						placeholder='Enter Password'
						secureTextEntry={hidePassword}
						style={styles.textInput}
						autoCapitalize='none'
						onChangeText={text => setPassword(text)}
					/>

					{isPassword ? null : (
						<Animatable.View animation='fadeInLeft' duration={500}>
							<Text style={styles.errorText}>
								Your password must be 8 or more characters long!
							</Text>
						</Animatable.View>
					)}

					<TouchableOpacity
						onPress={() => setHidePassword(prevHidePassword => !prevHidePassword)}>
						{hidePassword ? (
							<Feather name='eye-off' color='salmon' size={20} />
						) : (
							<Feather name='eye' color='red' size={20} />
						)}
					</TouchableOpacity>
				</View>

				<Text style={[styles.text_footer, {marginTop: 35}]}>
					Confirm Password
					{hidePassword ? null : (
						<Animatable.View animation='fadeInLeft' duration={500}>
							<Text style={styles.errorText}>passwords do not match</Text>
						</Animatable.View>
					)}
				</Text>
				<View style={styles.action}>
					<Feather name='lock' color='#05375a' size={20} />
					<TextInput
						placeholder='Confirm your Password'
						secureTextEntry={hidePassword}
						style={styles.textInput}
						autoCapitalize='none'
						onChangeText={text => setPassword(text)}
					/>
				</View>

				<View style={styles.button}>
					<TouchableOpacity
						onPress={() => {
							if (validateInput()) {
								try {
									signUpNewUser();
									ToastAndroid.show(
										'Registered!',
										ToastAndroid.SHORT
									);
								} catch (error) {
									switch (error.code) {
										case 'auth/email-already-in-use':
											ToastAndroid.show(
												`Email address ${email} already in use.`,
												ToastAndroid.SHORT
											);
											break;
										case 'auth/invalid-email':
											ToastAndroid.show(
												`Email address ${email} is invalid.`,
												ToastAndroid.SHORT
											);
											break;
										case 'auth/operation-not-allowed':
											ToastAndroid.show(
												`Error during sign up.`,
												ToastAndroid.SHORT
											);
											break;
										case 'auth/weak-password':
											ToastAndroid.show(
												'Password is not strong enough. Add additional characters including special characters and numbers.',
												ToastAndroid.SHORT
											);
											break;
										default:
											ToastAndroid.show(
												'Please try registration at another time',
												ToastAndroid.SHORT
											);
											console.log(error.message);
											break;
									}
								}
							}
						}}
						style={[
							styles.signIn,
							{
								bordercolor: '#009387',
								borderWidth: 1,
								backgroundColor: 'crimson',
								marginTop: 20,
							},
						]}>
						<Text style={[styles.textSign, {color: 'white'}]}>Register</Text>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'crimson',
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingTop: 35,
		paddingBottom: 35,
	},
	footer: {
		flex: 13,
		backgroundColor: 'white',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 25,
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
		textAlignVertical: 'bottom',
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
	errorText: {
		color: 'red',
		marginLeft: 5,
	},
});
