import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';

export default function Emergency() {
	return (
		<ScrollView>
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					alert('I Need Water');
				}}
			>
				<Image source={require('./icons/water.png')} />
			</TouchableOpacity>
			<Text>WATER</Text>

			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					alert('I Need Food');
				}}
			>
				<Image source={require('./icons/food.png')} />
			</TouchableOpacity>
			<Text>FOOD</Text>

			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					alert('I Need Shelter');
				}}
			>
				<Image source={require('./icons/shelter.png')} />
			</TouchableOpacity>
			<Text>SHELTER</Text>

			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					alert('I Need Help Finding Way');
				}}
			>
				<Image source={require('./icons/lost.png')} />
			</TouchableOpacity>
			<Text>LOST</Text>

			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					alert('I Need clothes');
				}}
			>
				<Image source={require('./icons/clothes.png')} />
			</TouchableOpacity>
			<Text>CLOTHES</Text>
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
