import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    Text,
} from "react-native"
import React, { useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import * as SecureStore from "expo-secure-store"
import PageTopBar from "../components/PageTopBar"
import {
    setEmail,
    setFname,
    setLname,
    setCompany,
} from "../../data/slices/userSlice"

const LoginScreen = () => {
    const { t } = useTranslation()
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [login, onLoginPress] = useState(false)
    const dispatch = useDispatch()
    // Temporary dummy login data
    const userData = {
        email: "john@blund.se",
        fname: "John",
        lname: "Blund",
        company: "Skyltar AB",
    }

    useEffect(() => {
        const fetchData = async () => {
            /*
            Fetch data from database to verify login credentials and authenticate the user
            the userdata sent back should have all useful data, 
            for now only email, firstname, lastname and company is used.
            If user is valid; credentials are added in local secret storage and
            in temporary redux for state handling. 
            */
            // const userData = await fetch(apiURL)
            // TODO: Add applicators to redux and secret storage
            if (userData) {
                dispatch(
                    setEmail(userData.email),
                    setFname(userData.fname),
                    setLname(userData.lname),
                    setCompany(userData.company)
                )
                const jsonValue = JSON.stringify(userData)
                await SecureStore.setItemAsync("_userData", jsonValue)
            }
        }

        if (login) {
            fetchData()
        }
    }, [login])

    return (
        <SafeAreaView style={styles.safeArea}>
            <PageTopBar title={t("menu:login")} />
            <View style={styles.container}>
                <Text style={styles.text}>{t("login:emailprompt")}</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeEmail}
                    placeholder={t("login:emailplaceholder")}
                    autoComplete="email"
                />
                <Text style={styles.text}>{t("login:passwordprompt")}</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChangePassword}
                    placeholder={t("login:passwordplaceholder")}
                    autoComplete="password"
                    secureTextEntry={true}
                />
                <View style={styles.buttongroup}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            onLoginPress(true)
                        }}
                        underlayColor="#3b5591"
                        activeOpacity={1}
                    >
                        <Text style={styles.buttonText}>
                            {t("login:login")}
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            console.log(t("login:register"))
                        }}
                        underlayColor="#3b5591"
                        activeOpacity={1}
                    >
                        <Text style={styles.buttonText}>
                            {t("login:register")}
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 50,
    },
    text: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 15,
        marginBottom: 5,
        width: "80%",
        alignContent: "flex-start",
    },
    textInput: {
        width: "80%",
        fontSize: 20,
        padding: 15,
        backgroundColor: "#E5E5E5",
        borderRadius: 7,
    },
    buttongroup: {
        marginTop: 50,
        width: "100%",
        alignItems: "center",
    },
    button: {
        width: "60%",
        backgroundColor: "#253A70",
        alignItems: "center",
        borderRadius: 7,
        marginTop: 20,
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "#FFFFFF",
    },
})
