import React from 'react'
import {State} from '../components/state'
import { 
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native'

export default class RenderOrdersSection extends React.Component{
    constructor(props){
        super(props)
    }

    renderItem = (item) => {
        return(
            <View>
                <Text>{item.itemName}</Text>
            </View>
        )
    }

    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                data={State.myOrders}
                keyExtractor={(item) => item.itemName}
                renderItem={({item}) => this.renderItem(item)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({

})