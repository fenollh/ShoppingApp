import React from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'


export default class StockSection extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{flex:1}}>
                <ScrollView contentContainerStyle={styles.container} style={{flex:1}}>
                    <View style={styles.box}/>
                    <View style={styles.box}/>
                    <View style={styles.box}/>
                    <View style={styles.box}/>
                    <View style={styles.box}/>
                    <View style={styles.box}/>
                    <View style={styles.box}/>
                </ScrollView>
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
        backgroundColor: 'red',
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