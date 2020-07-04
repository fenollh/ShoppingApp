import React from 'react'
import {State} from '../components/state'
import {
    View,
    Text, 
    Image,
    StyleSheet,
} from 'react-native'
import RenderOrdersSection from './renderOrders'

export default class OrdersScreen extends React.Component{
    
    calculateCost = () =>{
        let cost
        return 30
    }
    
    render(){
        let page
        if(State.accountType == 'Costumer'){
            console.log('rendered')
            page=(
                <View style={{flex:1}}>
                    <View style={styles.mainBox}>
                        <RenderOrdersSection/>
                    </View>
                    <View style={styles.costView}>
                        <Text style={styles.costTxt}>TOTAL COST: {this.calculateCost()}€</Text>
                    </View>
                </View>
            )
        }
        else{
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
        padding: '3%',
        backgroundColor: 'rgb(240,245,240)',
    },
    mainBox: {
        flex:8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'rgb(240,245,240)',
    },
    costView:{
        flex:1,
        justifyContent: 'center',
    },  
    costTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginEnd: 30
    },
})