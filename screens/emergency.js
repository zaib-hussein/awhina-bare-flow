import React, {useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	StatusBar,
} from 'react-native';
import {flex} from 'styled-system';
import EmergencyGive from './emergency-give';

export default function Emergency() {
	const [selected, setSelected] = useState('');
	const [options, setOptions] = useState(() => [
		{type: 'Water', isHelp: false},
		{type: 'Food', isHelp: false},
		{type: 'Shelter', isHelp: false},
		{type: 'Lost', isHelp: false},
		{type: 'Clothes', isHelp: false},
		{type: '', isHelp: false},
	]);

	const handleSetOptions = e => {
		setOptions(lastOptions => {
			let newOptions = lastOptions.forEach(item => (item.isHelp = e));
			return newOptions;
		});
	};

	const handleSelected = e => {
		return e.id;
	};

	return (
		<View style={{flex: 1, alignItems: 'stretch'}}>
			{/* <Text style={{height: '20%'}}>
				{selected}
			</Text>  */}
			<ScrollView>
				<View style={styles.container}>
					<EmergencyGive />
				</View>
			</ScrollView>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignContent: 'flex-end',
					marginBottom: 20,
				}}>
				<TouchableOpacity
					onPress={() => {}}
					style={[
						{
							display: 'flex',
							height: 50,
							width: '25%',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 10,
							bordercolor: '#009387',
							borderWidth: 1,
							backgroundColor: '#00eeaa',
							marginTop: 20,
						},
					]}>
					<Text
						style={[
							{
								justifyContent: 'center',
								alignItems: 'center',
								textAlignVertical: 'center',
								color: 'black',
							},
						]}>
						Give
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {}}
					style={{
						display: 'flex',
						height: 50,
						width: '25%',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 10,
						bordercolor: '#009387',
						borderWidth: 1,
						backgroundColor: 'crimson',
						marginTop: 20,
					}}>
					<Text
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							textAlignVertical: 'center',
							color: 'white',
						}}>
						Help
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#ff4500', ///background color for contain.
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40, //bring help tions down on screen
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
