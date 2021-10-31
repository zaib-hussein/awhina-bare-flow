import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import '@react-native-firebase/auth';
import '@react-native-firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAwb_T1CUeLpkSMuZA_-WU1BQ1EaHQzcm8',
	authDomain: 'awhina-app.firebaseapp.com',
	projectId: 'awhina-app',
	storageBucket: 'awhina-app.appspot.com',
	messagingSenderId: '592015836706',
	appId: '1:592015836706:web:c1f2b1e1c05a3ed7bc6c7b',
	measurementId: 'G-64LH9LBBV3',
};

let app;
if(firebase.apps.length <= 0){
	app = firebase.initializeApp(firebaseConfig);
}
else{
	app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };

export function createNewUser() {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			//Logged In
			var user = userCredential.user;
		})
		.catch((error) => {
			//Not Logged In
			var errorCode = error.code;
			var errorMessage = error.message;
		});
}

export function loginUser() {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			//Logged in
			var user = userCredential.user;
			user.displayName("firstname");
		})
		.catch((error) => {
			//Not Logged In
			var errorCode = error.code;
			var errorMessage = error.message;
		});
}

export function logoutUser() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			//Logged Out
		})
		.catch((error) => {
			//Could not log out
		});
}


