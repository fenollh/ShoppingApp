import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

const Header = _ => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>SHOPPING APP</Text>
        </View>
    );
}; export default Header

const styles = StyleSheet.create({
    container:{
        flex: 0.02, 
        flexDirection: 'row',
        backgroundColor: 'rgb(80,130,255)',
        justifyContent: 'center'
    },
    title:{
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    }
})