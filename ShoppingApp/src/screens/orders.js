import React from 'react'
import {State} from '../components/state'
import {
    View,
    Text, 
    Image,
    StyleSheet,
} from 'react-native'

export default class OrdersScreen extends React.Component{
    render(){
        let page
        if(State.accountType == 'costumer'){
            page=(
                <View style={{flex: 1, backgroundColor: 'red'}}></View>
            )
        }
        if(State.accountType == 'shop'){
            page=(
                <View style={{flex: 1, backgroundColor: 'blue'}}>
                    <Image
                    style={{ height: 100, width: 100, }}
                    source={{ uri: State.profileImage }}
                    />
                </View>
            )
        }
        return(
            <View style={styles.container}>
                {page}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(200,200,200)',
    }
})