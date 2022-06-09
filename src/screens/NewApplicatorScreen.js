import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TextInput,
    ScrollView,
} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import * as SecureStore from "expo-secure-store"
import Slider from "@react-native-community/slider"
import { Dropdown } from "react-native-element-dropdown"
import { useNavigation } from "@react-navigation/native"

import {
    setApplicators,
    selectApplicators,
} from "../../data/slices/applicatorsSlice"
import { selectTheme } from "../../data/slices/themeSlice"
import PageTopBar from "../components/PageTopBar"
import { buttons } from "../../styles/buttons"
import { input } from "../../styles/input"
import ErrorModal from "../components/ErrorModal"

const NewApplicatorScreen = (props) => {
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)
    const navigation = useNavigation()
    const [nameInput, onChangeName] = useState("")
    const [nameFocus, setNameFocus] = useState(false)
    const [connectionIPInput, onChangeConnectionIP] = useState("")
    const [connectionIPFocus, setConnectionIPFocus] = useState(false)
    const [productValue, setProductValue] = useState("Inventor")
    const [dropdownfocus, setDropdownfocus] = useState(false)
    const [slider, setSlider] = useState(parseFloat(1))
    const [modalVisibility, setModalVisibility] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalText, setModalText] = useState("")
    const [modalConfirmation, setModalConfirmation] = useState("")
    const userApplicators = useSelector(selectApplicators)
    const dispatch = useDispatch()

    const products = [
        { name: "Inventor" },
        { name: "Premium" },
        { name: "Regular" },
        { name: "Entry" },
    ]

    // Check is some route parameters are available, set values accordingly
    useEffect(() => {
        try {
            const { product, connectionIP } = props.route.params
            if (product !== "secretcode") {
                setProductValue(product)
                onChangeConnectionIP(connectionIP)
            }
        } catch (error) {
            console.log(error)
            setModalVisibility(true)
            setModalTitle(t("newapplicator:invalidmodaltitle"))
            setModalText(t("newapplicator:invalidmodaltext"))
            setModalConfirmation(t("newapplicator:modalconfirmation"))
        }
    }, [])

    // Check if input is empty
    const validateInput = (n, c) => {
        if (n === "") return false
        if (c === "") return false
        return true
    }

    const checkDuplicateName = (n) => {
        for (let i = 0; i < userApplicators.length; i++)
            if (userApplicators[i].name === n) return true
        return false
    }

    const saveData = async () => {
        var _userApplicators = []
        if (validateInput(nameInput, connectionIPInput)) {
            if (checkDuplicateName(nameInput)) {
                setModalVisibility(true)
                setModalTitle(t("newapplicator:duplicatemodaltitle"))
                setModalText(t("newapplicator:duplicatemodaltext"))
                setModalConfirmation(t("newapplicator:modalconfirmation"))
            } else {
                for (let i = 0; i < userApplicators.length; i++) {
                    _userApplicators.push(userApplicators[i])
                }
                var applicator = {
                    key: Math.floor(Math.random() * 1000),
                    name: nameInput,
                    product: productValue,
                    connectionIP: connectionIPInput,
                    light: slider,
                }
                _userApplicators.push(applicator)

                dispatch(setApplicators(_userApplicators))
                const jsonValue = JSON.stringify(_userApplicators)
                await SecureStore.setItemAsync("_userApplicators", jsonValue)

                // Upload the new data to the database.
                navigation.goBack()
            }
        } else {
            setModalVisibility(true)
            setModalTitle(t("newapplicator:emptymodaltitle"))
            setModalText(t("newapplicator:emptymodaltext"))
            setModalConfirmation(t("newapplicator:modalconfirmation"))
        }
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar title={t("newapplicator:title")} />
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: theme.theme.BACKGROUND_COLOR,
                }}
            >
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
                            style={[
                                input.label,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {t("myapplicatorsettings:name")}
                        </Text>
                        <TextInput
                            style={[
                                input.textInput,
                                nameFocus && input.focusBorder,
                            ]}
                            onChangeText={onChangeName}
                            placeholder={
                                t("newapplicator:nameplaceholder") +
                                "                                       " //Added spaces to make the textInput fill to the sides
                            }
                            value={nameInput}
                            textContentType="none"
                            autoComplete="off"
                            autoCapitalize="words"
                            selectionColor={theme.theme.ACTIVE_COMPONENT_COLOR}
                            selectTextOnFocus={true}
                            blurOnSubmit={true}
                            onFocus={() => {
                                setNameFocus(true)
                            }}
                            onBlur={() => {
                                setNameFocus(false)
                            }}
                        />
                        <Text
                            style={[
                                input.label,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {t("myapplicatorsettings:product")}
                        </Text>
                        <Dropdown
                            style={[
                                input.textInput,
                                dropdownfocus && {
                                    borderColor:
                                        theme.theme.ACTIVE_COMPONENT_COLOR,
                                },
                            ]}
                            placeholderStyle={styles.dropdownPlaceholderStyle}
                            data={products}
                            maxHeight={240}
                            value={productValue}
                            labelField="name"
                            placeholder={productValue}
                            onFocus={() => setDropdownfocus(true)}
                            onBlur={() => setDropdownfocus(false)}
                            onChange={(item) => {
                                setProductValue(item.name)
                                setDropdownfocus(false)
                            }}
                        />
                        <Text
                            style={[
                                input.label,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {t("myapplicatorsettings:connectionip")}
                        </Text>
                        <TextInput
                            style={[
                                input.textInput,
                                connectionIPFocus && input.focusBorder,
                            ]}
                            onChangeText={onChangeConnectionIP}
                            placeholder={t(
                                "newapplicator:connectionipplaceholder"
                            )}
                            value={connectionIPInput}
                            textContentType="none"
                            autoComplete="off"
                            autoCapitalize="none"
                            keyboardType="numeric"
                            selectionColor={theme.theme.ACTIVE_COMPONENT_COLOR}
                            selectTextOnFocus={true}
                            blurOnSubmit={true}
                            onFocus={() => {
                                setConnectionIPFocus(true)
                            }}
                            onBlur={() => {
                                setConnectionIPFocus(false)
                            }}
                        />
                        <Text
                            style={[
                                input.label,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {t("myapplicatorsettings:light")}
                        </Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={1}
                            step={0.1}
                            value={slider}
                            onValueChange={setSlider}
                            minimumTrackTintColor={theme.theme.PRIMARY_COLOR}
                            maximumTrackTintColor={
                                theme.theme.DARK_PRIMARY_COLOR
                            }
                        />
                    </View>
                </View>
            </ScrollView>
            <View
                style={[
                    styles.buttonContainer,
                    {
                        backgroundColor: theme.theme.BACKGROUND_COLOR,
                        borderTopColor: theme.theme.LINE_COLOR,
                    },
                ]}
            >
                <View style={styles.saveContainer}>
                    <TouchableHighlight
                        style={buttons.buttonDynamic}
                        onPress={() => {
                            console.log(t("myapplicatorsettings:save"))
                            saveData()
                        }}
                        underlayColor={theme.theme.BUTTON_PRESS_COLOR}
                        activeOpacity={1}
                    >
                        <Text style={buttons.buttonText}>
                            {t("myapplicatorsettings:save")}
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
            <ErrorModal
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
                title={modalTitle}
                text={modalText}
                buttonText={modalConfirmation}
            />
        </SafeAreaView>
    )
}

export default NewApplicatorScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 56,
        alignItems: "center",
    },
    dropdownPlaceholderStyle: {
        fontSize: 20,
    },
    slider: {
        height: 50,
    },
    buttonContainer: {
        height: 80,
        width: "100%",
        flexDirection: "row",
        borderTopWidth: 1,
    },
    saveContainer: {
        flexGrow: 1,
        marginLeft: 56,
        marginRight: 56,
    },
})
