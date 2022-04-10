import {
    Image,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native"
import React, { useState } from "react"
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer"
import { useTranslation } from "react-i18next"
import Ionicons from "react-native-vector-icons/Ionicons"
import * as SecureStore from "expo-secure-store"
import { useDispatch, useSelector } from "react-redux"
import {
    setEmail,
    setFname,
    setLname,
    setCompany,
    selectEmail,
} from "../../data/slices/userSlice"
import { setApplicators } from "../../data/slices/applicatorsSlice"
import { buttons } from "../../styles/buttons"

const CustomDrawer = (props) => {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const userEmail = useSelector(selectEmail)

    const handleLogout = async () => {
        await SecureStore.setItemAsync("_userData", "null")
        dispatch(
            setEmail(null),
            setFname(null),
            setLname(null),
            setCompany(null)
        )
        await SecureStore.setItemAsync("_userApplicators", "null")
        dispatch(setApplicators(null))
        console.log("logout")
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: "#253A70" }}
            >
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/images/full_logotype.png")}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.draweritemlist}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <TouchableHighlight
                    style={buttons.buttonDynamic}
                    onPress={() => {
                        if (i18n.language === "en") i18n.changeLanguage("sv")
                        else i18n.changeLanguage("en")
                        console.log(t("menu:changeLang"))
                    }}
                    underlayColor="#3b5591"
                    activeOpacity={1}
                >
                    <Text style={buttons.buttonText}>
                        {t("menu:changeLang")}
                    </Text>
                </TouchableHighlight>
                {userEmail !== null && (
                    <TouchableOpacity
                        onPress={() => {
                            handleLogout()
                        }}
                        style={styles.logoutbutton}
                    >
                        <View style={styles.logout}>
                            <Ionicons
                                name="log-out-outline"
                                size={16}
                                color="#ff0000"
                            />
                            <Text style={styles.logouttext}>
                                {t("menu:logout")}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    header: {
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        height: 46 / 2,
        width: 478 / 2,
    },
    draweritemlist: {
        backgroundColor: "#fff",
        paddingTop: 8,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        alignItems: "flex-start",
    },
    logoutbutton: {
        marginTop: 16,
        padding: 8,
    },
    logout: {
        flexDirection: "row",
        alignItems: "center",
    },
    logouttext: {
        fontSize: 16,
        marginLeft: 4,
        color: "red",
    },
})
