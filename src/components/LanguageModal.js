import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    TouchableOpacity,
} from "react-native"
import React from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import { modal } from "../../styles/modal"
import { selectTheme } from "../../data/slices/themeSlice"

const LanguageModal = ({ modalVisibility, setModalVisibility }) => {
    const { t, i18n } = useTranslation()
    const theme = useSelector(selectTheme)

    const languages = [
        { code: "en", language: "english", flag: "🇺🇸" },
        { code: "sv", language: "swedish", flag: "🇸🇪" },
    ]

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
                <Pressable style={modal.modalContainer}>
                    <View
                        style={[
                            modal.modalHeader,
                            { backgroundColor: theme.theme.PRIMARY_COLOR },
                        ]}
                    >
                        <Text
                            style={[
                                modal.modalHeaderText,
                                { color: theme.theme.BUTTON_TEXT_COLOR },
                            ]}
                        >
                            {t("languageselection:chooselang")}
                        </Text>
                    </View>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            style={[
                                styles.langItemContainer,
                                { borderBottomColor: theme.theme.LINE_COLOR },
                            ]}
                            onPress={() => {
                                if (i18n.language !== lang.code)
                                    i18n.changeLanguage(lang.code)
                                setModalVisibility(!modalVisibility)
                            }}
                        >
                            <View style={styles.langItem}>
                                <Text style={styles.langText}>{lang.flag}</Text>
                                <Text
                                    style={[
                                        styles.langText,
                                        { paddingLeft: 8 },
                                    ]}
                                >
                                    {t("languageselection:" + lang.language)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default LanguageModal

const styles = StyleSheet.create({
    langItemContainer: {
        width: "100%",
        borderBottomWidth: 1,
        alignItems: "center",
    },
    langItem: {
        flexDirection: "row",
        padding: 8,
    },
    langText: {
        fontSize: 20,
    },
})
