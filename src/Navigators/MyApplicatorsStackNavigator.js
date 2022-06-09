import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { useSelector } from "react-redux"
import MyApplicatorsScreen from "../screens/MyApplicatorsScreen"
import CustomApplicatorScreen from "../screens/CustomApplicatorScreen"
import ConnectionApplicatorScreen from "../screens/ConnectionApplicatorScreen"
import NewApplicatorScreen from "../screens/NewApplicatorScreen"
import { selectApplicators } from "../../data/slices/applicatorsSlice"
import QRCodeScannerScreen from "../screens/QRCodeScannerScreen"

const MyApplicatorsStackNavigator = () => {
    const Stack = createStackNavigator()
    const userApplicators = useSelector(selectApplicators)

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="MyApplicatorsScreen"
                component={MyApplicatorsScreen}
            />
            {/* If there are user applicators available, create screens for each of them */}
            {userApplicators === null ? (
                <></>
            ) : (
                userApplicators.map((applicator) => (
                    <Stack.Screen
                        key={applicator.key}
                        name={applicator.name + "SettingScreen"}
                        component={CustomApplicatorScreen}
                    />
                ))
            )}
            {userApplicators === null ? (
                <></>
            ) : (
                userApplicators.map((applicator) => (
                    <Stack.Screen
                        key={applicator.key}
                        name={applicator.name + "ConnectionScreen"}
                        component={ConnectionApplicatorScreen}
                    />
                ))
            )}
            <Stack.Screen
                name="QRCodeScannerScreen"
                component={QRCodeScannerScreen}
            />
            <Stack.Screen
                name="NewApplicatorScreen"
                component={NewApplicatorScreen}
            />
        </Stack.Navigator>
    )
}

export default MyApplicatorsStackNavigator

const styles = StyleSheet.create({})
