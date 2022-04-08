import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import PageTopBar from "../components/PageTopBar"

const CustomApplicatorScreen = (props) => {
    const { key, name, product, connectionIP, light } = props.route.params
    return (
        <SafeAreaView>
            <PageTopBar title={name} />
        </SafeAreaView>
    )
}

export default CustomApplicatorScreen

const styles = StyleSheet.create({})
