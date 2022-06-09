import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    Text,
} from "react-native"
import React, { useState, useRef } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import * as SecureStore from "expo-secure-store"

import PageTopBar from "../components/PageTopBar"
import { setUserData } from "../../data/slices/userSlice"
import { setApplicators } from "../../data/slices/applicatorsSlice"
import { selectTheme } from "../../data/slices/themeSlice"
import { buttons } from "../../styles/buttons"
import { input } from "../../styles/input"

const LoginScreen = () => {
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)
    const [email, onChangeEmail] = useState(t("login:emailplaceholder")) // Pass a valid email and password to not show error windows from the start
    const [password, onChangePassword] = useState(
        t("login:passwordplaceholder")
    )
    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
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
            connectionIP: "192.168.50.88",
            light: "0.8",
        },
        {
            key: 2,
            name: "Johnny",
            product: "Inventor",
            connectionIP: "192.168.50.88",
            light: "0.3",
        },
    ]

    const validateEmail = (em) => {
        // regex of how emails are allowed to look, might not be perfect
        const res =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return res.test(em.toLowerCase())
    }

    const validatePassword = (pwd) => {
        return pwd.length >= 12
    }

    const fetchData = async () => {
        // Uncomment below for when adding a database and making user input necessary

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
        console.log(
            userData.email,
            userData.fname,
            userData.lname,
            userData.company
        )
        if (userData) {
            dispatch(setUserData(userData))
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

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar title={t("menu:login")} />
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: theme.theme.BACKGROUND_COLOR,
                    },
                ]}
            >
                <View style={input.inputContainer}>
                    <Text
                        style={[input.label, { color: theme.theme.TEXT_COLOR }]}
                    >
                        {t("login:emailprompt")}
                    </Text>
                    <TextInput
                        style={[
                            input.textInput,
                            emailFocus && input.focusBorder,
                        ]}
                        onChangeText={onChangeEmail}
                        placeholder={t("login:emailplaceholder")}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoComplete="email"
                        autoCapitalize="none"
                        selectionColor={theme.theme.ACTIVE_COMPONENT_COLOR}
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
                    <View style={input.errorContainer}>
                        <Text
                            style={[
                                !validateEmail(email) && input.errorTextInvalid,
                                input.errorText,
                            ]}
                        >
                            {!validateEmail(email) && t("login:invalidEmail")}
                        </Text>
                    </View>
                    <Text
                        style={[input.label, { color: theme.theme.TEXT_COLOR }]}
                    >
                        {t("login:passwordprompt")}
                    </Text>
                    <TextInput
                        style={[
                            input.textInput,
                            passwordFocus && input.focusBorder,
                        ]}
                        onChangeText={onChangePassword}
                        placeholder={t("login:passwordplaceholder")}
                        ref={passwordInput}
                        textContentType="password"
                        autoComplete="password"
                        autoCapitalize="none"
                        selectionColor={theme.theme.ACTIVE_COMPONENT_COLOR}
                        selectTextOnFocus={true}
                        secureTextEntry={true}
                        blurOnSubmit={true}
                        onSubmitEditing={() => {
                            fetchData()
                        }}
                        onFocus={() => {
                            setPasswordFocus(true)
                        }}
                        onBlur={() => {
                            setPasswordFocus(false)
                        }}
                    />
                    <View style={input.errorContainer}>
                        <Text
                            style={[
                                !validatePassword(password) &&
                                    input.errorTextInvalid,
                                input.errorText,
                            ]}
                        >
                            {!validatePassword(password) &&
                                t("login:invalidPassword")}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableHighlight
                        style={buttons.buttonStatic}
                        onPress={() => {
                            fetchData()
                            console.log(t("login:login"))
                        }}
                        underlayColor={theme.theme.BUTTON_PRESS_COLOR}
                        activeOpacity={1}
                    >
                        <Text style={buttons.buttonText}>
                            {t("login:login")}
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={buttons.buttonStatic}
                        onPress={() => {
                            console.log(t("login:register"))
                        }}
                        underlayColor={theme.theme.BUTTON_PRESS_COLOR}
                        activeOpacity={1}
                    >
                        <Text style={buttons.buttonText}>
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
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 56,
    },
    buttonGroup: {
        marginTop: 56,
        width: "100%",
        alignItems: "center",
    },
})
