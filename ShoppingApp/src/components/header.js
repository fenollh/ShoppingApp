import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

const UserIcon = <Ionicons name='md-person' size={60} style={{alignSelf: 'center'}}/>
const SettingsIcon = <Ionicons name='ios-settings' size={60} style={{alignSelf: 'center'}}/>


const Header = _ => {
    return(
        <View style={styles.container}>
            <View style={{flex:1, justifyContent: 'center'}}>
                {SettingsIcon}
            </View>
            <View style={{flex:2, justifyContent: 'center'}}>
                <Text style={styles.title}>SHOPPING APP</Text>
            </View>
            <View style={{flex:1, justifyContent: 'center'}}>
                {UserIcon}
            </View>
        </View>
    );
}; export default Header

const styles = StyleSheet.create({
    container:{
        flex: 0.1, 
        flexDirection: 'row',
        backgroundColor: 'rgb(255,255,255)',
    },
    title:{
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    }
})