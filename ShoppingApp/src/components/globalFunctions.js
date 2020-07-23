import React from 'react'
import { Alert } from 'react-native'
import { store } from '../redux/state'

/*
fetch golang server example
    const route = '/0'
    fetch('http://192.168.1.43:3000'+route)
    .then((response) => response.json())
    .then((responseData) => console.log(responseData))
*/

const checkRegisterForm = (type, formData, formInputs) => {
    if(formData.password.length < 5){
        Alert.alert("The password must have more than 5 characters")
        return false
    }
    else if(formData.username.length < 5){
        Alert.alert("The username must have more than 5 characters")
        return false
    }
    else if(formData.password !== formData.password2){
        Alert.alert("The first and second password doesn't match")
        formInputs.pass1.clear()
        formInputs.pass2.clear()
        return false
    }
    if(type = 'costumer'){
        if(!formData.usermail || !formData.username || !formData.name || !formData.age || !formData.password){
            Alert.alert("complete all the fields after submitting")
            return false
        }
        return true
    }
    else if (type = 'shop'){
        if(!formData.usermail || !formData.username || !formData.name || !formData.password || !formData.shopType){
            Alert.alert("complete all the fields after submitting")
            return false
        }
        return true
    }
}

const initState = _ => {
    //descargar los datos de la DB al state. Se usa al hacer login
}

const authentication = (usermail, password, sessionID) => {
    //check in the database is the email exists
    //check if the password is correct
    //or check if the sessionID is correct
    return true
}

const updateUserDB = (user, navigation) => {
    //subir todos estos datos a la DB
    navigation.navigate('Main')
    handleSession(user.usermail)
    store.dispatch({
        type: 'EDIT_USERMAIL',
        payload: user.usermail
    })
}

const handleSession = (usermail) => {
    //create a new ID
    const sessionID = Math.round(Math.random()*10000000000)
    //reasign the sessID in the DB
    //safe the ID in the global state
    //State.sessionID = sessionID
    store.dispatch({
        type: 'EDIT_SESSION',
        payload: sessionID
    })
}

const loginFunc = (usermail, password, navigation) => {
    if (authentication(usermail, password)){
        handleSession(usermail)
        initState() //descargar todos los datos de usuario al State de la DB
        navigation.navigate('Main')
    }
    else{
        navigation.navigate('Login')
    }
}

const filterData = (type, data) => { //el parametro data es la totalidad de los datos y type el criterio que se usara para filtar
    if(data === 'Shops') store.dispatch({type: 'EDIT_SELECTEDTAG', payload: type})
    else if(data== 'Categories') store.dispatch({type: 'EDIT_SELECTEDCATEGORIE', payload: type})
    return true
}

const addOrder = (itemName, itemCost ,shopmail, quantity, hour, usermail) => {
    if(quantity < 1) return
    authentication(usermail, store.getState().sessionID)
    const order = {
        itemName:itemName,
        itemCost: itemCost,
        shop: shopmail,
        quantity: quantity,
        hour: hour,
        costumermail: usermail
    }
    store.dispatch({
        type: 'ADD_ORDER',
        payload: order
    })
    //Se crea una entrada en la tabla 'Orders' con el objeto order
    //State.myOrders.push(order)
}

export {loginFunc}
export {updateUserDB}
export {filterData}
export {addOrder}
export {checkRegisterForm}