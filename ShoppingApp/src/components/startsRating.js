import React from 'react'
import { FlatList } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const StarsRating = (props) => {
    return(
        <FlatList
            style={props.style}
            horizontal={true}
            data={props.data}
            keyExtractor={({index}) => index}
            renderItem={({item})=> (item) 
                ?<AntDesign name='star' size={20} color='yellow'/> 
                :<AntDesign name='staro' size={20} color='yellow'/>}
        />
    )
}
export default StarsRating