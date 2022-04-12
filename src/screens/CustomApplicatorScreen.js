import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import { selectTheme } from "../../data/slices/themeSlice"
import PageTopBar from "../components/PageTopBar"

const CustomApplicatorScreen = (props) => {
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)
    const { key, name, product, connectionIP, light } = props.route.params

    return (
        <SafeAreaView>
            <PageTopBar
                title={t("myapplicatorsettings:settingstitle") + name}
            />
        </SafeAreaView>
    )
}

export default CustomApplicatorScreen

const styles = StyleSheet.create({})
