import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Tutorial from '../components/screens/tutorial/Tutorial';
import Splash from '../components/screens/splash/Splash';
import LoginScreen from '../components/screens/login/login';
import RegisterScreen from '../components/screens/register/register';
import HomeScreen from '../components/screens/home/home'
import AboutScreen from '../components/screens/about/about';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

<<<<<<< HEAD
const initialStack = () => (
=======
const mainStack = () => (
>>>>>>> parent of f1b6e88 (UI update)
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Splash" component={Splash} />
  </Stack.Navigator>
);

<<<<<<< HEAD
const mainStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
=======
const secondStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
>>>>>>> parent of f1b6e88 (UI update)
    <Stack.Screen name="About" component={AboutScreen} />
  </Stack.Navigator>
);

function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Splash">
        <Drawer.Screen name="Login" component={initialStack} />
        <Drawer.Screen name="Home" component={mainStack} />
        <Drawer.Screen name="Tutorial" component={Tutorial} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={() => ({
            drawerLabel: () => null,
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
