import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {State} from '../components/state'
import StarsRating from '../components/startsRating'
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
        let valoraciones
        if(State.accountType == 'Costumer'){
            valoraciones= 
                <View style={{margin: '2%', flex: 1}}>
                    <Text style={{flex:1, fontWeight: 'bold', textDecorationLine: 'underline'}}> RELIABILITY </Text>
                    <View style={{flex:2, flexDirection: 'row', alignItems: 'center'}}>
                        <StarsRating data={State.stars} style={{flex:1}}/>
                        <Text style={{marginLeft: '3%', fontSize: 20, flex:2}}>{State.stars[0]+State.stars[1]+State.stars[2]+State.stars[3]+State.stars[4]}</Text>
                    </View>
                </View>
        }
        else{  
            valoraciones= 
            <View style={{margin: '2%', flex: 1}}>
                <Text style={{flex:1, fontWeight: 'bold', textDecorationLine: 'underline'}}> CUSTOMER RATINGS </Text>
                <View style={{flex:2, flexDirection: 'row', alignItems: 'center'}}>
                    <StarsRating data={State.stars} style={{flex:1}}/>
                    <Text style={{marginLeft: '3%', fontSize: 20, flex:2}}>{State.stars[0]+State.stars[1]+State.stars[2]+State.stars[3]+State.stars[4]}</Text>
                </View>
            </View>
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
        flex: 2.5,
    },
})