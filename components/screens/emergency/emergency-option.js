import React from 'react';
import {TouchableOpacity, Alert, StyleSheet, Image, Text} from 'react-native';

export class EmergencyOption extends React.Component {
  getUri() {
    switch (this.props.type) {
      case 'water':
        return require('../icons/water.png');
      case 'clothes':
        return require('../icons/clothes.png');
      case 'food':
        return require('../icons/food.png');
      case 'lost':
        return require('../icons/lost.png');
      case 'shelter':
        return require('../icons/shelter.png');
      default:
        return require('../icons/question-mark.png');
    }
  }

  getIsHelp() {
    return this.props.isHelp ? 'need' : 'can give';
  }

  getIsHelpTitle(){
    return this.props.isHelp ? 'We will alert the community' : 'We will let the community know';
  }

  render() {
    return (
      <>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(`${this.getIsHelpTitle()}`, `You ${this.getIsHelp()} ${this.props.type}`);
          }}
        >
          <Image source={this.getUri()} />
        </TouchableOpacity>
        <Text style={styles.optionTitle}>{this.props.type}</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#ff0000',
    shadowOffset: {width: 1, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  optionTitle: {
    textTransform: 'uppercase',
  },
});
