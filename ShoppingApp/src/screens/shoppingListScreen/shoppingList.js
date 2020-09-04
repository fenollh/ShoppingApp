import React from 'react'
import { 
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet, 
    TouchableOpacity,
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'

import { store } from '../../redux/state'

export default class ShoppingList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            newItem: '',
        }
    }
    deleteItem = (index) => {
        store.dispatch({
            type: 'REMOVE_ITEM_SHOPPINGLIST',
            payload: index
        })
    }

    addItem = (newItem, textInput) => {
        if(!newItem) return
        store.dispatch({
            type: 'ADD_ITEM_SHOPPINGLIST',
            payload: newItem,
        })
        textInput.clear()
    }

    renderListItem = (item, index) => {
        return(
            <View style={{flex:1, flexDirection:'row', marginVertical: 5}}>
                <Text style={styles.listTxt}>{item}</Text>
                <View style={{flex: 1}}>
                    <AntDesign name='delete' color='red' size={25} onPress={() => this.deleteItem(index)}/>
                </View>
            </View>
        )
    }

    render(){
        store.subscribe(()=>{
            if(Store.shoppingList != store.getState().shoppingList) this.forceUpdate()
        })
        let Store = store.getState()
        const {state} = this
        return(
            <View style={styles.container}>
                <View style={styles.list}>
                    <FlatList
                    data={Store.shoppingList}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => this.renderListItem(item, index)}
                    />
                </View>
                <View style={styles.txtInput}>
                    <TextInput
                        ref={input => { this.textInput = input }}
                        maxLength={40}
                        style={{flex: 3}}
                        placeholder='What do you need?'
                        onChangeText={(val) => this.setState({ newItem: val})}
                    />
                    <TouchableOpacity  
                        style={{flex:1, alignItems: 'center', justifyContent: 'center'}} 
                        onPress={_=> this.addItem(state.newItem, this.textInput)}>
                            <AntDesign name='pluscircleo' size={50} color='rgb(52,167,251)'/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(240,245,240)',
        padding: '2%'
    },
    list: {
        flex:8,
        borderRadius: 10,
        padding: '3%',
        backgroundColor: 'rgb(255,255,230)',
    },
    listTxt:{
        flex:10,
        fontSize: 20,
        fontWeight: 'bold',
    },  
    txtInput: {
        flex:1,
        flexDirection: 'row',
    }
})