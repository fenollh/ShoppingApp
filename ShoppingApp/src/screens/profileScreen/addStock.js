import React from 'react'
import ImagePicker from 'react-native-image-picker';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native'

export default class AddStock extends React.Component {
    constructor(){
        super()
        this.state = {
            image: '',
            name: '',
            description: '',
            cost: 1,
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

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.mainBox}>
                    <TouchableOpacity style={{height:175, alignItems: 'center'}} onPress={_=>this.changeImage()}>
                        <Image
                        style={{height: 100, width: 100, borderRadius: 50, marginTop: '7%', marginBottom: '2%'}}
                        source={{uri: (this.state.image)?this.state.image:'https://www.creativefabrica.com/wp-content/uploads/2019/04/Food-icon-by-Zafreeloicon-13-580x386.jpg'}}
                        />
                        <Text style ={{fontSize: 17, fontWeight: 'bold'}}> CHANGE IMAGE </Text>
                    </TouchableOpacity>
                    <View style={{padding: 15}}>
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
        height: '85%', 
        width: '85%', 
        borderRadius: 10,
    },
    input: {
        backgroundColor: 'rgb(200,230,255)',
        marginVertical: '3%',
        borderRadius: 10,
        padding: '2%',
    },
})