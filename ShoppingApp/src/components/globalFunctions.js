import React from 'react'
import { Alert } from 'react-native'
import { store } from '../redux/state'
const serverRoute = 'http://192.168.1.43'

//////////////////////////////                             CHECK FORM FUNCTIONS                    /////////////////////////////////////

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
/////////////////////////////////                              GET DATA FUNCTIONS                         ///////////////////////////////////////
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
        var details = data.details.split(', ')
        store.dispatch({
            type: 'GET_SHOP_DATA',
            payload: {
                username: data.username,
                usermail: data.usermail,
                name: data.name,
                location: data.location,
                schedule: data.schedule,
                details: details,
                stars: data.stars,
                description: data.description,
                image: data.image,
                tags: data.tags,
                categories: data.categories,
                stock:  JSON.parse(data.stock),
                accountType: data.accountType,
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
}


////////////////////////////////////////////////                    AUTHENTICATION FUNCTIONS                   ////////////////////////////////////////

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
    if(typeof responseData.sessID == 'number'){
        return responseData
    }else{
        return 'Error while authenticating'
    }
}

const loginFunc = async (usermail, password, navigation) => {
    const data = await authentication(usermail, password)
    if(typeof data.sessID == 'number') {
        navigation.navigate('Main')
        
        store.dispatch({
            type: 'HANDLE_SESSION',
            payload: {
                usermail: usermail,
                sessionID: data.sessID
            }
        })
        initState(usermail, data.sessID, data.accountType)
    }else{
        Alert.alert('User or password are incorrect')
    }
}

const createUser = (user, shop, navigation) => {
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
            details: [0, 0, 0, 0],
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
        return responseData
    })
    .then(sessID=>{
        if(user) initState(user.usermail, sessID, 'user')
        if(shop) initState(shop.usermail, sessID, 'shop')
    })
    
}


////////////////////////////////////////////////////                 EDIT DATA FUNCTIONS                   /////////////////////////////////////////////////////

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
            return
        }
    })
}

const addStockProduct = (product) => {
    var Store = store.getState()
    var data = {
        availableTables: (Store.stock.availableTables)?Store.stock.availableTables:0,
        availableProducts: (Store.stock.availableProducts)?[...Store.stock.availableProducts, product]:[product],
    }
    fetch(serverRoute+':3002/shop', {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            column: 'stock',
            payload: JSON.stringify(data),
            sessionID: Store.sessionID.toString(),
            usermail: Store.usermail
        })
    })
    .then(()=> {
        store.dispatch({
            type: 'EDIT_STOCK',
            payload: data
        })
    } )
}

const removeStockProduct = (index) => {
    let Store = store.getState()
    Store.stock.availableProducts.splice(index, 1)
    console.log(Store.stock.availableProducts)
    fetch(serverRoute+':3002/shop', {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            column: 'stock',
            payload: JSON.stringify(Store.stock),
            sessionID: Store.sessionID.toString(),
            usermail: Store.usermail
        })
    })
    .then(()=> {
        store.dispatch({
            type: 'EDIT_STOCK',
            payload: Store.stock
        })
    })
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
}





///////////////////////////////                               HANDLE DATA FUNCTIONS

const filterData = (type, data) => { //el parametro data es la totalidad de los datos y type el criterio que se usara para filtar
    if(data === 'Shops') store.dispatch({type: 'EDIT_SELECTEDTAG', payload: type})
    else if(data== 'Categories') store.dispatch({type: 'EDIT_SELECTEDCATEGORIE', payload: type})
    return true
}



export {loginFunc}
export {createUser}
export {filterData}
export {addOrder}
export {checkRegisterForm}
export {editUserData}
export {addStockProduct}
export {removeStockProduct}