import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from "react-redux"
import { selectTheme } from "../../data/slices/themeSlice"

const Topbar = ({ title }) => {
    const navigation = useNavigation()
    const theme = useSelector(selectTheme)

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.theme.PRIMARY_COLOR },
            ]}
        >
            <StatusBar
                barStyle={
                    theme.theme.MODE === "LIGHT"
                        ? "light-content"
                        : "dark-content"
                }
                backgroundColor={theme.theme.DARK_PRIMARY_COLOR}
            />
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack()
                    }
                }}
            >
                <MaterialCommunityIcons
                    name="keyboard-backspace"
                    size={24}
                    color={theme.theme.BUTTON_TEXT_COLOR}
                />
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default Topbar

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
    },
    iconButton: {
        height: 56,
        width: 56,
        paddingLeft: 16,
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        fontSize: 18,
    },
})
