import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    Text,
} from "react-native"
import React, { useState, useEffect, useRef } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import * as SecureStore from "expo-secure-store"
import PageTopBar from "../components/PageTopBar"
import {
    setEmail,
    setFname,
    setLname,
    setCompany,
} from "../../data/slices/userSlice"
import { setApplicators } from "../../data/slices/applicatorsSlice"

const LoginScreen = () => {
    const { t } = useTranslation()
    const [email, onChangeEmail] = useState(t("login:emailplaceholder")) // Pass a valid email and password to not show error windows from the start
    const [password, onChangePassword] = useState(
        t("login:passwordplaceholder")
    )
    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [login, onLoginPress] = useState(false)
    const passwordInput = useRef(null)
    const dispatch = useDispatch()
    // Temporary dummy login data
    const userData = {
        email: "john@blund.se",
        fname: "John",
        lname: "Blund",
        company: "Skyltar AB",
    }
    const userApplicators = [
        {
            key: 1,
            name: "Gertrud",
            product: "Entry",
            connectionIP: "555.555.555.555",
            light: "0,8",
        },
        {
            key: 2,
            name: "Johnny",
            product: "Inventor",
            connectionIP: "555.555.555.555",
            light: "0,3",
        },
    ]

    const validateEmail = (em) => {
        const res =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return res.test(em.toLowerCase())
    }

    const validatePassword = (pwd) => {
        return pwd.length >= 12
    }

    useEffect(() => {
        const fetchData = async () => {
            /*if (!validateEmail(email)) {
                console.log(!validateEmail(email))
                return
            }
            if (!validatePassword(password)) {
                console.log(!validatePassword(password))
                return
            }
            /*
                Fetch data from database to verify login credentials and authenticate the user
                the userdata sent back should have all useful data, 
                for now only email, firstname, lastname and company is used.
                If user is valid; credentials are added in local secret storage and
                in temporary redux for state handling. 
            */
            // const userData = await fetch(apiURL)
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
            // Save the list of all applicators
            if (userApplicators) {
                dispatch(setApplicators(userApplicators))
                const jsonValue = JSON.stringify(userApplicators)
                await SecureStore.setItemAsync("_userApplicators", jsonValue)
            }
        }

        if (login) {
            fetchData()
        }
        onLoginPress(false)
    }, [login])

    return (
        <SafeAreaView style={styles.safeArea}>
            <PageTopBar title={t("menu:login")} />
            <View style={styles.container}>
                <Text style={styles.text}>{t("login:emailprompt")}</Text>
                <TextInput
                    style={[styles.textInput, emailFocus && styles.focusBorder]}
                    onChangeText={onChangeEmail}
                    placeholder={t("login:emailplaceholder")}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    selectionColor="#586D9F"
                    selectTextOnFocus={true}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                        passwordInput.current.focus()
                    }}
                    onFocus={() => {
                        setEmailFocus(true)
                    }}
                    onBlur={() => {
                        setEmailFocus(false)
                    }}
                />
                <Text
                    style={[
                        !validateEmail(email) && styles.errorTextInvalid,
                        styles.errorText,
                    ]}
                >
                    {!validateEmail(email) && t("login:invalidEmail")}
                </Text>
                <Text style={styles.text}>{t("login:passwordprompt")}</Text>
                <TextInput
                    style={[
                        styles.textInput,
                        passwordFocus && styles.focusBorder,
                    ]}
                    onChangeText={onChangePassword}
                    placeholder={t("login:passwordplaceholder")}
                    ref={passwordInput}
                    textContentType="password"
                    autoComplete="password"
                    autoCapitalize="none"
                    selectionColor="#586D9F"
                    selectTextOnFocus={true}
                    secureTextEntry={true}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                        onLoginPress(true)
                    }}
                    onFocus={() => {
                        setPasswordFocus(true)
                    }}
                    onBlur={() => {
                        setPasswordFocus(false)
                    }}
                />
                <Text
                    style={[
                        !validatePassword(password) && styles.errorTextInvalid,
                        styles.errorText,
                    ]}
                >
                    {!validatePassword(password) && t("login:invalidPassword")}
                </Text>
                <View style={styles.buttongroup}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            onLoginPress(true)
                            console.log(t("login:login"))
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
        paddingTop: 56,
    },
    text: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 16,
        marginBottom: 4,
        width: "80%",
        alignContent: "flex-start",
    },
    textInput: {
        width: "80%",
        fontSize: 20,
        padding: 15,
        backgroundColor: "#E5E5E5",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#fff",
    },
    focusBorder: {
        borderColor: "#000",
    },
    errorTextInvalid: {
        backgroundColor: "rgba(255, 0, 0, 0.3)",
    },
    errorText: {
        width: "80%",
        textAlign: "center",
        borderRadius: 6,
        padding: 8,
        marginTop: 4,
        fontSize: 16,
        fontWeight: "700",
    },
    buttongroup: {
        marginTop: 56,
        width: "100%",
        alignItems: "center",
    },
    button: {
        width: "60%",
        backgroundColor: "#253A70",
        alignItems: "center",
        borderRadius: 6,
        marginTop: 20,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonText: {
        fontSize: 16,
        color: "#FFFFFF",
    },
})
