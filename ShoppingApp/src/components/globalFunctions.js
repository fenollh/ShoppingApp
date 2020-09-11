import React from 'react'
import { Alert } from 'react-native'
import { store } from '../redux/state'
const serverRoute = 'http://192.168.1.43'

/*
fetch golang server example
    const route = '/0'
    fetch(serverRoute+':3000'+route)
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
    if(type == 'costumer'){
        if(!formData.usermail || !formData.username || !formData.name || !formData.age || !formData.password){
            Alert.alert("complete all the fields before submitting")
            return false
        }
        return true
    }
    else if (type == 'shop'){
        if(!formData.usermail || !formData.username || !formData.name || !formData.password || !formData.accountType){
            Alert.alert("complete all the fields before submitting")
            return false
        }
        return true
    }
}

const initState = async (usermail, sessionID, type) => {
    var link = ''
    if (type === 'shop'){
        link=serverRoute+':3000/getPrivateShop'
    }else {
        link=serverRoute+':3000/getPrivateUser'
    }
    const response = await fetch(link, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usermail: usermail,
            sessionID: sessionID.toString(),
        })
    })
    const data = await response.json()
    if (type === 'shop'){
        store.dispatch({
            type: 'GET_SHOP_DATA',
            payload: {
                username: data.username,
                usermail: data.usermail,
                name: data.name,
                location: data.location,
                schedule: data.schedule,
                details: data.details,
                stars: data.stars,
                description: data.description,
                image: data.image,
                tags: data.tags,
                categories: data.categories,
                stock: data.stock,
                accountType: data.shopType,
            }
        })
    }else{
        var shoppingList = data.shoppingList.split('')
        store.dispatch({
            type: 'GET_USER_DATA',
            payload: {
                username: data.username,
                usermail: data.usermail,
                name: data.name,
                age: data.age,
                description: data.description,
                image: data.image,
                stars: data.stars,
                favShopsList: data.favShopsList,
                shoppingList: shoppingList,
                accountType: data.accountType,
            }
        })
    }
    /* 
    1) get user data (done)
    2) get orders data
    3) cast all the data to a useful format
    4) complete the rest of the filds
    5) upload the data to the state (only user data)
    */
}

const authentication = async (usermail, password, sessionID) => {
    const response = await fetch(serverRoute+':3001/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usermail: usermail,
            password: password,
        })
    })
    const responseData = await response.json()
    if(typeof responseData == 'number'){
        return responseData
    }else{
        return 'Error'
    }
}

const createUser = (user, shop, navigation) => {
    //subir todos estos datos a la DB
    var route, data
    if(user){
        route = serverRoute+':3001/newuser'
        data={
            usermail: user.usermail,
            username: user.username,
            password: user.password,
            name: user.name,
            age: user.age,
            image: user.photo,
        }
    }else{
        route = serverRoute+':3001/newshop'
        data={
            shopmail: shop.usermail,
            username: shop.username,
            name: shop.name,
            password: shop.password,
            accountType: shop.accountType,
            image: shop.photo,
        }
    }
    fetch(route, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((responseData)=> {
        if(typeof responseData == 'number'){
            navigation.navigate('Main')
            store.dispatch({
                type: 'EDIT_USERMAIL',
                payload: (user)?user.usermail :shop.usermail
            })
            store.dispatch({
                type: 'EDIT_SESSION',
                payload: responseData,
            })
        }else{
        }
    })
    
}

const loginFunc = async (usermail, password, navigation) => {
    const sesID = await authentication(usermail, password) //necesito que tambien retorne el tipo de cuenta
    if(typeof sesID == 'number') {
        navigation.navigate('Main')
        
        store.dispatch({
            type: 'HANDLE_SESSION',
            payload: {
                usermail: usermail,
                sessionID: sesID
            }
        })
        initState(usermail, sesID, 'user') //descargar todos los datos de usuario al State de la DB

    }else{
        Alert.alert('User or password are incorrect')
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

const editUserData = (parameter, newData, categorie) => {
    var Store = store.getState()
    var endpoint
    if(categorie == 'user') endpoint='/user'
    if(categorie == 'shop') endpoint='/shop'
    fetch(serverRoute+':3002'+endpoint, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            column: parameter,
            payload: newData,
            sessionID: Store.sessionID.toString(),
            usermail: Store.usermail,
        })
    })
    .then(response => {
        if(response.status == 200){
            store.dispatch({
                type: 'EDIT_'+parameter.toUpperCase(),
                payload: newData
            })
        }
        else{
            console.log('Error: '+response.status)
            return
        }
    })
}

export {loginFunc}
export {createUser}
export {filterData}
export {addOrder}
export {checkRegisterForm}
export {editUserData}