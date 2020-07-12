import React from 'react'
import { updateUserDB, checkRegisterForm } from '../../components/globalFunctions'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default class RegisterShopScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            username: '',
            usermail: '',
            name: '',
            password: '',
            password2: '',
            age: '',
            phone: '',
            photo: '',
        }
    }

    checkForm = _ => {
        if(checkRegisterForm('shop', this.state, {pass1: this.pass1, pass2: this.pass2})){
            updateUserDB(this.state, this.props.navigation)
        }
    } 
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}><Text style={styles.title}> CREATE A SHOP ACCOUNT </Text></View>
                <View style={{height: '20%', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{height: 100, width: 100, borderRadius: 50, backgroundColor: 'red'}}>
                    </View>
                    <Text style={{marginTop: 10, fontWeight: 'bold'}}>CHANGE IMAGE</Text>
                </View>
                <View style={{height: '60%', padding: '2%'}}>
                    <View style={styles.formBox}>
                        <ScrollView>
                        <TextInput
                        value={this.state.username}
                        onChangeText={username=>this.setState({ username })}
                        style={styles.input}
                        placeholder='Shop name'
                        autoCompleteType='username'
                        autoCapitalize='none'
                        maxLength={20}
                        />
                        <TextInput
                        value={this.state.name}
                        onChangeText={name=>this.setState({ name })}
                        style={styles.input}
                        placeholder='Manager name'
                        autoCompleteType='name'
                        autoCapitalize='none'
                        maxLength={20}
                        />
                        <TextInput
                        value={this.state.usermail}
                        onChangeText={usermail=>this.setState({ usermail })}
                        style={styles.input}
                        placeholder='Email'
                        autoCompleteType='email'
                        keyboardType= 'email-address'
                        autoCapitalize='none'
                        maxLength={20}
                        />
                        <TextInput
                        ref={input => { this.pass1 = input }}
                        value={this.state.password}
                        onChangeText={password=>this.setState({ password })}
                        style={styles.input}
                        placeholder='Password'
                        autoCapitalize='none'
                        maxLength={50}
                        secureTextEntry={true}
                        />
                        <TextInput
                        ref={input => { this.pass2 = input }}
                        value={this.state.password2}
                        onChangeText={password2=>this.setState({ password2 })}
                        style={styles.input}
                        placeholder='Repeat the password'
                        autoCapitalize='none'
                        maxLength={50}
                        secureTextEntry={true}
                        />
                        </ScrollView>
                        
                    </View>
                    <Text style={{alignSelf: 'center', marginTop: '2%'}}> Terms and conditions </Text>
                </View>
                <View style={{height:'8%'}}>
                    <TouchableOpacity 
                    style={[styles.boton, {backgroundColor: 'rgb(100,230,150)', marginBottom: '0%'}]} 
                    activeOpacity={0.6}
                    onPress={_=>{this.checkForm()}} 
                    >
                        <Text style={styles.botonTxt}>CREATE ACCOUNT</Text>
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
        fontSize: 30,
        textAlign: 'center',
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
        padding: '2%',
    },
})