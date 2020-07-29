import React from 'react'
import { loginFunc } from '../../components/globalFunctions'
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
            usermail: '',
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
                        value={this.state.usermail}
                        onChangeText={usermail=>this.setState({ usermail })}
                        style={styles.input}
                        placeholder='Email'
                        autoCapitalize='none'
                        maxLength={20}
                        />
                        <TextInput
                        value={this.state.password}
                        onChangeText={password=>this.setState({ password })}
                        style={styles.input}
                        placeholder='Password'
                        autoCapitalize='none'
                        maxLength={50}
                        secureTextEntry={true}
                        />
                        <Text style={{alignSelf: 'flex-start', marginTop: 20}}> Remember me </Text>
                        <Text style={{alignSelf: 'center', marginTop: 20}}> Terms and conditions </Text>
                    </View>
                </View>
                <View style={{height:'25%'}}>
                    <TouchableOpacity 
                    style={[styles.boton, {backgroundColor: 'rgb(100,230,150)', marginTop: '10%', flex: 2}]} 
                    activeOpacity={0.6} 
                    onPress={_=>loginFunc(this.state.usermail, this.state.password, this.props.navigation)}>
                        <Text style={styles.botonTxt}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.boton]} activeOpacity={0.6} onPress={_=>this.props.navigation.navigate('RegisterCostumer')}>
                        <Text style={[styles.botonTxt, {fontSize: 15}]}>CREATE A COSTUMER ACCOUNT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.boton]} activeOpacity={0.6} onPress={_=>this.props.navigation.navigate('RegisterShop')}>
                        <Text style={[styles.botonTxt, {fontSize: 15}]}>CREATE A SHOP ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: '3%',
        backgroundColor: 'rgb(240,245,240)'
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
        backgroundColor: 'rgb(240,245,240)',
        marginVertical: '3%',
        borderRadius: 10,
        padding: '3%',
    },
})