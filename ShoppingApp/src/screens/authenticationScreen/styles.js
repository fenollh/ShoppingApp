import React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: '3%',
        backgroundColor: 'rgb(240,245,240)'
    },
    header:{
        height: '10%',
        justifyContent: 'center',
    },

    title: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'rgb(52,167,251)',
        fontSize: 30,
        textAlign: 'center',

    },
    formBox: {
        flex: 1,
        padding: '3%',
        borderRadius: 20,
        backgroundColor: 'rgb(220,240,255)'
    },
    boton:{
        //flex:1,
        //backgroundColor: 'rgb(100,230,150)',
        borderRadius: 10,
        height: 35,
        width: '93%',
        margin: '3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(50,50,50)',
    },
    input: {
        backgroundColor: 'rgb(240,245,240)',
        marginVertical: '3%',
        borderRadius: 10,
        padding: '2%',
    },
})
export {styles}