import React from 'react'
import { 
    View,
    FlatList,
    StyleSheet,
} from 'react-native'

import TagsSection from '../components/tagsSec'
import ShopsListSection from '../components/renderShops'

export default class Shops extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <TagsSection/>
                </View>
                <View style={{flex:20}}>
                    <ShopsListSection/>
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
