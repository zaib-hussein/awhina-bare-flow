import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { marginTop } from 'styled-system';


const Tutorial = ({navigation}) => {
    return( //array for tutorial pages
        <Onboarding
            onSkip={() => navigation.navigate("Home")}
            onDone={() => navigation.navigate("Home")}

            pages={[
            {
                backgroundColor: 'white',
                image: <Image source={require('./icons/awhinacare.png')} />,
                title: 'Welcome to Awhina Community Services',
                subtitle: 'continue to get a quick tutorial..',
            },
            {
                backgroundColor: '#008080',
                image: <Image source={require('./icons/home.jpg')} />,
                title: 'This will be the default screen where a user can select to give or receive help',
                subtitle: 'Click on either Give or Receive options.',
            },
            {
                backgroundColor: '#90ee90',
                image: <Image source={require('./icons/give.jpg')} />,
                title: 'GIVE screen',
                subtitle: "select from options with what you would like to help with",
            },
            {
                backgroundColor: '#cd5c5c',
                image: <Image source={require('./icons/help.jpg')} />,
                title: 'HELP screen',
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