import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, Pressable } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import PageTopBar from "../components/PageTopBar"
import { useTranslation } from "react-i18next"


import { useNavigation } from "@react-navigation/native"



const ApplicatorsScreen = () => {
    const { t } = useTranslation()
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.safeArea}>
            <PageTopBar title={t("menu:myapplicators")} />
            <View style={styles.background}>
            <TouchableOpacity 
                style={[styles.container, styles.line]}
                onPress={() => {
                    navigation.navigate("InventorScreen")
                }}>
                <Image
                    source={require("../../assets/images/RR_Inventor_Edition.png")}
                    style={styles.logo}
                />
                    <View style={styles.textgroup}>
                        <Text style={styles.text}>{t("applicators:inventor")}</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity 
            style={[styles.container, styles.line]}
                onPress={() => {
                    navigation.navigate("PremiumScreen")
                }}>
                <Image
                    source={require("../../assets/images/Premium.jpg")}
                    style={styles.logo}
                />
                    <View style={styles.textgroup}>
                        <Text style={styles.text}>{t("applicators:premium")}</Text>
                    </View>  
            </TouchableOpacity>
            <TouchableOpacity 
            style={[styles.container, styles.line]}
                onPress={() => {
                    navigation.navigate("RegularScreen")
                }}>
                <Image
                    source={require("../../assets/images/Regular.jpg")}
                    style={styles.logo}
                />
                    <View style={styles.textgroup}>
                    
                        <Text style={styles.text}>{t("applicators:regular")}</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity 
            style={[styles.container, styles.line]}
                onPress={() => {
                    navigation.navigate("EntryScreen")
                }}>
                <Image
                    source={require("../../assets/images/Entry.jpg")}
                    style={styles.logo}
                />
                    <View style={styles.textgroup}>
                        <Text style={styles.text}>{t("applicators:entry")}</Text>
                    </View>
            </TouchableOpacity>
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
    background: {
        backgroundColor: "#fff",
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
    },
    textgroup: {
        alignItems: "center",
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "400",
    },
    logo: {
        width: '100%',
        flex: 1,
        resizeMode: "contain",
    },
    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
})
