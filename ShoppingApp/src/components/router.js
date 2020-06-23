import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { 
    View,
    StyleSheet,
} from 'react-native';

import LoginScreen from '../screens/login'
import ShoppingListScreen from '../screens/shoppingList'
import ShopsScreen from '../screens/shops'
import SettingsScreen from '../screens/settings'
import ProfileScreen from '../screens/profile'
import AboutUsScreen from '../screens/aboutus'
import ContactUsScreen from '../screens/contactus'


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class Router extends React.Component{
    
    TabNavigator(_) {
        return(
            <Tab.Navigator
            initialRouteName='Shops'
            screenOptions={({ route }) => ({
                tabBarIcon: ({}) => {
                    let iconName;
                    if (route.name === 'ShoppingList')  { iconName = 'list' }
                    else if (route.name === 'Shops') { iconName = 'shop' }
                    return <Entypo name={iconName} size={25} color='rgb(52,251,167)' />;
                },
            })}      
            tabBarOptions={{
                showIcon: true,
                showLabel: false,
            }}>
                <Tab.Screen name="ShoppingList" component={ShoppingListScreen} />
                <Tab.Screen name="Shops" component={ShopsScreen} />
            </Tab.Navigator>
        )
    }

    DrawerNavigator = _ => {
        return(
            <Drawer.Navigator 
                edgeWidth={40}
                drawerStyle={styles.drawer}
                drawerContentOptions={{
                    inactiveTintColor: 'rgb(52,167,251)',
                    activeTintColor: 'rgb(52,167,251)',
                    itemStyle: { marginVertical: 10 },
                }}>
                <Drawer.Screen name='Main' component={this.TabNavigator} options={{
                    drawerIcon: _ => <Entypo name='list' size={25} color='rgb(52,167,251)' />
                }}/>
                <Drawer.Screen name='Profile' component={ProfileScreen} options={{
                    drawerIcon: _ => <Ionicons name='md-person' size={25} color='rgb(52,167,251)' />
                }}/>
                <Drawer.Screen name='Settings' component={SettingsScreen} options={{
                    drawerIcon: _ => <Ionicons name='ios-settings' size={25} color='rgb(52,167,251)' />
                }}/>
                <Drawer.Screen name='About Us' component={AboutUsScreen} options={{
                    drawerIcon: _ => <Ionicons name='ios-information-circle-outline' size={25} color='rgb(52,167,251)' />
                }}/>
                <Drawer.Screen name='Contact Us' component={ContactUsScreen} options={{
                    drawerIcon: _ => <Ionicons name='ios-mail' size={25} color='rgb(52,167,251)' />
                }}/>
            </Drawer.Navigator>
        )
    }


    render(){
        return(
            <View style={{flex:1}}>
                <NavigationContainer theme={MyTheme}>
                    <Stack.Navigator headerMode= 'none' initialRouteName='Login'>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Main" component={this.DrawerNavigator} />
                    </Stack.Navigator>
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