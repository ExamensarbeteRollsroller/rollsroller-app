import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { useTranslation } from "react-i18next"

const Topbar = ({ arrow }) => {
    const { t } = useTranslation()
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t("startscreen:title")}</Text>
        </View>
    )
}

export default Topbar

const styles = StyleSheet.create({
    container: {
        height: "8%",
        backgroundColor: "#253A70",
    },
    text: {
        color: "#fff",
    },
})
