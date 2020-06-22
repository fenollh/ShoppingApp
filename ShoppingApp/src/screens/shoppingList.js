import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
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
            shoppingList: [
                {name:'Leche', id:0}, 
                {name:'Cereales', id:1}, 
                {name:'Galletas', id:2}, 
                {name:'Carne', id:3}, 
                {name:'Verduras', id:4}, 
                {name:'Pan', id:5}
            ]
        }
    }
    deleteItem = (index) => {
        Alert.alert(this.state.shoppingList[index].name + ' deleted')
        const removedItem = this.state.shoppingList.splice(index, 1)
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
                    data={state.shoppingList}
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
                            this.setState({ shoppingList: [...state.shoppingList, {name: state.newItem, id: state.shoppingList.length}] })
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
        backgroundColor: 'white',
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