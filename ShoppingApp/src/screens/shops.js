import React from 'react'
import { 
    View,
    FlatList,
    StyleSheet,
} from 'react-native'

import TagsSection from '../components/tagsSec'
import ShopsListSection from '../components/renderShops'
import { State } from '../components/state'
import { Shops } from '../components/shopsList'

export default class ShopsScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <TagsSection data={State.tags} totalData={Shops}/>
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
        backgroundColor: 'rgb(240,245,240)',
    },
})
