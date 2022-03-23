import { StyleSheet, Text, View, Button } from "react-native"
import React from "react"
import { useTranslation } from "react-i18next"
import Topbar from "../components/Topbar"

const Startpage = () => {
    const { t, i18n } = useTranslation()

    return (
        <View style={styles.container}>
            <Topbar arrow={true}></Topbar>
            <Text>{t("startscreen:welcome")}</Text>
            <Button
                title={t("startscreen:welcome")}
                onPress={() => {
                    if (i18n.language === "en") i18n.changeLanguage("sv")
                    else i18n.changeLanguage("en")
                }}
            />
        </View>
    )
}

export default Startpage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
})
