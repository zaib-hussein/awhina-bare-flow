import { StyleSheet, Text,View} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import React, {Component, useState,useRef} from 'react';
import MapViewDirections from 'react-native-maps-directions';

const map = () => {
  const [state,setState] = useState({
    userLocation:{
      latitude:-36.858755,
      longitude:174.76163,
      latitudeDelta:0.0922,
      longitudeDelta:0.0421,
    },
    voluneerLocation:{
      latitude:-36.717228,
      longitude:174.714586,
      latitudeDelta:0.0922,
      longitudeDelta:0.0421,
    } 
  })
const mapRef= useRef()

const {userLocation,voluneerLocation} = state;

const GOOGLE_MAPS_APIKEY='AIzaSyC0SDraN_tbT6XX7Uxr4N_gkBgVsuWo-IY';

    return (
    <View style={styles.container}>
      <MapView
      ref={mapRef}
      showsUserLocation={true}
      showsCompass={true}
      style={StyleSheet.absoluteFill}
      initialRegion={userLocation}
      >

        <Marker 
        coordinate={voluneerLocation} 
        title={"Volunteer"}
        />
        <MapViewDirections 
          origin={userLocation}
          destination={voluneerLocation}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={result=> {
            mapRef.current.fitToCoordinates(result.coordinates,{
              edgePadding:{
                right:30,
                bottom:300,
                left:30,
                top:100
              }
            })
          }}
          />

      </MapView>
      </View>
    );
  };

    
  
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});
export default map;
///
