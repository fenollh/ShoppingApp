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
                <View style={styles.header}><Text style={styles.title}> LOGIN </Text></View>
                <View style={{flex: 1}}/>
                <View style={{flex: 4, padding: '2%'}}>
                    <View style={styles.formBox}>

                    </View>
                </View>
                <View style={{flex:2, backgroundColor: 'red'}}>
                    <TouchableOpacity></TouchableOpacity>
                </View>

                {/*<TouchableOpacity style={{height: 100, width: 100, backgroundColor: 'blue'}} onPress={()=> this.props.navigation.navigate('Main')}/>*/}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: '3%',
        backgroundColor: 'rgb(220,245,240)'
    },
    header:{
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'rgb(52,167,251)',
        fontSize: 30
    },
    formBox: {
        flex: 1,
        borderRadius: 20,
        borderColor: 'rgb(52,167,251)',
        borderWidth: 1,
        backgroundColor: 'rgb(220,230,255)'
    }
})