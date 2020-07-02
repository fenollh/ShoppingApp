import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {addOrder} from '../components/globalFunctions'
import { State } from '../components/state'


export default class AddProductScreen extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const {shop, item} = this.props.route.params
        return(
            <View style={styles.container}>
                <View style={styles.mainBox}>
                    <View style={{flex:8}}>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <TouchableOpacity 
                            style={styles.button} 
                            activeOpacity={0.6}
                            onPress={()=>console.log('cancel')}>
                            <Entypo name='cross' size={50} color='red' style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, {flexDirection: 'row'}]} 
                            activeOpacity={0.6}
                            onPress={()=>addOrder(item.name, item.cost, shop.email, 5, Date.now(), State.usermail, State.username)}>
                            <Text style={styles.buttonTxt}> ENCARGAR</Text>
                            <Ionicons name='ios-add' size={50} color='rgb(0,255,0)' style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor:'rgba(0,0,0, 0.6)',
    },
    mainBox: {
        backgroundColor: 'white', 
        height: '85%', 
        width: '85%', 
        borderRadius: 10,
    },
    button: {
        flex:1, 
        backgroundColor: 'rgb(80,130,255)', 
        margin: '2%', 
        borderRadius: 30, 
    },
    icon: {
        flex:1,
        alignSelf: 'center',
    },
    buttonTxt: {
        flex:2, 
        alignSelf: 'center',
        marginStart: '15%',
        fontSize: 15,
        fontWeight: 'bold',
    },
})