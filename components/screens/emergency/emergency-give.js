import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {EmergencyOption} from './emergency-option';

export default function EmergencyGive() {
  return (
    <>
      <Text>THIS IS GIVE SCREEN </Text>
      <View style={styles.container}>
        <EmergencyOption type="water" isHelp={false} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert('I can give Food');
          }}
        >
          <Image source={require('..icons')} />
        </TouchableOpacity>
        <Text>FOOD</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert('I can provide Shelter');
          }}
        >
          <Image source={require('..icons/shelter.png')} />
        </TouchableOpacity>
        <Text>SHELTER</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert('I can find someone');
          }}
        >
          <Image source={require('..icons/lost.png')} />
        </TouchableOpacity>
        <Text>LOST</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert('I can provide clothes');
          }}
        >
          <Image source={require('..icons/clothes.png')} />
        </TouchableOpacity>
        <Text>CLOTHES</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
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
