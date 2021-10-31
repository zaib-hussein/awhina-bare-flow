import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { db, auth } from '../firebase/firebaseconfig';
import {createStackNavigator} from '@react-navigation/stack';

const ChatStack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true); 

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            
            latestMessage: {
              text: ''
            },
            ...documentSnapshot.data(),
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
              title={item.name}
              description={item.latestMessage.text}
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