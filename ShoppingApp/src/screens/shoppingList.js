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
            shoppingList: ['Leche', 'Cereales', 'Galletas', 'Carne', 'Verduras', 'Pan']
        }
    }
    deleteItem = (index) => {
        Alert.alert(index + ' deleted')
        const removedItem = this.state.shoppingList.splice(index, 1)
        this.forceUpdate()
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
        return(
            <View style={styles.container}>
                <View style={styles.list}>
                    <FlatList
                    data={this.state.shoppingList}
                    keyExtractor={item => item}
                    renderItem={({ item, index }) => this.renderListItem(item, index)}
                    />
                </View>
                <View style={styles.txtInput}>
                    <TextInput
                        maxLength={40}
                        style={{flex: 3}}
                        placeholder='What do you need?'
                        onChangeText={(val) => this.setState({ newItem: val})}
                    />
                    <TouchableOpacity  
                        style={{flex:1, alignItems: 'center', justifyContent: 'center'}} 
                        onPress={_=> this.setState({ shoppingList: [...this.state.shoppingList, this.state.newItem] })}>
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
        borderWidth: 0.5,
        padding: '3%',
        backgroundColor: 'rgb(255,255,230)',
    },
    listTxt:{
        flex:10,
        fontSize: 20,
    },  
    txtInput: {
        flex:1,
        flexDirection: 'row',
    }
})