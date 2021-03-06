import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TextInput,
    ScrollView,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import * as SecureStore from "expo-secure-store"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
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
import ConfirmationModal from "../components/ConfirmationModal"

const CustomApplicatorScreen = (props) => {
    const { key, name, product, connectionIP, light } = props.route.params
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)
    const navigation = useNavigation()
    const [nameInput, onChangeName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)
    const [connectionIPInput, onChangeConnectionIP] = useState(false)
    const [connectionIPFocus, setConnectionIPFocus] = useState(false)
    const [productValue, setProductValue] = useState(product)
    const [dropdownfocus, setDropdownfocus] = useState(false)
    const [slider, setSlider] = useState(parseFloat(light))
    const [duplicate, setDuplicate] = useState(false)
    const [confirmation, setConfirmation] = useState(false)
    const userApplicators = useSelector(selectApplicators)
    const dispatch = useDispatch()

    const products = [
        { name: "Entry" },
        { name: "Regular" },
        { name: "Premium" },
        { name: "Inventor" },
    ]

    const checkDuplicateName = (n) => {
        for (let i = 0; i < userApplicators.length; i++)
            if (userApplicators[i].name === n) return true
        return false
    }

    const saveSettings = async () => {
        var _userApplicators = []
        var stateChange = 0
        const index = userApplicators.findIndex((item) => item.key === key)
        if (checkDuplicateName(nameInput)) {
            setDuplicate(true)
        } else {
            for (let i = 0; i < userApplicators.length; i++) {
                if (i !== index) _userApplicators.push(userApplicators[i])
                else {
                    var applicator = {
                        key: key,
                        product: productValue,
                        light: slider,
                    }
                    if (nameInput) {
                        applicator.name = nameInput
                        stateChange++
                    } else applicator.name = name
                    if (connectionIPInput) {
                        applicator.connectionIP = connectionIPInput
                    } else applicator.connectionIP = connectionIP
                    _userApplicators.push(applicator)
                }
            }

            dispatch(setApplicators(_userApplicators))
            const jsonValue = JSON.stringify(_userApplicators)
            await SecureStore.setItemAsync("_userApplicators", jsonValue)

            // Upload the new data to the database.
            if (stateChange === 0) navigation.goBack()
        }
    }

    const removeApplicator = async () => {
        var _userApplicators = []
        const index = userApplicators.findIndex((item) => item.key === key)

        for (let i = 0; i < userApplicators.length; i++) {
            if (i !== index) _userApplicators.push(userApplicators[i])
        }

        dispatch(setApplicators(_userApplicators))
        const jsonValue = JSON.stringify(_userApplicators)
        await SecureStore.setItemAsync("_userApplicators", jsonValue)
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar
                title={t("myapplicatorsettings:settingstitle") + name}
            />
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
                                name + "                                       " //Added spaces to make the textInput fill to the sides
                            }
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
                            placeholder={connectionIP}
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
                <TouchableHighlight
                    style={[
                        buttons.buttonDynamic,
                        styles.trashButton,
                        { backgroundColor: theme.theme.ERROR_COLOR },
                    ]}
                    onPress={() => {
                        console.log("Trash this applicator.")
                        setConfirmation(true)
                    }}
                    underlayColor={theme.theme.ERROR_ACTIVE_COLOR}
                    activeOpacity={1}
                >
                    <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={22}
                        color={theme.theme.BUTTON_TEXT_COLOR}
                    />
                </TouchableHighlight>
                <View style={styles.saveContainer}>
                    <TouchableHighlight
                        style={buttons.buttonDynamic}
                        onPress={() => {
                            console.log(t("myapplicatorsettings:save"))
                            saveSettings()
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
                modalVisibility={duplicate}
                setModalVisibility={setDuplicate}
                title={t("myapplicatorsettings:modaltitle")}
                text={t("myapplicatorsettings:duplicatetext")}
                buttonText={t("myapplicatorsettings:modalconfirmation")}
            />
            <ConfirmationModal
                modalVisibility={confirmation}
                setModalVisibility={setConfirmation}
                func={removeApplicator}
                title={t("myapplicatorsettings:confirmationtitle")}
                text={t("myapplicatorsettings:confirmationtext")}
                button1Text={t("myapplicatorsettings:yes")}
                button2Text={t("myapplicatorsettings:no")}
            />
        </SafeAreaView>
    )
}

export default CustomApplicatorScreen

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
    trashButton: {
        marginLeft: 56,
        marginRight: 16,
    },
    saveContainer: {
        flexGrow: 1,
        marginRight: 56,
    },
})
