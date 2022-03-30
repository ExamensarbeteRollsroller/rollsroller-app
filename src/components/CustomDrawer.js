import {
    Image,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
} from "react-native"
import React from "react"
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer"
import { useTranslation } from "react-i18next"
import Ionicons from "react-native-vector-icons/Ionicons"

const CustomDrawer = (props) => {
    const { t, i18n } = useTranslation()

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
                <Button
                    color={"rgba(37, 58, 112, 1)"}
                    title={t("menu:changeLang")}
                    onPress={() => {
                        if (i18n.language === "en") i18n.changeLanguage("sv")
                        else i18n.changeLanguage("en")
                    }}
                ></Button>
                <TouchableOpacity
                    onPress={() => {
                        console.log("logout")
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
        paddingTop: 10,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        alignItems: "flex-start",
    },
    logoutbutton: {
        marginTop: 15,
        marginLeft: -10,
        borderRadius: 25,
        padding: 10,
        fontSize: 10,
    },
    logout: {
        flexDirection: "row",
        alignItems: "center",
    },
    logouttext: {
        fontSize: 15,
        marginLeft: 5,
        color: "red",
    },
})
