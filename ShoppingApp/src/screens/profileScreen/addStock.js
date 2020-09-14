import React from 'react'
import ImagePicker from 'react-native-image-picker';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput, 
    Alert, 
    ScrollView,
    KeyboardAvoidingView
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { addStockProduct } from '../../components/globalFunctions';
import { FlatList } from 'react-native-gesture-handler';


export default class AddStock extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            image: '',
            name: '',
            description: '',
            cost: '',
            quantity: 1,
            max: 10,
            tags: []
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

    deleteTag = (index) => {
        let arr = this.state.tags.splice(index, 1)
        this.setState({ tags: this.state.tags })
    }

    renderTag = (item) => {
        return(
            <TouchableOpacity 
                style={{backgroundColor: 'rgb(100,230,150)', borderRadius: 13, height: 25, marginHorizontal: 3, padding: 5, justifyContent: 'center', alignContent: 'center'}}
                onPress={_=>this.deleteTag(item.index)}>
                <Text style={{fontSize:18, fontWeight: 'bold'}}>{item.item}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        var tag
        return(
            <View style={styles.container}>
                <View style={styles.mainBox}>
                    <TouchableOpacity style={{height:'27%', alignItems: 'center'}} onPress={_=>this.changeImage()}>
                        <Image
                        style={{height: 100, width: 100, borderRadius: 50, marginTop: '7%', marginBottom: '2%'}}
                        source={{uri: (this.state.image)?this.state.image:'https://www.creativefabrica.com/wp-content/uploads/2019/04/Food-icon-by-Zafreeloicon-13-580x386.jpg'}}
                        />
                        <Text style ={{fontSize: 17, fontWeight: 'bold'}}> CHANGE IMAGE </Text>
                    </TouchableOpacity>
                    <KeyboardAvoidingView style={{flex: 7}} keyboardVerticalOffset={100}>
                        <View style={{paddingHorizontal: 15, flex: 7, justifyContent: 'flex-end'}}>
                            <TextInput
                                value={this.state.name}
                                onChangeText={name=>this.setState({ name })}
                                style={styles.input}
                                placeholder='Product Name'
                                autoCapitalize='none'
                                maxLength={20}
                                />
                            <TextInput 
                                textAlignVertical={'top'}
                                value={this.state.description}
                                onChangeText={description=>this.setState({ description })}
                                placeholder='Product description'
                                textAlignVertical={'top'}
                                multiline={true}
                                maxLength={500}
                                style={[styles.input, {height: 100}]}
                                />
                            <View style={styles.selectors}>
                                <Text style={{width: 75, fontSize: 25, fontWeight: 'bold'}}>Prize:</Text>
                                <TextInput
                                    value={this.state.cost}
                                    onChangeText={cost=>this.setState({ cost })}
                                    style={[styles.input, {height: 40}]}
                                    keyboardType={'number-pad'}
                                    placeholder='Prize per product'
                                    autoCapitalize='none'
                                    maxLength={20}
                                    />
                            </View>
                            <View style={styles.selectors}>
                                <Text style={{width: 200, fontSize: 25, fontWeight: 'bold'}}>Quantity available:</Text>
                                <AntDesign name='minus' size={25} color={'black'} style={{width:35}} onPress={_=>this.setState({ quantity: this.state.quantity-1 })}/>
                                <Text style={{width:25, fontSize: 25, fontWeight: 'bold'}}>{this.state.quantity}</Text>
                                <AntDesign name='plus' size={25} color={'black'} style={{width:25}} onPress={_=>this.setState({ quantity: this.state.quantity+1 })}/>
                            </View>
                            <View style={styles.selectors}>
                                <Text style={{width: 200, fontSize: 25, fontWeight: 'bold'}}>Max Quantity:</Text>
                                <AntDesign name='minus' size={25} color={'black'} style={{width:35}} onPress={_=>this.setState({ max: this.state.max-1 })}/>
                                <Text style={{width:25, fontSize: 25, fontWeight: 'bold'}}>{this.state.max}</Text>
                                <AntDesign name='plus' size={25} color={'black'} style={{width:25}} onPress={_=>this.setState({ max: this.state.max+1 })}/>
                            </View>
                            <View style={styles.selectors}>
                                <Text style={{width: 100, fontSize: 25, fontWeight: 'bold'}}>Tags:</Text>
                                <TextInput
                                    ref={input => { this.tagInput = input }}
                                    value={tag}
                                    onChangeText={val=>tag=val}
                                    style={[styles.input, {height: 40, width: 100}]}
                                    keyboardType={'default'}
                                    placeholder='Tag'
                                    autoCapitalize='none'
                                    maxLength={20}
                                    />
                                <AntDesign name='plus' size={25} color={'black'} style={{width:25}} onPress={_=>{
                                    if(this.state.tags.length <= 2) {
                                        this.setState({ tags: [...this.state.tags, tag] })
                                        this.tagInput.clear()
                                    }
                                    else Alert.alert('dont use more than 3 tags per product')
                                }}/>
                            </View>
                            <FlatList
                                style={{marginTop: 10}}
                                data={this.state.tags}
                                renderItem={(item)=>this.renderTag(item)}
                                keyExtractor={({item, index})=> index}
                                horizontal={true}
                                />
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <TouchableOpacity 
                            style={styles.button} 
                            activeOpacity={0.6}
                            onPress={()=>this.props.navigation.goBack()}>
                            <Entypo name='cross' size={40} color='red' style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, {flexDirection: 'row'}]} 
                            activeOpacity={0.6}
                            onPress={()=>{
                                if(this.state.name && this.state.cost) {
                                    addStockProduct(this.state)
                                    this.props.navigation.goBack()
                                }
                                else Alert.alert('You must complete name and prize fields')
                            }}>
                            <Text style={styles.buttonTxt}>ORDER</Text>
                            <Ionicons name='ios-add' size={50} color='rgb(0,255,0)' style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor:'rgba(0,0,0, 0.7)',
    },
    mainBox: {
        backgroundColor: 'white', 
        height: '90%', 
        width: '85%', 
        borderRadius: 10,
    },
    input: {
        backgroundColor: 'rgb(200,230,255)',
        marginVertical: '3%',
        borderRadius: 10,
        padding: '2%',
    },
    button: {
        flex:1, 
        backgroundColor: 'rgb(80,130,255)', 
        margin: '2%', 
        borderRadius: 30, 
    },
    icon: {
        flex:1,
        alignSelf: 'center',
    },
    buttonTxt: {
        flex:1, 
        alignSelf: 'center',
        marginStart: '30%',
        fontSize: 15,
        fontWeight: 'bold',
    },
    selectors: {
        height: '8%', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 10
    },
})