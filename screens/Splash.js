import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.lottieView}>
        <LottieView
          source={require('./bottomIcons/setting.json')}
          autoPlay={true}
          loop={false}
          onAnimationFinish={() => navigation.navigate('Login')}
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
