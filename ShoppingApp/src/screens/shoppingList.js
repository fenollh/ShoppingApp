import React from 'react'
import { 
    View,
    StyleSheet 
} from 'react-native'

export default class ShoppingList extends React.Component{
    render(){
        return(
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
})