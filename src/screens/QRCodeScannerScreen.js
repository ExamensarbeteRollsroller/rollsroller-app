import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    SafeAreaView,
} from "react-native"
import { Camera } from "expo-camera"
import { BarCodeScanner } from "expo-barcode-scanner"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { selectTheme } from "../../data/slices/themeSlice"
import PageTopBar from "../components/PageTopBar"
import { buttons } from "../../styles/buttons"

const QRCodeScannerScreen = () => {
    const { t } = useTranslation()
    const navigation = useNavigation()
    const theme = useSelector(selectTheme)
    const [hasPermission, setHasPermission] = useState(null)

    useEffect(() => {
        const perm = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            console.log(status)
            setHasPermission(status === "granted")
            if (status === "denied") {
                navigation.replace("NewApplicatorScreen", {
                    product: "secretcode",
                    connectionIP: "secretcode",
                })
            }
        }
        perm()
    }, [])

    // Check if data is valid in QR-code
    // It should be an object, such as:
    // {"product":"Inventor", "connectionIP":"xxx.xxx.xxx.xxx"}
    // "product" and "connectionIP" are the important values since they dictate what data to use
    const handleBarCodeScanned = ({ data }) => {
        try {
            const JSONdata = JSON.parse(data)
            console.log(JSONdata)
            if (
                JSONdata.product !== undefined &&
                JSONdata.connectionIP !== undefined
            ) {
                navigation.replace("NewApplicatorScreen", {
                    product: JSONdata.product,
                    connectionIP: JSONdata.connectionIP,
                })
            } else {
                navigation.replace("NewApplicatorScreen")
            }
        } catch (error) {
            navigation.replace("NewApplicatorScreen")
        }
    }

    if (hasPermission === null) {
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
            >
                <PageTopBar title={t("qrcode:title")} />
                <View
                    style={{
                        flex: 1,
                        backgroundColor: theme.theme.BACKGROUND_COLOR,
                    }}
                >
                    <Text>Requesting for camera permission</Text>
                </View>
            </SafeAreaView>
        )
    }
    if (hasPermission === false) {
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
            >
                <PageTopBar title={t("qrcode:title")} />
                <View
                    style={{
                        flex: 1,
                        backgroundColor: theme.theme.BACKGROUND_COLOR,
                    }}
                >
                    <Text>Permissions needed</Text>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar title={t("qrcode:title")} />
            <View
                style={{
                    flex: 1,
                    flexDirection: "column-reverse",
                    backgroundColor: theme.theme.BACKGROUND_COLOR,
                }}
            >
                <Camera
                    style={StyleSheet.absoluteFillObject}
                    type={Camera.Constants.Type.back}
                    onBarCodeScanned={handleBarCodeScanned}
                />
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
                                console.log(t("qrcode:manual"))
                                navigation.replace("NewApplicatorScreen", {
                                    product: "secretcode",
                                    connectionIP: "secretcode",
                                })
                            }}
                            underlayColor={theme.theme.BUTTON_PRESS_COLOR}
                            activeOpacity={1}
                        >
                            <Text style={buttons.buttonText}>
                                {t("qrcode:manual")}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default QRCodeScannerScreen

const styles = StyleSheet.create({
    buttonContainer: {
        height: 80,
        width: "100%",
        borderTopWidth: 1,
    },
    saveContainer: {
        flexGrow: 1,
        marginLeft: 56,
        marginRight: 56,
    },
})
