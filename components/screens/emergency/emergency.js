import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar
} from 'react-native';
import EmergencyGive from './emergency-give';
import EmergencyHelp from './emergency-help';

export default function Emergency() {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (selectedOption === 'give') {
    } else if (selectedOption === 'help') {
    } else {
      setSelectedOption('');
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedOption ? (
        selectedOption === 'give' ? (
          <EmergencyGive />
        ) : selectedOption === 'help' ? (
          <EmergencyHelp />
        ) : null
      ) : null}
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.give}
          onPress={() => setSelectedOption('give')}
        >
          <Text>GIVE - HELP OTHERS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.help}
          onPress={() => setSelectedOption('help')}
        >
          <Text>HELP - YOU NEED HELP</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ff4500', ///background color for contain.
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginTop: StatusBar,
    height: '80%',
    width: '100%',
    marginTop: 10,
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
    shadowColor: '#ff0000',
    shadowOffset: {width: 1, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  help: {
    color: 'black',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  give: {
    color: 'black',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});
