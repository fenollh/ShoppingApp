import React from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import Router from './src/components/router'


export default class App extends React.Component {


  render(){
    return (
      <View style={styles.container}>
        <Router/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'rgb(255,255,255)',
  },
})
