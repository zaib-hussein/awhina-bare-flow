import React from 'react';
import {
	TouchableOpacity,
	View,
	Alert,
	StyleSheet,
	Image,
	Text,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Prompt from 'react-native-input-prompt';

export class EmergencyOption extends React.Component {
	constructor() {
		super();
		this.state = {
			promptText: '',
			promptVisible: false,
		};
	}

	// getPlaceHolderText() {
	// 	let placeholderText;
	// 	switch (this.props.type) {
	// 		case 'Water':
	// 			placeholderText = 'E.g. Case of water bottles available';
	// 		case 'Clothes':
	// 			placeholderText = 'E.g. Large and medium womens clothes';
	// 		case 'Food':
	// 			placeholderText = 'E.g. One kilogram rice';
	// 		case 'Lost':
	// 			placeholderText = 'E.g. Available to help around central city';
	// 		case 'Shelter':
	// 			placeholderText =
	// 				'E.g. One bed available until after the storm';
	// 		default:
	// 			placeholderText =
	// 				'E.g. I have a spare radio for someone in need';
	// 	}

	// 	this.setState({
	// 		promptPlaceHolderText: placeholderText,
	// 		promptText: this.state.promptText,
	// 		promptVisible: this.state.promptVisible,
	// 	});
	// }

	getUri() {
		switch (this.props.type) {
			case 'Water':
				return require('./icons/water.png');
			case 'Clothes':
				return require('./icons/clothes.png');
			case 'Food':
				return require('./icons/food.png');
			case 'Lost':
				return require('./icons/lost.png');
			case 'Shelter':
				return require('./icons/shelter.png');
			default:
				return require('./icons/unknown.png');
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
			<>
				<TouchableOpacity
					onPress={() => {
						this.setState({
							promptText: this.state.promptText,
							promptVisible: true,
						});
						// Alert.alert(
						// 	`${this.getIsHelpTitle()}`,
						// 	`You ${this.getIsHelp()} ${this.props.type}`
						// );
					}}>
					<Animatable.View
						animation='pulse'
						style={
							this.getIsHelp() === 'can give'
								? styles.giveOption
								: styles.helpOption
						}>
						<Image source={this.getUri()} />
						<Text style={styles.optionTitle}>
							{this.props.type}
						</Text>
					</Animatable.View>
				</TouchableOpacity>

				<Prompt
					visible={this.state.promptVisible}
					title={this.getIsHelpTitle()}
					placeholder={'Enter details'}
					onCancel={() =>
						this.setState({
							promptText: 'User Cancelled!',
							promptVisible: !this.state.promptVisible,
						})
					}
					onSubmit={text =>
						this.setState({
							promptText: 'User submitted: ' + text,
							promptVisible: !this.state.promptVisible,
						})
					}
				/>
			</>
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
