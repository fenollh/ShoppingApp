import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

export default class ContactUsScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>CONTACT US SCREEN</Text>
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