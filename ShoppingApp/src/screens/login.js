import React from 'react'
import {State} from '../components/state'
import {loginFunc} from '../components/globalFunctions'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

export default class LoginScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: '',
        }
    }
    
    render(){
        return(
            <View style={styles.container}>
                <View style={{height: '25%'}}/>
                <View style={styles.header}><Text style={styles.title}> LOGIN </Text></View>
                <View style={{height: 250, padding: '2%'}}>
                    <View style={styles.formBox}>
                        <TextInput
                        value={this.state.username}
                        onChangeText={username=>this.setState({ username })}
                        style={styles.input}
                        placeholder='email'
                        autoCapitalize='none'
                        maxLength={20}
                        />
                        <TextInput
                        value={this.state.password}
                        onChangeText={password=>this.setState({ password })}
                        style={styles.input}
                        placeholder='password'
                        autoCapitalize='none'
                        maxLength={50}
                        secureTextEntry={true}
                        />
                        <Text style={{alignSelf: 'flex-start', marginTop: 20}}> Remember me </Text>
                        <Text style={{alignSelf: 'center', marginTop: 20}}> Terms and conditions </Text>
                    </View>
                </View>
                <View style={{height:'20%'}}>
                    <TouchableOpacity 
                    style={[styles.boton, {backgroundColor: 'rgb(100,230,150)', marginTop: '10%'}]} 
                    activeOpacity={0.6} 
                    onPress={_=>loginFunc(this.state.username, this.state.password, this.props.navigation)}>
                        <Text style={styles.botonTxt}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.boton]} activeOpacity={0.6}>
                        <Text style={[styles.botonTxt, {fontSize: 15}]}>CREATE AN ACCOUNT</Text>
                    </TouchableOpacity>
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
        height: '10%',
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
        padding: '3%',
        borderRadius: 20,
        borderColor: 'rgb(52,167,251)',
        borderWidth: 1,
        backgroundColor: 'rgb(220,230,255)'
    },
    boton:{
        flex:1,
        borderRadius: 10,
        margin: '3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(50,50,50)',
    },
    input: {
        backgroundColor: 'rgb(220,255,255)',
        marginVertical: '3%',
        borderRadius: 10,
        padding: '3%',
    },
})