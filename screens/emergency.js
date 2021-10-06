import React, {useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	StatusBar,
	SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import EmergencyGive from './emergency-give';
import EmergencyHelp from './emergency-help';

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

	const handleSelected = selection => {
		setSelected(selection);
	};

	return (
		<View>
			<View style={styles.header}>
				<Text style={styles.text_header}>{selected}</Text>
			</View>
			<ScrollView>
				{selected === 'Give' ? (
					<Animatable.View
						style={styles.container}
						animation='fadeInLeft'
						duration={500}>
						<EmergencyGive />
					</Animatable.View>
				) : selected === 'Help' ? (
					<Animatable.View
						style={styles.container}
						animation='fadeInRight'
						duration={500}>
						<EmergencyHelp />
					</Animatable.View>
				) : null}
			</ScrollView>
			<View
				style={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'space-around',
					alignContent: 'flex-end',
					marginBottom: 20,
				}}>
				<TouchableOpacity
					onPress={() => handleSelected('Help')}
					style={styles.helpButton}>
					<Text style={styles.helpText}>Help</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => handleSelected('Give')}
					style={styles.giveButton}>
					<Text style={styles.giveText}>Give</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	giveButton: {
		display: 'flex',
		height: 50,
		width: '25%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: '#50DE80',
		marginTop: 20,
	},
	giveText: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlignVertical: 'center',
		color: 'black',
	},
	helpButton: {
		display: 'flex',
		height: 50,
		width: '25%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: '#DE5050',
		marginTop: 20,
	},
	helpText: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlignVertical: 'center',
		color: 'white',
	},
	header: {
		marginTop: '40%',
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	text_header: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 96,
		textAlign: 'center',
		textAlignVertical: 'bottom',
	},
});
