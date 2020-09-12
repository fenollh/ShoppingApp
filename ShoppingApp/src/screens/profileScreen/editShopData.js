import React from 'react'
import ImagePicker from 'react-native-image-picker'
import Fontisto from 'react-native-vector-icons/Fontisto'

import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native'

import { store } from '../../redux/state'
import { editUserData } from '../../components/globalFunctions'

export default class EditDataScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            Store: {},
            username: '',
            name: '',
            schedule: '',
            location: '',
            description: '',
            image: '',
            details: [],
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
        if(this.state.username) editUserData('username', this.state.username, 'shop')
        if(this.state.name) editUserData('name', this.state.name, 'shop')
        if(this.state.username) editUserData('schedule', this.state.schedule, 'shop')
        if(this.state.username) editUserData('location', this.state.location, 'shop')
        if(this.state.description) editUserData('description', this.state.description, 'shop')
        if(this.state.image) editUserData('image', this.state.image, 'shop')
        if(this.state.details) editUserData('details', this.state.details, 'shop')
        this.props.navigation.goBack()
    }

    componentDidMount(){
        let Store = store.getState()
        this.setState({
            Store: Store,
            username: Store.username, 
            name: Store.name,
            schedule: Store.schedule,
            location: Store.location,
            description: Store.description, 
            image: Store.image,
            details: Store.details, 
        })
    }
    render(){
        store.subscribe(()=>{
            if( this.state.usermail != store.getState().usermail || 
                this.state.username != store.getState().username || 
                this.state.name != store.getState().name || 
                this.state.description != store.getState().description || 
                this.state.details != store.getState().details || 
                this.state.Store.accountType != store.getState().accountType || 
                this.state.image != store.getState().image){
                this.forceUpdate()
            } 
        })
        let services
        services=(
            <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center', flex:1}}>
                <View style={{flexDirection: 'column', marginHorizontal:5}}>
                    <Text>{(this.state.Store.accountType == 'Food')?'TAKEAWAY':'CAFETERIA'}</Text>
                    <Fontisto 
                        onPress={_=> this.setState({ details: [!this.state.details[0], this.state.details[1], this.state.details[2], this.state.details[3]] })}
                        name={(this.state.details[0])?'checkbox-active':'checkbox-passive'} 
                        size={20} 
                        color={(this.state.details[0])?'green':'red'}
                        style={{alignSelf: 'center'}}/>
                </View>
                <View style={{flexDirection: 'column', marginHorizontal:5}}>
                    <Text>{(this.state.Store.accountType == 'Food')?'DELIVERY':'TOILETS'}</Text>
                    <Fontisto 
                        onPress={_=> this.setState({ details: [this.state.details[0], !this.state.details[1], this.state.details[2], this.state.details[3]] })}
                        name={(this.state.details[1])?'checkbox-active':'checkbox-passive'} 
                        size={20} 
                        color={(this.state.details[1])?'green':'red'}
                        style={{alignSelf: 'center'}}/>
                </View>
                <View style={{flexDirection: 'column', marginHorizontal:5}}>
                    <Text>{(this.state.Store.accountType == 'Food')?'RESTAURANT':'INSTRUCTORS'}</Text>
                    <Fontisto
                        onPress={_=> this.setState({ details: [this.state.details[0], this.state.details[1], !this.state.details[2], this.state.details[3]] })}
                        name={(this.state.details[2])?'checkbox-active':'checkbox-passive'} 
                        size={20} 
                        color={(this.state.details[2])?'green':'red'}
                        style={{alignSelf: 'center'}}/>
                </View>
                <View style={{flexDirection: 'column', marginHorizontal:5}}>
                    <Text>{(this.state.Store.accountType == 'Food')?'CREDIT CARD':'CREDIT CARD'}</Text>
                    <Fontisto 
                        onPress={_=> this.setState({ details: [this.state.details[0], this.state.details[1], this.state.details[2], !this.state.details[3]] })}
                        name={(this.state.details[3])?'checkbox-active':'checkbox-passive'} 
                        size={20} 
                        color={(this.state.details[3])?'green':'red'}
                        style={{alignSelf: 'center'}}/>
                </View>
            </View>
        )
        return(
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <Text style={styles.titleTxt}>EDIT SHOP</Text>
                </View>
                <View style={styles.mainBox}>
                    <TouchableOpacity style={{height: 130, justifyContent: 'center', alignItems: 'center'}}  onPress={()=>this.changeImage()}>
                        <Image
                            source={{uri: (this.state.image) ?this.state.image :this.state.Store.image}}
                            style={{height: 100, width: 100, borderRadius: 50}}
                        />
                        <Text style={{marginTop: 10, fontWeight: 'bold'}}>CHANGE IMAGE</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={styles.inputBox}>
                            <Text style={styles.subtitle}>SHOP NAME</Text>
                            <TextInput 
                            value={this.state.username}
                            onChangeText={username=>this.setState({ username })}
                            autoCapitalize='none'
                            maxLength={20}
                            style={styles.input}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.subtitle}>MANAGER NAME</Text>
                            <TextInput 
                            value={this.state.name}
                            onChangeText={name=>this.setState({ name })}
                            autoCapitalize='none'
                            maxLength={20}
                            style={styles.input}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.subtitle}>SCHEDULE</Text>
                            <TextInput 
                            value={this.state.schedule}
                            onChangeText={schedule=>this.setState({ schedule })}
                            autoCapitalize='none'
                            maxLength={100}
                            style={styles.input}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.subtitle}>LOCATION</Text>
                            <TextInput 
                            value={this.state.location}
                            onChangeText={location=>this.setState({ location })}
                            autoCapitalize='none'
                            maxLength={100}
                            style={styles.input}
                            />
                        </View>
                        <View style={[styles.inputBox, {height: 75}]}>
                            <Text style={styles.subtitle}>SERVICES</Text>
                            {services}
                        </View>
                        <View style={[styles.inputBox, {height: 250}]}>
                            <Text style={styles.subtitle}>DESCRIPTION</Text>
                            <TextInput 
                            textAlignVertical={'top'}
                            value={this.state.description}
                            onChangeText={description=>this.setState({ description })}
                            placeholder={(this.state.Store.description)?this.state.Store.description:'Description'}
                            textAlignVertical={'top'}
                            multiline={true}
                            maxLength={500}
                            style={styles.input}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <TouchableOpacity
                    style={[styles.button, {backgroundColor: 'rgb(230,100,100)'}]}
                    activeOpacity={0.6}
                    onPress={_=> this.props.navigation.goBack()}
                    >
                        <Text style={styles.buttonTxt}> CANCEL </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.button, {backgroundColor: 'rgb(100,230, 100)'}]}
                    activeOpacity={0.6}
                    onPress={_=> this.saveChanges()}
                    >
                        <Text style={styles.buttonTxt}> SAVE CHANGES </Text>
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
        backgroundColor:'rgb(240,245,245)',
    },
    titleTxt: {
        alignSelf: 'center',
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
        height: 55,
        padding: 0,
        marginVertical: 5,
        borderColor: 'rgb(0,0,0)',
        //borderWidth: 1,
    },
    subtitle: {
        height: 14,
        fontSize: 14,
        marginBottom: 3,
        fontWeight: 'bold',
    },
    input: {
        flex:1,
        backgroundColor: 'rgb(240,245,255)',
        borderRadius: 10,
        //justifyContent: 'center',
        //textAlignVertical: 'top',
    },
    button:{
        flex:1,
        borderRadius: 20,
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTxt: {
        fontSize: 15,
        fontWeight: 'bold',
    }
})