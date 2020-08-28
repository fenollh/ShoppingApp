import React from 'react'
import ImagePicker from 'react-native-image-picker';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native'

import { createUser, checkRegisterForm } from '../../components/globalFunctions'
import { styles } from './styles'

export default class LoginScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            username: '',
            usermail: '',
            name: '',
            password: '',
            password2: '',
            age:'',
            photo: 'https://www.skimostats.com/images/athletes/372-5e2587fe35036.png',
        }
    }

    changeImage = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            if(response.uri) this.setState({ photo: response.uri })
        })
    }

    checkForm = _ => {
        if(checkRegisterForm('costumer', this.state, {pass1: this.pass1, pass2: this.pass2})){
            createUser(this.state, _, this.props.navigation)
        }
    } 
    
    render(){
        return(
            <View style={styles.container}>
                
                <View style={styles.header}><Text style={styles.title}> CREATE A COSTUMER ACCOUNT </Text></View>
                <TouchableOpacity style={{height: '20%', justifyContent: 'center', alignItems: 'center'}}  onPress={()=>this.changeImage()}>
                    <Image
                        source={{uri: this.state.photo}}
                        style={{height: 100, width: 100, borderRadius: 50}}
                    />
                    <Text style={{marginTop: 10, fontWeight: 'bold'}}>CHANGE IMAGE</Text>
                </TouchableOpacity>
                <View style={{height: '60%', padding: '2%'}}>
                    <View style={styles.formBox}>
                        <ScrollView>
                        <TextInput
                        value={this.state.username}
                        onChangeText={username=>this.setState({ username })}
                        style={styles.input}
                        placeholder='Username'
                        autoCapitalize='none'
                        maxLength={20}
                        />
                        <TextInput
                        value={this.state.usermail}
                        onChangeText={usermail=>this.setState({ usermail })}
                        style={styles.input}
                        placeholder='Email'
                        autoCompleteType='email'
                        autoCapitalize='none'
                        maxLength={20}
                        />
                        <TextInput
                        value={this.state.name}
                        onChangeText={name=>this.setState({ name })}
                        style={styles.input}
                        placeholder='Full name'
                        autoCapitalize='none'
                        autoCompleteType='name'
                        maxLength={20}
                        />
                        <TextInput
                        value={this.state.age}
                        onChangeText={age=>this.setState({ age })}
                        style={styles.input}
                        placeholder='Age'
                        keyboardType='numeric'
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