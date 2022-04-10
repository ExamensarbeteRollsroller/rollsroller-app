import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
} from "react-native"
import React from "react"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { selectTheme } from "../../data/slices/themeSlice"

const MenuTopBar = () => {
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
                    navigation.openDrawer()
                }}
            >
                <MaterialIcons
                    name="menu"
                    size={36}
                    color={theme.theme.BUTTON_TEXT_COLOR}
                />
            </TouchableOpacity>
            <Image
                source={require("../../assets/images/rollsrollerlogo.png")}
                style={styles.logo}
            />
        </View>
    )
}

export default MenuTopBar

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
        paddingLeft: 12,
        justifyContent: "center",
    },
    logo: {
        width: 24,
        height: 24,
        flex: 1,
        marginRight: "15%",
        alignItems: "center",
        resizeMode: "contain",
    },
})
