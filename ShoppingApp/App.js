import React from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import ShoppingList from './src/screens/shoppingList'
import Router from './src/components/router'
import Header from './src/components/header'



export default class App extends React.Component {


  render(){
    return (
      <View style={styles.container}>
        <Header/>
        <Router/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
})
