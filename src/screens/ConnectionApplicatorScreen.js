import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Pressable,
    ActivityIndicator,
    Modal,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSelector } from "react-redux"
import init from "react_native_mqtt"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useTranslation } from "react-i18next"

import { buttons } from "../../styles/buttons"
import { selectTheme } from "../../data/slices/themeSlice"
import PageTopBar from "../components/PageTopBar"
import ErrorModal from "../components/ErrorModal"

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync: {},
})

const ConnectionApplicatorScreen = (props) => {
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)
    const [isConnected, setConnected] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [moveButtonText, setMoveButtonText] = useState(
        t("connection:moveroller")
    )
    const [modalVisibility, setModalVisibility] = useState(false)
    const { key, name, product, connectionIP, light } = props.route.params

    const cclient = new Paho.MQTT.Client(connectionIP, 9001, name)
    const [client, setClient] = useState(cclient)

    const onConnect = () => {
        console.log("Connected :)")
        setConnected(true)
        setLoading(false)
        setup()
    }

    const onFailure = (responseObject) => {
        console.log("onFailure: " + responseObject.errorMessage)
        setLoading(false)
        setModalVisibility(true)
    }

    const onConnectionLost = (responseObject) => {
        console.log("onConnectionLost: " + responseObject.errorMessage)
        setConnected(false)
        setLoading(false)
    }

    const onMessageArrived = (message) => {
        console.log("onMessageArrived: " + message.payloadString)
    }

    const onMessageDelivered = (response) => {
        console.log("onMessageDelivered: " + response.payloadString)
    }
    client.onConnectionLost = onConnectionLost
    client.onMessageArrived = onMessageArrived
    client.onMessageDelivered = onMessageDelivered

    const sendMessage = (msg, topic) => {
        const message = new Paho.MQTT.Message(msg)
        message.destinationName = topic
        if (client.isConnected()) {
            client.send(message)
        } else {
            console.log("Connect before sending. ")
        }
    }

    const connect = () => {
        setLoading(true)
        try {
            client.connect({
                onSuccess: onConnect,
                useSSL: false,
                userName: name + product,
                password: name + product,
                onFailure: onFailure,
            })
        } catch (error) {
            throw error
        }
    }

    const disconnect = () => {
        client.disconnect()
    }

    // Add more setup for other settings
    const setup = () => {
        if (light) sendMessage(light, "light")
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar title={name} />
            <View
                style={[
                    styles.connectFeedback,
                    isConnected
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" },
                    isLoading && { backgroundColor: "yellow" },
                ]}
            >
                <Text
                    style={[
                        isConnected ? { color: "black" } : { color: "white" },
                        isLoading && { color: "black" },
                        styles.connectFeedbackText,
                    ]}
                >
                    {isConnected
                        ? t("connection:connected")
                        : t("connection:disconnected")}
                </Text>
            </View>
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: theme.theme.BACKGROUND_COLOR,
                    },
                ]}
            >
                <TouchableHighlight
                    style={buttons.buttonStatic}
                    onPress={() => {
                        if (!isLoading) {
                            if (!isConnected) {
                                console.log(t("connect"))
                                connect()
                            } else {
                                console.log(t("disconnect"))
                                disconnect()
                            }
                        }
                    }}
                    underlayColor={theme.theme.BUTTON_PRESS_COLOR}
                    activeOpacity={1}
                >
                    <View style={styles.buttonLoading}>
                        <Text style={buttons.buttonText}>
                            {isLoading
                                ? t("connection:connecting")
                                : isConnected
                                ? t("connection:disconnect")
                                : t("connection:connect")}
                        </Text>
                        {isLoading && (
                            <ActivityIndicator
                                size="small"
                                color={theme.theme.BUTTON_TEXT_COLOR}
                            />
                        )}
                    </View>
                </TouchableHighlight>
                <View style={styles.controls}>
                    <View style={styles.tooltip}>
                        <Text style={styles.tooltipText}>
                            {t("connection:tooltip")}
                        </Text>
                    </View>
                    <TouchableHighlight
                        style={[
                            buttons.buttonStatic,
                            buttons.large,
                            { marginTop: 4 },
                        ]}
                        onPressIn={() => {
                            sendMessage("start", "moveroller")
                            if (isConnected)
                                setMoveButtonText(t("connection:movingroller"))
                            else setMoveButtonText(t("connection:disconnected"))
                        }}
                        onPressOut={() => {
                            sendMessage("stop", "moveroller")
                            setMoveButtonText(t("connection:moveroller"))
                        }}
                        underlayColor={theme.theme.BUTTON_PRESS_COLOR}
                        activeOpacity={1}
                    >
                        <View style={styles.buttonLoading}>
                            <Text
                                style={[
                                    buttons.buttonText,
                                    buttons.buttonTextLarge,
                                ]}
                            >
                                {moveButtonText}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            <ErrorModal
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
                title={t("connection:modaltitle")}
                text={t("connection:modaltext")}
                buttonText={t("connection:modalbuttontext")}
            />
        </SafeAreaView>
    )
}

export default ConnectionApplicatorScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: "center",
    },
    controls: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
    },
    connectFeedback: {
        width: "100%",
        alignItems: "center",
        padding: 4,
    },
    connectFeedbackText: {
        fontSize: 16,
    },
    buttonLoading: {
        flexDirection: "row",
    },
    tooltip: {
        width: "60%",
    },
})
