import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet
} from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { store } from '../../redux/state'



export default class RenderProductsSection extends React.Component{
    constructor(props){
        super(props)
    }
    
    renderProduct = (item) => {
        if (item.tags != store.getState().selectedCategorie && store.getState().selectedCategorie != ' All ') return
        let itemsRemaining
        if(item.quantity < 0){
            itemsRemaining= <Text style={[styles.itemsRemaining, {color:'rgb(0,200,0)'}]}> Este producto se prepara por encargo </Text>
        }
        else if(item.quantity >= 10){
            itemsRemaining= <Text style={[styles.itemsRemaining, {color:'rgb(0,200,0)'}]}> Aun quedan {item.quantity} unidades </Text>
        }else{
            itemsRemaining= <Text style={[styles.itemsRemaining, {color:'rgb(200,0,0)'}]}> Tan solo quedan {item.quantity} unidades </Text>
        }
        return(
            <TouchableOpacity 
                style={styles.productBox} 
                activeOpacity={0.6} 
                onPress={()=> {this.props.navigation.navigate('AddProduct', {item: item, shop:this.props.item})}}>
                    <View style={{flex:1.3}}>
                    <Image
                    style={{height:100, width:100, resizeMode:'cover', borderRadius:10}}
                    source={{uri: item.image}}
                    />
                </View>
                <View style={{flex:2}}>
                    <Text style={{alignSelf: 'center', flex:1, fontWeight: 'bold', fontSize: 17, marginBottom: '3%'}}>{item.name}</Text>
                    <Text style={{textAlign: 'center', flex:1}}>{item.description}</Text>
                    <View style={{flex:1, justifyContent: 'flex-end'}}>
                        {itemsRemaining}
                    </View>
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                    <Text style={{fontSize:30, flex:1}}>{item.cost}€</Text>
                    <TouchableOpacity style={{flex:1}}>
                        <MaterialIcons 
                            name='add-shopping-cart' 
                            size={40} 
                            color='rgb(80,130,255)' 
                            />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
    
    
    render(){
        const {item} = this.props
        return(
            <View style={{flex:1}}>
                <FlatList
                    data={item.stock.availableProducts}
                    keyExtractor={({item})=>item}
                    renderItem={({item}) => this.renderProduct(item)}
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
        //borderWidth: 0.3,
        height: 110, 
        width: '100%', 
        padding: '2%'
    },
    itemsRemaining: {
        flex:1, 
        textAlign: 'center', 
        alignSelf:'center',
    },
})