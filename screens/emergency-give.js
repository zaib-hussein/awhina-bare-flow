import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {EmergencyOption} from './emergency-option';

const emergencyOptions = [
    {type: 'Water', isHelp: false},
    {type: 'Food', isHelp: false},
    {type: 'Shelter', isHelp: false},
    {type: 'Lost', isHelp: false},
    {type: 'Clothes', isHelp: false},
    {type: '', isHelp: false},
];

export default function EmergencyGive() {
	
    const renderItem = ({ item }) => (
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

