import React from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {EmergencyOption} from './emergency-option';

const emergencyOptions = [
	{type: 'Water', isHelp: true},
	{type: 'Food', isHelp: true},
	{type: 'Shelter', isHelp: true},
	{type: 'Lost', isHelp: true},
	{type: 'Clothes', isHelp: true},
	{type: '', isHelp: true},
];

export default function EmergencyGive() {
	const renderItem = ({item}) => (
		<EmergencyOption type={item.type} isHelp={item.isHelp} />
	);

	return (
		<SafeAreaView>
			<FlatList
				data={emergencyOptions}
				renderItem={renderItem}
				numColumns={2}
				keyExtractor={(item, index) => index}
			/>
		</SafeAreaView>
	);
}
