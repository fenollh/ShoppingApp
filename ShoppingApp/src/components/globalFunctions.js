import React from 'react'
import {State} from './state'

const initState = _ => {
    //descargar los datos de la DB al state. Se usa al hacer login
}

const authentication = (usermail, password) => {
    //check in the database is the email exists
    //check if the password is correct
    return true
}

const updateUserDB = (user, navigation) => {
    //subir todos estos datos a la DB
    navigation.navigate('Main')
    handleSession(user.usermail)
    State.usermail = user.usermail
}

const handleSession = (usermail) => {
    //create a new ID
    const sessionID = Math.round(Math.random()*10000000000)
    //reasign the sessID in the DB
    //safe the ID in the global state
    State.sessionID = sessionID

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
    return true
}

export {loginFunc}
export {updateUserDB}
export {filterData}