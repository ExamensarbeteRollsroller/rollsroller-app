import { StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApplicatorsScreen from "../screens/ApplicatorsScreen";
import { createStackNavigator } from "@react-navigation/stack";

import EntryScreen from "../screens/flatbed_applicators/EntryScreen"
import InventorScreen from "../screens/flatbed_applicators/InventorScreen"
import PremiumScreen from "../screens/flatbed_applicators/PremiumScreen"
import RegularScreen from "../screens/flatbed_applicators/RegularScreen"


const ApplicatorStackNavigator = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="ApplicatorsScreen"
                component={ApplicatorsScreen}/>
            
            <Stack.Screen
                name="InventorScreen"
                component={InventorScreen} />
            <Stack.Screen
                name="PremiumScreen"
                component={PremiumScreen} />
            <Stack.Screen
                name="RegularScreen"
                component={RegularScreen} />
            <Stack.Screen
                name="EntryScreen"
                component={EntryScreen} />
        </Stack.Navigator>
    );
}

export default ApplicatorStackNavigator
const styles = StyleSheet.create({})