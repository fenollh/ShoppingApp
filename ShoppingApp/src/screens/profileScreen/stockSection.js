import React from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'

import { store } from '../../redux/state'
import {removeStockProduct} from '../../components/globalFunctions'

export default class StockSection extends React.Component {
    constructor(props){
        super(props)
    }

    deleteItem = (index) => {
        removeStockProduct(index)
    }

    renderProduct = (item, index) => {
        return(
            <TouchableOpacity 
                style={styles.box}
                onPress={()=> this.deleteItem(index)}
                >
                <Image
                    style={{height: 150, width: 150}}
                    source={{uri: (item.image)?item.image:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1024px-User_font_awesome.svg.png'}}
                />
            </TouchableOpacity>
        )
    }
    render(){
        let Store = store.getState()
        let {stock} = Store
        return(
            <View style={{flex:1}}>
                <FlatList
                numColumns={2}
                data={stock.availableProducts}
                keyExtractor={({index}) => index}
                renderItem={({item, index}) => this.renderProduct(item, index)}
                />
                <TouchableOpacity style={styles.addButton} onPress={_=>this.props.navigation.navigate('AddStock')}>
                    <AntDesign name='plus' size={45} color={'black'}/>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    box: {
        height: 150, 
        width: 150,
        margin: 5,
        borderColor: 'black',
        //borderWidth: 1
    },
    addButton: {
        height:70, 
        width:70, 
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(80,130,255)', 
        position: 'absolute',
        right: 10,
        bottom: 10,
        elevation:10,
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5, 
    }

})