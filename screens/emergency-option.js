import React from 'react';
import {TouchableOpacity, Alert, StyleSheet, Image, Text} from 'react-native';

export class EmergencyOption extends React.Component {
	getUri() {
		switch (this.props.type) {
			case 'Water':
				return require('./icons/water.png');
				break;
			case 'Clothes':
				return require('./icons/clothes.png');
				break;
			case 'Food':
				return require('./icons/food.png');
				break;
			case 'Lost':
				return require('./icons/lost.png');
				break;
			case 'Shelter':
				return require('./icons/shelter.png');
				break;
			default:
				return require('./icons/unknown.png');
				break;
		}
	}

	getIsHelp() {
		return this.props.isHelp ? 'need' : 'can give';
	}

	getIsHelpTitle() {
		return this.props.isHelp
			? 'We will alert the community'
			: 'We will let the community know';
	}

	render() {
		return (
			<TouchableOpacity
				style={
					this.getIsHelp() === 'can give'
						? styles.giveOption
						: styles.helpOption
				}
				onPress={() => {
					Alert.alert(
						`${this.getIsHelpTitle()}`,
						`You ${this.getIsHelp()} ${this.props.type}`
					);
				}}>
				<Image source={this.getUri()} />
				<Text style={styles.optionTitle}>{this.props.type}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	giveOption: {
		display: 'flex',
		backgroundColor: '#50DE80',
		borderRadius: 10,
		padding: 10,
		margin: 5,
		shadowColor: '#ff0000',
		shadowOffset: {width: 1, height: 5},
		shadowRadius: 10,
		shadowOpacity: 0.35,
		color: 'white',
		justifyContent: 'center',
	},
	helpOption: {
		display: 'flex',
		backgroundColor: '#DE5050',
		borderRadius: 10,
		padding: 10,
		margin: 5,
		shadowColor: '#ff0000',
		shadowOffset: {width: 1, height: 5},
		shadowRadius: 10,
		shadowOpacity: 0.35,
		color: 'black',
		justifyContent: 'center',
	},
	optionTitle: {
		textAlign: 'center',
	},
});
