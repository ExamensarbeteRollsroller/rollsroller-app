import React from "react"
import "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import HomeScreen from "./src/screens/HomeScreen"
import "./src/translations/LocalizationInit"
import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

export default function App() {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    )
}
