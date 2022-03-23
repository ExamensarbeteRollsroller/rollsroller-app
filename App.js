import React from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Startpage from "./pages/Startpage"
import "./translations/LocalizationInit"

export default function App() {
    return (
        <>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.container}>
                <Startpage />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    topSafeArea: {
        flex: 0,
        backgroundColor: "#253A70",
    },
    bottomSafeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
})
