import React from 'react'
import {State} from '../components/state'
import {
    View,
    Text, 
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import RenderOrdersSection from '../components/renderOrders'

export default class OrdersScreen extends React.Component{
    
    calculateCost = () =>{
        let cost=0
        for(let i=0; i<=State.myOrders.length -1; i++){
            cost = cost + State.myOrders[i].quantity*State.myOrders[i].itemCost
        }
        return cost
    }
    
    render(){
        let page
        if(State.accountType == 'Costumer'){
            page=(
                <View style={{flex:1}}>
                    <View style={{flex:8}}>
                        <RenderOrdersSection father={this}/>
                    </View>
                    <TouchableOpacity style={styles.costView} onPress={()=>this.forceUpdate()}>
                        <Text style={styles.costTxt}>TOTAL COST: {this.calculateCost()}€</Text>
                    </TouchableOpacity>
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