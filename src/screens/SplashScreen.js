import { StyleSheet, View, Image } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"

const SplashScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#253A70" />
            <View style={styles.view}>
                <Image
                    source={require("../../assets/images/full_logotype.png")}
                    style={styles.logo}
                />
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#253A70",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    view: { height: "20%" },
    logo: {
        height: 46 / 2,
        width: 478 / 2,
    },
})
