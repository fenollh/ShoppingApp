import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import StarsRating from '../components/startsRating'
import TagsSection from '../components/tagsSec'
import {State} from '../components/state'

import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

export default class SelectedShopScreen extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {item} = this.props.route.params
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flex:1}}>
                        <Image
                            style={styles.profileImage}
                            source={{uri: item.profileImage}}
                        /> 
                        <StarsRating data={item.stars} style={{flex:1, marginStart: '7%'}}/>
                        <Text style={{alignSelf: 'center', flex:1}}>{item.stars[0]+item.stars[1]+item.stars[2]+item.stars[3]+item.stars[4]}</Text>
                    </View>
                    <View style={{flex: 2.3}}>
                        <Text style={styles.username}>{item.name}</Text>
                        <View style={{flex:1.8, alignItems: 'center'}}>
                            <Text style={{fontSize: 15, textAlign: 'center'}}>{item.profileDescription}</Text>
                        </View>
                        <View style={{flex:1.2}}>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.buttonTxt}>Contact Manager</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={{flex:1}}>
                        <TagsSection data={item.categories} totalData={item.stock.availableProducts}/>
                    </View>
                    <View style={{flex:15}}></View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(240,245,240)',
    },
    header: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgb(230,245,255)',
    },

    profileImage:{
        height: 100, 
        width: 100, 
        borderRadius: 50, 
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)', 
        margin: '5%',
        marginBottom: '15%'
    },
    buttonTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    username:{
        flex:1, 
        alignSelf: 'center', 
        marginTop: '5%',
        fontWeight: 'bold',
        fontSize: 23,
    },
    editButton: {
        flex:1, 
        marginBottom: 5,
        height:30, 
        width: 200, 
        borderRadius: 20, 
        alignSelf: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgb(80,130,255)', 
    },  
    body: {
        flex: 3,
    },
})