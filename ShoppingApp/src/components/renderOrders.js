import React from 'react'
import {State} from './state'
import {Shops} from './shopsList'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { 
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native'

export default class RenderOrdersSection extends React.Component{
    constructor(props){
        super(props)
    }

    findImage = (item) => {
        const shop = Shops.find(elem => elem.email == item.shop)
        const product = shop.stock.availableProducts.find(elem => elem.name==item.itemName)
        return product.image
    }

    renderItem = (item, index) => {
        let image = this.findImage(item)
        return(
            <View style={styles.productBox}>
                <View style={{flex:1.5}}>
                    <Image
                    style={{height:100, width:100, resizeMode:'cover', borderRadius:10}}
                    source={{uri: image}}
                    />
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.txt}>{item.quantity} x {item.itemName}</Text>
                    <Text style={styles.txt}>Coste: {item.itemCost*item.quantity}€</Text>
                    <Text style={styles.txt}>Day: {item.hour.toString().slice(4,10)}</Text>
                    <Text style={styles.txt}>Hour: {item.hour.toString().slice(15,21)}</Text>
                </View>
                <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                    <AntDesign 
                            name='checkcircleo' 
                            size={40} 
                            color='rgb(80,130,255)' 
                            onPress={()=> {
                                State.myOrders.splice(index, 1)
                                this.props.father.forceUpdate()
                                }}/>
                </TouchableOpacity>
            </View>
        )
    }

    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                data={State.myOrders}
                keyExtractor={(item) => item.itemName}
                renderItem={({item,index}) => this.renderItem(item, index)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({

    productBox: {
        flex: 1,
        marginVertical: '1%',
        marginHorizontal: '1%',
        flexDirection: 'row',
        backgroundColor: 'rgb(240, 250, 255)',
        borderColor: 'rgb(100,150,200)',
        borderRadius: 10,
        borderWidth: 0.3,
        height: 110, 
        width: '98%', 
        padding: '2%',
    },
    txt: {
        marginStart: 10, 
        flex:1, 
        fontWeight: 'bold', 
        fontSize: 17, 
        alignSelf: 'center'
    },
})