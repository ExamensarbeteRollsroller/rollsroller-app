import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    TouchableHighlight,
} from "react-native"
import React from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import { buttons } from "../../styles/buttons"
import { modal } from "../../styles/modal"
import { selectTheme } from "../../data/slices/themeSlice"

const ErrorModal = ({ modalVisibility, setModalVisibility }) => {
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisibility}
            onRequestClose={() => {
                console.log("Closing modal...")
                setModalVisibility(!modalVisibility)
            }}
        >
            <Pressable
                style={modal.modal}
                onPress={() => {
                    console.log("Closing modal...")
                    setModalVisibility(!modalVisibility)
                }}
            >
                <Pressable style={[modal.modalContainer, { paddingBottom: 8 }]}>
                    <View
                        style={[
                            modal.modalHeader,
                            {
                                backgroundColor: theme.theme.PRIMARY_COLOR,
                                marginBottom: 8,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                modal.modalHeaderText,
                                { color: theme.theme.BUTTON_TEXT_COLOR },
                            ]}
                        >
                            {t("connection:modaltitle")}
                        </Text>
                    </View>
                    <Text style={modal.modalText}>
                        {t("connection:modaltext")}
                    </Text>
                    <TouchableHighlight
                        style={buttons.buttonDynamic}
                        onPress={() => {
                            console.log("Closing modal...")
                            setModalVisibility(!modalVisibility)
                        }}
                        underlayColor={theme.theme.BUTTON_PRESS_COLOR}
                        activeOpacity={1}
                    >
                        <Text style={buttons.buttonText}>
                            {t("connection:modalbuttontext")}
                        </Text>
                    </TouchableHighlight>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default ErrorModal

const styles = StyleSheet.create({})
