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
    /*
    fetch('http://192.168.1.43:3000/getUserData/user')
    .then((response) => response.json())
    .then((responseData) => {
        store.dispatch({
            type: 'GET_USER_DATA',
            payload: responseData
        })
    })
    */
}

const authentication = (usermail, password, sessionID) => {
    /*
    fetch('http://192.168.1.43:3001/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usermail: user.usermail,
            password: user.password,
        })
    })
    .then((response) => response.json())
    .then((responseData) => responseData)
    */
    return true
}

const createUser = (user, navigation) => {
    //subir todos estos datos a la DB
    fetch('http://192.168.1.43:3001/newuser', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usermail: user.usermail,
            username: user.username,
            password: user.password,
            name: user.name,
            age: user.age,
            image: user.photo,
        })
    })
    navigation.navigate('Main')
    store.dispatch({
        type: 'EDIT_USERMAIL',
        payload: user.usermail
    })
}

const loginFunc = (usermail, password, navigation) => {
    let auth = authentication(usermail, password)
    if (auth){
        store.dispatch({
            type: 'EDIT_SESSION',
            payload: auth
        })
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
export {createUser}
export {filterData}
export {addOrder}
export {checkRegisterForm}