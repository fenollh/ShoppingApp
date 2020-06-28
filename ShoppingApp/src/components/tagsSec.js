import React from 'react'
import {State} from './state'
import {filterData} from './globalFunctions'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

export default class TagsSection extends React.Component{
    
    constructor(props){
        super(props)
    }

    renderTag = (item) => {
        return(
            <TouchableOpacity style={styles.tag} onPress={_=> filterData(item, this.props.totalData)}>
                <Text style={styles.tagTxt}>{item}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={this.props.data}
                keyExtractor={item => item}
                renderItem={({ item, index }) => this.renderTag(item)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tag: {
        marginHorizontal: 5, 
        marginTop: 10,
        borderRadius: 10, 
        backgroundColor: 'rgb(200,230,255)', 
        justifyContent: 'center',
    },
    tagTxt:{
        padding: 5, 
        alignSelf: 'center',
        fontSize: 17
    },
})