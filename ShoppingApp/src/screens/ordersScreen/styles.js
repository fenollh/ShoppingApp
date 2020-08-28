import React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //padding: '3%',
        backgroundColor: 'rgb(240,245,240)',
    },
    costTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginEnd: 30
    },
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
        width: '98%', 
        padding: '2%',
    },
    productTxt: {
        marginStart: 10, 
        flex:1, 
        fontWeight: 'bold', 
        fontSize: 17, 
        alignSelf: 'center'
    },
})

export { styles }