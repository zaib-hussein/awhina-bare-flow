import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Title, TextInput } from 'react-native-paper';
import { db, auth } from '../firebase/firebaseconfig';

export default function chatNewRoom({ navigation }) {
  const [roomName, setRoomName] = useState('');
  const [user, setUser] = useState([]);

  db.collection('users')
    .doc(auth.currentUser.email)
    .get()
    .then((snapshot) => {
      if(snapshot.exists)
      { 
        setUser(snapshot.data());
      }
      else{  
        console.log("No data found!");
      }
    })

  /**
   * Create a new Firestore collection to save threads
   */
  function handleButtonPress() {
    if (roomName.length > 0 || roomName == user.firstname) {
      db.collection('chats')
        .add({
          name: roomName,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime()
          }
        })
        .then(docRef => {
          docRef.collection('Messages').add({
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
            system: true
          });
          navigation.navigate('Inbox');
        });      
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <TextInput
          placeholder='Room Name'
          style={styles.input}
          value={roomName}
          numberOfLines={1}
          onChangeText={text => setRoomName(text)}
          clearButtonMode='while-editing'
        />
        <Button
          title="Create"
          mode='contained'
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  buttonLabel: {
    fontSize: 22
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: 285 / 1.5,
    height: 458 / 15
  }
});