import React from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'

import { loginFunc } from '../../components/globalFunctions'
import { styles } from './styles'

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