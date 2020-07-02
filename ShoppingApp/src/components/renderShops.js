import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Shops} from './shopsList'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet
} from 'react-native'

export default class ShopsListSection extends React.Component {
    constructor(props){
        super(props)
    }
    renderShop = (item) => {
        return(
            <TouchableOpacity style={styles.shopBox} activeOpacity={0.6} onPress={()=>this.props.navigation.navigate('SelectedShop', {item: item})}>
                <View style={{flex:1}}>
                    <Image
                    style={{height: '100%', width: '100%', borderRadius: 10}}
                    source={{uri: item.profileImage}}
                    />
                </View>
                <View style={{flex:2, alignItems: 'center'}}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.description}>{item.profileDescription}</Text>
                </View>
                <View style={{flex:1, alignItems: 'center', marginTop: '2%'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Entypo name='shopping-bag' color={(item.shopDetails.takeaway)?'green':'red'} size={30} style={{marginHorizontal: '1%'}}/>
                        <MaterialIcons name='restaurant' color={(item.shopDetails.restaurant)?'green':'red'} size={30} style={{marginHorizontal: '1%'}}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <MaterialCommunityIcons name='truck-delivery' color={(item.shopDetails.delivery)?'green':'red'} size={30} style={{marginHorizontal: '1%'}}/>
                        <Entypo name='credit-card' color={(item.shopDetails.card)?'green':'red'} size={30} style={{marginHorizontal: '1%'}}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    
    
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={Shops}
                    keyExtractor={(item) => item.name}
                    renderItem={({item}) => this.renderShop(item)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '7%',
        marginHorizontal: '1%',
    },
    shopBox: {
        flex: 1,
        marginVertical: '1%',
        flexDirection: 'row',
        backgroundColor: 'rgb(240, 250, 255)',
        borderColor: 'rgb(100,150,200)',
        borderRadius: 10,
        borderWidth: 0.3,
        height: 100, 
        width: '100%', 
        padding: '2%'
    },
    title:{
        flex:1,
        fontWeight: 'bold',
        fontSize: 18,
    },
    description:{
        flex: 2,
        marginHorizontal: '3%',
        textAlign: 'center'
    },
})