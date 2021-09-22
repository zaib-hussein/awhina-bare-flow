import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

export default function EmergencyHelp() {
  return (
    <>
      <Text>THIS IS HELP SCREEN </Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert('I Need Water');
          }}
        >
          <Image source={require('./emergency-icons/water.png')} />
        </TouchableOpacity>
        <Text>WATER</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert('I Need Food');
          }}
        >
          <Image source={require('./emergency-icons/food.png')} />
        </TouchableOpacity>
        <Text>FOOD</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert('I Need Shelter');
          }}
        >
          <Image source={require('./emergency-icons/shelter.png')} />
        </TouchableOpacity>
        <Text>SHELTER</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert('I Need Help Finding Way');
          }}
        >
          <Image source={require('./emergency-icons/lost.png')} />
        </TouchableOpacity>
        <Text>LOST</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert('I Need clothes');
          }}
        >
          <Image source={require('./emergency-icons/clothes.png')} />
        </TouchableOpacity>
        <Text>CLOTHES</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ff4500', ///background color for contain.
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
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
