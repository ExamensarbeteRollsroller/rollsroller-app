import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"

import DrawerNavigator from "./src/Navigators/DrawerNavigator"

import "react-native-gesture-handler"
import "./src/translations/LocalizationInit"
import "react-native-gesture-handler"

export default function App() {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <DrawerNavigator />
            </SafeAreaProvider>
        </NavigationContainer>
    )
}
