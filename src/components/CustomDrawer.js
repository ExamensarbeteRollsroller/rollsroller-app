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
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
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
import { switchTheme, selectTheme } from "../../data/slices/themeSlice"
import LanguageModal from "./LanguageModal"
import ConfirmationModal from "./ConfirmationModal"

const CustomDrawer = (props) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userEmail = useSelector(selectEmail)
    const theme = useSelector(selectTheme)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [confirmation, setConfirmation] = useState(false)

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
                contentContainerStyle={{
                    backgroundColor: theme.theme.PRIMARY_COLOR,
                }}
            >
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/images/full_logotype.png")}
                        style={styles.logo}
                    />
                </View>
                <View
                    style={[
                        styles.draweritemlist,
                        { backgroundColor: theme.theme.BACKGROUND_COLOR },
                    ]}
                >
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View
                style={[
                    styles.footer,
                    { borderTopColor: theme.theme.LINE_COLOR },
                ]}
            >
                <TouchableHighlight
                    style={buttons.buttonDynamic}
                    onPress={() => {
                        console.log(t("menu:changelang"))
                        setModalVisibility(!modalVisibility)
                    }}
                    underlayColor={theme.theme.BUTTON_PRESS_COLOR}
                    activeOpacity={1}
                >
                    <Text style={buttons.buttonText}>
                        {t("menu:changelang")}
                    </Text>
                </TouchableHighlight>
                {userEmail !== null && (
                    <TouchableOpacity
                        onPress={() => {
                            setConfirmation(true)
                        }}
                        style={styles.logoutbutton}
                    >
                        <View style={styles.logout}>
                            <MaterialIcons
                                name="logout"
                                size={16}
                                color={theme.theme.ERROR_COLOR}
                            />
                            <Text
                                style={[
                                    styles.logouttext,
                                    { color: theme.theme.ERROR_COLOR },
                                ]}
                            >
                                {t("menu:logout")}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            <LanguageModal
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
            />
            <ConfirmationModal
                modalVisibility={confirmation}
                setModalVisibility={setConfirmation}
                func={handleLogout}
                title={t("menu:confirmationtitle")}
                text={t("menu:confirmationtext")}
                button1Text={t("menu:yes")}
                button2Text={t("menu:no")}
            />
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
        paddingTop: 8,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
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
    },
})
