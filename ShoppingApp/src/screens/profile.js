import React from 'react'
import {State} from '../components/state'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native'

export default class ProfileScreen extends React.Component{
    render(){
        if(State.accountType == 'costumer'){
            
        }
        else{

        }

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flex:1}}>
                        <Image
                            style={styles.profileImage}
                            source={{uri: State.profileImage}}
                        />
                        <Text style={styles.profileName}>{State.profileName}</Text>
                        <Text style={[styles.profileName, {fontWeight: 'normal'}]}>{State.accountType}</Text>
                    </View>
                    <View style={{flex: 2.3}}>
                        <Text style={styles.username}>{State.username}</Text>
                        <View style={{flex:1.8, alignItems: 'center'}}>
                            <Text style={{fontSize: 15}}>{State.profileDescription.profession}</Text>
                            <Text style={{fontSize: 15}}>{State.profileDescription.hobbies}</Text>
                            <Text style={{fontSize: 15}}>{State.profileDescription.location}</Text>
                        </View>
                        <View style={{flex:1.2}}>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.profileName}>Edit profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)', 
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
        flex: 3,
    },
})