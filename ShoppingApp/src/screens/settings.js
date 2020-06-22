import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

export default class SettingsScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>SETTINGS SCREEN</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    }
})