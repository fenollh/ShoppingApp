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


export default class RenderProductsSection extends React.Component{
    constructor(props){
        super(props)
    }
    
    renderProduct = (item) => {
        let itemsRemaining
        if(item.quantity < 0){
            itemsRemaining= <Text style={{ color:'rgb(0,200,0)', textAlign: 'center', alignSelf:'center', marginTop: '10%'}}> Este producto se prepara por encargo </Text>
        }
        else if(item.quantity >= 10){
            itemsRemaining= <Text style={{ color:'rgb(0,200,0)', textAlign: 'center', alignSelf:'center', marginTop: '10%'}}> Aun quedan {item.quantity} unidades </Text>
        }else{
            itemsRemaining= <Text style={{ color:'rgb(200,0,0)', textAlign: 'center', alignSelf:'center', marginTop: '10%'}}> Tan solo quedan {item.quantity} unidades </Text>
        }
        return(
            <TouchableOpacity style={styles.productBox} activeOpacity={0.6}>
                <View style={{flex:1.3}}>
                    <Image
                    style={{height:100, width:100, resizeMode:'cover', borderRadius:10}}
                    source={{uri: item.image}}
                    />
                </View>
                <View style={{flex:2}}>
                    <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17, marginBottom: '3%'}}>{item.name}</Text>
                    <Text style={{textAlign: 'center'}}>{item.description}</Text>
                    {itemsRemaining}
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                    <Text style={{fontSize:30, flex:1}}>{item.cost}€</Text>
                    <TouchableOpacity style={{flex:1}}>
                        <MaterialIcons name='add-shopping-cart' size={40} color='rgb(80,130,255)'/>
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
        borderWidth: 0.3,
        height: 110, 
        width: '100%', 
        padding: '2%'
    },
})