import { StyleSheet, Text,Platform,View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';



export class Map extends Component {

  constructor(props){
    super(props);
    this.state={
      latitude:0,
      longitude:0,
      latitudeDelta:0,
      longitudeDelta:0
    };
  }
  
  componentDidMount(){
    this.requestLocationPermission();
  }

  requestLocationPermission = async () => {
    if(Platform.OS === 'ios'){
      var response = await request (PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (response === 'granted'){
        this.locationCurrentPosition();
      }
      }
      else{
        var response = await request (PERMISSIONS.ANDROID.ACCESS_FIINE_LOCATION);
        
        if(response === 'granted'){
          this.locationCurrentPosition();
        }

      }
      
    }
  

  locationCurrentPosition =()=>{
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));
  
        let initialPosition = {
          latitude:position.latitude,
          longitude:position.longitude,
          latitudeDelta:0.0812,
          longitudeDelta:0.0402
        }
        this.setState({initialPosition});
      },
    )
  }
 
    render() {
      return (
          <MapView
              ref = {map => this._map = map}
              showsUserLocation={true}
              style={styles.map}
              initialRegion={this.state.initialPosition

                
              }
          ></MapView>
      );
    }
  
  }

  

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
export default Map;
///
