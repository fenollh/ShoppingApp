import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { addOrder } from '../components/globalFunctions'
import { store } from '../components/state'
import RNDateTimePicker from '@react-native-community/datetimepicker';


export default class AddProductScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            date: new Date(),
            time: new Date(),
            quantity: 0,
            showCalendar: false,
            showClock: false,
            showQuantityErr: false,
        }
    }
    render(){
        let dateTime = new Date(this.state.date.toString().slice(4,15)+' '+this.state.time.toString().slice(16))
        const {shop, item} = this.props.props.route.params
        let clockSec
        let calensarSec
        if(this.state.showCalendar){
            calensarSec=(
                <RNDateTimePicker 
                    value={ this.state.date }
                    mode='default'
                    display='default'
                    onChange={ (_,newDate) => {
                        (newDate)
                        ? this.setState({ date: newDate, showCalendar: false }) 
                        : this.setState({ showCalendar: false })
                    }} />
            )
        } else calensarSec=<View/>
        if(this.state.showClock){
            clockSec=(
                <RNDateTimePicker 
                    value={ this.state.time }
                    is24Hour={true}
                    mode='time'
                    display='default'
                    onChange={ (_,newTime) => {
                        (newTime)
                        ? this.setState({ time: newTime, showClock: false }) 
                        : this.setState({ showClock: false })
                    }} />
            )
        } else clockSec=<View/>
        
        return(
            <View style={styles.container}>
                <View style={styles.mainBox}>
                    <View style={{flex:2, alignItems: 'center'}}>
                        <Image
                        style={{height: 100, width: 100, borderRadius: 50, margin: '2%'}}
                        source={{uri: item.image}}
                        />
                        <Text style ={{fontSize: 17, fontWeight: 'bold'}}>Order: {item.name}</Text>
                    </View>
                    <View style={{flex:4, alignItems: 'center', marginTop: 45}}>
                        <View style={styles.formBox}>
                            <Text style={styles.dateTxt}>Order for day:      {this.state.date.toString().slice(4,15)}</Text>
                            <Entypo 
                                name='calendar' 
                                size={30} 
                                color='black' 
                                style={{flex:1, alignSelf: 'center'}} 
                                onPress={()=>this.setState({showCalendar: true})}/>
                        </View>
                        {
                            (this.state.showCalendar)
                            ?(
                                <RNDateTimePicker 
                                    value={ this.state.date }
                                    mode='default'
                                    display='default'
                                    onChange={ (_,newDate) => {
                                        (newDate)
                                        ? this.setState({ date: newDate, showCalendar: false }) 
                                        : this.setState({ showCalendar: false })
                                    }} />
                            )
                            :<Text/>
                        }
                        <View style={styles.formBox}>
                            <Text style={styles.dateTxt}>Order for time:      {this.state.time.toString().slice(16,21)}</Text>
                            <Fontisto 
                                name='clock' 
                                size={30} 
                                color='black' 
                                style={{flex:1, alignSelf: 'center'}} 
                                onPress={()=>this.setState({showClock: true})}/>
                        </View>
                        {
                            (this.state.showClock)
                            ?(
                                <RNDateTimePicker 
                                    value={ this.state.time }
                                    is24Hour={true}
                                    mode='time'
                                    display='default'
                                    onChange={ (_,newTime) => {
                                        (newTime)
                                        ? this.setState({ time: newTime, showClock: false }) 
                                        : this.setState({ showClock: false })
                                    }} />
                            )
                            :<Text/>
                        }
                        <View style={styles.formBox}>
                            <Text style={styles.dateTxt}>Quantity:      {this.state.quantity}</Text>
                            <AntDesign 
                                name='minus' 
                                size={50} 
                                color='black' 
                                style={{flex:1.5, alignSelf: 'center'}} 
                                onPress={()=>{
                                    if(this.state.quantity > 0){
                                        this.setState({quantity: this.state.quantity-1})
                                    }
                                    }}/>
                            <Ionicons 
                                name='ios-add' 
                                size={50} 
                                color='black' 
                                style={{flex:1.5, alignSelf: 'center'}} 
                                onPress={()=>{
                                    if(item.quantity<0 || this.state.quantity < item.quantity){
                                        this.setState({quantity: this.state.quantity+1, showQuantityErr: false})
                                    }else 
                                    this.setState({showQuantityErr: true})
                                    }}/>
                        </View>
                        {
                            (this.state.quantity>=item.quantity && item.quantity>0)
                            ?<Text style={{color:'red'}}> Maximun quantity reached: {item.quantity}</Text>
                            :<Text/>
                        }
                    </View>
                    <View style={{flex: 2, marginBottom: 30, marginEnd: 30, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{fontSize:20, fontWeight: 'bold'}}>Cost:</Text>
                        <Text style={{fontSize:100, marginHorizontal: 10}}>{item.cost*this.state.quantity}€</Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <TouchableOpacity 
                            style={styles.button} 
                            activeOpacity={0.6}
                            onPress={()=>this.props.props.navigation.goBack()}>
                            <Entypo name='cross' size={50} color='red' style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, {flexDirection: 'row'}]} 
                            activeOpacity={0.6}
                            onPress={()=>{
                                addOrder(item.name, item.cost, shop.email, this.state.quantity, dateTime, store.getState().usermail, store.getState().username)
                                this.props.props.navigation.goBack()
                                }}>
                            <Text style={styles.buttonTxt}>ORDER</Text>
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
        backgroundColor:'rgba(0,0,0, 0.7)',
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
        flex:1, 
        alignSelf: 'center',
        marginStart: '30%',
        fontSize: 15,
        fontWeight: 'bold',
    },
    formBox: {
        height: 50,
        width: '90%',
        backgroundColor: 'rgb(200,230,255)',
        flexDirection: 'row',
        marginVertical: '2%',
        borderRadius: 5
    },
    dateTxt: {
        flex:5,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginHorizontal: '2%'
    },
})