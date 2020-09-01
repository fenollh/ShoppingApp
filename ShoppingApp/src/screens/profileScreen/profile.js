import React from 'react'
import { store } from '../../redux/state'
import StarsRating from '../../components/startsRating'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

export default class ProfileScreen extends React.Component{
    render(){
        let Store = store.getState()
        store.subscribe(()=>{
            if(Store.usermail != store.getState().usermail) this.forceUpdate() // add other parameters
        })
        let valoraciones
        if(Store.accountType == 'Costumer'){
            valoraciones= 
                <View style={{margin: '2%', flex: 1}}>
                    <Text style={{flex:1, fontWeight: 'bold', textDecorationLine: 'underline'}}> RELIABILITY </Text>
                    <View style={{flex:2, flexDirection: 'row', alignItems: 'center'}}>
                        <StarsRating data={Store.stars} style={{flex:1}}/>
                        <Text style={{marginLeft: '3%', fontSize: 20, flex:2}}>{Store.stars}</Text>
                    </View>
                </View>
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
        }

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flex:1}}>
                        <Image
                            style={styles.profileImage}
                            source={{uri: Store.profileImage}}
                        />
                        <Text style={styles.profileName}>{Store.profileName}</Text>
                        <Text style={[styles.profileName, {fontWeight: 'normal'}]}>{Store.accountType}</Text>
                    </View>
                    <View style={{flex: 2.3}}>
                        <Text style={styles.username}>{Store.username}</Text>
                        <View style={{flex:1.8, alignItems: 'center', marginHorizontal: '5%'}}>
                            <Text style={{fontSize: 15}}>{Store.description}</Text>
                        </View>
                        <View style={{flex:1.2}}>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.profileName}>Edit profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex:0.5}}>
                    {valoraciones}
                </View>
                <View style={styles.body}>
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
        flex:1,
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
        flex: 2.5,
    },
})