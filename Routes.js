import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Tutorial from './screens/Tutorial';
import Splash from './screens/Splash';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import HomeScreen from './screens/home';
import AboutScreen from './screens/about';
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const mainStack = () =>(

<Stack.Navigator initialRouteName="Login">
<Stack.Screen name="Login" component={LoginScreen}
options={{headerShown: false,}}
/>
<Stack.Screen name="Register" component={RegisterScreen} />
<Stack.Screen name="Splash" component={Splash} />

</Stack.Navigator>
)

const secondStack = () => (
  <Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={HomeScreen}
    options={{headerShown: false,}}

  />
  <Stack.Screen name="About" component={AboutScreen} />
  </Stack.Navigator>
)

function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Splash">
      <Drawer.Screen name="Login" component={mainStack} />
      <Drawer.Screen name="Home" component={secondStack} />
      <Drawer.Screen name="Tutorial" component={Tutorial} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Splash" component={Splash}
        options={() => ({
          drawerLabel: () => null,
        })}
      />
      </Drawer.Navigator>
     </NavigationContainer>
  );
}
export default Routes;
