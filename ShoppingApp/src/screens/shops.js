import React from 'react'
import { 
    View,
    Text,
    ScrollView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native'

import TagsSection from '../components/tagsSec'

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
                <View style={styles.main}>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    main: {
        flex: 20,
    }

})
