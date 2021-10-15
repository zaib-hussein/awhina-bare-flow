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
	KeyboardAvoidingView,
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
	const [tempPassword, setTempPassword] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('+64');
	const [DOB, setDOB] = useState('');
	const [isFirstName, setIsFirstName] = useState(true);
	const [isLastName, setIsLastName] = useState(true);
	const [isEmail, setIsEmail] = useState(true);
	const [isDOB, setIsDOB] = useState(true);
	const [isPhone, setIsPhone] = useState(true);
	const [isPassword, setIsPassword] = useState(true);
	const [hideDOBPicker, setHideDOBPicker] = useState(true);
	const [hidePassword, setHidePassword] = useState(true);
	const [hideTempPassword, setHideTempPassword] = useState(true);

	//Uses the validator to validate user inputs
	function validateInput() {
		setIsFirstName(validator.isAlpha(firstName));
		setIsLastName(validator.isAlpha(lastName));
		setIsEmail(validator.isEmail(email));
		setIsDOB(validator.isDate(new Date(DOB)));
		setIsPhone(validator.isMobilePhone(phone));
		setIsPassword(password.length >= 6);
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

	//Validates password
	const handlePassword = password => {
		if (password.length >= 6) {
			setPassword(password);
			setIsPassword(true);
		} else {
			setIsPassword(false);
		}
	};

	//Validates email
	const handleEmail = email => {
		if (validator.isEmail(email)) {
			setEmail(email);
			setIsEmail(true);
		} else {
			setIsEmail(false);
		}
	};

	//Validates phone
	const handlePhone = phone => {
		if (phone.length >= 8) {
			setPhone(phone);
			setIsPhone(true);
		} else {
			setIsPhone(false);
		}
	};
	//Validates date of birth
	const handleDOB = date => {
		if (date < new Date()) {
			setDOB(date.toLocaleDateString('en-NZ'));
			setIsDOB(true);
		} else {
			setIsDOB(false);
		}
	};

	//Validates both first and last names
	const handleNames = (name, isFirst) => {
		if (validator.isAlpha(name)) {
			isFirst ? setFirstName(name) : setLastName(name);
			isFirst ? setIsFirstName(true) : setIsLastName(true);
		} else {
			isFirst ? setIsFirstName(false) : setIsLastName(false);
		}
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
				<Text style={styles.text_header}>User Registeration</Text>
			</View>

			<View behavior={'padding'} style={styles.footer}>
				<Animatable.View animation='slideInUp'>
					<Text style={styles.text_footer_first}>
						First Name
						{isFirstName ? null : (
							<Animatable.View animation='fadeInRight' duration={500}>
								<Text style={styles.errorText}>
									Please enter only letters
								</Text>
							</Animatable.View>
						)}
					</Text>
					<View style={styles.action}>
						<FontAwesome name='user-o' color='#05375a' size={20} />
						<TextInput
							placeholder='First Name'
							style={styles.textInput}
							autoCapitalize='none'
							onChangeText={text => handleNames(text, true)}
						/>
					</View>

					<Text style={styles.text_footer}>
						Last Name
						{isLastName ? null : (
							<Animatable.View animation='fadeInRight' duration={500}>
								<Text style={styles.errorText}>
									Please enter only letters
								</Text>
							</Animatable.View>
						)}
					</Text>
					<View style={styles.action}>
						<FontAwesome name='user' color='#05375a' size={24} />
						<TextInput
							placeholder='Last Name'
							style={styles.textInput}
							autoCapitalize='none'
							onChangeText={text => handleNames(text, false)}
						/>
					</View>

					<Text style={styles.text_footer}>
						Email
						{isEmail ? null : (
							<Animatable.View animation='fadeInRight' duration={500}>
								<Text style={styles.errorText}>
									Please enter your email
								</Text>
							</Animatable.View>
						)}
					</Text>
					<View style={styles.action}>
						<FontAwesome name='envelope' color='#05375a' size={20} />
						<TextInput
							placeholder='example@email.com'
							style={styles.textInput}
							autoCapitalize='none'
							onChangeText={text => handleEmail(text)}
						/>
					</View>

					<Text style={styles.text_footer}>
						Date of Birth
						{isDOB ? null : (
							<Animatable.View animation='fadeInRight' duration={500}>
								<Text style={styles.errorText}>
									Please enter your date of birth
								</Text>
							</Animatable.View>
						)}
					</Text>
					<View style={styles.action}>
						<FontAwesome name='calendar' color='#05375a' size={20} />
						<TextInput
							placeholder='Enter Date of Birth'
							value={DOB.toString()}
							style={styles.textInput}
							onFocus={() => {
								Keyboard.dismiss();
								setHideDOBPicker(
									prevHideDOBPicker => !prevHideDOBPicker
								);
							}}
						/>
						<DateTimePicker
							isVisible={!hideDOBPicker}
							mode='date'
							color='crimson'
							onConfirm={date => {
								handleDOB(date);
								setHideDOBPicker(true);
							}}
							onCancel={() => setHideDOBPicker(true)}
						/>
					</View>

					<Text style={styles.text_footer}>
						Phone Number
						{isPhone ? null : (
							<Animatable.View animation='fadeInRight' duration={500}>
								<Text style={styles.errorText}>
									Please enter your phone number
								</Text>
							</Animatable.View>
						)}
					</Text>
					<View style={styles.action}>
						<FontAwesome name='phone' color='#05375a' size={20} />
						<TextInput
							placeholder='xxx xxx xxxx'
							style={styles.textInput}
							maxLength={12}
							keyboardType='numeric'
							onChangeText={text => handlePhone(text)}
						/>
					</View>

					<Text style={styles.text_footer}>
						Password
						{isPassword ? null : (
							<Animatable.View animation='fadeInRight' duration={500}>
								<Text style={styles.errorText}>
									Must be 6 characters or longer
								</Text>
							</Animatable.View>
						)}
					</Text>
					<View style={styles.action}>
						<Feather name='key' color='#05375a' size={20} />
						<TextInput
							placeholder='Enter Password'
							secureTextEntry={hidePassword}
							style={styles.textInput}
							autoCapitalize='none'
							onChangeText={text => handlePassword(text)}
						/>

						<TouchableOpacity
							onPress={() =>
								setHidePassword(prevHidePassword => !prevHidePassword)
							}>
							{hidePassword ? (
								<Feather name='eye-off' color='salmon' size={20} />
							) : (
								<Feather name='eye' color='red' size={20} />
							)}
						</TouchableOpacity>
					</View>
					<View>
						{isPassword ? null : (
							<Animatable.View animation='fadeInRight' duration={500}>
								<Text style={styles.errorText}>
									Must be 6 characters or longer
								</Text>
							</Animatable.View>
						)}
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
												console.log(
													error.message
												);
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
							<Text style={[styles.textSign, {color: 'white'}]}>
								Register
							</Text>
						</TouchableOpacity>
					</View>
				</Animatable.View>
			</View>
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
		paddingVertical: 10,
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
		marginTop: 5,
	},
	text_footer_first: {
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
		textAlignVertical: 'bottom',
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
		textAlignVertical: 'bottom',
	},
});
