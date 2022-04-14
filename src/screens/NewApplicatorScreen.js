import { StyleSheet, Text, View } from "react-native"
import React, { useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import {
    setApplicators,
    selectApplicators,
} from "../../data/slices/applicatorsSlice"
import { selectTheme } from "../../data/slices/themeSlice"
import PageTopBar from "../components/PageTopBar"
import { buttons } from "../../styles/buttons"
import { input } from "../../styles/input"

const NewApplicatorScreen = () => {
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)
    const userApplicators = useSelector(selectApplicators)
    const dispatch = useDispatch()

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar title={t("newapplicator:title")} />
            <View
                style={{
                    flex: 1,
                    backgroundColor: theme.theme.BACKGROUND_COLOR,
                }}
            ></View>
        </SafeAreaView>
    )
}

export default NewApplicatorScreen

const styles = StyleSheet.create({})
