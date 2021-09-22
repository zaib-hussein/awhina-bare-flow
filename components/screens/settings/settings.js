
import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { ListItem, Icon, Divider} from 'react-native-elements'
import {  FontAwesome } from "@expo/vector-icons"
import { marginLeft } from 'styled-system';

export default function Setting({navigation}) {
 //bio switch
 const [isEnabled, setIsEnabled] = useState(false);
 const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//locations
 const [isOn, setIsOn] = useState(true);

//notificaiton switch
 const [isSelected, setSelection] = useState(false);

// sign out cons
// const { signOut } = React.useContext(AuthContext);

    return ( 
        <View style={styles.container}>
        <ScrollView>

          <ListItem>
          <Icon ml="auto" name="map" color='red' />
            <ListItem.Title>Location       </ListItem.Title>
            <Switch style={styles.sview}
                      trackColor={{ false: "red", true: "salmon" }}
                      thumbColor={isEnabled ? "white" : "white"}
                      // onValueChange={setIsOn}
                      value={isOn}
                  />
                
          </ListItem>

            <Divider orientation="horizontal" paddingTop={2}/>

          <ListItem>
          <Icon ml="auto" name="notifications" color='red'/>
            <ListItem.Title>Notifications</ListItem.Title>
                 <Switch style={styles.sview}
                    value={isSelected}
                    onValueChange={setSelection}
                  />
          </ListItem>

            <Divider orientation="horizontal" paddingTop={2}/>

          <ListItem>
          <Icon name="fingerprint" color='red'/>
            <ListItem.Title>Biometrics   </ListItem.Title>
            <Switch style={styles.sview}
                      trackColor={{ false: "salmon", true: "red" }}
                      thumbColor={isEnabled ? "white" : "white"}
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                  />
          </ListItem>

            <Divider orientation="horizontal" paddingTop={2}/>

          <ListItem>
          <Icon
                  // raised
                  name='help'
                  size={25}
                  color='red'
                  onPress={() => navigation.navigate('Tutorial')} />
            <ListItem.Title>Help</ListItem.Title>
                <ListItem.Subtitle>Click to View Tutorial</ListItem.Subtitle>
          </ListItem>

            <Divider orientation="horizontal" paddingTop={2}/>

          <ListItem>
          <Icon ml="auto" name="info" color='red'/>
            <ListItem.Title>Version</ListItem.Title>
              <ListItem.Subtitle>1.0.0</ListItem.Subtitle>
          </ListItem>

            <Divider orientation="horizontal" paddingTop={2}/>

          <ListItem>
          <Icon
              // raised
              name='logout'
              color='red'
              onPress={() => alert('logout succesfull')} />
            <ListItem.Title>Log Out</ListItem.Title>
          </ListItem> 

        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      //backgroundColor: '#ecf0f1',
      //padding: 8,
    },
    sview: {
      marginLeft: 150,
    },
   
  })
