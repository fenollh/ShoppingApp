import React from 'react'
import { 
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'

import { store } from '../../redux/state'
import { Shops } from '../../components/shopsList'
import { styles } from './styles'

export default class RenderOrdersSection extends React.Component{
    constructor(props){
        super(props)
    }

    findImage = (item) => {
        const shop = Shops.find(elem => elem.usermail == item.shop)
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
                    <Text style={styles.productTxt}>{item.quantity} x {item.itemName}</Text>
                    <Text style={styles.productTxt}>Coste: {item.itemCost*item.quantity}€</Text>
                    <Text style={styles.productTxt}>Day: {item.hour.toString().slice(4,10)}</Text>
                    <Text style={styles.productTxt}>Hour: {item.hour.toString().slice(15,21)}</Text>
                </View>
                <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                    <AntDesign 
                            name='checkcircleo' 
                            size={40} 
                            color='rgb(80,130,255)' 
                            onPress={()=> {
                                store.dispatch({
                                    type: 'REMOVE_ORDER',
                                    payload: index
                                })
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
                data={store.getState().myOrders}
                keyExtractor={(item) => item.itemName}
                renderItem={({item,index}) => this.renderItem(item, index)}
                />
            </View>
        )
    }
}