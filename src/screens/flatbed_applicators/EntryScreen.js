import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { selectTheme } from "../../../data/slices/themeSlice"
import PageTopBar from "../../components/PageTopBar"

const EntryScreen = () => {
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar title={t("applicators:entry")} />
            <View
                style={{
                    flex: 1,
                    backgroundColor: theme.theme.BACKGROUND_COLOR,
                }}
            >
                <View style={styles.buttongroup}>
                    <Text style={styles.text}>{t("applicators:entry")}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default EntryScreen

const styles = StyleSheet.create({
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
