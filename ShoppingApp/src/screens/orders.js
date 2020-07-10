import React from 'react'
import { store } from '../components/state'
import {
    View,
    Text, 
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import RenderOrdersSection from '../components/renderOrders'

export default class OrdersScreen extends React.Component{

    calculateCost = (Store) =>{
        let cost=0
        for(let i=0; i<=Store.myOrders.length -1; i++){
            cost = cost + Store.myOrders[i].quantity*Store.myOrders[i].itemCost
        }
        return cost
    }
    
    render(){
        let Store = store.getState()
        let page
        if(Store.accountType == 'Costumer'){
            page=(
                <View style={{flex:1}}>
                    <View style={{flex:8}}>
                        <RenderOrdersSection father={this}/>
                    </View>
                    <TouchableOpacity style={styles.costView} onPress={()=>this.forceUpdate()}>
                        <Text style={styles.costTxt}>TOTAL COST: {this.calculateCost(Store)}€</Text>
                    </TouchableOpacity>
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