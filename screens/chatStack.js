import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InboxScreen from './inbox';

const ChatStack = createStackNavigator();

const ModalStack = createStackNavigator();

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

export default function chatStack() {
  return (
    <ModalStack.Navigator mode='modal' headerMode='none'>
      <ModalStack.Screen name='Chat' component={ChatApp} />
      <ModalStack.Screen name='AddRoom' component={AddRoomScreen} />
    </ModalStack.Navigator>
  );
}