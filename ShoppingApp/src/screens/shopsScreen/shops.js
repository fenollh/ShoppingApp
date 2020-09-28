import React from 'react'
import { 
    View,
    StyleSheet,
} from 'react-native'

import TagsSection from '../../components/tagsSec'
import ShopsListSection from './renderShops'
import { store } from '../../redux/state'
import { getShops } from '../../components/globalFunctions'

export default class ShopsScreen extends React.Component{
    
    constructor(props){
        super(props)
    }
    componentDidMount = () => {
        getShops()
    }
    render(){
        let Store = store.getState()
        store.subscribe(()=>{
            if( Store.selectedTag != store.getState().selectedTag ||
                Store.shopsList != store.getState().shopsList){
                    this.forceUpdate()
                } 
        })
        
        return(
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <TagsSection data={store.getState().tags} totalData='Shops' fatherComp={this}/>
                </View>
                <View style={{flex:20}}>
                    <ShopsListSection navigation={this.props.navigation}/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(245,250,245)',
    },
})
