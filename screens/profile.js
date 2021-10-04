import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from 'react-native-elements'


export default function Profile({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      {/* user profile photo and details */}
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            // source={{
            //   uri: 'maybe get from user library/database?',
            // }}
            source={require('./icons/awhina.png')} //temporary placeholder
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>Person Name</Title>
            <Caption style={styles.caption}>Helper</Caption>
          </View>
        </View>
      </View>

      {/* user information */}
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#FF6347" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Auckland, NZ</Text>
        </View>

        <View style={styles.row}>
          <Icon name="phone" color="#FF6347" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>+64 000000000</Text>
        </View>

        <View style={styles.row}>
          <Icon name="email" color="#FF6347" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>user_n@email.com</Text>
        </View>
      </View>

      <Divider orientation="horizontal" paddingTop={2}/>

      {/* user menu options */}
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableRipple>

        <Divider orientation="horizontal" paddingTop={2}/>

        <TouchableRipple onPress={() => navigation.navigate('Setting')}>
          <View style={styles.menuItem}>
            <Icon name="cogs" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>

        <Divider orientation="horizontal" paddingTop={2}/>

      </View>
    </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    marginLeft: 20,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
  },
});