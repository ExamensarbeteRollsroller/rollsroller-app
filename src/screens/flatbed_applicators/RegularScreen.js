import { StyleSheet, Text, View, StatusBar } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import PageTopBar from "../../components/PageTopBar"
import { useTranslation } from "react-i18next"

const RegularScreen = () => {
    const { t } = useTranslation()

    return (
        <SafeAreaView style={styles.safeArea}>
            <PageTopBar title={t("applicators:regular")} />
            <View style={styles.container}>
                <View style={styles.buttongroup}>
                    <Text style={styles.text}>{t("menu:regular")}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default RegularScreen

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#253A70",
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    buttongroup: {
        marginTop: 100,
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 20,
    },
})