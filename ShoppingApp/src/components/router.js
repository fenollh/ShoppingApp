import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Entypo'

import { 
    View,
    StyleSheet,
} from 'react-native';


import ShoppingList from '../screens/shoppingList'
import Shops from '../screens/shops'


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class Router extends React.Component{
    
    
    TabNavigator({navigation}) {
        return(
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({}) => {
                    let iconName;
                    if (route.name === 'ShoppingList')  { iconName = 'list' }
                    else if (route.name === 'Shops') { iconName = 'shop' }
                    return <Ionicons name={iconName} size={25} color='rgb(52,251,167)' />;
                },
            })}      
            tabBarOptions={{
                showIcon: true,
                showLabel: false,
            }}>
                <Tab.Screen name="ShoppingList" component={ShoppingList} />
                <Tab.Screen name="Shops" component={Shops} />
            </Tab.Navigator>
        )
    }

    StackNavigator({navigation}) {
        return(
            <Stack.Navigator headerMode= 'none'>
                <Stack.Screen name="main" component={this.TabNavigator} />
            </Stack.Navigator>
        )
    }

    render(){
        return(
            <View style={{flex:1}}>
                <NavigationContainer theme={MyTheme}>
                    <Drawer.Navigator 
                        drawerStyle={styles.drawer}
                        drawerContentOptions={{
                            activeTintColor: '#e91e63',
                            itemStyle: { marginVertical: 30 },
                        }}>
                        <Drawer.Screen name="main" component={this.TabNavigator} options={{
                            drawerIcon: config => <Ionicons name='list' size={25} color='rgb(52,251,167)' />
                        }}/>
                    </Drawer.Navigator>
                </NavigationContainer>
            </View>
        )
    }
}
const MyTheme = {
    colors: {
        primary: 'rgb(52,251,167)', 
        card: 'rgb(80,130,255)',
    },
};

const styles = StyleSheet.create({
    drawer:{
        backgroundColor: 'rgb(100,100,100)',
        width: 250,
    },
})