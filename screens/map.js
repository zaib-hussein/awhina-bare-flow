import { StyleSheet, Text,Platform,View} from 'react-native';
import MapView,{Marker}from 'react-native-maps';
import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Polyline from '@mapbox/polyline';
import MapViewDirections from 'react-native-maps-directions';


const coordinates=[
  {
    latitude:-36.858755,
    longitude:174.76163,
  },
  {
    latitude:-36.717228,
    longitude:174.714586,
  },
];

const GOOGLE_MAPS_APIKEY='AIzaSyC0SDraN_tbT6XX7Uxr4N_gkBgVsuWo-IY';


class Map extends Component {

  render(){
    return (
    <View style={styles.container}>
      <MapView
              
              showsUserLocation={true}
              style={StyleSheet.absoluteFill}
              initialRegion={coordinates[0]
              }>

        <Marker 
        coordinates={coordinates[0]} 
        />
        <Marker 
        coordinates={coordinates[1]} 
        title={"Volunteer"}
        />
        <MapViewDirections 
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          />

      </MapView>
      </View>
    )
  };
};
    
  

  const styles = StyleSheet.create({
  container: {
      flex:1,
  },
});
export default Map;
///
