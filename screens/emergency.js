import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import EmergencyGive from './emergency-give';

export default function Emergency() {
	return (
		<ScrollView>
		<View style={styles.container}>
			<EmergencyGive />
		</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#ff4500', ///background color for contain.
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,	//bring help tions down on screen
		width: '100%',
		// height: 40,

		//following styles arrange items into grid, commenting this will make vertical layout
		// flexDirection: 'row',
		// flexWrap: 'wrap',
		// paddingLeft: 50,
		// paddingRight: 50,
		// paddingTop: 50,
		// marginTop: 100,
	},

	button: {
		backgroundColor: '#FFF',
		borderRadius: 10,

		// padding: 0,
		// marginTop: 5,
		// marginBottom: 30, //orignal = 10

		shadowColor: '#ff0000',
		shadowOffset: {width: 1, height: 5},
		shadowRadius: 10,
		shadowOpacity: 0.35,
		//  width: 290,
		// height: 100,
	},
});
