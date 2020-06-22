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

export default class Shops extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            shops: [],
            tags: ['Favourites', 'Near', 'Fast Food', 'Italian', 'Chinese']
        }
    }
    
    renderShops = (item) => {
        //this.state.shops = consulta de tiendas con tag selecionado
        //.then(render de this.state.shops)
    }

    renderTag = (item) => {
        return(
            <TouchableOpacity style={styles.tag} onPress={_=> this.renderShops(item)}>
                <Text style={styles.tagTxt}>{item}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.tagsZone}>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.tags}
                    keyExtractor={item => item}
                    renderItem={({ item, index }) => this.renderTag(item)}
                    />
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
    tagsZone: {
        flex:1,
    },
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

    main: {
        flex: 20,
    }

})
