import { StyleSheet, View, Image } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { useSelector } from "react-redux"
import { selectTheme } from "../../data/slices/themeSlice"

const SplashScreen = () => {
    const theme = useSelector(selectTheme)

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                { backgroundColor: theme.theme.PRIMARY_COLOR },
            ]}
        >
            <StatusBar
                barStyle={
                    theme.theme.MODE === "LIGHT"
                        ? "light-content"
                        : "dark-content"
                }
                backgroundColor={theme.theme.DARK_PRIMARY_COLOR}
            />
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
