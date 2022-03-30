import { StyleSheet, Text, View, StatusBar } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import PageTopBar from "../components/PageTopBar"
import { useTranslation } from "react-i18next"

const ApplicatorsScreen = () => {
    const { t } = useTranslation()

    return (
        <SafeAreaView style={styles.safeArea}>
            <PageTopBar title={t("menu:applicators")} />
            <View style={styles.container}>
                <View style={styles.buttongroup}>
                    <Text style={styles.text}>{t("menu:applicators")}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ApplicatorsScreen

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
