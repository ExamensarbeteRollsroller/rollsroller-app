import { StyleSheet, Text, View, StatusBar, Image } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import PageTopBar from "../components/PageTopBar"
import { useTranslation } from "react-i18next"

const MyApplicatorsScreen = () => {
    const { t } = useTranslation()

    return (
        <SafeAreaView style={styles.safeArea}>
            <PageTopBar title={t("menu:myapplicators")} />
            <View style={styles.container}>
                
                    <View style={styles.buttongroup}>
                        <Text style={styles.text}>{t("menu:myapplicators")}</Text>
                    </View>
            </View>
        </SafeAreaView>
    )
}

export default MyApplicatorsScreen

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#253A70",
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
    },
    buttongroup: {
        marginTop: 50,
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "400",
    },
    logo: {
        width: 400,
        height: 100,
        flex: 1,
        resizeMode: "contain",
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
})
