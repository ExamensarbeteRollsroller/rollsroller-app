import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { Icon } from "react-native-elements"

const Topbar = ({ title }) => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack()
                    }
                }}
            >
                <Icon type="antdesign" color="white" name="arrowleft" />
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default Topbar

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: "#253A70",
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
    },
    iconButton: {
        height: 56,
        width: 56,
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        fontSize: 18,
    },
})
