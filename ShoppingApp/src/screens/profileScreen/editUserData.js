import React from 'react'
import ImagePicker from 'react-native-image-picker';

import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

import { store } from '../../redux/state'
import { editUserData } from '../../components/globalFunctions'

export default class EditDataScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            username: '',
            name: '',
            description: '',
            image: '',
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
            if(response.uri) this.setState({ image: response.uri })
        })
    }

    saveChanges = () => {
        if(this.state.username) editUserData('username', this.state.username)
        if(this.state.name) editUserData('name', this.state.name)
        if(this.state.description) editUserData('description', this.state.description)
        if(this.state.image) editUserData('image', this.state.image)
        this.props.navigation.goBack()
    }

    render(){
        let Store = store.getState()
        /*
        this.setState({ 
            username: Store.username, 
            name: Store.name, 
            description: Store.description, 
            image: Store.image 
        })*/

        return(
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <Text style={styles.titleTxt}>EDIT DATA</Text>
                </View>
                <View style={styles.mainBox}>
                    <TouchableOpacity style={{height: 130, justifyContent: 'center', alignItems: 'center'}}  onPress={()=>this.changeImage()}>
                        <Image
                            source={{uri: (this.state.image) ?this.state.image :Store.image}}
                            style={{height: 100, width: 100, borderRadius: 50}}
                        />
                        <Text style={{marginTop: 10, fontWeight: 'bold'}}>CHANGE IMAGE</Text>
                    </TouchableOpacity>
                    <View style={styles.inputBox}>
                        <Text style={styles.subtitle}>USERNAME</Text>
                        <TextInput 
                        value={this.state.username}
                        onChangeText={username=>this.setState({ username })}
                        placeholder={Store.username}
                        autoCapitalize='none'
                        maxLength={20}
                        style={styles.input}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.subtitle}>NAME</Text>
                        <TextInput 
                        value={this.state.name}
                        onChangeText={name=>this.setState({ name })}
                        placeholder={Store.name}
                        autoCapitalize='none'
                        maxLength={20}
                        style={styles.input}
                        />
                    </View>
                    <View style={[styles.inputBox, {flex:3}]}>
                        <Text style={styles.subtitle}>DESCRIPTION</Text>
                        <TextInput 
                        value={this.state.description}
                        onChangeText={description=>this.setState({ description })}
                        placeholder={(Store.description)?Store.description:'Description'}
                        textAlignVertical={'top'}
                        multiline={true}
                        maxLength={500}
                        style={styles.input}
                        />
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <TouchableOpacity
                    style={[styles.button, {backgroundColor: 'rgb(230,100,100)'}]}
                    activeOpacity={0.6}
                    onPress={_=> this.props.navigation.goBack()}
                    >
                        <Text> CANCEL </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.button, {backgroundColor: 'rgb(100,230, 100)'}]}
                    activeOpacity={0.6}
                    onPress={_=> this.saveChanges()}
                    >
                        <Text> SAVE CHANGES </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'rgb(255,255,255)',
    },
    titleTxt: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    mainBox: {
        padding: 10,
        flex:10,
        flexDirection: 'column',
        borderColor: 'rgb(0,0,255)',
        //borderWidth: 1,
    },
    inputBox: {
        flexDirection: 'column',
        height: 50,
        padding: 0,
        marginVertical: 5,
        borderColor: 'rgb(0,0,0)',
        //borderWidth: 1,
    },
    subtitle: {
        flex:1,
        fontSize: 14,
        fontWeight: 'bold',
    },
    input: {
        flex:1,
        justifyContent: 'center'

    },
    button:{
        flex:1,
        borderRadius: 20,
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})