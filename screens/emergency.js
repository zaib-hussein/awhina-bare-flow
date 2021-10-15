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
	const [freshLoad, setFreshLoad] = useState(true);
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
			{selected === 'Give' ? (
				<TouchableOpacity onClick={() => setFreshLoad(true)}>
					<Animatable.View
						style={styles.header}
						animation='fadeInRight'
						duration={1000}>
						<Text style={styles.text_header}>{selected}</Text>
					</Animatable.View>
				</TouchableOpacity>
			) : selected === 'Help' ? (
				<TouchableOpacity onClick={() => setFreshLoad(true)}>
					<Animatable.View
						style={styles.header}
						animation='fadeInLeft'
						duration={800}>
						<Text style={styles.text_header}>{selected}</Text>
					</Animatable.View>
				</TouchableOpacity>
			) : null}
			<ScrollView>
				{selected === 'Give' ? (
					<Animatable.View
						style={styles.container}
						animation='fadeInRight'
						duration={1000}>
						<EmergencyGive />
					</Animatable.View>
				) : selected === 'Help' ? (
					<Animatable.View
						style={styles.container}
						animation='fadeInLeft'
						duration={1000}>
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
				{freshLoad === true ? (
					<View style={styles.rows}>
						<TouchableOpacity
							onPress={() => {
								handleSelected('Help');
								setFreshLoad(false);
							}}
							style={styles.helpButtonLarge}>
							<Text style={styles.helpTextLarge}>Help</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								handleSelected('Give');
								setFreshLoad(false);
							}}
							style={styles.giveButtonLarge}>
							<Text style={styles.giveTextLarge}>Give</Text>
						</TouchableOpacity>
					</View>
				) : (
					<>
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
					</>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	rows: {
		display: 'flex',
		flexDirection: 'column',
	},
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
		marginTop: 5,
		marginBottom: 30,
	},
	giveButtonLarge: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: '#50DE80',
		padding: 10,
		marginTop: 70,
		minWidth: '35%',
		marginBottom: 20,
	},
	giveText: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlignVertical: 'center',
		color: 'black',
	},
	giveTextLarge: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlignVertical: 'center',
		color: 'black',
		fontSize: 80,
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
		marginTop: 5,
		marginBottom: 30,
	},
	helpButtonLarge: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: '#DE5050',
		padding: 10,
		marginTop: 200,
		marginBottom: 20,
	},
	helpText: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlignVertical: 'center',
		color: 'white',
	},
	helpTextLarge: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlignVertical: 'center',
		color: 'white',
		fontSize: 80,
	},
	header: {
		marginTop: '35%',
		flex: 1,
		justifyContent: 'flex-end',
	},
	text_header: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 82,
		textAlign: 'center',
		textAlignVertical: 'bottom',
	},
});
