import React from 'react';
import {TouchableOpacity, Alert, StyleSheet, Image, Text} from 'react-native';

export class EmergencyOption extends React.Component {
  getUri() {
    switch (this.props.type) {
      case 'water':
        return require('./emergency-icons/water.png');
        break;
      case 'clothes':
        return require('./emergency-icons/clothes.png');
        break;
      case 'food':
        return require('./emergency-icons/food.png');
        break;
      case 'lost':
        return require('./emergency-icons/lost.png');
        break;
      case 'shelter':
        return require('./emergency-icons/shelter.png');
        break;
      default:
        return require('./emergency-icons/question-mark.png')
        break;
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
