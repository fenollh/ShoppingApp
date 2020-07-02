import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {addOrder} from '../components/globalFunctions'
import { State } from '../components/state'
import RNDateTimePicker from '@react-native-community/datetimepicker';


export default class AddProductScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            date: new Date(),
            showCalendar: false
        }
    }
    render(){
        const {shop, item} = this.props.route.params
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
        }
        else{
            calensarSec= <View/>
        }
        
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
                    <View style={{flex:6, alignItems: 'center', marginTop: 45}}>
                        <View style={styles.formBox}>
                            <Text style={styles.dateTxt}>Order for day: {this.state.date.toString().slice(4,15)}</Text>
                            <Entypo 
                                name='calendar' 
                                size={30} 
                                color='black' 
                                style={{flex:1, alignSelf: 'center'}} 
                                onPress={()=>this.setState({showCalendar: true})}/>
                        </View>
                        {calensarSec}
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <TouchableOpacity 
                            style={styles.button} 
                            activeOpacity={0.6}
                            onPress={()=>this.props.navigation.goBack()}>
                            <Entypo name='cross' size={50} color='red' style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, {flexDirection: 'row'}]} 
                            activeOpacity={0.6}
                            onPress={()=>addOrder(item.name, item.cost, shop.email, 5, Date.now(), State.usermail, State.username)}>
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
        flex:1, 
        alignSelf: 'center',
        marginStart: '30%',
        fontSize: 15,
        fontWeight: 'bold',
    },
    formBox: {
        height: 50,
        width: '90%',
        backgroundColor: 'rgb(200,200,200)',
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