import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


const Tutorial = ({navigation}) => {
    return( //array for tutorial pages
        <Onboarding
            onSkip={() => navigation.navigate("Home")}
            onDone={() => navigation.navigate("Home")}

            pages={[
            {
                backgroundColor: '#add8e6',
                image: <Image source={require('./icons/awhina.png')} />,
                title: 'Welcome to Awhina Emergency Services',
                subtitle: 'continue to get a quick tutorial..',
            },
            {
                backgroundColor: '#008080',
                image: <Image source={require('./icons/awhina.png')} />,
                title: 'This will be the default screen where a user can select to give or receive help',
                subtitle: 'Click on either Give or Receive options.',
            },
            {
                backgroundColor: '#90ee90',
                image: <Image source={require('./icons/awhina.png')} />,
                title: 'GIVE HELP screen',
                subtitle: "select from options with what you would like to help with",
            },
            {
                backgroundColor: '#cd5c5c',
                image: <Image source={require('./icons/awhina.png')} />,
                title: 'RECEIVE HELP screen',
                subtitle: "click on options available on screen to send a request onto nearby users",
            },
            ]}
        />
    );
};

export default Tutorial;

const styles = StyleSheet.create({
    container: {
        flex:1, 
        alignItems: 'center',
        justifyContent: 'center',

    },
});