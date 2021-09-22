
import React from 'react';  
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';


export default function About () {
    return ( 
        <View style={styles.container}>

            <View>
                <Text>This is an emergency service app "Awhina" developed by the R&D team at AUT.</Text>
                <Text>Copyright &copy; Auckland University of Technology, R&D Team Awhina 2021</Text>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,

    }
})
