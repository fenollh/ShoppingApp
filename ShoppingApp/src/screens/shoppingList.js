import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {State} from '../components/state'
import { 
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet, 
    TouchableOpacity,
    Alert
} from 'react-native'

export default class ShoppingList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            newItem: '',
        }
    }
    deleteItem = (index) => {
        const removedItem = State.shoppingList.items.splice(index, 1)
        this.forceUpdate()
    }

    renderListItem = (item, index) => {
        return(
            <View style={{flex:1, flexDirection:'row', marginVertical: 5}}>
                <Text style={styles.listTxt}>{item.name}</Text>
                <View style={{flex: 1}}>
                    <AntDesign name='delete' color='red' size={25} onPress={() => this.deleteItem(index)}/>
                </View>
            </View>
        )
    }

    render(){
        const {state} = this
        return(
            <View style={styles.container}>
                <View style={styles.list}>
                    <FlatList
                    data={State.shoppingList.items}
                    keyExtractor={item => item.id.toString()}
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
                        onPress={_=> {
                            State.shoppingList.items= [...State.shoppingList.items, {name: state.newItem, id: State.shoppingList.items.length}]
                            this.forceUpdate()
                            this.textInput.clear()
                        }}>
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