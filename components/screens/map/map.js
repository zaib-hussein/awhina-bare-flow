import {StyleSheet, Text, Platform, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import React, {Component} from 'react';

class Map extends Component {
  render() {
    return (
      <>
        {/* <MapView
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            latitude: -36.858755,
            longitude: 174.76163,
            latitudeDelta: 0.0812,
            longitudeDelta: 0.0402,
          }}
        /> */}
      </>
    );
  }
}

export default Map;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //   width: Dimensions.get('window').width,
    //   height: 500,
  },
});

///
