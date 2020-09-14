import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

import { store } from '../../redux/state'
import StarsRating from '../../components/startsRating'
import StockSection from './stockSection'

export default class ProfileScreen extends React.Component{
    render(){
        store.subscribe(()=>{
            if( Store.usermail != store.getState().usermail || 
                Store.username != store.getState().username || 
                Store.name != store.getState().name || 
                Store.description != store.getState().description || 
                Store.image != store.getState().image){
                this.forceUpdate()
            } 
        })
        let Store = store.getState()
        let valoraciones, stockSection
        if(Store.accountType == 'Costumer'){
            valoraciones= 
                <View style={{margin: '2%', flex: 1}}>
                    <Text style={{flex:1, fontWeight: 'bold', textDecorationLine: 'underline'}}> RELIABILITY </Text>
                    <View style={{flex:2, flexDirection: 'row', alignItems: 'center'}}>
                        <StarsRating data={Store.stars} style={{flex:1}}/>
                        <Text style={{marginLeft: '3%', fontSize: 20, flex:2}}>{Store.stars}</Text>
                    </View>
                </View>
            stockSection = <View/>
        }
        else{  
            valoraciones= 
            <View style={{margin: '2%', flex: 1}}>
                <Text style={{flex:1, fontWeight: 'bold', textDecorationLine: 'underline'}}> CUSTOMER RATINGS </Text>
                <View style={{flex:2, flexDirection: 'row', alignItems: 'center'}}>
                    <StarsRating data={Store.stars} style={{flex:1}}/>
                    <Text style={{marginLeft: '3%', fontSize: 20, flex:2}}>{Store.stars}</Text>
                </View>
            </View>
            stockSection = <StockSection navigation={this.props.navigation}/>
        }

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flex:1}}>
                        <Image
                            style={styles.profileImage}
                            source={{uri: (Store.image)?Store.image:null}}
                        />
                        <Text style={styles.profileName}>{Store.name}</Text>
                        <Text style={[styles.profileName, {fontWeight: 'normal'}]}>{Store.accountType}</Text>
                    </View>
                    <View style={{flex: 2.3}}>
                        <Text style={styles.username}>{Store.username}</Text>
                        <View style={{flex:1.8, alignItems: 'center', marginHorizontal: '5%'}}>
                            <Text style={{fontSize: 15}}>{Store.description}</Text>
                        </View>
                        <View style={{flex:1.2}}>
                            <TouchableOpacity 
                            style={styles.editButton} 
                            onPress= {_=> (Store.accountType == 'Costumer') ?this.props.navigation.navigate("EditUserData"):this.props.navigation.navigate("EditShopData")}>
                                <Text style={styles.profileName}>Edit profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex:0.5}}>
                    {valoraciones}
                </View>
                <View style={styles.body}>
                    {stockSection}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(240,245,240)',
    },
    header: {
        height: 170,
        flexDirection: 'row',
        backgroundColor: 'rgb(230,245,255)',
    },

    profileImage:{
        height: 100, 
        width: 100, 
        borderRadius: 50, 
        margin: '5%',
        marginBottom: '15%'
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    username:{
        flex:1, 
        alignSelf: 'center', 
        marginTop: '5%',
        fontWeight: 'bold',
        fontSize: 23,
    },
    editButton: {
        flex:1, 
        marginBottom: 5,
        height:30, 
        width: 200, 
        borderRadius: 20, 
        alignSelf: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgb(80,130,255)', 
    },  
    body: {
        flex: 3.5,
        padding: 10,
    },
})