import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native'

import StarsRating from '../../components/startsRating'
import TagsSection from '../../components/tagsSec'
import RenderProductsSection from './renderProducts' 
import { store } from '../../redux/state'

export default class SelectedShopScreen extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        store.subscribe(()=>{
            if(Store.selectedCategorie != store.getState().selectedCategorie) this.forceUpdate()
        })
        let Store = store.getState()
        let spaceSection
        const {item} = this.props.route.params

        if(item.details.restaurant && item.accountType == 'Food'){
            spaceSection = 
                <View style={{flexDirection: 'row', }}>
                    <Text style={styles.availableTablesTxt}>Total number of tables: {item.stock.availableSpace}</Text>
                    <TouchableOpacity style={styles.reserveButton}><Text style={styles.availableTablesTxt}>Reserve</Text></TouchableOpacity>
                </View>
        }else if(item.accountType == 'Food'){
            spaceSection= <Text style={[styles.availableTablesTxt, {marginTop:'3%'}]}>This shop doesn't offer restaurant service</Text>
        }else{
            spaceSection=<View/>
        }
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flex:1}}>
                        <Image
                            style={styles.profileImage}
                            source={{uri: item.image}}
                        /> 
                        <StarsRating data={item.stars} style={{flex:1, marginStart: '7%'}}/>
                        <Text style={{alignSelf: 'center', flex:1}}>{item.stars}</Text>
                    </View>
                    <View style={{flex: 2.3}}>
                        <Text style={styles.username}>{item.username}</Text>
                        <View style={{flex:1.8, alignItems: 'center'}}>
                            <Text style={{fontSize: 15, textAlign: 'center'}}>{item.description}</Text>
                        </View>
                        <View style={{flex:1.2, flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.editButton} onPress={_=>Alert.alert(item.location)}>
                                <Text style={styles.buttonTxt}>View Location</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editButton} onPress={_=>Alert.alert(item.schedule)}>
                                <Text style={styles.buttonTxt}>View Schedule</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    
                    <View style={{flex:15}}>
                        <View style={styles.spaceSection}>
                            {spaceSection}
                        </View>
                        <View style={{flex:0.7}}>
                            <TagsSection data={item.categories} totalData='Categories' fatherComp={this}/>
                        </View>
                        <View style={{flex: 10, marginTop: '1%'}}>
                            <RenderProductsSection item={item} navigation={this.props.navigation}/>
                        </View>
                    </View>
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
        //borderWidth: 1,
        borderColor: 'rgb(0,0,0)', 
        margin: '5%',
        marginTop: '20%',
        marginBottom: '15%'
    },
    buttonTxt: {
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
        marginHorizontal: 5,
        height:30, 
        width: 200, 
        borderRadius: 20, 
        alignSelf: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgb(100,170,255)', 
    },  
    body: {
        flex: 3,
    },
    spaceSection: {
        flex:1, 
        backgroundColor: 'rgb(200,230,255)',
        marginTop:'2%',
        paddingStart: '2%', 
        justifyContent: 'center', 
        //borderBottomColor: 'black', 
        //borderBottomWidth:1
    },
    reserveButton: {
        backgroundColor: 'rgb(80,130,255)', 
        height: 30, 
        width: 100,
        borderRadius: 20,
        marginEnd: '2%',
        paddingTop: '1%',
    },
    availableTablesTxt:{ 
        flex:3,
        color: 'rgb(0,0,0)', 
        fontWeight: 'bold', 
        fontSize:15,
        alignSelf:'center'
    },
})