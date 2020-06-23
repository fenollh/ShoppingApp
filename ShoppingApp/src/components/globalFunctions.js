import React from 'react'
import {State} from './state'

const authentication = (usermail, password) => {
    //check in the database is the email exists
    //check if the password is correct
    return true
}


const loginFunc = (usermail, password, navigation) => {
    if (authentication(usermail, password)){
        navigation.navigate('Main')
        State.usermail = usermail
    }
    else{
        navigation.navigate('Login')
    }
}
export {loginFunc}