import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home';
import Details from '../Screens/Details';

const RootStackNavigation = () => {
    const RootStack = createNativeStackNavigator();
  return (
    <RootStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1c357F'
        },
        headerTintColor: '#fff'
    }} >
        <RootStack.Screen name='Home' component={Home} />
        <RootStack.Screen options={{headerShown:false}} name='Details' component={Details} />

    </RootStack.Navigator>
  )
}

export default RootStackNavigation