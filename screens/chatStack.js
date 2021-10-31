import React from 'react';
import { IconButton } from 'react-native-paper';

// import third party libraries 
import {createStackNavigator} from '@react-navigation/stack';

// import screens 
import ChatListScreen from './inbox'
import NewRoomScreen from './chatNewRoom'
import ChatScreen from './chatRoom'

const RootStack = createStackNavigator();

export default class ChatStack extends React.Component {
  render() {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name='Inbox'
          component={ChatListScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                icon='message-plus'
                size={28}
                color='#000000'
                onPress={() => navigation.navigate('Add Room')}
              />
            )
          })}
        />
        <RootStack.Screen 
          name='Add Room' 
          component={NewRoomScreen}
        />
        <RootStack.Screen
          name='Chat'
          component={ChatScreen}
        />
      </RootStack.Navigator>
    );
  }
}