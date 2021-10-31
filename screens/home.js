/* the following code below is for the home screen with react navigation package*/

import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import SettingScreen from './setting';
import EmergencyScreen from './emergency';
import InboxScreen from './chatStack';
import MapScreen from './map';
import ProfileScreen from './profile';

//settings screen returned as a component when clicked settings tab
function Setting() {
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>route settings screen here </Text>
		</View>
	);
}

//profile screen returned as a component when clicked profile tab
function Profile() {
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>route profile screen here </Text>
		</View>
	);
}

//inbox screen returned as a component when clicked inbox tab
function Inbox() {
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>route inbox messages here </Text>
		</View>
	);
}

//emergency screen returned as a component when clicked emergency tab
function Emergency() {
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>route always emergency here </Text>
		</View>
	);
}

//map screen returned as a component when clicked map tab
function Map() {
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			{/* <Text>route map screen heres </Text> */}
		</View>
	);
}

const Tab = createBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Emergency"
			tabBarOptions={{
			activeTintColor: '#e91e63',
			}}
		>
			<Tab.Screen
				name="Setting"
				component={SettingScreen}
				options={{
					tabBarLabel: 'Setting',
					tabBarIcon: ({color, size, focused}) => (
						// <MaterialCommunityIcons name="cogs" color={color} size={size} />
						<LottieView  source={require('./bottomIcons/setting.json')} autoPlay={focused} />

					),
				}}
			/>

			<Tab.Screen
				name="Inbox"
				component={InboxScreen}
				options={{
					tabBarLabel: 'Inbox',
					tabBarIcon: ({color, size, focused}) => (
						// <MaterialCommunityIcons
						// 	name="chat-outline"
						// 	color={color}
						// 	size={size}
						// />
						<LottieView  source={require('./bottomIcons/chat.json')} autoPlay={focused} />

					),
				}}
			/>

			<Tab.Screen
				name="Emergency"
				component={EmergencyScreen}
				options={{
					tabBarLabel: 'Emergency',
					tabBarIcon: ({color, size, focused}) => (
						// <MaterialCommunityIcons
						// 	name="alarm-light-outline"
						// 	color={color}
						// 	size={size}
						// />
						<LottieView  source={require('./bottomIcons/emergency.json')} autoPlay={focused} />

					),
				}}
			/>

			<Tab.Screen
				name="Map"
				component={MapScreen}
				options={{
					headerShown: false,
					tabBarLabel: 'Map',
					tabBarIcon: ({color, size, focused}) => (
						// <MaterialCommunityIcons name="map" color={color} size={size} />
						<LottieView  source={require('./bottomIcons/area-map.json')} autoPlay={focused} />

					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarLabel: 'Profile',
					tabBarIcon: ({color, size, focused}) => (
						// <MaterialCommunityIcons name="account" color={color} size={size} />
						<LottieView  source={require('./bottomIcons/profile.json')} autoPlay={focused} />

					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	return <MyTabs />;
}
