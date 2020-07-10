import React from 'react'
import { store } from '../redux/state'

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