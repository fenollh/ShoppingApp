import react from 'react'
import React from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native'

export default class StockSection extends react.Component {
    constructor(){
        super()
    }

    render(){
        return(
            <ScrollView contentContainerStyle={styles.container} style={styles.view}>
                <View style={{height: 150, width: 150, backgroundColor:'green'}}/>
                <View style={{height: 150, width: 150, backgroundColor:'red'}}/>
                <View style={{height: 150, width: 150, backgroundColor:'blue'}}/>
                <View style={{height: 150, width: 150, backgroundColor:'white'}}/>
                <View style={{height: 150, width: 150, backgroundColor:'black'}}/>
                <View style={{height: 150, width: 150, backgroundColor:'grey'}}/>
                <View style={{height: 150, width: 150, backgroundColor:'yellow'}}/>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    view: {
        flex:1,
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
    }
})