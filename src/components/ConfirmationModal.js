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

import { buttons } from "../../styles/buttons"
import { modal } from "../../styles/modal"
import { selectTheme } from "../../data/slices/themeSlice"

const ConfirmationModal = ({
    modalVisibility,
    setModalVisibility,
    func,
    title,
    text,
    button1Text,
    button2Text,
}) => {
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
            {/* Pressable for enabling closing of the modal by pressing on the outside */}
            <Pressable
                style={modal.modal}
                onPress={() => {
                    console.log("Closing modal...")
                    setModalVisibility(!modalVisibility)
                }}
            >
                {/* Pressable to nullify the previous one */}
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
                            {title}
                        </Text>
                    </View>
                    <Text style={modal.modalText}>{text}</Text>
                    <View
                        style={[
                            modal.line,
                            {
                                borderBottomColor: theme.theme.LINE_COLOR,
                            },
                        ]}
                    ></View>
                    <View style={modal.modalButtonGroup}>
                        <TouchableHighlight
                            style={[
                                buttons.buttonDynamic,
                                {
                                    marginTop: 8,
                                    width: "20%",
                                    backgroundColor: theme.theme.ERROR_COLOR,
                                },
                            ]}
                            onPress={() => {
                                func()
                                console.log("Yes")
                                setModalVisibility(!modalVisibility)
                                console.log("Closing modal...")
                            }}
                            underlayColor={theme.theme.ERROR_ACTIVE_COLOR}
                            activeOpacity={1}
                        >
                            <Text style={buttons.buttonText}>
                                {button1Text}
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[
                                buttons.buttonDynamic,
                                {
                                    marginTop: 8,
                                    width: "20%",
                                },
                            ]}
                            onPress={() => {
                                console.log("No")
                                setModalVisibility(!modalVisibility)
                                console.log("Closing modal...")
                            }}
                            underlayColor={theme.theme.BUTTON_PRESS_COLOR}
                            activeOpacity={1}
                        >
                            <Text style={buttons.buttonText}>
                                {button2Text}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default ConfirmationModal

const styles = StyleSheet.create({})
