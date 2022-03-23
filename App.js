import React from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Startpage from "./pages/Startpage"
import "./translations/LocalizationInit"

export default function App() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Startpage />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#253A70",
        flex: 1,
    },
})
