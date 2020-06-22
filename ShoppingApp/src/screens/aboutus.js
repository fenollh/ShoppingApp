import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

export default class AboutUsScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>ABOUT SCREEN</Text>
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