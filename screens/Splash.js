import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.lottieView}>
                <LottieView
                    source={require('./icons/splash.json')}
                    autoPlay={true}
                    loop={false}
                    onAnimationFinish={() => navigation.navigate("Login")}
                ></LottieView>
            </View>
        </View>
    );
};
export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    lottieView: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});