import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { db, auth } from '../firebase/firebaseconfig';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InboxScreen from './inbox';

// const Stack = createStackNavigator();

// function chatRoute() {
//   return(
//   <Stack.Navigator>
//     <Stack.Screen
//       name='Chat'
//       component={InboxScreen}
//     />
//   </Stack.Navigator>
//   );
// }

const ChatStack = createStackNavigator();

function ChatApp() {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6646ee'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22
        }
      }}
    >
      {/* Add this */}
      <ChatStack.Screen 
        name='Chat' 
        component={InboxScreen} 
      />
    </ChatStack.Navigator>
  );
}

function chatStack() {
  return (
    <ModalStack.Navigator mode='modal' headerMode='none'>
      <ModalStack.Screen name='Chat' component={ChatApp} />
    </ModalStack.Navigator>
  );}

export default function HomeScreen({ navigation }) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState([]);
  const [message, setMessage] = useState([]);

  db.collection('users')
    .doc(auth.currentUser.email)
    .get()
    .then((snapshot) => {
      if(snapshot.exists)
      { 
        setUsername(snapshot.data());
      }
      else{  
        console.log("No data found!");
      }
    })

    db.collection('chats')
    .orderBy('createdAt', 'desc')
    .get()
    .then((snapshot) => {
      if(snapshot.exists)
      { 
        setMessage(snapshot.data());
      }
      else{  
        console.log("No data found!");
      }
    })
      

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = db
      .collection('chats').limit(1)
      //.orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            text: '',
            ...documentSnapshot.data()
          };
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });
    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat', { thread: item })}
          >
            <List.Item
              title={username.firstname}
              description='Message Display Here'
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D3D3D3',
    flex: 1
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  }
});