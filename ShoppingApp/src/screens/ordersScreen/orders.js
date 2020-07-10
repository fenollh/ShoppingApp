import React from 'react'
import { store } from '../../redux/state'
import {
    View,
    Text, 
    Image,
    StyleSheet,
} from 'react-native'
import RenderOrdersSection from './renderOrders'

export default class OrdersScreen extends React.Component{

    calculateCost = (Store) =>{
        let cost=0
        for(let i=0; i<=Store.myOrders.length -1; i++){
            cost = cost + Store.myOrders[i].quantity*Store.myOrders[i].itemCost
        }
        return cost
    }
    
    render(){
        store.subscribe(()=>{
            if(Store.myOrders != store.getState().myOrders) this.forceUpdate()
        })
        let Store = store.getState()
        let page
        if(Store.accountType == 'Costumer'){
            page=(
                <View style={{flex:1}}>
                    <View style={{flex:8}}>
                        <RenderOrdersSection father={this}/>
                    </View>
                    <View style={styles.costView}>
                        <Text style={styles.costTxt}>TOTAL COST: {this.calculateCost(Store)}€</Text>
                    </View>
                </View>
            )
        }
        else{
            page=(
                <View style={{flex: 1, backgroundColor: 'blue'}}>
                    <Image
                    style={{ height: 100, width: 100, }}
                    source={{ uri: Store.profileImage }}
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
        //padding: '3%',
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