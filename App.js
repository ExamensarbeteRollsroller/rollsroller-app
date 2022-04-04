import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"

import DrawerNavigator from "./src/Navigators/DrawerNavigator"
import { store } from "./store"

import "react-native-gesture-handler"
import "./src/translations/LocalizationInit"

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <DrawerNavigator />
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    )
}
