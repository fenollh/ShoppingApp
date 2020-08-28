import React from 'react'
import { FlatList } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
const arr = []
const StarsRating = (props) => {
    castIntToArr(props.data)
    return(
        <FlatList
            style={props.style}
            horizontal={true}
            data={arr}
            keyExtractor={({index}) => index}
            renderItem={({item})=> (item) 
                ?<AntDesign name='star' size={20} color='yellow'/> 
                :<AntDesign name='staro' size={20} color='yellow'/>}
        />
    )
}
const castIntToArr = (num) => {
    for(i=0; i<5; i++){
        if(i<num){
            arr[i]=1
        }else{
            arr[i]=0
        }
    }
}
export default StarsRating