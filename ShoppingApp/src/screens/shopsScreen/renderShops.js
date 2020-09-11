import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet
} from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Shops } from '../../components/shopsList'
import { store } from '../../redux/state'

export default class ShopsListSection extends React.Component {
    constructor(props){
        super(props)
    }
    renderShop = (item) => {
        if (item.accountType != store.getState().selectedTag && store.getState().selectedTag != ' All ') return
        let servicesSec
        const red='rgb(230,100,100)'
        const green='rgb(100,230,100)'
        switch (item.accountType) {
            case 'Food':
                servicesSec=(
                <View style={{flex:1, alignItems: 'center', marginTop: '2%'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Entypo name='shopping-bag' color={(item.details[0])?green:red} size={30} style={{marginHorizontal: '1%'}}/>
                        <MaterialIcons name='restaurant' color={(item.details[1])?green:red} size={30} style={{marginHorizontal: '1%'}}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <MaterialCommunityIcons name='truck-delivery' color={(item.details[2])?green:red} size={30} style={{marginHorizontal: '1%'}}/>
                        <Entypo name='credit-card' color={(item.details[3])?green:red} size={30} style={{marginHorizontal: '1%'}}/>
                    </View>
                </View>
                )
                break;
            case 'Sport':
                servicesSec=(
                <View style={{flex:1, alignItems: 'center', marginTop: '2%'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Entypo name='shop' color={(item.details[0])?green:red} size={30} style={{marginHorizontal: '1%'}}/>
                        <MaterialCommunityIcons name='toilet' color={(item.details[1])?green:red} size={30} style={{marginHorizontal: '1%'}}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <MaterialIcons name='person' color={(item.details[2])?green:red} size={30} style={{marginHorizontal: '1%'}}/>
                        <Entypo name='credit-card' color={(item.details[3])?green:red} size={30} style={{marginHorizontal: '1%'}}/>
                    </View>
                </View>
                )
                break;
            default:
                servicesSec=<View style={{flex:1}}/>
                break;
        }


        return(
            <TouchableOpacity style={styles.shopBox} activeOpacity={0.6} onPress={()=>this.props.navigation.navigate('SelectedShop', {item: item})}>
                <View style={{flex:1}}>
                    <Image
                    style={{height: '100%', width: '100%', borderRadius: 10}}
                    source={{uri: item.image}}
                    />
                </View>
                <View style={{flex:2, alignItems: 'center'}}>
                    <Text style={styles.title}>{item.username}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
                {servicesSec}
            </TouchableOpacity>
        )
    }
    
    
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={Shops}
                    keyExtractor={(item) => item.username}
                    renderItem={({item}) => this.renderShop(item)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '3%',
        marginHorizontal: '1%',
    },
    shopBox: {
        flex: 1,
        marginVertical: '1%',
        flexDirection: 'row',
        backgroundColor: 'rgb(240, 250, 255)',
        borderColor: 'rgb(100,150,200)',
        borderRadius: 0,
        //borderWidth: 0.3,
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