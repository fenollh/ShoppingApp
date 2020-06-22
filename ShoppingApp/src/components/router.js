import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    View 
} from 'react-native';
import ShoppingList from '../screens/shoppingList'
import Shops from '../screens/shops'

const Tab = createMaterialTopTabNavigator();

export default class Router extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="ShoppingList" component={ShoppingList} />
                        <Tab.Screen name="Shops" component={Shops} />
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        )
    }
}