import React from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class LoginScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={{height: 100, width: 100, backgroundColor: 'blue'}} onPress={()=> this.props.navigation.navigate('Main')}>

                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'green',
    },
})