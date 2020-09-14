import React from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'

export default class AddStock extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
            <View style={styles.container}>
                <Text onPress={_=>this.props.navigation.goBack()}>GO BACK</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    }
})