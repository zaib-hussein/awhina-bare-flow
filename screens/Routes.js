import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './login/login';
import RegisterScreen from './register/register';
import HomeScreen from './home/home';
import AboutScreen from './about/about';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const mainStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const secondStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
  </Stack.Navigator>
);

function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={mainStack} />
        <Drawer.Screen name="Home" component={secondStack} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Routes;