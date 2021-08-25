import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Keyboard } from 'react-native';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {db, auth} from '../firebase/firebaseconfig';

// const firebaseConfig = {
// 	apiKey: 'AIzaSyAwb_T1CUeLpkSMuZA_-WU1BQ1EaHQzcm8',
// 	authDomain: 'awhina-app.firebaseapp.com',
// 	projectId: 'awhina-app',
// 	storageBucket: 'awhina-app.appspot.com',
// 	messagingSenderId: '592015836706',
// 	appId: '1:592015836706:web:c1f2b1e1c05a3ed7bc6c7b',
// 	measurementId: 'G-64LH9LBBV3',
// };

//firebase.initializeApp(firebaseConfig);

export default function Login({ navigation }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginErrorMessage, setLoginErrorMessage] = useState('');

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
				auth
				.signInWithEmailAndPassword(email, password)
				.then((userCredential) => {
					//Logged in
					goToHomeScreen();
				})
				.catch((error) => {
					//Not Logged In
					let errorCode = error.code;
					let errorMessage = error.message;
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
